from dataclasses import dataclass, field
from typing import Callable
from pathlib import Path

from common import zip_files

@dataclass
class Endpoint:
    url: str
    description: str
    multiple: bool
    process: Callable
    allowed_extensions: tuple[str]
    params: dict = field(default_factory=dict)
        
    def __call__(self, *args, **kwargs) -> Path:
        if self.multiple:
            out = self.process(*args, **kwargs)
        else:
            single_file_args = [arg if i != 0 else arg[0] for i, arg in enumerate(args)]
            out = self.process(*single_file_args, **kwargs)

        if len(out) == 1:
            return out[0]
        else:
            return zip_files(out)
        
    def is_allowed(self, filename: str):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.allowed_extensions
