"use client";

import Link from "next/link";

import style from "./style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

import Magnetic from "../Animation/Magnetic/Magnetic";

import RequireAuth from "../RequireAuth";

export default function MarqueeLtoR() {
  return (
    <div className={`${style.container} ${style.ltor}`}>
      {[...Array(16)].map((_, i) => {
        return (
          <>
            <Magnetic>
              <div className={style.title}>Malas</div>
            </Magnetic>
            <Magnetic>
              <div className={style.title}>Luxury</div>
            </Magnetic>
            <Magnetic>
              <div className={style.title}>Hotel</div>
            </Magnetic>
            <Magnetic>
              <FontAwesomeIcon icon={faHotel} className={style.icon} />
            </Magnetic>
          </>
        );
      })}
    </div>
  );
}
