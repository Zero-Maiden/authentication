"use client";

import React from "react";
import { useState } from "react";

import { Login } from "@/components/Login/Login";
import { Register } from "@/components/Register/Register";

import style from "./style.module.scss";

export default function page() {
  const [showLogin, setShowLogin] = useState(true);
  const toggleView = () => {
    setShowLogin(!showLogin);
  };
  return <div className={style.container}>{showLogin ? <Login toggleView={toggleView} /> : <Register toggleView={toggleView} />}</div>;
}
