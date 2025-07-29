import React from 'react';

const Banner = () => {
    return (
        <div
            className="bg-cover bg-center flex items-center min-h-screen mt-[-98px] md:mt-[-149px] lg:mt-[-100px] mb-"
            style={{ backgroundImage: "url('../../../public/assets/banner.webp')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
            {/* <img src="../../../public/assets/banner.webp" alt="" /> */}
            {/* Content */}
            <div className="z-10 mt-20 md:mt-0 md:text-left w-9/12 mx-auto space-y-3">
                <h1 className="text-4xl md:text-8xl font-bold coiny-regular text-white">Donate Blood, Keep<br /> the World Beating.</h1>

                <p className="mt-4 text-white text-xl max-w-xl">Donating blood is a selfless act that saves lives. Just one donation can help up to three people in need. It's safe, quick, and deeply impactful..</p>
                <button className={`py-3 px-6 transition rounded-md font-semibold text-white bg-red-600 cursor-pointer hover:bg-white hover:text-black duration-400`}>
                    BE A DONOR
                </button>
                <button className={`ms-4 py-3 px-6 transition rounded-md font-semibold text-white border border-red-600 cursor-pointer hover:bg-red-600 hover:text-white duration-400`}>
                    FIND A DONOR
                </button>
            </div>
        </div>
    );
};

export default Banner;