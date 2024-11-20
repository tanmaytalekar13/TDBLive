import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import noimage from '/noImage.jpg';

const Topnav = () => {
  const [query, setQuery] = useState('');
  const [searches, setSearches] = useState([]);

  const GetSearch = async () => {
    if (!query) {
      setSearches([]);
      return;
    }

    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    GetSearch();
  }, [query]);

  return (
    <div className='w-[80%] h-[10vh] relative flex items-center ml-[20%] z-50'>
      <i className='text-zinc-400 text-3xl ri-search-line'></i>

      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className='w-[50%] text-zinc-200 mx-10 p-5 text-xl outline-none border-none bg-transparent'
        type='text'
        placeholder='search anything'
      />

      {query.length > 0 && (
        <i onClick={() => setQuery('')} className='text-zinc-400 text-3xl ri-close-fill'></i>
      )}

      {query.length > 0 && (
        <div className='absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] left-[7%] overflow-x-auto'>
          {searches.map((s, i) => {
            const imageUrl = s.poster_path
              ? `https://image.tmdb.org/t/p/original${s.poster_path}`
              : s.profile_path
              ? `https://image.tmdb.org/t/p/original${s.profile_path}`
              : noimage;

            return (
              <Link
                to={`/${s.media_type}/details/${s.id}`} 
                key={i}
                className='hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100'
              >
                <img
                  className='w-[10vh] h-[10vh] object-cover rounded mr-10 shadow-lg'
                  src={imageUrl}
                  alt={s.title || s.name || 'No Image'}
                />
                <span>{s.title || s.name || s.original_name || s.original_title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Topnav;
