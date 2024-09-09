'use client'
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [suwarData, setSuwarData] = useState([]);
  const [suwarendList, setSuwarendList] = useState([]);
  const [playedsura, setPlayedsura] = useState([]);



  const API_URL = "https://mp3quran.net/api/v3";
  const reciters = "/reciters";
  const lang = "ar";
  const suwar = "/suwar";


  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split('/').pop();
    setId(id);
  }, []);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}${reciters}?language=${lang}&reciter=${id}`)
      .then(res => res.json())
      .then(data => setData(data.reciters[0]))
      .catch(error => console.error('Error:', error));
  }, [id]);

  const getSuraByMoshaf = (e) => {
    const suwerList = e.target.dataset.suwarlist.split(',')
    const server = e.target.dataset.server

    // Fetch suwar data from API
    let res = fetch(`${API_URL}${suwar}?language=${lang}`);
    res.then(response => response.json())
      .then(data => setSuwarData(data.suwar));
    const suwarlistData = []
    suwerList?.forEach(suwarL => {
      const badsuwar = suwarL.padStart(3, '0')
      suwarData?.forEach(suwar => {
        if (suwar.id == suwarL) {
          suwarlistData.push({
            id: suwar.id,
            name: suwar.name,
            value: server + badsuwar + ".mp3",
            makkia: suwar.makkia
          })
        }
      })
    })
    setSuwarendList(suwarlistData)

  }

  const playSura = (sura) => {
    const audio = document.querySelector("#fullAudioPlayer");
    audio.src = sura.value;
    setPlayedsura(sura)
    audio.play();
  }


  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="reciterInfo pb-20 pt-28 relative">
        <div className="container m-auto">
          <div className="flex flex-col items-center justify-between sm:flex-row gap-10">
            <div className="flex flex-row gap-4 items-center">
              <svg className='border p-2 rounded-lg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100" fill="none">
                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <div className="reciterInfo-text">
                <h1 className="text-3xl font-bold mb-4">{data?.name}</h1>
                <p className='mt-2'>عدد السور المتوفره :</p>
                {data?.moshaf?.map(moshaf => (
                  <div key={moshaf.id} className='flex flex-row gap-4 items-center'>
                    <span>{moshaf.name}:</span>
                    <span key={moshaf.id}>{moshaf.surah_total}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reciterInfo-links">
              <a href={data?.audio_url} className="cursor-pointer py-2 px-3 first-line:text-xl font-bold bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary dark:hover:border-white dark:hover:text-white transition-all">استماع القرئ</a>
            </div>
          </div>
          <h2 className='text-2xl text-center my-8'>السور المتوفرة</h2>
          <div className='flex flex-col gap-4'>
            {data?.moshaf?.map(moshaf => (
              <div key={moshaf.id} className='flex flex-row gap-4 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={40} height={40} fill={"none"}>
                  <path d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M20.5 22C19.1193 22 18 20.8807 18 19.5C18 18.1193 19.1193 17 20.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 7L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 11L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className='text-xl font-bold'>
                  {moshaf.name}
                  <span className=' mr-2 text-gray-600'>({moshaf.surah_total} سور)</span>
                </h3>
                <button value={moshaf.id} data-server={moshaf?.server} data-suwarlist={moshaf?.surah_list}
                  onClick={
                    e => { getSuraByMoshaf(e) }
                  } className='text-gray-600 hover:text-gray-900'>
                  عرض السور
                </button>
              </div>
            ))}
            <div className='mt-10'>
              <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {suwarendList.map(suwar => (
                  <li key={suwar.id} className='flex flex-row justify-between border border-gray-400 rounded-lg p-2'>
                    <div>
                      <h2 className='mb-2 font-bold'>{suwar.name}</h2>
                      <p className='text-gray-400'>{suwar.makkia === 0 ?
                        "سورة مدنيه"
                        :
                        "سورة مكيه"}</p>
                    </div>
                    <div className='flex flex-row items-center gap-3'>
                      <a className='hover:text-gray-700 transition' href={suwar.value}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} fill={"none"}>
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M12 7V12.5M10 11L11.2929 12.2929C11.6262 12.6262 11.7929 12.7929 12 12.7929C12.2071 12.7929 12.3738 12.6262 12.7071 12.2929L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8.99023 16H14.9902" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>

                      <button className='hover:text-gray-700 transition' onClick={
                        e => {
                          playSura(suwar)
                        }
                      }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between overflow-player fixed w-full bottom-0 z-50 pt-4 dark:bg-primary rounded-t-lg bg-white border-t-2 border-gray-600 shadow-lg">
          <div id="player-info" className='mb-4 px-4'>
            {
              playedsura.name ?
                <div className='flex flex-row items-center justify-between'>
                  <div className='flex flex-col items-center sm:flex-row gap-4'>
                    <h3 className='text-xl font-bold'>سورة :  {playedsura.name}</h3>
                    <p className='text-gray-400'>{playedsura.makkia === 0 ? " مدنيه" : " مكيه"}</p>
                  </div>
                  <div className='flex flex-row items-center justify-between gap-4'>
                    <a className='transition flex flex-row items-center justify-between gap-2
                  cursor-pointer py-2 px-3 first-line:text-xl font-bold bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary hover:dark:text-gray-300 dark:border-white'
                  >
                      <p className='text-[20px]'>اعجاب</p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                        <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </a>
                    <a className='transition flex flex-row items-center justify-between gap-2
                  cursor-pointer py-2 px-3 first-line:text-xl font-bold bg-primary text-white rounded-md border border-primary hover:bg-transparent hover:text-primary hover:dark:text-gray-300 dark:border-white' href={playedsura.value}>
                      <p className='text-[20px]'>تنزيل</p>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                        <path d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
                :
                <p>لم تحدد أي سورة حتى الآن</p>
            }
          </div>
          <audio id="fullAudioPlayer" className='' controls />
        </div>
      </div>
    </>
  );
}

export default Page;

