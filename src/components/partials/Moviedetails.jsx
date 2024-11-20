import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../../store/actions/movieActions";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import Loading from "../Loading";
import HorizontalCards from "./HorizontalCards";
import { Outlet } from "react-router-dom";
const Moviedetails = () => {
   const {pathname}= useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const info = useSelector((state) => state.movie.info);
  const dispatch = useDispatch();
  console.log(info);
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[140vh] px-[10%]"
    >
      {/* part-1 Navigation */}
      <nav className="w-full text-zinc-100 h-[10vh] flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" rel="noopener noreferrer" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          IMDB
        </a>
      </nav>
      
      {/* part-2 poster and detail */}
      <div className="w-full flex gap-y-5 mt-10">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt={info.detail.title}
          
        />
        part-2 
        <div className="content ml-20" >
            <h1 className="text-5xl font-black text-white">
                {  info.detail.name||
                    info.detail.title ||
                    info.detail.original_name ||
                    info.detail.original_title
                }
                <small className="text-2xl font-bold text-zinc-300"> 
                    ({info.detail.release_date.split('-')[0]})
                </small>
            </h1>
            <div className="mt-3 mb-10 flex items-center gap-x-5 gap-y-10">
                <span className='rounded-full bg-yellow-500 font-semibold text-xl w-[5vh] h-[5vh] flex justify-center items-center text-white'>
                {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
                </span>
                <h1 className="w-[60px] font-semibold text-2xl leading-6">User Score</h1>
                <h1>{info.detail.release_date}</h1>
                <h1>
                    {info.detail.genres.map((g)=>g.name).join(",")}
                </h1>
                <h1>{info.detail.runtime}min</h1>
            </div>
            <h1 className="text-xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>
            <h1 className="text-2xl mb-3 mt-5">Overview</h1>
            <p>{info.detail.overview}</p>

            <h1 className="text-2xl mb-3 mt-5">Movie Translated</h1>
            <p className="mb-10">{info.translations.join(", ")}</p>

            <Link  className=" p-5 bg-[#6556CD] rounded-lg" to={`${pathname}/trailer`}>Play Trailer</Link>
        </div>
      </div>
      {/* part-3  Available on */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        <div className="mt-5">
          {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-5 items-center text-white mt-5">
              <h1>Available On Platform</h1>
              {info.watchproviders.flatrate.map((w) => (
                <img
                  title={w.provider_name}
                  key={w.provider_id}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-5 items-center text-white mt-5">
              <h1>Available On Rent</h1>
              {info.watchproviders.rent.map((w) => (
                <img
                  title={w.provider_name}
                  key={w.provider_id}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )}

          {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-x-5 items-center text-white mt-5">
              <h1>Available to Buy </h1>
              {info.watchproviders.buy.map((w) => (
                <img
                  title={w.provider_name}
                  key={w.provider_id}
                  className="w-[5vh] h-[5vh] object-cover rounded-md"
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                  alt={w.provider_name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
        {/* part-4 recommendations and similar stuff*/}
        <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500"/>
     <h1 className="text-3xl font-bold">Recommendations & smilar stuff</h1>
      
      <HorizontalCards data={info.recommendations ? info.recommendations : info.similar}/>
      
          <Outlet/>


    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
