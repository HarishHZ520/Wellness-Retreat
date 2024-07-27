/* eslint-disable @next/next/no-img-element */
import React from 'react'

const About = () => {
    return (
        <div className='hidden md:flex flex-col justify-start items-start w-11/12 h-[400px] border bg-[#e0d9cf] rounded-lg p-5 m-auto my-5'>
            <div className='w-full h-3/4'>
                <img
                    src='/media/about.jpg'
                    alt='about'
                    className='w-full h-full object-cover rounded-lg'
                />
            </div>
            <div className='py-5'>
                <p className='text-2xl pb-1'>Discover Your Inner Peace</p>
                <p className='text-base'>Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.</p>
            </div>
        </div>
    )
}

export default About
