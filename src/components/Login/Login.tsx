import React from "react";
import { useRef, useState, useEffect, useContext, RefObject } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { Axios } from "@/api/Axios";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

// Styling
import style from "./style.module.scss";

const LOGIN_URL = "/";

interface LoginProps {
  toggleView: () => void;
}

export const Login: React.FC<LoginProps> = ({ toggleView }) => {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef<HTMLInputElement>(null);
  const errorRef: RefObject<HTMLParagraphElement> = useRef(null);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user, password);
    setUser("");
    setPassword("");
    setSuccess(true);
  };

  return (
    <div className={style.login}>
      <h1 className={style.title}>Login</h1>
      <div className={style.formcontainer}>
        <p ref={errorRef} className={errorMessage ? style.errormessage : style.offscreen} aria-live="assertive">
          {errorMessage}
        </p>
        <form onSubmit={handleSubmit} className={style.form}>
          {/* Username */}
          <div className={style.field}>
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} className="icon" />
            </label>
            <div className="vertical-divider"></div>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              placeholder="Username"
            />
          </div>

          {/* Password */}
          <div className="field">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} className="icon" />
            </label>
            <div className="vertical-divider"></div>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required placeholder="Password" />
          </div>

          {/* Button */}
          <button className="button">Login</button>
        </form>
      </div>
      <p className={style.p}>
        Tidak punya akun?{" "}
        <span onClick={toggleView} className={style.span}>
          Register
        </span>
      </p>
    </div>
  );
};
