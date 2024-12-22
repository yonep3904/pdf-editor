from zipfile import ZipFile
from pathlib import Path

def split(text: str, splitter: str = ',', ranger: str = '-', decriment: bool = False, unique: bool = True, sort: bool = False) -> list[int]:
    """
    Split a string of numbers separated by a splitter and/or ranger into a list of numbers.
    """
    out = []
    for part in text.split(splitter):
        if ranger in part:
            start, end = map(int, part.split(ranger))
            out.extend(range(start, end + 1))
        else:
            out.append(int(part))

    if unique:
        out = list(dict.fromkeys(out))
    if decriment:
        out = [i - 1 for i in out]
    if sort:
        out.sort()

    return out

def zip_files(files: list[Path], zip: Path|None = None) -> Path:
    """ファイルをZIPにまとめる"""
    if zip is None:
        zip = files[0].with_name('output.zip')
    
    with ZipFile(zip, 'w') as zipf:
        for file_path in files:
            zipf.write(file_path, file_path.name)
    return zip
