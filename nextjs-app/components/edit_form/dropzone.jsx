import React from "react";
import { useDropzone } from "react-dropzone";
import style from "./style.module.css";

export const FileInput = ({
  fileUpload,
  files,
  setFiles,
  setValue,
  errors,
}) => {
  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setValue("files", [...files, ...acceptedFiles], {
      shouldValidate: true,
    });
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
    maxFiles: 10,
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
            ? "ここにファイルをドロップしてください"
            : "ファイルをドラッグ＆ドロップするか、クリックして選択してください"}
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
