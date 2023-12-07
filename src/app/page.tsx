import Link from "next/link";

import style from "./style.module.scss";

import Header from "@/components/Header/Header";
import Divider from "@/components/Divider/Divider";
import Content from "@/components/Content/Content";
import MarqueeRtoL from "@/components/Marquee/MarqueeRtoL";
import MarqueeLtoR from "@/components/Marquee/MarqueeLtoR";

export default function Home() {
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
