'use client'
import Hls from 'hls.js';
import React, { useEffect, useState } from 'react';

const Live = () => {
    const API_URL = "https://mp3quran.net/api/v3";
    const lang = "ar";
    const live = "/live-tv"

    const [livedata, setLivedata] = useState([])


    useEffect(() => {
        fetch(`${API_URL}${live}?language=${lang}`)
            .then(res => res.json())
            .then(data => setLivedata(data.livetv))
    },[])

    console.log(livedata)

    const playLive = (url) => {
        if (Hls.isSupported()) {
            var video = document.getElementById('live-video');
            var hls = new Hls();
            hls.loadSource(`${url} `);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        }
    }





    return (
        <div className="py-16 live">
            <div className="container m-auto">
                <h1 className="text-3xl font-bold text-center mb-4">البث المباشر</h1>
                <p className="text-lg text-center">
                    انضم الي احدي القنوات لبدء البث المباشر
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8">
                    {livedata?.map(data => (
                        <button value={data?.url} onClick={
                            e => {
                                playLive(e.target.value)
                            }
                        } className='py-2 px-3 first-line:text-xl font-bold bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary dark:hover:border-white dark:hover:text-white transition-all'>
                            {data.name}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center mt-8">
                    <video id="live-video" className='w-full' controls>
                        <source src="" type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    );
}

export default Live;
