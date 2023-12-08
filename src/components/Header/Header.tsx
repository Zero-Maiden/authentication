"use client";

import Link from "next/link";

import style from "./style.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHotel, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import Magnetic from "../Animation/Magnetic/Magnetic";
import { useRouter } from "next/navigation";

export default function Header() {
  const route = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    route.push("/guest");
  };

  return (
    <div className={style.container}>
      <Magnetic>
        <div className={style.edge}>
          <Link href="/">
            <FontAwesomeIcon icon={faHouse} className={style.icon} />
          </Link>
        </div>
      </Magnetic>

      <div className={style.menu}>
        <Magnetic>
          <Link className={style.link} href="/menu">
            About
          </Link>
        </Magnetic>

        <Magnetic>
          <Link className={style.link} href="/guest">
            <FontAwesomeIcon icon={faRightToBracket} className={style.icon} />
          </Link>
        </Magnetic>

        <Magnetic>
          <div className={style.center}>
            <Link className={style.link} href="/hotel">
              <FontAwesomeIcon icon={faHotel} className={style.icon} />
            </Link>
          </div>
        </Magnetic>

        <Magnetic>
          <button className={style.link} onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} className={style.icon} />
          </button>
        </Magnetic>

        <Magnetic>
          <Link className={style.link} href="/menu">
            About
          </Link>
        </Magnetic>
      </div>

      <Magnetic>
        <div className={style.edge}>
          <Link href="/">
            <FontAwesomeIcon icon={faHouse} className={style.icon} />
          </Link>
        </div>
      </Magnetic>
    </div>
  );
}
