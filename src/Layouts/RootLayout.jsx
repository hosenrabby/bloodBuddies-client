import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import ScrollToTop from '../Components/ScrollToTop';

const RootLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar></Navbar>
            <main className='min-h-[calc(100vh-613px)]'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    );
};

export default RootLayout;