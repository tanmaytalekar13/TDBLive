import React from 'react';
import { Link } from 'react-router-dom';
import noimage from '/noImage.jpg';
const HorizontalCards = ({ data }) => {
  return (
    <div className='w-[100%] flex overflow-x-auto overflow-y-hidden mb-5 p-5'>
      {data.length > 0 ?  data.map((d, i) => (
        <Link 
          to={`/${d.media_type}/details/${d.id}`} 
          key={i} 
          className='min-w-[17%] mr-5 h-[37vh] bg-zinc-900'
        >
          <img

            src={ d.backdrop_path || d.poster_path ? `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path} ` : noimage} 
            alt={d.title || d.name || 'No Title'} 
            className='w-full h-[55%] object-cover' 
          />
          <div className='p-2 h-[45%]'>
            <h1 className='w-[70%] text-xl font-black text-white'>
              {d.title || d.name || d.original_name || d.original_title || 'No Title'}
            </h1>
            <p className='text-zinc-200 mb-3 mt-3'>
              {d.overview ? `${d.overview.slice(0, 50)}...` : 'No Overview'} <span className='text-blue-500'>more</span>
            </p>
          </div>
        </Link>
      )):<h1 className='text-3xl text-white text-center mt-5'>Nothing to Show</h1>}
    </div>
  );
};

export default HorizontalCards;
