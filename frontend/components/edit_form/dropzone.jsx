import React from "react";
import { useDropzone } from "react-dropzone";
import style from "./style.module.css";

const FileInput = ({ fileUpload, files, setFiles, setValue, errors }) => {
  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
    setValue("files", [...files, ...acceptedFiles], {
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
      <div>
        {errors.files && <p className={style.error}>{errors.files.message}</p>}
        {files.length > 0 && (
          <ul className={style.fileList}>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileInput;
