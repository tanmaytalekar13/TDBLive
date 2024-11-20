import React from 'react';
import { Link } from 'react-router-dom';
import noimage from '/noImage.jpg';
const Cards = ({ data, title }) => {
  console.log(data);
  return (
    <div className='flex flex-wrap w-full h-full px-[4%] bg-[#27272A]'>
      {data.map((c, i) => (
        <Link 
          to={`/${c.media_type || title}/details/${c.id}`} 
          key={i} 
          className='relative w-[25vh] mr-[5%] mb-[5%]'
        >
          <img 
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' 
            src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path}`:noimage} 
            alt={c.name || c.title || c.original_title || c.original_name} 
          />
          <h1 className='w-full text-xl font-black text-white mt-2 opacity-80'>
            {c.name || c.title || c.original_title || c.original_name}
          </h1>
          {c.vote_average && (
            <div className='absolute right-[-10%] bottom-[25%] rounded-full bg-yellow-500 font-semibold text-xl w-[5vh] h-[5vh] flex justify-center items-center text-white'>
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
