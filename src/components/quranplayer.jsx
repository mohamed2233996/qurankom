"use client";

import React, { useEffect, useState } from 'react';

const Quranplayer = () => {
    const API_URL = "https://mp3quran.net/api/v3";
    const reciters = "/reciters";
    const suwar = "/suwar";
    const tadabor = "/tadabor";
    const riwayat = "/riwayat";
    const lang = "ar";

    const [recitersData, setRecitersData] = useState([]);
    const [choosereciter, setChoosereciter] = useState('');
    const [riwayatData, setRiwayatData] = useState([]);
    const [chooseriwayat, setChooseriwayat] = useState('');
    const [suwarData, setSuwarData] = useState([]);
    const [choosesuwar, setChoosesuwar] = useState('');
    const [suwarendList, setsuwarendList] = useState([]);
    const [suwaInfoshow, setSuwaInfoshow] = useState(false);



    useEffect(() => {
        // Fetch reciters data from API
        let res = fetch(`${API_URL}${reciters}?language=${lang}`);
        res.then(response => response.json())
            .then(data => setRecitersData(data.reciters));
    }, []);


    useEffect(() => {
        // Fetch riwayat data from API
        let res = fetch(`${API_URL}${reciters}?language=${lang}&reciter=${choosereciter}`);
        res.then(response => response.json())
            .then(data => setRiwayatData(data.reciters[0].moshaf));

    }, [choosereciter]);


    useEffect(() => {
        const chooseRewayat = document.querySelector("#chooseRewayat");
        const selectedMoshaf = chooseRewayat?.options[chooseRewayat.selectedIndex]
        const server = selectedMoshaf?.dataset.server;
        let suwarlist = selectedMoshaf?.dataset.suwarlist;
        getSurah(server, suwarlist)
    }, [choosereciter, chooseriwayat]);


    const getSurah = (server, suwarlist) => {
        setSuwarData([]);
        setsuwarendList([])
        // Fetch suwar data from API
        let res = fetch(`${API_URL}${suwar}?language=${lang}`);
        res.then(response => response.json())
            .then(data => setSuwarData(data.suwar));
        suwarlist = suwarlist?.split(',')
        const suwarlistData = []

        suwarlist?.forEach(suwarL => {
            const badsuwar = suwarL.padStart(3, '0')
            suwarData?.forEach(suwar => {
                if (suwar.id == suwarL) {
                    suwarlistData.push({
                        id: suwar.id,
                        name: suwar.name,
                        value: server + badsuwar + ".mp3"
                    })
                }
            })
        })
        setsuwarendList(suwarlistData)
    }


    const playSura = (server) => {
        const audio = document.querySelector("#audioPlayer");
        audio.src = server;
        audio.play();
    }

    const suwrainfo = () => {
        const suraInfo = document.querySelector("#suraInfo");
        const chooseReciter = document.querySelector("#chooseReciter");
        const selectedReciter = chooseReciter?.options[chooseReciter.selectedIndex]

        const chooseRewayat = document.querySelector("#chooseRewayat");
        const selectedMoshaf = chooseRewayat?.options[chooseRewayat.selectedIndex]

        const chooseSurah = document.querySelector("#chooseSurah");
        const selectedSurah = chooseSurah?.options[chooseSurah.selectedIndex]


        selectedSurah.value ?
            suraInfo.innerHTML =
            `<div class="transition flex gap-4 flex-col items-center text-center">
            <h1 class="text-primary dark:text-white text-2xl font-bold">
            سورة ${selectedSurah?.text} - ${selectedReciter?.text}
            </h1>
            <p>بروايه ${selectedMoshaf?.text}</p>
        </div>`
            :
            suraInfo.innerHTML = `
        <h1 class="text-primary dark:text-white text-2xl font-bold">قم باختيار سورة لبداء التشغيل</h1>`
    }



    useEffect(() => {
        const suraInfo = document.querySelector("#suraInfo");
        if (suwaInfoshow === false) {
            suraInfo.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        }
        else {
            suraInfo.classList.remove('opacity-0');
        }
    }, [suwaInfoshow]);

    useEffect(() => {
        const chooseSurah = document.querySelector("#chooseSurah");
        const selectedSurah = chooseSurah?.options[chooseSurah.selectedIndex]
        const server = selectedSurah?.value
        playSura(server)
        suwrainfo()
    }, [choosesuwar]);


    return (
        <div className='py-16'>
            <div className="container m-auto">
                <h1 className="text-3xl font-bold text-center mb-4">القرأن الكريم</h1>
                <p className="text-lg text-center">
                    ابدء الاستماع للقران الكريم بأكثر من صوت لاشهر قارئ القران الكريم حول الشرق الاوسط
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className='flex flex-col items-center'>
                        <label className='mb-2'>
                            <span className="text-lg font-bold">اختر اسم القارئ</span>
                        </label>
                        <select value={choosereciter ? choosereciter : "اسم القارئ"}
                            onChange={(e) => setChoosereciter(e.target.value)}
                            className="dark:bg-primary py-1 px-3 rounded-md shadow-md"
                            id='chooseReciter'
                        >
                            <option value="">اسم القارئ</option>
                            {recitersData.map(reciter => (
                                <option key={reciter.id} value={reciter.id}>{reciter.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col items-center'>
                        <label className='mb-2'>
                            <span className="text-lg font-bold">اختر الرواية</span>
                        </label>
                        <select value={chooseriwayat ? chooseriwayat : "اسم الرواية"}
                            onChange={(e) => setChooseriwayat(e.target.value)}
                            className="dark:bg-primary py-1 px-3 rounded-md shadow-md"
                            id='chooseRewayat'
                        >
                            <option value="">اسم الرواية</option>
                            {riwayatData.map(riwayat => (
                                <option key={riwayat.id} data-server={riwayat.server} data-suwarlist={riwayat.surah_list} value={riwayat.id}>{riwayat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col items-center'>
                        <label className='mb-2'>
                            <span className="text-lg font-bold">اختر السورة</span>
                        </label>
                        <select value={choosesuwar ? choosesuwar : "اسم السورة"}
                            onChange={(e) => setChoosesuwar(e.target.value)}
                            className="dark:bg-primary py-1 px-3 rounded-md shadow-md"
                            id='chooseSurah'
                        >
                            <option value="">اسم السورة</option>
                            {suwarendList.map(sura => (
                                <option key={sura.id} value={sura.value}>{sura.name}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>
                <div className="flex items-center flex-col mt-8">
                    <audio id="audioPlayer" controls></audio>
                    <button onClick={
                        () => {
                            setSuwaInfoshow(!suwaInfoshow)
                        }
                    } className="mt-4 bg-primary flex flex-row justify-center gap-4 hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
                        عرض معلومات عن السورة
                        {suwaInfoshow ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                                <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                                <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        }
                    </button>
                    <div id="suraInfo" className='mt-8'>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quranplayer;
