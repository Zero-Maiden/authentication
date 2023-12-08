"use client";

import style from "./style.module.scss";

import Header from "@/components/Header/Header";
import Divider from "@/components/Divider/Divider";
import Content from "@/components/Content/Content";
import MarqueeRtoL from "@/components/Marquee/MarqueeRtoL";
import MarqueeLtoR from "@/components/Marquee/MarqueeLtoR";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to /guest if token is not present
      router.push("/guest");
    }
  }, []); // Run this effect only once, on initial render

  return (
    <div className={style.home}>
      <MarqueeRtoL />
      <Divider />
      <Header />
      <Divider />
      <Content />
      <Divider />
      <Header />
      <Divider />
      <MarqueeLtoR />
    </div>
  );
}
