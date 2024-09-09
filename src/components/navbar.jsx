import React from 'react';
import Darkbtn from './darkbtn';
import Link from 'next/link';

const Navbar = () => {
    return (
        <>
            <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-4 bg-black bg-opacity-25 shadow-md text-white">
                <h1 className="font-bold text-2xl text-primary"><Link href="/">Quran <span className='text-white text-xl'>.com</span></Link></h1>
                <ul className="flex">
                    <li className="mr-4">
                        <Link href="/" className="text-white hover:text-primary">الصفحة الرئيسية</Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/" className="text-white hover:text-primary">معلومات عنا</Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/" className="text-white hover:text-primary">تواصل معنا</Link>
                    </li>
                </ul>
                <Darkbtn />
            </nav>
        </>
    );
}

export default Navbar;
