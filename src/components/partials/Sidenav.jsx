import React from 'react';

import { Link } from 'react-router-dom';

const Sidenav = () => {

  return (
    <div className='w-[20%] h-full border-r-2 border-zinc-200 p-10'>
        <h1 className='text-2xl text-white font-bold'>
            <i className="text-[#6556CD] ri-tv-fill text-2xl"></i>
            <span > TDB.</span>
        </h1>
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
            <h1 className='text-white font-semibold text-xl mt-10 mb-5'>New Feeds</h1>
            <Link to='/trending' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>🔥 Trending</Link>
            <Link to='/popular' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>⭐️ Popular</Link>
            <Link to='/movie' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>🍿 Movies</Link>
            <Link to='/tv' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>📺 Tv Shows</Link>
            <Link to='/person' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>👨‍🦰👩‍🦰 People</Link>
        </nav>
        <hr className='border-none h-[1px] bg-zinc-400'/>
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
            <h1 className='text-white font-semibold text-xl mt-10 mb-5'>Website Information</h1>
            <Link className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>ⓘ About</Link>
            <Link className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5'>📧 Contact</Link>
        </nav>
    </div>
  )
}

export default Sidenav