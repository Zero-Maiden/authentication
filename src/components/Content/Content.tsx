"use client";

import React from "react";

import style from "./style.module.scss";

import Magnetic from "../Animation/Magnetic/Magnetic";

export default function Content() {
  return (
    <div className={style.container}>
      <div className={style.hero}>
        <div className={style.first}>Selamat datang di</div>
        <div className={`${style.main} animate-gradient`}>
          <Magnetic>
            <div>Malas</div>
          </Magnetic>
          &nbsp;
          <Magnetic>
            <div>Luxury</div>
          </Magnetic>
          &nbsp;
          <Magnetic>
            <div>Hotel</div>
          </Magnetic>
        </div>
        <div className={style.last}>nomor satu di Indonesia</div>
      </div>
    </div>
  );
}
