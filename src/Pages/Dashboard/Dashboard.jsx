import React, { use, useEffect, useRef, useState } from 'react';
import { FaUserPlus, FaFileUpload, FaShieldAlt, FaFileExport, FaSyncAlt, FaUsers, FaQuestionCircle, FaCog, FaDonate, } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { BiSolidDonateBlood } from 'react-icons/bi';
import useRole from '../../Hooks/useRole';
import RicentDonationReq from '../MyDonationReq/RicentDonationReq';
const Dashboard = () => {
    const { user } = use(AuthContext)
    const { role } = useRole()
    // console.log(role)
    // const dropdownRef = useRef();
    const axiosInstanceIntercept = useAxiosSecure()
    const [countData, setCountData] = useState([]);

    useEffect(() => {
        if (user) {
            axiosInstanceIntercept.get(`/all-data-countDocuments`).then(res => setCountData(res.data))
        }
    }, [user?.email])
    return (
        <>
            {/* Main Content */}
            <main className="flex-1 p-6">

                {/* Stats Cards */}
                {(role === 'SuperAdmin' || role === 'Admin' || role === 'Volunteer') &&
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-800">{countData.usersCount}</div>
                                    <div className="text-sm text-gray-500">Total Users</div>
                                </div>
                                <div className="text-blue-600 text-2xl">
                                    <FaUsers />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-800">{countData.donorsCount}</div>
                                    <div className="text-sm text-gray-500">Total Donors</div>
                                </div>
                                <div className="text-blue-600 text-2xl">
                                    <BiSolidDonateBlood />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-800">{countData.donationReqsCount}</div>
                                    <div className="text-sm text-gray-500">Total Donation Requestss</div>
                                </div>
                                <div className="text-blue-600 text-2xl">
                                    <BiSolidDonateBlood />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-2xl font-bold text-gray-800">${countData.totalPayments}</div>
                                    <div className="text-sm text-gray-500">Total Funding</div>
                                </div>
                                <div className="text-blue-600 text-2xl">
                                    <FaDonate />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {role === 'Donor' && <RicentDonationReq />}
                {(role === 'SuperAdmin' || role === 'Admin') &&
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 flex flex-col gap-6">

                            {/* System Status */}
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">System Status</h3>
                                    <FaSyncAlt className="text-gray-500 cursor-pointer" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    {[
                                        ['Server Uptime', '99.9%', 'text-green-600'],
                                        ['CPU Usage', '32%', ''],
                                        ['Memory Usage', '45%', ''],
                                        ['Database', 'Normal', 'text-green-600'],
                                        ['Last Backup', '12 hours ago', 'text-yellow-500'],
                                    ].map(([label, value, color], idx) => (
                                        <div key={idx} className="flex justify-between">
                                            <span className="text-gray-600">{label}</span>
                                            <span className={`font-semibold ${color}`}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6">
                            {/* Quick Actions */}
                            <div className="bg-white p-4 rounded-lg shadow grid grid-cols-2 gap-4">
                                {[
                                    [FaUserPlus, 'Add User'],
                                    [FaFileExport, 'Export Data'],
                                    [FaCog, 'Settings'],
                                    [FaQuestionCircle, 'Help'],
                                ].map(([Icon, label], idx) => (
                                    <button
                                        key={idx}
                                        className="flex flex-col items-center justify-center p-4 border rounded hover:bg-gray-50 transition"
                                    >
                                        <Icon className="text-2xl text-blue-600 mb-1" />
                                        <span className="text-sm font-medium">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                }

                {/* Recent Actions */}
                {(role === 'SuperAdmin' || role === 'Admin' || role === 'Volunteer') &&
                    <div className="bg-white p-4 rounded-lg shadow mt-3">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Recent Actions</h3>
                            <button className="text-blue-600 hover:underline">View All</button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {[
                                [FaUserPlus, 'New user registered', '2 minutes ago'],
                                [FaFileUpload, 'Document uploaded', '15 minutes ago'],
                                [FaCog, 'System settings updated', '1 hour ago'],
                                [FaShieldAlt, 'Security patch applied', '3 hours ago'],
                            ].map(([Icon, title, time], idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="text-blue-600 text-xl">
                                        <Icon />
                                    </div>
                                    <div>
                                        <div className="font-medium">{title}</div>
                                        <div className="text-sm text-gray-500">{time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                }
            </main>
        </>
    );
};

export default Dashboard;
