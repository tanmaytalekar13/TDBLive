import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../../store/actions/tvActions";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import Loading from "../Loading";
import HorizontalCards from "./HorizontalCards";
import { Outlet } from "react-router-dom";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const info = useSelector((state) => state.tv.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  const backgroundImage = info?.detail?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`
    : 'default-backdrop-path';
  
  const posterImage = info?.detail?.poster_path || info?.detail?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`
    : 'default-poster-path';

  return info && info.detail ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[180vh] px-[10%]"
    >
      {/* part-1 Navigation */}
      <nav className="w-full text-zinc-100 h-[10vh] flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        {info.detail.homepage && (
          <a target="_blank" rel="noopener noreferrer" href={info.detail.homepage}>
            <i className="ri-external-link-fill"></i>
          </a>
        )}
        {info.externalid?.wikidata_id && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-earth-fill"></i>
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          >
            IMDB
          </a>
        )}
      </nav>

      {/* part-2 poster and detail */}
      <div className="w-full flex gap-y-5 mt-10">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover"
          src={posterImage}
          alt={info.detail.title}
        />
        <div className="content ml-20">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              ({info.detail.first_air_date ? info.detail.first_air_date.split('-')[0] : 'Year not available'})
            </small>
          </h1>
          <div className="mt-3 mb-10 flex items-center gap-x-5 gap-y-10">
            <span className='rounded-full bg-yellow-500 font-semibold text-xl w-[5vh] h-[5vh] flex justify-center items-center text-white'>
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">User Score</h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className="text-xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>
          <h1 className="text-2xl mb-3 mt-5">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mb-3 mt-5">Tv Translated</h1>
          <p className="mb-10">{info.translations ? info.translations.join(", ") : 'Translations not available'}</p>

          <Link className="p-5 bg-[#6556CD] rounded-lg" to={`${pathname}/trailer`}>Play Trailer</Link>
        </div>
      </div>
      
      {/* part-3 Available on */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        <div className="mt-5">
          {info.watchproviders?.flatrate && (
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

          {info.watchproviders?.rent && (
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

          {info.watchproviders?.buy && (
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

      {/* part-4 Seasons */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-bold">Seasons</h1>
      <div className='w-[100%] flex overflow-y-hidden mb-5 p-5'>
      
          {info.detail.seasons?.length > 0 ? (
            info.detail.seasons.map((s, i) => (
              <div key={i} className="w-[15vh] mr-[8%]">
                <img 
                  src={`https://image.tmdb.org/t/p/original${s.poster_path}`} 
                  className='h-[30vh] object-cover shadow-[8px_17px_38px_2px_rgb(0,0,0,0.5)] min-w-[14vw]' 
                />
                <h1 className='text-2xl font-black text-white mt-3'>
                  {s.title || s.name || s.original_name || s.original_title || 'No Title'}
                </h1>
              </div>
            ))
          ) : (
            <p className='text-white'>No seasons available.</p>
          )}
       
      </div>

      
      {/* part-5 recommendations and similar stuff*/}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500"/>
      <h1 className="text-3xl font-bold">Recommendations & similar stuff</h1>
      <HorizontalCards data={info.recommendations ? info.recommendations : info.similar}/>

      <Outlet/>
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
