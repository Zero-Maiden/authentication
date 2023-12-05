"use client";

import Link from "next/link";

import style from "./style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faStar, faHotel, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import Magnetic from "../Animation/Magnetic/Magnetic";

import RequireAuth from "../RequireAuth";

export default function Footer() {
  return (
    <div className={`${style.container} ${style.rtol}`}>
      {[...Array(12)].map((_, i) => {
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
          </>
        );
      })}
    </div>
  );
}
