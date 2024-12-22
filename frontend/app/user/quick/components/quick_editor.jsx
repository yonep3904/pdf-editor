import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, forwardRef } from "react";
import { useDropzone } from "react-dropzone";

import style from "./quick_editor.module.css";

export const QuickEditor = forwardRef((props, ref) => {
  const { title, description, fileUpload, textInput, radioInput } = props;

  const [files, setFiles] = useState([]);

  // const extensionList = Object.values((fileUpload ?? []).accept).flat();
  const schema = yup.object().shape({
    // files: yup
    //   .mixed()
    //   .required("ファイルを選択してください")
    //   .test(
    //     "fileCount",
    //     "アップロードできるファイルは最大5つまでです",
    //     (value) => value && value.length <= 5
    //   )
    //   .test(
    //     "fileSize",
    //     `${fileUpload ? "各" : ""}ファイルは最大5MBまでです`,
    //     (value) =>
    //       value &&
    //       Array.from(value).every((file) => file.size <= 5 * 1024 * 1024)
    //   )
    //   .test(
    //     "fileType",
    //     `拡張子${extensionList.join(", ")}のファイルのみアップロードできます`,
    //     (value) =>
    //       value &&
    //       Array.from(value).every((file) => {
    //         const fileExtension = file.name.split(".").pop().toLowerCase();
    //         return extensionList.includes(`.${fileExtension}`);
    //       })
    //   ),

    ...(textInput
      ? {
          text: yup
            .string()
            .required("テキストを入力してください")
            .max(100, "100文字以内で入力してください")
            .test(
              "formatValidation",
              textInput.validationMessage,
              textInput.validationFunc,
            ),
        }
      : {}),

    ...(radioInput
      ? {
          radio: yup
            .number()
            .required("選択してください")
            .oneOf(
              radioInput.options.map((option) => option.value),
              "選択肢から選んでください"
            ),
        }
      : {}),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    setValue("files", acceptedFiles, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileUpload.accept,
    multiple: fileUpload?.multiple ?? true,
    maxFiles: 5,
  });

  const onSubmit = (data) => {
    alert({ ...data, files });
    console.log({ ...data, files });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={style.formContainer}
      ref={ref}
    >
      <h3>{title}</h3>
      <p>{description}</p>
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
      {errors.files && <p className={style.error}>{errors.files.message}</p>}
      {files.length > 0 && (
        <ul className={style.fileList}>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
      <div>
        {textInput && (
          <div className={style.inputContainer}>
            <label htmlFor="text" className={style.label}>
              {textInput.label}
            </label>
            <input
              id="text"
              type="text"
              placeholder={textInput.placeholder}
              {...register("text")}
              className={style.input}
            />
            {errors.text && (
              <p className={style.error}>{errors.text.message}</p>
            )}
          </div>
        )}

        {radioInput && (
          <div className={style.radioContainer}>
            <p className={style.label}>{radioInput.label}</p>
            {radioInput.options.map((option, index) => {
              return (
                <label key={index}>
                  <input
                    type="radio"
                    value={option.value}
                    {...register("radio")}
                    className={style.radioGroup}
                  />
                  {option.label}
                </label>
              );
            })}
            {errors.radio && (
              <p className={style.error}>{errors.radio.message}</p>
            )}
          </div>
        )}

        <button type="submit" className={style.button}>
          編集
        </button>
      </div>
    </form>
  );
});
