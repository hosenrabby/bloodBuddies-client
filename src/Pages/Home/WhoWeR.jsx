import React from 'react';
import { FaCircle } from 'react-icons/fa';

const WhoWeR = () => {
    return (
        <>
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2">
                {/* Left Side - Text */}
                <div className="bg-base-200 p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-700">Who We Are?</h2>
                    <p className="text-gray-600 mb-6">
                        Blood Buddies is for public donation center with blood donation members in the
                        changing health care system.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <FaCircle className="text-red-500 text-xs mt-1" />
                            Specialist blood donors and clinical supervision.
                        </li>
                        <li className="flex items-start gap-2">
                            <FaCircle className="text-red-500 text-xs mt-1" />
                            Increasing communication with our members.
                        </li>
                        <li className="flex items-start gap-2">
                            <FaCircle className="text-red-500 text-xs mt-1" />
                            High quality assessment, diagnosis and treatment.
                        </li>
                        <li className="flex items-start gap-2">
                            <FaCircle className="text-red-500 text-xs mt-1" />
                            Examine critically to ensure alignment.
                        </li>
                        <li className="flex items-start gap-2">
                            <FaCircle className="text-red-500 text-xs mt-1" />
                            The extra care of a multi-disciplinary team.
                        </li>
                    </ul>
                </div>

                <div className="relative">
                    <img
                        src="/assets/about_feat_bg.jpg"
                        alt="Blood Donation"
                        className="shadow-lg w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <button className="absolute inset-0 flex justify-center items-center">
                        <div className="w-16 h-16 flex justify-center items-center bg-white bg-opacity-70 rounded-full shadow-lg hover:scale-110 transition">
                            <svg
                                className="w-8 h-8 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default WhoWeR;