'use client'
import Fuse from 'fuse.js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const All = () => {

    const [recitersData, setRecitersData] = useState([]);
    const [riwayatData, setRiwayatData] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedRiwayat, setSelectedRiwayat] = useState('');
    const [results, setResults] = useState([]);
    const [visibleItems, setVisibleItems] = useState(20);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const API_URL = "https://mp3quran.net/api/v3";
    const reciters = "/reciters";
    const riwayat = "/riwayat";
    const lang = "ar";

    useEffect(() => {
        fetch(`${API_URL}${reciters}?language=${lang}`)
            .then(res => res.json())
            .then(data => setRecitersData(data.reciters));
    }, []);

    useEffect(() => {
        fetch(`${API_URL}${riwayat}?language=${lang}`)
            .then(res => res.json())
            .then(data => setRiwayatData(data.riwayat));
    }, []);


    useEffect(() => {
        if (selectedRiwayat === "") {
            if (query === '') {
                recitersData.sort((a, b) => a.name.localeCompare(b.name, 'ar', { sensitivity: 'base' }));
                setResults(recitersData);
            } else {
                const fuse = new Fuse(recitersData, {
                    keys: ['name'],
                    threshold: 0.2
                });
                const results = fuse.search(query).map(result => result.item);
                // Arrange the elements alphabetically in Arabic
                results.sort((a, b) => a.name.localeCompare(b.name, 'ar', { sensitivity: 'base' }));
                setResults(results);

                setLoading(false);
                setError(null);
            }
        }

        if (selectedRiwayat !== "") {
            if (query === '') {
                // fetch data reciters by riwayat id
                let res = fetch(`${API_URL}${reciters}?language=${lang}&rewaya=${selectedRiwayat}`);
                res.then(response => response.json())
                    .then(data => {
                        data.reciters.sort((a, b) => a.name.localeCompare(b.name, 'ar', { sensitivity: 'base' }));
                        setResults(data.reciters);
                    });
            } else {
                // fetch data reciters by riwayat id and search by name
                let res = fetch(`${API_URL}${reciters}?language=${lang}&rewaya=${selectedRiwayat}`);
                res.then(response => response.json())
                    .then(data => {
                        const fuse = new Fuse(data.reciters, {
                            keys: ['name'],
                            threshold: 0.2
                        });
                        const results = fuse.search(query).map(result => result.item);
                        // Arrange the elements alphabetically in Arabic
                        results.sort((a, b) => a.name.localeCompare(b.name, 'ar', { sensitivity: 'base' }));
                        setResults(results);
                    });
            }
        }
    }, [query, recitersData, selectedRiwayat]);

    const handleSearch = (event) => {
        setQuery(event.target.value);
    }

    const handelriwayat = (event) => {
        setSelectedRiwayat(event.target.value);
        setQuery('');
    }


    return (
        <div className='py-16'>
            <div className="container m-auto">
                <h1 className="text-3xl font-bold text-center mb-4">كل القراءات</h1>
                <p className="text-lg text-center">
                    استعرض كل القراءات التي تمتلكها المشتركون
                </p>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
                    <div className="search-container">
                        <input
                            type="text"
                            onChange={handleSearch}
                            placeholder="البحث بأسم القارئ"
                            className='w-full bg-white rounded-lg border-2 p-1 shadow-md text-black border-gray-300 focus-visible:outline-gray-300 dark:border-gray-700 dark:focus-visible:outline-none'
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <select className='bg-orange-500 rounded-lg p-1 shadow-md text-white border-orange-500 focus-visible:outline-white dark:focus-visible:outline-none
                        '
                            onChange={handelriwayat}>
                            <option value="" disabled>اختر الروايه او نوع المصحف</option>
                            <option value="">الكل</option>
                            {riwayatData.map(riwayat => (
                                <option key={riwayat.id} value={riwayat.id}>{riwayat.name}</option>
                            ))}
                        </select>
                    </div>

                </div>
                {results.length === 0 ?
                    <p>لا توجد نتائج.</p>
                    :
                    <p className='font-bold my-5 text-center md:text-start'>
                        عدد القراءات المتوفرة: {results.length}
                        {loading && <p>جاري التحميل...</p>}
                        {error && <p className="error">{error}</p>}
                    </p>
                }
                <div className="results mt-4 mb-8 grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-8">
                    {results?.slice(0, visibleItems).map((reciter, index) => (
                        <Link href={`reciter/${reciter.id}`} key={index} className="result-item flex items-center flex-row gap-4 hover:text-primary hover:border-primary dark:hover:text-gray-300 dark:hover:border-gray-500 border border-gray-300 rounded-lg py-1 px-2 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            <h3>{reciter.name}</h3>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => setVisibleItems(prev => prev + 20)}
                        className="flex flex-row gap-6 items-center py-2 px-3 first-line:text-xl font-bold bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary dark:hover:border-white dark:hover:text-white transition-all">
                        اظهار المزيد
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default All;
