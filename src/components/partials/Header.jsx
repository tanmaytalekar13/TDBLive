import React from 'react';
import { Link } from 'react-router-dom';
const Header = ({ data }) => {
    console.log(data);
    console.log(data.release_date);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="w-full h-[50vh] flex-col justify-end p-[14%] items-center "
    >
    <h1 className='w-[70%] font-black text-4xl text-white opacity-80'>{data.title || data.name || data.original_name || data.original_title}</h1>
    <p className='w-[70%] text-white opacity-70 mt-3 mb-3'>{data.overview.slice(0,200)}...<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-600 cursor-pointer'>more</Link></p>
   
    <p className="text-white mb-4">
      <i className="text-yellow-600 ri-megaphone-fill"></i>{" "}{data.release_date || data.first_air_date}
        <i className="ml-5 text-yellow-600 ri-album-fill"></i>{" "}  
        {data.media_type.toUpperCase()} 
    
    </p>
    <Link to={`/${data.media_type}/details/${data.id}/trailer`} className=' bg-[#6556CD] p-4 rounded text-white shadow font-semibold '>Watch Trailer</Link>
    
    </div>
  );
};

export default Header;
