import React, { useRef, useState, useEffect, RefObject } from "react";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faHome, faLock } from "@fortawesome/free-solid-svg-icons";

import style from "./style.module.scss";

import { Axios } from "@/api/Axios";
const LOGIN_URL = "/api/user/login";

import Magnetic from "../Animation/Magnetic/Magnetic";
import Link from "next/link";

interface LoginProps {
  toggleView: () => void;
}

export const Login: React.FC<LoginProps> = ({ toggleView }) => {
  const route = useRouter();

  const userRef = useRef<HTMLInputElement>(null);
  const errorRef: RefObject<HTMLParagraphElement> = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [token, setToken] = useState("");

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

      const responseData = response.data;
      if (responseData.status === 200) {
        const authToken = responseData.token;
        setToken(authToken);

        setEmail("");
        setPassword("");
        setSuccess(true);
      }
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

  useEffect(() => {
    if (token) {
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("token", token);

      route.push("/");
    }
  }, [token]);

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
