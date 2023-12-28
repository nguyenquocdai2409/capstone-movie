import React from "react";
import Carousel from "./Carousel/Carousel";
import DetailMovie from "./DetailMovie/DetailMovie";
import TabsMovie from "./TabsMovie/TabsMovie";
import Footer from "../../components/Footer";
import FeaturesMovie from "./FeaturesMovie/FeaturesMovie";
import LatestNew from "./LatestNew/LatestNew";
import { FloatButton } from "antd";

export default function Home() {
  return (
    <div className='space-y-20'>
      <Carousel />
      <FeaturesMovie />
      <DetailMovie />
      <TabsMovie />
      <LatestNew />
      <Footer />
      <FloatButton.BackTop
        shape='square'
        icon={
          <i className='fa-solid fa-arrow-up hover:text-white duration-300'></i>
        }
        className=' hover:bg-orange-500 duration-300'
      />
    </div>
  );
}
