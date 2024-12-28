from pathlib import Path

# PDFの編集
import fitz

# オブジェクト抽出
from PIL import Image
from pandas import DataFrame

# PDFからの変換
from pdf2docx import Converter

# markdown変換
from markitdown import MarkItDown


markitdown = MarkItDown()

IMAGE_FORMAT = {
    'JPEG': '.jpeg',
    'PNG': '.png',
    'GIF': '.gif',
    'BMP': '.bmp',
    'TIFF': '.tiff',
}

def rename(filename: Path, add: str, extention: str|None=None) -> str:
    """ファイル名を変更する

    Args:
        filename (Path): ファイル名
        add (str): 追加する文字列
        extention (str | None, optional): 拡張子. Defaults to None.


    Returns:
        str: 変更後のファイル名
    """
    if extention is None:
        return filename.with_stem(filename.stem + add)
    else:
        return filename.with_stem(filename.stem + add).with_suffix(extention)


def split_page(file: Path) -> list[Path]:
    """PDFをページごとに分割する

    Args:
        file (Path): ファイル名

    Returns:
        list[Path]: 分割されたファイル名
    """
    reader = fitz.open(file)
    result = []

    for i in range(reader.page_count):
        output_name = rename(file, f'_splited-{i+1:02}')
        result.append(output_name)

        writer = fitz.open()
        writer.insert_pdf(reader, from_page=i, to_page=i)
        writer.save(output_name)
        writer.close()

    reader.close()
    return result

def marge_page(files: list[Path]) -> list[Path]:
    """PDFを結合する

    Args:
        files (list[Path]): ファイル名のリスト

    Returns:
        list[Path]: 結合されたファイル名
    """
    writer = fitz.open()
    for file in files:
        writer.insert_pdf(fitz.open(file))

    output_name = rename(files[0], '_marged')
    writer.save(output_name)

    writer.close()
    return [output_name]

def delete_page(file: Path, pages: list[int]) -> list[Path]:
    """ページを削除する

    Args:
        file (Path): ファイル名
        pages (list[int]): 削除するページ番号

    Returns:
        list[Path]: 削除されたファイル名
    """
    reader = fitz.open(file)
    writer = fitz.open()
    for i in range(reader.page_count):
        if i not in pages:
            writer.insert_pdf(reader, from_page=i, to_page=i)

    output_name = rename(file, '_deleted')
    writer.save(output_name)

    reader.close()
    writer.close()
    return [output_name]

def extract_page(file: Path, pages: list[int]) -> list[Path]:
    """ページを抽出する

    Args:
        file (Path): ファイル名
        pages (list[int]): 抽出するページ番号

    Returns:
        list[Path]: 抽出されたファイル名
    """
    reader = fitz.open(file)
    writer = fitz.open()
    for i in range(reader.page_count):
        if i in pages:
            writer.insert_pdf(reader, from_page=i, to_page=i)

    output_name = rename(file, '_extracted')
    writer.save(output_name)

    reader.close()
    writer.close()
    return [output_name]

def rotate_page(file: Path, angle: int) -> list[Path]:
    """ページを回転する

    Args:
        file (Path): ファイル名
        angle (int): 回転角度

    Returns:
        list[Path]: 回転されたファイル名
    """
    normalize_angle = angle % 4 * 90

    reader = fitz.open(file)
    for page in reader:
        page.set_rotation(normalize_angle)

    output_name = rename(file, f'_rotated-{normalize_angle}')
    reader.save(output_name)

    reader.close()
    return [output_name]


def extract_text(file: Path) -> list[Path]:
    """PDFからテキストを抽出する

    Args:
        file (Path): ファイル名

    Returns:
        list[Path]: 抽出されたファイル名
    """
    reader = fitz.open(file)
    text = ''

    for page in reader:
        text += page.get_text() or ''

    output_name = rename(file, f'_e-text', extention='.txt')
    with open(output_name, 'w', encoding='utf-8') as f:
        f.write(text)

    reader.close()
    return [output_name]

def extract_image(file: Path) -> list[Path]:
    """PDFから画像を抽出する

    Args:
        file (Path): ファイル名

    Returns:
        list[Path]: 抽出されたファイル名
    """
    reader = fitz.open(file)
    result = []

    for i, page in enumerate(reader):
        for j, image in enumerate(page.get_images(full=True)):
            output_name = rename(file, f'_e-image-{i+1:02}-{j+1:02}', extention='.png')
            result.append(output_name)

            base_image = reader.extract_image(image[0])
            with open(output_name, 'wb') as f:
                f.write(base_image['image'])

    reader.close()
    return result

def extract_table(file: Path) -> list[Path]:
    """PDFから表を抽出する

    Args:
        file (Path): ファイル名

    Returns:
        list[Path]: 抽出されたファイル名
    """
    reader = fitz.open(file)
    result = []

    for i, page in enumerate(reader):
        for j, table in enumerate(page.find_tables()):
            output_name = rename(file, f'_e-table-{i+1:02}-{j+1:02}', extention='.csv')
            result.append(output_name)

            df = DataFrame(table.extract())
            df.to_csv(output_name, index=False, header=False)

    reader.close()
    return result

def pdf_to_image(file: Path, zoom: float = 3.0) -> list[Path]:
    """PDFを画像に変換する

    Args:
        file (Path): ファイル名
        zoom (float, optional): ズーム. Defaults to 3.0.

    Returns:
        list[Path]: 変換されたファイル名
    """
    reader = fitz.open(file)
    result = []

    for i, page in enumerate(reader):
        output_name = rename(file, f'_converted-{i+1:02}', extention='.png')
        result.append(output_name)

        image = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom))
        image.save(output_name)

    reader.close()
    return result

def pdf_to_docx(file: Path) -> list[Path]:
    """PDFをWordに変換する

    Args:
        file (Path): ファイル名

    Returns:
        list[Path]: 変換されたファイル名
    """
    converter = Converter(file)
    output_name = rename(file, '_converted', extention='.docx')
    converter.convert(output_name, start=0, end=None)
    return [output_name]

def markdown(file: Path) -> list[Path]:
    """ファイル(.pdf, .pptx, .xlsx, .docx, .csv, .json, .xml, .html)をmarkdownに変換する

    Args:
        file (Path): ファイル名

    Returns:
        list[Path]: 変換されたファイル名
    """
    result = markitdown.convert(file.__str__())
    output_name = rename(file, '_markdown', extention='.txt')
    with open(output_name, 'w', encoding='utf-8') as f:
        f.write(result.text_content)
    return [output_name]

def main():
    dir = Path(__file__).parent

    test = dir / ''
    x = markdown(test)
    print(x)

if __name__ == '__main__':
    main()
    print('done')
