import React, { use, useEffect, useRef, useState } from 'react';
import SideNav from '../Components/SideNav';
import { Link, Outlet, useNavigate } from 'react-router';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
import useRole from '../Hooks/useRole';
import Spinner from '../Components/Spinner';

const DashboardLayout = () => {
    const { user, signout } = use(AuthContext)
    const { role,status, loading } = useRole()
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
    return (
        <>
            <div className='flex'>
                <SideNav role={role} status={status}></SideNav>

                <div className='flex-1 pl-[216px] md:pl-[280px] p-6'>
                    <header className="flex justify-between items-center mb-6 rounded-lg shadow px-4 py-2">
                        <div>
                            <h3 className='text-2xl font-semibold'>Welcome to Your DashBoard  
                                {((role === 'SuperAdmin' || role === 'Admin') && ' As Admin')}
                                {( role === 'Volunteer' && ' As Volunteer')}
                                {( role === 'Donor' && ' As Donor')}
                            </h3>
                        </div>
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
                    </header>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;