import React from "react";
import { useRef, useState, useEffect, RefObject } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faHome, faLock } from "@fortawesome/free-solid-svg-icons";

// Styling
import style from "./style.module.scss";

// Connect ke back-end Laravel
import { Axios } from "@/api/Axios";
const LOGIN_URL = "/api/user/login";

import Magnetic from "../Animation/Magnetic/Magnetic";
import Link from "next/link";

interface LoginProps {
  toggleView: () => void;
}

export const Login: React.FC<LoginProps> = ({ toggleView }) => {
  const route = useRouter();

  const { setAuth } = useAuth();

  const userRef = useRef<HTMLInputElement>(null);
  const errorRef: RefObject<HTMLParagraphElement> = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Field in focus
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password });
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrorMessage("Tidak ada respon dari server");
      } else if (error.response?.status === 400) {
        setErrorMessage("Isi semua field dibawah");
      } else if (error.response?.status === 401) {
        setErrorMessage("Email atau Password salah");
      } else {
        setErrorMessage("Login gagal");
      }
      errorRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        route.push("/")
      ) : (
        <div className={style.login}>
          <h1 className={style.title}>Login</h1>
          <div className={style.formcontainer}>
            <p ref={errorRef} className={errorMessage ? style.errormessage : style.offscreen} aria-live="assertive">
              {errorMessage}
            </p>
            <form onSubmit={handleSubmit} className={style.form}>
              {/* Email */}
              <div className={style.field}>
                <label htmlFor="email" className={style.label}>
                  <FontAwesomeIcon icon={faAt} className={style.icon} />
                </label>
                <div className={style.verticaldivider}></div>
                <input
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  placeholder="Email"
                  className={style.input}
                />
              </div>

              {/* Password */}
              <div className={style.field}>
                <label htmlFor="password" className={style.label}>
                  <FontAwesomeIcon icon={faLock} className={style.icon} />
                </label>
                <div className={style.verticaldivider}></div>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  placeholder="Password"
                  className={style.input}
                />
              </div>

              {/* Button */}
              <button className={style.button}>Login</button>
            </form>
          </div>
          <p className={style.p}>
            Tidak punya akun?{" "}
            <span onClick={toggleView} className={style.span}>
              Register
            </span>
          </p>
          <Magnetic>
            <Link href="/">
              <FontAwesomeIcon icon={faHome} className={style.home} />
            </Link>
          </Magnetic>
        </div>
      )}
    </>
  );
};
