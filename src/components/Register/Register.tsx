"use client";

import React from "react";
import { useRef, useState, useEffect, RefObject } from "react";
import { useRouter } from "next/navigation";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHome, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faAt, faUser, faLock } from "@fortawesome/free-solid-svg-icons";

// Styling
import style from "./style.module.scss";

// Connect ke back-end Laravel
import { Axios } from "@/api/Axios";
import Magnetic from "../Animation/Magnetic/Magnetic";
import Link from "next/link";
const REGISTER_URL = "/api/user/register";

const EMAIL_REGEX: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{1,})?$/;
const USERNAME_REGEX: RegExp = /^[A-Za-z0-9]{4,16}$/;
const PASSWORD_REGEX: RegExp = /^[A-Za-z0-9]{8,32}$/;

interface LoginProps {
  toggleView: () => void;
}

export const Register: React.FC<LoginProps> = ({ toggleView }) => {
  const router = useRouter();

  const userRef = useRef<HTMLInputElement>(null);
  const errorRef: RefObject<HTMLParagraphElement> = useRef(null);

  // Email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // Username
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // Password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // Match password
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  // Error message
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Field in focus
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  // Email validation
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  // Username validation
  useEffect(() => {
    const result = USERNAME_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  // Password validation
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatchPassword(match);
  }, [password, matchPassword]);

  // Error message
  useEffect(() => {
    setErrorMessage("");
  }, [user, password, matchPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If button enabled with JavaScript hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = USERNAME_REGEX.test(user);
    const v3 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrorMessage("Invalid entry!");
      return;
    }
    try {
      const response = await Axios.post(REGISTER_URL, JSON.stringify({ name: user, email, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      console.log(JSON.stringify(response));

      setSuccess(true);

      // Kosongkan field setelah registrasi
      setEmail("");
      setUser("");
      setPassword("");
      setMatchPassword("");
    } catch (error) {
      if (!error.response) {
        setErrorMessage("Tidak ada respon dari server!");
      } else if (error.response?.status === 409) {
        setErrorMessage("Username sudah ada!");
      } else {
        setErrorMessage("Registrasi gagal!");
      }
      errorRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        router.push("/")
      ) : (
        <div className={style.register}>
          <h1 className={style.title}>Register</h1>
          {/* Main content */}
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
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  placeholder="Email"
                  className={style.input}
                />
                <div className={style.verticaldivider}></div>
                <label htmlFor="email" className={style.label}>
                  {validEmail ? (
                    <span className={style.valid}>
                      <FontAwesomeIcon icon={faCheck} className={style.icon} style={{ color: "#54cc52" }} />
                    </span>
                  ) : (
                    <span className={!email ? style.hide : style.invalid}>
                      <FontAwesomeIcon icon={faXmark} className={style.icon} style={{ color: "#ea4335" }} />
                    </span>
                  )}
                </label>
              </div>
              <p id="emailnote" className={!emailFocus || validEmail || !email ? style.offscreen : style.instruction}>
                <FontAwesomeIcon icon={faInfoCircle} /> 4-32 karakter.
                <br />
                <FontAwesomeIcon icon={faInfoCircle} /> Hanya A-Z, a-z, 0-9 dan @ yang diperbolehkan.
              </p>

              {/* Username */}
              <div className={style.field}>
                <label htmlFor="username" className={style.label}>
                  <FontAwesomeIcon icon={faUser} className={style.icon} />
                </label>
                <div className={style.verticaldivider}></div>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  placeholder="Username"
                  className={style.input}
                />
                <div className={style.verticaldivider}></div>
                <label htmlFor="username" className={style.label}>
                  {validName ? (
                    <span className="valid">
                      <FontAwesomeIcon icon={faCheck} className={style.icon} style={{ color: "#54cc52" }} />
                    </span>
                  ) : (
                    <span className={!user ? style.hide : style.invalid}>
                      <FontAwesomeIcon icon={faXmark} className={style.icon} style={{ color: "#ea4335" }} />
                    </span>
                  )}
                </label>
              </div>
              <p id="uidnote" className={!userFocus || validName || !user ? style.offscreen : style.instruction}>
                <FontAwesomeIcon icon={faInfoCircle} /> 4-16 karakter.
                <br />
                <FontAwesomeIcon icon={faInfoCircle} /> Hanya A-Z, a-z, dan 0-9 yang diperbolehkan.
              </p>

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
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  placeholder="Password"
                  className={style.input}
                />
                <div className={style.verticaldivider}></div>
                <label htmlFor="password" className={style.label}>
                  {validPassword ? (
                    <span className="valid">
                      <FontAwesomeIcon icon={faCheck} className={style.icon} style={{ color: "#54cc52" }} />
                    </span>
                  ) : (
                    <span className={!password ? style.hide : style.invalid}>
                      <FontAwesomeIcon icon={faXmark} className={style.icon} style={{ color: "#ea4335" }} />
                    </span>
                  )}
                </label>
              </div>
              <p id="pwdnote" className={!passwordFocus || validPassword || !password ? style.offscreen : style.instruction}>
                <FontAwesomeIcon icon={faInfoCircle} /> 8-32 karakter.
                <br />
                <FontAwesomeIcon icon={faInfoCircle} /> Hanya A-Z, a-z, dan 0-9 yang diperbolehkan.
              </p>

              {/* Confirm password */}
              <div className={style.field}>
                <label htmlFor="confirmpassword" className={style.label}>
                  <FontAwesomeIcon icon={faLock} className={style.icon} />
                </label>
                <div className={style.verticaldivider}></div>
                <input
                  type="password"
                  id="confirmpassword"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  required
                  aria-invalid={validMatchPassword ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchPasswordFocus(true)}
                  onBlur={() => setMatchPasswordFocus(false)}
                  placeholder="Password"
                  className={style.input}
                />
                <div className={style.verticaldivider}></div>
                <label htmlFor="confirmpassword" className={style.label}>
                  {validMatchPassword && matchPassword ? (
                    <span className={style.valid}>
                      <FontAwesomeIcon icon={faCheck} className={style.icon} style={{ color: "#54cc52" }} />
                    </span>
                  ) : (
                    <span className={!matchPassword ? style.hide : style.invalid}>
                      <FontAwesomeIcon icon={faXmark} className={style.icon} style={{ color: "#ea4335" }} />
                    </span>
                  )}
                </label>
              </div>
              <p id="confirmnote" className={!matchPasswordFocus || validMatchPassword || !matchPassword ? style.offscreen : style.instruction}>
                <FontAwesomeIcon icon={faInfoCircle} /> Harus sama dengan password inputan diatas.
              </p>

              <button className={style.button} disabled={!validEmail || !validName || !validPassword || !validMatchPassword ? true : false}>
                Register
              </button>
            </form>
          </div>
          <p className={style.p}>
            Sudah punya akun?{" "}
            <span onClick={toggleView} className={style.span}>
              Login
            </span>
          </p>
          <Magnetic>
            <Link href="/guest">
              <FontAwesomeIcon icon={faHome} className={style.home} />
            </Link>
          </Magnetic>
        </div>
      )}
    </>
  );
};
