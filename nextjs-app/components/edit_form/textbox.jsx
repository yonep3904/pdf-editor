import React, { forwardRef } from "react";
import style from "./style.module.css";

export const PagesInput = forwardRef(({ register, errors }, ref) => (
  <div className={style.inputContainer}>
    <label htmlFor="pages" className={style.label}>
      ページの指定
    </label>
    <input
      id="pages"
      type="text"
      placeholder="1, 2-4, 5"
      {...register("pages")}
      className={style.input}
    />
    {errors.pages && <p className={style.error}>{errors.pages.message}</p>}
  </div>
));

PagesInput.displayName = "PagesInput";
