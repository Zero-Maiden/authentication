"use client";

import Link from "next/link";

import style from "./style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faStar, faHotel, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle, faList } from "@fortawesome/free-solid-svg-icons";

import Magnetic from "../Animation/Magnetic/Magnetic";

import RequireAuth from "../RequireAuth";

export default function Header() {
  return (
    <div className={style.container}>
      <Magnetic>
        <div className={style.title}>
          <Link href="/">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </div>
      </Magnetic>

      <div className={style.menu}>
        <Magnetic>
          <Link className={style.link} href="/admin">
            Admin
          </Link>
        </Magnetic>

        <Magnetic>
          <Link className={style.link} href="/user">
            User
          </Link>
        </Magnetic>

        <Magnetic>
          <div className={style.middle}>
            <Link className={`${style.link} ${style.linkcenter}`} href="/hotel">
              <FontAwesomeIcon icon={faHotel} />
            </Link>
          </div>
        </Magnetic>

        <Magnetic>
          <Link className={style.link} href="/">
            Menu
          </Link>
        </Magnetic>

        <Magnetic>
          <Link className={style.link} href="/">
            About
          </Link>
        </Magnetic>
      </div>

      <Magnetic>
        <div className={style.title}>
          <Link href="/guest">
            <FontAwesomeIcon icon={faRightToBracket} />
          </Link>
        </div>
      </Magnetic>
    </div>
  );
}
