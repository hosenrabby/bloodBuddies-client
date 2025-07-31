import React, { use, useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { Link, NavLink, useLocation, useNavigate, } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
    const { user, signout } = use(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlSignout = () => {
        navigate('/login')
        signout()
    }
    // console.log(user)
    const links = <>
        <li className={`text-gray-900 font-semibold hover:text-gray-800 hover:scale-105 transition`}>
            <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-red-600 font-semibold' : ''}>
                HOME
            </NavLink>
        </li>
        <li className={`text-gray-900 font-semibold hover:text-gray-800 hover:scale-105 transition`}>
            <NavLink to={'/donation-requests'} className={({ isActive }) => isActive ? 'text-red-600 font-semibold' : ''}>
                DONATION REQUESTS
            </NavLink>
        </li>
        {/* <li className={`text-gray-600 hover:text-gray-800 hover:scale-105 transition`}>
            <NavLink to={'/find-donor'} className={({ isActive }) => isActive ? 'text-red-600 font-semibold' : ''}>
                FIND DONOR
            </NavLink>
        </li> */}
        <li className={`text-gray-900 font-semibold hover:text-gray-800 hover:scale-105 transition`}>
            <NavLink to={'/blogs'} className={({ isActive }) => isActive ? 'text-red-600 font-semibold' : ''}>
                BLOGS
            </NavLink>
        </li>
        {
            user &&
            <li className={`text-gray-900 font-semibold hover:text-gray-800 hover:scale-105 transition`}>
                <NavLink to={'/funds'} className={({ isActive }) => isActive ? 'text-red-600 font-semibold' : ''}>
                    FUNDING
                </NavLink>
            </li>
        }
    </>

    return (
        <>
            <div className={`sticky top-0 z-1000 transition-colors duration-300
            ${isScrolled ? 'bg-white shadow-md' : location.pathname == '/' ? 'bg-base-content/0' : 'bg-white'}`}>
                <div className="navbar md:w-10/12 mx-auto px-4 py-6">
                    <div className="navbar-start w-4/12 ">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-base-content">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <div>
                            <Link className='flex items-center gap-2' to={'/'}>
                                <img className='' src="/assets/logo.png" alt="" />
                            </Link>
                        </div>
                    </div>

                    <div className="navbar-end space-x-4 w-8/12">
                        <div className="navbar-start hidden lg:flex border-r-1 border-gray-700">
                            <ul className="menu-horizontal space-x-4">
                                {links}
                            </ul>
                        </div>

                        {
                            !user
                                ?
                                <div className='flex justify-between items-center gap-3'>
                                    <div className='border-r-1 border-gray-700'>
                                        <Link to={'/login'}>
                                            <button className={`text-gray-900 font-semibold hover:scale-105 hover:text-red-600 transition  pr-4 flex items-center gap-2 cursor-pointer`}><CiUser /> Login</button>
                                        </Link>
                                    </div>
                                    <div className='space-x-2'>
                                        <Link to={'/sign-up'}>
                                            <button className={`py-2 px-4 transition rounded-md font-semibold text-red-600 border border-red-600 cursor-pointer hover:shadow-[0_0_0_1px_#f00,0_5px_0_0_#f01]`}>
                                                SignUp
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                :
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt='user' src={user.photoURL} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li><Link to={"/dashboard"} className="justify-between">Dashboard</Link></li>
                                        <li><Link to={"/dashboard/my-profile"} className="justify-between">Profile</Link></li>
                                        <li onClick={handlSignout}><Link>Logout</Link></li>
                                    </ul>
                                </div>
                        }
                        <p>{user && user.name}</p>

                    </div>
                </div>
            </div>
        </>

    );
};

export default Navbar;