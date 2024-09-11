import Image from 'next/image';
import React from 'react';
import myImg from '@/imges/me.jpg';
import Link from 'next/link';

const Page = () => {
    return (
        <div className='py-24'>
            <div className="container m-auto">
                <h1 className="text-3xl font-bold text-center mb-4">من نحن ؟</h1>
                <p className="text-sm text-center">
                    من نحن والمشاريع التي نعمل بها
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-8 mt-10">
                    <div className='w-full flex items-center justify-center md:justify-end overflow-hidden relative'>
                        <Image src={myImg} width={450} height={450} alt='me' className='rounded-2xl' />
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='text-3xl font-bold mb-6'>السيرة الذاتية:</h2>
                        <p className='text-lg leading-8'>محمد جمال رجب الشيمي <br /> من محافظة المنوفية خريج كليه تجاره جامعة المنوفية <br /> اعمل بجال البرمجة منذ اكثر من ست سنوات
                            وقمت بتطبيق العديد من المشاريع الحرة واتطلع الي المزيد من التطور وتعلم المهارات المطلوبة لمواكبة التحديثات
                            وللوصول الي المستوي الذي يليق بكم ويسير اعجابكم
                        </p>
                    </div>
                </div>
                <div className='flex flex-col mt-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center'>المشاريع التي نعمل بها:</h2>
                    <ul className='leading-8 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center'>
                        <li className='text-lg'>موقع القراءات الكريم والمواد التعليمية</li>
                        <li className='text-lg'>المتاجر الالكترونية</li>
                        <li className='text-lg'>المواقع الشخصية</li>
                    </ul>
                </div>
                <div className='flex flex-col items-center mt-8 gap-6'>
                    <p className='text-center text-2xl font-bold'>
                        يمكنك رؤية مشارعنا واعمالنا السابقة في الموقع الشخصي الخاص بنا
                    </p>
                    <Link href="https://portfilio-next.vercel.app" target='_blank' className='text-primary dark:text-gray-200 dark:hover:text-gray-400 transition hover:underline text-center font-bold text-2xl flex flex-row items-center gap-2'>
                        <span className=''>موقعنا الشخصي</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M11.1004 3.00208C7.4515 3.00864 5.54073 3.09822 4.31962 4.31931C3.00183 5.63706 3.00183 7.75796 3.00183 11.9997C3.00183 16.2415 3.00183 18.3624 4.31962 19.6801C5.6374 20.9979 7.75836 20.9979 12.0003 20.9979C16.2421 20.9979 18.3631 20.9979 19.6809 19.6801C20.902 18.4591 20.9916 16.5484 20.9982 12.8996" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M20.4803 3.51751L14.931 9.0515M20.4803 3.51751C19.9863 3.023 16.6587 3.0691 15.9552 3.0791M20.4803 3.51751C20.9742 4.01202 20.9282 7.34329 20.9182 8.04754" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Page;
