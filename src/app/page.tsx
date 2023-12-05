import Link from "next/link";

import style from "./style.module.scss";

import Header from "@/components/Header/Header";
import Divider from "@/components/Divider/Divider";
import Content from "@/components/Content/Content";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className={style.home}>
      <Header />
      <Divider />
      <Content />
      <Divider />
      <Footer />
    </div>
  );
}