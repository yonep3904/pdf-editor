import React, { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import constant from "@/app/const";
import schema from "./schema";
import FileInput from "./dropzone";
import { PagesInput } from "./textbox";
import { AngleInput, FormatInput } from "./radiobutton";
import style from "./style.module.css";

export const Editor = forwardRef(
  ({ title, description, fileUpload, params, apiEndpoint }, ref) => {
    const [files, setFiles] = useState([]);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
      // const formData = new FormData();
      // // ファイルを追加
      // files.forEach((file) => {
      //   formData.append("files[]", file);
      // });
      // // パラメータを追加
      // params.forEach(([param, type]) => {
      //   formData.append(param, data[param]);
      // });

      // const url = constant.url(apiEndpoint);
      // alert(url);
      // try {
      //   const response = await fetch(url, {
      //     method: "POST",
      //     body: formData,
      //   });

      //   if (!response.ok) {
      //     throw new Error("API request failed");
      //   } else {
      //     alert("処理が完了しました");
      //   }

      //   // const blob = await response.blob();
      //   // const url = window.URL.createObjectURL(blob);
      //   // const a = document.createElement("a");
      //   // a.style.display = "none";
      //   // a.href = url;
      //   // a.download = "output.zip"; // 適切なファイル名に変更
      //   // document.body.appendChild(a);
      //   // a.click();
      //   // window.URL.revokeObjectURL(url);
      // } catch (error) {
      //   console.error("Error:", error);
      // }
      alert("処理が完了しました");
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
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
          <button type="submit" className={style.submitButton}>
            実行
          </button>
        </div>
      </form>
    );
  }
);
