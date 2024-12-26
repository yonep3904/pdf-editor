from pathlib import Path
from dataclasses import dataclass

@dataclass(frozen=True)
class Const:
    """定数クラス

    Attributes:
        root (Path): ルートディレクトリ
        temp_dir (Path): 一時保存用ディレクトリ
        url (str): url
        port (int): ポート番号
        """

    # ルートディレクトリ
    root: Path = Path(__file__).parent
    # 一時保存用ディレクトリ
    temp_dir: Path = root / 'temp'
    # ログ保存用ディレクトリ
    log_dir: Path = root / 'log'

    # ログレベル
    log_level = 'INFO'
    # ログフォーマット
    log_format = "%(asctime)s - %(levelname)s - %(message)s"


    # url
    url: str = 'http://localhost:5000'
    port: int = 5000

    # API name
    api_name: str = 'PDF Editor API'

    # GitHubリポジトリ
    github_name: str = 'yonep3904'
    github_repo: str = 'pdf-editor'
    github_link: str = f'https://{github_name}/{github_repo}'

