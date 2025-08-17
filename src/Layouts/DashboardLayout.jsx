import React, { use, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import { BiDonateBlood, BiSolidDonateBlood } from 'react-icons/bi';
import { FaDonate, FaUsers } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { IoHomeOutline } from 'react-icons/io5';
import useRole from '../Hooks/useRole';
import Spinner from '../Components/Spinner';
import ScrollToTop from '../Components/ScrollToTop';

const DashboardLayout = () => {
    const { user, signout } = use(AuthContext)
    const { role, status, loading } = useRole()
    const navigate = useNavigate()
    const dropdownRef = useRef();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handlSignout = () => {
        navigate('/login')
        signout()
    }
    if (loading) {
        return <Spinner></Spinner>
    }

    const adminLinks = <>
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

        {/* <NavLink to={'/dashboard/total-funds'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <FaDonate size={18} />Total Funds
        </NavLink> */}

        <NavLink to={'/'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <IoHomeOutline size={18} />Back Home
        </NavLink>
    </>
    const volunteerLinks = <>
        <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <IoHomeOutline size={18} />Dashboard
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

        <NavLink to={'/'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <IoHomeOutline size={18} />Back Home
        </NavLink>
    </>
    const donorLinks = <>
        <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <IoHomeOutline size={18} />Dashboard
        </NavLink>

        <NavLink to={'/dashboard/my-donation-requests'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <BiSolidDonateBlood size={18} />My Donation Requests
        </NavLink>

        <NavLink onClick={(e) => { if (status === 'Block') e.preventDefault(); }} to={'/dashboard/add-donation-request'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <BiDonateBlood size={18} />Add Donation Requests
        </NavLink>

        <NavLink to={'/'} className={({ isActive }) => isActive ? 'bg-gray-800 flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700' : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-white group transition-all duration-200 hover:bg-gray-700'}>
            <IoHomeOutline size={18} />Back Home
        </NavLink>
    </>
    return (
        <>
            <ScrollToTop></ScrollToTop>
            <div className='flex'>

                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="flex items-center p-2 min-h-16 bg-base-200 m-3 rounded-xl">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block h-6 w-6 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                    </svg>
                                </label>
                            </div>
                            <div className="mx-2 flex-1 px-2">
                                <div>
                                    <h3 className='text-2xl font-semibold'>Welcome to Your DashBoard
                                        {((role === 'SuperAdmin' || role === 'Admin') && ' As Admin')}
                                        {(role === 'Volunteer' && ' As Volunteer')}
                                        {(role === 'Donor' && ' As Donor')}
                                    </h3>
                                </div>
                            </div>
                            <div className="hidden flex-none lg:block">
                                <ul className="menu menu-horizontal">
                                    <div className="flex items-center gap-6">
                                        <div className="relative cursor-pointer">
                                            <FaBell className="text-xl text-gray-600" />
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                                3
                                            </span>
                                        </div>
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                                className="flex items-center gap-2 focus:outline-none cursor-pointer"
                                            >
                                                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full"><img className='rounded-full' src={user?.photoURL} alt="" /></div>
                                                <span>{user?.role}</span>
                                                <FaChevronDown className="text-gray-500" />
                                            </button>

                                            {/* Dropdown Panel */}
                                            {dropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-20">
                                                    <Link to={"/dashboard/my-profile"}><button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button></Link>
                                                    <Link><button onClick={handlSignout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button></Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        {/* Page content here */}
                        <Outlet></Outlet>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu min-h-screen w-64 p-4">
                            {/* Sidebar content here */}
                            <aside className="fixed top-0 left-0 h-screen bg-gray-900 text-white">
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
                                        {role === 'SuperAdmin' || role === 'Admin' ? (
                                            adminLinks
                                        ) : role === 'Volunteer' ? (
                                            volunteerLinks
                                        ) : role === 'Donor' ? (
                                            donorLinks
                                        ) : (
                                            <p className="text-sm text-gray-400">No role Assigned</p>
                                        )}
                                    </div>
                                </nav>

                                {/* <!-- User Profile --> */}
                                <div className="mt-auto p-4 border-t border-gray-800">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-full" src={user?.photoURL} alt="photo" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-white">{user?.displayName}</p>
                                            <ul>
                                                <li><Link to={"/dashboard/my-profile"} className="text-xs text-gray-400">View profile</Link></li>
                                                <li><Link><button onClick={handlSignout} className="text-xs text-gray-400 cursor-pointer">Logout</button></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;