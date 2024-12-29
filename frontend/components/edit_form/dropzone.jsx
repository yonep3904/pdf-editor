import React from "react";
import { useDropzone } from "react-dropzone";
import style from "./style.module.css";
import constant from "../../app/const";

export const FileInput = ({
  fileUpload,
  files,
  setFiles,
  setValue,
  errors,
}) => {
  const onDrop = (acceptedFiles) => {
    const maxFile = fileUpload.multiple ? constant.fileUpload.maxFileNum : 1;
    if (maxFile <= files.length) {
      setFiles((prevFiles) => [...prevFiles.slice(1), ...acceptedFiles]);
      setValue("files", [...files.slice(1), ...acceptedFiles], {
        shouldValidate: true,
      });
    } else {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      setValue("files", [...files, ...acceptedFiles], {
        shouldValidate: true,
      });
    }
  };

  const removeFile = (file) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    setValue("files", newFiles, {
      shouldValidate: true,
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileUpload.accept,
    multiple: fileUpload.multiple,
    maxFiles: fileUpload.multiple ? constant.fileUpload.maxFileNum : 1,
  });

  return (
    <div className={style.dropzoneContainer}>
      <div
        {...getRootProps()}
        className={`${style.dropzone} ${isDragActive ? style.active : ""}`}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "ここにファイルをドロップしてください。"
            : `ファイルをドラッグ＆ドロップするか、クリックして選択してください。
              (対応拡張子 : ${Object.values(fileUpload.accept)
                .map((value) => value.join(", "))
                .join(", ")} , 最大ファイル数 :  ${
                fileUpload.multiple ? constant.fileUpload.maxFileNum : 1
              })`}
        </p>
      </div>
      <div className={style.fileList}>
        {files.map((file, index) => (
          <div key={index} className={style.fileItem}>
            <span>{file.name}</span>
            <button type="button" onClick={() => removeFile(file)}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

FileInput.displayName = "FileInput";
