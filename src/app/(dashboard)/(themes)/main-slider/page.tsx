import React from "react";
import SlideList from "../_components/SlideList";
import { getAllSwiperData } from "@/services/swiper.service";

const MainSliderPage = async () => {
  return (
    <div className="bg-white dark:bg-darkBlue p-2 rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
        <SlideList />
      </div>
    </div>
  );
};

export default MainSliderPage;
