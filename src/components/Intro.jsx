'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import PrevArrow from './prevArrow';
import NextArrow from './nextArrow';

const Intro = () => {

    const settings = {
        dots: true,
        dotsClass:"intro-dots",
        customPaging: () => {
            return <div className="intro-slider-dot"></div>;
        },
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <div className='slider__carousel relative overflow-hidden'>
            <Slider {...settings}>
                <div className='relative bg-hero-1 bg-no-repeat bg-cover h-[800px]'>
                    <div className="over absolute w-full h-full z-[2] bg-primary bg-opacity-40 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="text-slider flex cursor-default flex-col items-center absolute z-10 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                        <h1 className='text-white text-3xl md:text-4xl text-center font-bold mb-6'>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                        <h2 className="text-2xl md:text-3xl font-bold my-2 text-center leading-9 text-white">قلْ لَئِنِ اجْتَمَعَتِ الْإِنْس وَالْجِنّ عَلَى أَنْ يَأْتوا بِمِثْلِ هَذَا الْقرْآنِ لَا يَأْتونَ بِمِثْلِهِ وَلَوْ كَانَ بَعْضهمْ لِبَعْضٍ ظَهِيرًا</h2>
                        <p className='text-gray-200'>&quot;الإسراء 88&quot;</p>
                    </div>
                </div>
                <div className='relative bg-hero-2 bg-no-repeat bg-cover h-[800px]'>
                    <div className="over absolute w-full h-full z-[2] bg-primary bg-opacity-40 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="text-slider flex cursor-default flex-col items-center absolute z-10 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                        <h1 className='text-white text-3xl md:text-4xl text-center font-bold mb-6'>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                        <h2 className="text-2xl md:text-3xl font-bold my-2 text-center leading-9 text-white">الر ۚ كِتَابٌ أَنْزَلْنَاه إِلَيْكَ لِتخْرِجَ النَّاسَ مِنَ الظّلمَاتِ إِلَى النّورِ بِإِذْنِ رَبِّهِمْ إِلَى صِرَاطِ الْعَزِيزِ الْحَمِيدِ</h2>
                        <p className='text-gray-200'>&quot;إبراهيم 1&quot;</p>
                    </div>
                </div>
                <div className='relative bg-hero-3 bg-no-repeat bg-cover h-[800px]'>
                    <div className="over absolute w-full h-full z-[2] bg-primary bg-opacity-40 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="text-slider flex cursor-default flex-col items-center absolute z-10 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                        <h1 className='text-white text-3xl md:text-4xl text-center font-bold mb-6'>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                        <h2 className="text-2xl md:text-3xl font-bold my-2 text-center leading-9 text-white"> يَا أَيّهَا النَّاس قَدْ جَاءَكمْ برْهَانٌ مِنْ رَبِّكمْ وَأَنْزَلْنَا إِلَيْكمْ نورًا مبِينًا </h2>
                        <p className='text-gray-200'>&quot;النساء 174&quot;</p>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default Intro;
