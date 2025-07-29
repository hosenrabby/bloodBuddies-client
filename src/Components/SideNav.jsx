import React, { use } from 'react';
import { BiDonateBlood, BiSolidDonateBlood } from 'react-icons/bi';
import { FaDonate, FaUsers } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { IoHomeOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const SideNav = () => {
    const { user } = use(AuthContext)
    const links = <>
        <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <IoHomeOutline size={18} />Dashboard
        </NavLink>

        <NavLink to={'/dashboard/all-users'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <FaUsers size={18} />All Users
        </NavLink>

        <NavLink to={'/dashboard/all-donation-requests'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <BiSolidDonateBlood size={18} />All Donation Request
        </NavLink>

        <NavLink to={'/dashboard/manage-content'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <HiOutlineClipboardDocumentList size={18} />Manage Contant
        </NavLink>

        <NavLink to={'/dashboard/my-donation-requests'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <BiSolidDonateBlood size={18} />My Donation Requests
        </NavLink>

        <NavLink to={'/dashboard/add-donation-request'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <BiDonateBlood size={18} />Add Donation Requests
        </NavLink>

        <NavLink to={'/dashboard/total-funds'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <FaDonate size={18} />Total Funds
        </NavLink>

        <NavLink to={'/'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <IoHomeOutline size={18} />Back Home
        </NavLink>
    </>
    return (
        <>
            <div className="flex min-h-screen">
                {/* <!-- Sidebar --> */}
                <aside className="w-48 md:w-64 fixed top-0 left-0 h-screen bg-gray-900 text-white">
                    <Link to={'/'}>
                        <div className="cursor-pointer p-4 border-b border-gray-800">
                            <div className="flex items-center justify-between">
                                <img src="/assets/logo-footer.png" alt="Logo" className="" />
                            </div>
                        </div>
                    </Link>

                    {/* <!-- Search Bar --> */}
                    <div className="p-4">
                        <div className="relative">
                            <input type="text" className="w-full bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Search..." />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><GoSearch /></div>
                        </div>
                    </div>

                    <nav className="mt-5 mb-4 px-2">
                        {/* <!-- Main Navigation --> */}
                        <div className="space-y-4">
                            {links}
                        </div>
                    </nav>

                    {/* <!-- User Profile --> */}
                    <div className="mt-auto p-4 border-t border-gray-800">
                        <div className="flex items-center">
                            <img className="h-8 w-8 rounded-full" src={user?.photoURL} alt="photo" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">{user?.displayName}</p>
                                <Link to={"/dashboard/my-profile"} className="text-xs text-gray-400">View profile</Link>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
            
        </>
    );
};

export default SideNav;