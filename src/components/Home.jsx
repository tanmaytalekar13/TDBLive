import React, { useState, useEffect } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import DropDown from "./partials/DropDown";
import Loading from "./Loading";

const Home = () => {
  document.title = "TDB | HomePage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const {data} = await axios.get(`/trending/all/day`);
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()]
      setWallpaper(randomdata);
    } catch (error) {
      console.log(error);
    }
  }

  const GetTrending = async () => {
    try {
      const {data} = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetTrending();
    if (!wallpaper) {
      GetHeaderWallpaper();
    }
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-x-hidden overflow-y-auto">
        <Topnav />
        <Header data={wallpaper} />
        <div className='p-5 flex justify-between'>
          <h1 className='text-3xl font-semibold text-zinc-300'>Trending</h1>
          <DropDown title="Filter" options={["tv", "movie", "all"]} func={(e) => setCategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  )
};

export default Home;
