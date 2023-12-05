import React from "react";
import Header from "@/components/Header/Header";
import Divider from "@/components/Divider/Divider";

import style from "./style.module.scss";
import Hotel from "@/components/Hotel/Hotel";
import Footer from "@/components/Footer/Footer";

export default function page() {
  return (
    <div className={style.container}>
      <Header />
      <Divider />
      <Hotel />
      <Divider />
      <Footer />
    </div>
  );
}
