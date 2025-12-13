import React from "react";
import dynamic from "next/dynamic";
import "../styles/fonts.css";

import Header from "@/components/header/Header";
import Brings from "@/components/bring/Brings";
import Effect from "@/components/effect-symp/Effect";
import Best from "@/components/best/Best";
import Faq from "@/components/faq/Faq";
import Swiper from "@/components/swiper/Swiper";

// const Brings = dynamic(() => import("@/components/bring/Brings"), {
//   loading: () => (
//     <div style={{ height: "50vh", textAlign: "center", paddingTop: "100px" }}>
//       Yuklanmoqda...
//     </div>
//   ),
// });

// const Effect = dynamic(() => import("@/components/effect-symp/Effect"), {
//   loading: () => (
//     <div style={{ height: "50vh", textAlign: "center", paddingTop: "100px" }}>
//       Yuklanmoqda...
//     </div>
//   ),
// });

// const Best = dynamic(() => import("@/components/best/Best"), {
//   loading: () => (
//     <div style={{ height: "50vh", textAlign: "center", paddingTop: "100px" }}>
//       Yuklanmoqda...
//     </div>
//   ),
// });

// const SaleSection = dynamic(() => import("@/components/swiper/Swiper"), {
//   loading: () => (
//     <div style={{ height: "50vh", textAlign: "center", paddingTop: "100px" }}>
//       Yuklanmoqda...
//     </div>
//   ),
// });

// const Faq = dynamic(() => import("@/components/faq/Faq"), {
//   loading: () => (
//     <div style={{ height: "50vh", textAlign: "center", paddingTop: "100px" }}>
//       Yuklanmoqda...
//     </div>
//   ),
// });

const Page = () => {
  return (
    <div>
      <Header />

      <Brings />
      <Effect />
      <Best />
      <Swiper />
      <Faq />
    </div>
  );
};

export default Page;
