import React from "react";
import Header from "@/components/Header/Header";
import Divider from "@/components/Divider/Divider";

import style from "./style.module.scss";
import Hotel from "@/components/Hotel/Hotel";
import MarqueeRtoL from "@/components/Marquee/MarqueeRtoL";
import MarqueeLtoR from "@/components/Marquee/MarqueeLtoR";

export default function page() {
  return (
    <div className={style.container}>
      <MarqueeRtoL />
      <Header />
      <Divider />
      <Hotel />
      <Divider />
      <Header />
      <MarqueeLtoR />
    </div>
  );
}
