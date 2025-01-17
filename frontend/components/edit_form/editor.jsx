import React, { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import constant from "../../app/const";
import createSchema from "./schema";
import { FileInput } from "./dropzone";
import { PagesInput } from "./textbox";
import { AngleInput, FormatInput } from "./radiobutton";
import style from "./style.module.css";

const Editor = forwardRef(
  ({ title, description, fileUpload, params, apiEndpoint }, ref) => {
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fields = params.map(([param]) => param);
    if (fileUpload) fields.push("files");

    const schema = createSchema(fields);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
      // 送信処理中の場合、新たな処理を行わない
      if (isSubmitting) return;

      setIsSubmitting(true);
      const formData = new FormData();
      // ファイルを追加
      files.forEach((file) => {
        formData.append("files[]", file);
      });
      // パラメータを追加
      params.forEach(([param, type]) => {
        formData.append(param, data[param]);
      });

      try {
        console.log("API URL:", constant.api.url(apiEndpoint));
        console.log("Form Data:", formData);

        const response = await fetch(constant.api.url(apiEndpoint), {
          method: "POST",
          body: formData,
        });

        console.log("Response status:", response.status);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "output.zip";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error("API request failed:", response.status);
          switch (response.status) {
            case 400:
              alert("入力内容に誤りがあります。");
              break;
            default:
              alert("送信中にエラーが発生しました。もう一度お試しください。");
              break;
          }
        }
      } catch (error) {
        alert("送信中にエラーが発生しました。もう一度お試しください。");
      } finally {
        setIsSubmitting(false);
      }
    };

    const onError = (errors) => {
      console.log("Validation errors:", errors);
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className={style.formContainer}
        ref={ref}
      >
        <h3>{title}</h3>
        <p>{description}</p>
        <FileInput
          fileUpload={fileUpload}
          files={files}
          setFiles={setFiles}
          setValue={setValue}
          errors={errors}
        />

        <div className={style.paramContainer}>
          {params.map(([param, type], index) => {
            switch (type) {
              case "pages":
                return (
                  <PagesInput key={index} register={register} errors={errors} />
                );
              case "angle":
                return (
                  <AngleInput key={index} register={register} errors={errors} />
                );
              case "format":
                return (
                  <FormatInput
                    key={index}
                    register={register}
                    errors={errors}
                  />
                );
              default:
                return null;
            }
          })}
          <button
            type="submit"
            disabled={isSubmitting}
            className={style.submitButton}
          >
            {isSubmitting ? "処理中..." : "編集"}
          </button>
        </div>
      </form>
    );
  }
);

Editor.displayName = "Editor";
export default Editor;
