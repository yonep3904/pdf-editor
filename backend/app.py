from flask import Flask, request, send_file, jsonify, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename
import uuid
import shutil
import logging
from logging.handlers import RotatingFileHandler

from const import Const
from endpoint import Endpoint
from common import split
import editors
from fitz import FileDataError

app = Flask(__name__)
# CORSの設定
CORS(app)
# 受け取り可能なファイルサイズを16MBに設定
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# ディレクトリの作成
Const.temp_dir.mkdir(exist_ok=True)
Const.log_dir.mkdir(exist_ok=True)

# ログハンドラの設定
handler = RotatingFileHandler(Const.log_dir / 'app.log', maxBytes=10 * 1024 * 1024, backupCount=5)
handler.setLevel(Const.log_level)
handler.setFormatter(logging.Formatter(Const.log_format))

# Flaskアプリのロガーにハンドラを追加
app.logger.addHandler(handler)
app.logger.setLevel(Const.log_level)

# ルートロガーにもハンドラを追加
logging.getLogger().addHandler(handler)
logging.getLogger().setLevel(Const.log_level)

# エンドポイントの定義
endpoints = [
    Endpoint('/split', 'Split PDF pages', process=editors.split_page,  multiple=False, allowed_extensions=('pdf', )),
    Endpoint('/marge', 'Marge PDF pages', process=editors.marge_page,  multiple=True, allowed_extensions=('pdf', )),
    Endpoint('/delete', 'Delete PDF pages', process=editors.delete_page,  multiple=False, allowed_extensions=('pdf', ), params={'pages': '_pages'}),
    Endpoint('/extract', 'Extract PDF pages', process=editors.extract_page,  multiple=False, allowed_extensions=('pdf', ), params={'pages': '_pages'}),
    Endpoint('/rotate', 'Rotate PDF pages', process=editors.rotate_page,  multiple=False, allowed_extensions=('pdf', ), params={'angle': 'int'}),
    Endpoint('/extract_text', 'Extract text from PDF', process=editors.extract_text,  multiple=False, allowed_extensions=('pdf', )),
    Endpoint('/extract_image', 'Extract images from PDF', process=editors.extract_image,  multiple=False, allowed_extensions=('pdf', )),
    Endpoint('/extract_table', 'Extract tables from PDF', process=editors.extract_table,  multiple=False, allowed_extensions=('pdf', )),
    Endpoint('/convert_image', 'Convert PDF to Image', process=editors.pdf_to_image,  multiple=False, allowed_extensions=('pdf', )),
    Endpoint('/convert_docx', 'Convert PDF to Word', process=editors.pdf_to_docx,  multiple=False, allowed_extensions=('pdf', )),
    Endpoint('/markdown', 'Convert documentfile(.pdf, .pptx, .xlsx, .docx, .csv, .json, .xml, .html) to txt',
             process=editors.markdown, multiple=False, allowed_extensions=('pdf', 'pptx', 'xlsx', 'docx', 'csv', 'json', 'xml', 'html'))
]

# エンドポイントの処理
def edit_endpoint(endpoint: Endpoint):
    try:
        args = {}
        for key, value in endpoint.params.items():
            if key not in request.form:
                return jsonify({'error': f'Parameter {key} is missing'}), 400

            match value:
                case 'str':
                    args[key] = request.form[key]
                case 'int':
                    args[key] = int(request.form[key])
                case 'float':
                    args[key] = float(request.form[key])

                # pagesのみ特別な処理
                case '_pages':
                    args[key] = split(request.form[key], sort=True, unique=True, decriment=True)
                case _:
                    return jsonify({'error': f'Invalid parameter type {value}'}), 400

        # リクエストにファイルが含まれているかチェック
        if 'files[]' not in request.files:
            return jsonify({'error': 'No files part in the request'}), 400

        # ファイルをリストで取得
        files = request.files.getlist('files[]')
        if not files:
            return jsonify({'error': 'No files provided'}), 400

        # 一時フォルダをリクエストごとに作成
        request_temp_dir = Const.temp_dir / f'request_{uuid.uuid4().hex}'
        request_temp_dir.mkdir()

        # ファイルを保存
        saved_files = []
        for file in files:
            app.logger.info(f'File {file.filename} -> {file.filename.encode("latin1").decode("utf-8")}')
            if file and endpoint.is_allowed(file.filename):
                filename = secure_filename(file.filename)
                file_path = request_temp_dir / filename
                file.save(file_path)
                saved_files.append(file_path)
            else:
                return jsonify({'error': f'File {file.filename} is not allowed'}), 400

        # 処理を実行
        processed_files = endpoint(saved_files, **args)

        return send_file(processed_files, as_attachment=True)

    except IndexError:
        return jsonify({'error': 'Page index is not a valid'}), 400

    except FileDataError:
        return jsonify({'error': 'File is not a valid'}), 400

    except Exception as e:
        # エラーが発生した場合はログを出力
        app.logger.error(e, exc_info=True)
        return jsonify({'error': str(e)}), 500

    finally:
        # 処理が終了したら一時ファイルを削除
        if request_temp_dir.exists():
            shutil.rmtree(request_temp_dir, ignore_errors=True)

# APIドキュメントのエンドポイント
@app.route('/', methods=['GET'])
def index_endpoint():
    return render_template('api_docs.html', endpoints=endpoints, api_name=Const.api_name)

@app.route('/split', methods=['POST'])
def split_endpoint():
    return edit_endpoint(endpoints[0])

@app.route('/marge', methods=['POST'])
def marge_endpoint():
    return edit_endpoint(endpoints[1])

@app.route('/delete', methods=['POST'])
def delete_endpoint():
    return edit_endpoint(endpoints[2])

@app.route('/extract', methods=['POST'])
def extract_endpoint():
    return edit_endpoint(endpoints[3])

@app.route('/rotate', methods=['POST'])
def rotate_endpoint():
    return edit_endpoint(endpoints[4])

@app.route('/extract_text', methods=['POST'])
def extract_text_endpoint():
    return edit_endpoint(endpoints[5])

@app.route('/extract_image', methods=['POST'])
def extract_image_endpoint():
    return edit_endpoint(endpoints[6])

@app.route('/extract_table', methods=['POST'])
def extract_table_endpoint():
    return edit_endpoint(endpoints[7])

@app.route('/convert_image', methods=['POST'])
def convert_image_endpoint():
    return edit_endpoint(endpoints[8])

@app.route('/convert_docx', methods=['POST'])
def convert_docx_endpoint():
    return edit_endpoint(endpoints[9])

@app.route('/markdown', methods=['POST'])
def markdown():
    return edit_endpoint(endpoints[10])

if __name__ == '__main__':
    app.run(debug=True, port=5000)
