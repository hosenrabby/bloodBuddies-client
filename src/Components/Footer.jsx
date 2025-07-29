import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaArrowUp, FaRegEnvelope, FaLocationArrow } from 'react-icons/fa';
import { IoMdArrowDropright, IoMdCall } from 'react-icons/io';

const Footer = () => {
    return (
        <footer className=" text-gray-300 pt-10 bg-[#1A1A1A]">
            <div className='w-8/12 mx-auto flex flex-col lg:flex-row justify-between items-center space-y-8'>
                <div>
                    <img className='w-[300px]' src="/assets/logo-footer.png" alt="" />
                    <div className="flex space-x-4">
                        <FaFacebookF className="text-xl md:text-2xl hover:text-red-600 cursor-pointer" />
                        <FaTwitter className="text-xl md:text-2xl hover:text-red-600 cursor-pointer" />
                        <FaGooglePlusG className="text-xl md:text-2xl hover:text-red-600 cursor-pointer" />
                        <FaLinkedinIn className="text-xl md:text-2xl hover:text-red-600 cursor-pointer" />
                    </div>
                </div>
                <div>
                    <p className='font-semibold roboto p-10'>We are world largest and trustful blood donation center. We have been working since 1973 with a prestigious vision to helping patient to provide blood. We are working all over the world, organizing blood donation campaign to grow awareness among the people to donate blood.</p>
                </div>
            </div>
            <hr className='w-8/12 mx-auto bg-gray-500' />
            <div className="mt-6 w-8/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* For Candidates */}
                <div>
                    <h3 className="text-white text-2xl font-semibold mb-2 tracking-wider">CONTACT US</h3>
                    <ul className="space-y-3">
                        <div className='flex justify-start items-start gap-3.5'>
                            <FaRegEnvelope className='mt-2' color='red' size={22} />
                            <div>
                                <li><Link className="text-white text-lg hover:text-red-500 transition">support@donation.com</Link></li>
                                <li><Link className="text-white text-lg hover:text-red-500 transition">helpme@donation.com</Link></li>
                            </div>
                        </div>
                        <div className='flex justify-start items-start gap-3.5'>
                            <FaLocationArrow className='mt-2' color='red' size={22} />
                            <div>
                                <span className='text-white text-lg'>
                                    385, Road 6, Mirpur DOHS,<br /> Dhaka 1216, Bangladesh
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-start items-start gap-3.5'>
                            <IoMdCall className='mt-2' color='red' size={22} />
                            <div>
                                <li><Link className="text-white text-lg hover:underline">Office:  (+880) 0823 560 433</Link></li>
                                <li><Link className="text-white text-lg hover:underline">Cell:  (+880) 0723 161 343</Link></li>
                            </div>
                        </div>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white text-2xl font-semibold mb-2 tracking-wider">SUPPORTED LINKS</h3>
                    <ul className="space-y-3">
                        <li><Link className="text-white text-lg hover:text-red-500 transition flex gap-4 items-center"><IoMdArrowDropright color='red' size={20} />Privacy</Link></li>
                        <li><Link className="text-white text-lg hover:text-red-500 transition flex gap-4 items-center"><IoMdArrowDropright color='red' size={20} />Tearms & Conditions</Link></li>
                        <li><Link className="text-white text-lg hover:text-red-500 transition flex gap-4 items-center"><IoMdArrowDropright color='red' size={20} />Contact us</Link></li>
                        <li><Link className="text-white text-lg hover:text-red-500 transition flex gap-4 items-center"><IoMdArrowDropright color='red' size={20} />Blood Donate</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-white text-2xl font-semibold mb-2 tracking-wider">SUBSCRIBE US</h3>
                    <p className="text-white mb-4">Signup for regular newsletter and stay up to date with our latest news.</p>
                    <div className="">
                        <input type="email" placeholder="Enter your email address" className="input input-bordered w-full bg-base-content text-white border-gray-700" />
                        <button className={`mt-4 py-2 px-4 transition rounded-sm font-semibold text-white bg-red-600 cursor-pointer `}>
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <hr className='bg-gray-500 mt-4'/>
            <div className="max-w-7xl mx-auto mt-6 py-4 text-center text-sm text-gray-500">
                © 2020 <span className="text-white font-semibold">Blood-Buddies</span>. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
