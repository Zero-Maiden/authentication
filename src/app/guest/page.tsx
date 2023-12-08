"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Login } from "@/components/Login/Login";
import { Register } from "@/components/Register/Register";

import style from "./style.module.scss";

export default function page() {
  const [showLogin, setShowLogin] = useState(true);
  const route = useRouter();

  const toggleView = () => {
    setShowLogin(!showLogin);
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  useEffect(() => {
    if (isAuthenticated()) {
      route.push("/");
    }
  }, []);

  return <div className={style.container}>{showLogin ? <Login toggleView={toggleView} /> : <Register toggleView={toggleView} />}</div>;
}
