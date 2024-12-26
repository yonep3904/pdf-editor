import React, { forwardRef } from "react";
import style from "./style.module.css";

export const AngleInput = forwardRef(({ register, errors }, ref) => (
  <div className={style.radioContainer}>
    <p className={style.label}>回転する向きを選択</p>
    {["右に90°", "180°", "左に90°"].map((option, index) => (
      <label key={index}>
        <input
          type="radio"
          value={option}
          {...register("angle")}
          className={style.radioGroup}
        />
        {option}
      </label>
    ))}
    {errors.angle && <p className={style.error}>{errors.angle.message}</p>}
  </div>
));

export const FormatInput = forwardRef(({ register, errors }, ref) => (
  <div className={style.radioContainer}>
    <p className={style.label}>画像の形式を選択</p>
    {[".png", ".jpg", ".bmp", ".tiff"].map((option, index) => (
      <label key={index}>
        <input
          type="radio"
          value={option}
          {...register("format")}
          className={style.radioGroup}
        />
        {option}
      </label>
    ))}
    {errors.format && <p className={style.error}>{errors.format.message}</p>}
  </div>
));
