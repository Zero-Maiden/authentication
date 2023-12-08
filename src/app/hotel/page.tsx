"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header/Header";
import Divider from "@/components/Divider/Divider";

import style from "./style.module.scss";
import Hotel from "@/components/Hotel/Hotel";
import MarqueeRtoL from "@/components/Marquee/MarqueeRtoL";
import MarqueeLtoR from "@/components/Marquee/MarqueeLtoR";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to /guest if token is not present
      router.push("/guest");
    }
  }, []);

  return (
    <div className={style.container}>
      <MarqueeRtoL />
      <Divider />
      <Header />
      <Divider />
      <Hotel />
      <Divider />
      <Header />
      <Divider />
      <MarqueeLtoR />
    </div>
  );
}
