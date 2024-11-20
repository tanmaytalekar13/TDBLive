import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../../store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import HorizontalCards from "./HorizontalCards";
import DropDown from "./DropDown";

const PersonDetails = () => {
  document.title = "SCSDB | Person Details";
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const info = useSelector((state) => state.person.info);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  return info && info.detail && info.externalid ? (
    <div className="px-[10%] w-screen h-[150vh] bg-[#27272A]">
      {/* part-1 */}
      <nav className="w-full text-zinc-100 h-[10vh] flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* part-2 poster && details */}
        <div className="w-[25%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt={`${info.detail.name}`}
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          {/* social media */}
          <div className="text-2xl flex gap-x-5">
            {info.externalid.wikidata_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="ri-earth-fill"></i>
              </a>
            )}
            {info.externalid.facebook_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}
            {info.externalid.instagram_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}
            {info.externalid.twitter_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.twitter.com/${info.externalid.twitter_id}`}
              >
                <i className="ri-twitter-fill"></i>
              </a>
            )}
          </div>
          {/* personal information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">Person Info</h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Known For</h1>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-zinc-400">{info.detail.gender === '2' ? 'Male' : 'Female'}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>
          {info.detail.deathday && (
            <div>
              <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday</h1>
              <h1 className="text-zinc-400">{info.detail.deathday}</h1>
            </div>
          )}
          <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">Place of Birth</h1>
          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">Also known as</h1>
          <ul>
            {info.detail.also_known_as.map((name, index) => (
              <li key={index} className="text-zinc-400">{name}</li>
            ))}
          </ul>
        </div>
        
        {/* part-3 right details and information */}
        <div className="w-[75%] ml-[5%] ">
          <h1 className="text-6xl text-zinc-400 font-black my-5">{info.detail.name}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Biography</h1>
          <p className="text-zinc-400">{info.detail.biography}</p>
          <h1 className="text-lg text-zinc-400 font-semibold mt-5">Know for</h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">
              Acting
            </h1>
            <DropDown title="Category" options={["tv", "movie"]} func={(e) => setCategory(e.target.value)} />
          </div>
          <div className="list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5 mt-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white duration-300 cursor-pointer p-5 rounded hover:bg-zinc-900">
                <Link to={`/${category}/details/${c.id}`} className="">
                  <span className="inline">{c.name || c.title || c.original_name || c.original_title}</span>
                  <span className="ml-5 block ">
                    {c.character && `Character name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
