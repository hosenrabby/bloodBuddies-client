import React from 'react';
import { FaHandsHelping, FaHeartbeat, FaTint, FaUserShield, FaMobileAlt, FaSearchLocation } from 'react-icons/fa';

const features = [
    {
        icon: <FaHandsHelping className="text-3xl text-red-600" />,
        title: 'Trusted Donation Network',
        description: 'Join a reliable community dedicated to connecting donors and recipients safely.'
    },
    {
        icon: <FaHeartbeat className="text-3xl text-red-600" />,
        title: 'Life-Saving Impact',
        description: 'Every drop of blood you donate helps save lives in emergency situations.'
    },
    {
        icon: <FaTint className="text-3xl text-red-600" />,
        title: 'Real-Time Requests',
        description: 'Receive instant notifications about urgent blood donation needs near you.'
    },
    {
        icon: <FaUserShield className="text-3xl text-red-600" />,
        title: 'Verified Profiles',
        description: 'All donors and recipients are verified for your safety and peace of mind.'
    },
    {
        icon: <FaMobileAlt className="text-3xl text-red-600" />,
        title: 'Mobile Friendly',
        description: 'Access the full platform from any device, anytime, anywhere with responsive design.'
    },
    {
        icon: <FaSearchLocation className="text-3xl text-red-600" />,
        title: 'Location Based Matching',
        description: 'Find donors or recipients quickly based on location and blood type.'
    }
];

const KeyFeatured = () => {
    return (
        <div className="py-12 bg-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">Key Features</h2>
                <p className="text-gray-600 mb-10">
                    Explore the core features that make our blood donation platform secure, efficient, and impactful.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow transition hover:shadow-lg hover:shadow-red-300"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KeyFeatured;
