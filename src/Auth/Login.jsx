import React, { use } from 'react';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import LoginLottie from '../../public/assets/loginLottie.json'
import { Link, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
const Login = () => {
    const { signInWithGoogle, signInWithEmail, passwordResetEmail, explocation } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        // const formData = { email, password }
        // console.log(formData)

        signInWithEmail(email, password).then(() => {
            navigate(explocation || '/')
            Swal.fire({
                title: "Welcome Back!!!",
                text: "You are successfully LogIn.",
                icon: "success"
            });
        }).catch(() => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email or password"
            });
        })
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle().then(() => {
            navigate(explocation || '/')
            Swal.fire({
                title: "Welcome Back!!!",
                text: "You are successfully LogIn.",
                icon: "success"
            });
        }).catch(() => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sarver did not response!"
            });
        })
    }

    const handleForgotPass = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        passwordResetEmail(email)
    }
    return (
        <>
            <title>Blood Buddies | Sign In</title>
            <div className='flex justify-center items-center bg-[#1A1A1A]'>
                <div className="flex flex-col-reverse justify-center items-center md:flex-row min-h-[calc(100vh-200px)] px-4 py-8">
                    <div className="bg-base-100 rounded-2xl p-8 shadow-lg w-full max-w-md">
                        <h1 className="text-3xl text-base-content font-bold text-center mb-1">Sign In</h1>
                        <p className="text-center mb-4 text-gray-500">Welcome Back !!! Signin your account and stay connect with us.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Email</span>
                                </label>
                                <label className="input validator w-full">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" >
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </g>
                                    </svg>
                                    <input type="email" name='email' placeholder="mail@site.com" required />
                                </label>
                                <div className="validator-hint hidden">Enter valid email address</div>
                            </div>
                            {/* Password */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Password</span>
                                </label>
                                <label className="input validator w-full">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" >
                                            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" ></path>
                                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                    <input type={showPassword ? 'text' : 'password'} name='password' required placeholder="Password" minLength="8"
                                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                    />
                                    <span className="absolute right-3 top-3 cursor-pointer text-lg text-gray-500" onClick={() => setShowPassword(!showPassword)} >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </label>
                                <p className="validator-hint hidden">Must be more than 8 characters, including <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter.</p>
                            </div>
                            <div>
                                <p className='text-sm text-base-content'>Dint Have an Account <Link to={'/sign-up'} className='link link-primary'>Sign Up</Link> Or <Link onClick={() => document.getElementById('forgotPassword').showModal()} className='link link-primary'>Forgot Password</Link> </p>
                            </div>
                            {/* Submit */}
                            <button className={`py-2 px-4 flex justify-center items-center transition rounded-md w-full font-semibold text-red-600 border border-red-600 cursor-pointer hover:shadow-[0_0_0_1px_#f00,0_5px_0_0_#f01]`}>
                                Sign In <GoArrowUpRight />
                            </button>
                        </form>
                        {/* Password reset modal */}
                        <dialog id="forgotPassword" className="modal">
                            <div className="modal-box w-4/12 max-w-5xl">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <h2 className='text-2xl font-bold mb-4 text-base-content'>Write your Email</h2>
                                <form onSubmit={handleForgotPass}>
                                    <label className="input validator w-full">
                                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" >
                                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                            </g>
                                        </svg>
                                        <input type="email" name='email' placeholder="mail@site.com" required />
                                    </label>
                                    <div className="validator-hint hidden">Enter valid email address</div>
                                    <button type="submit" className="w-full mt-6 py-2 px-4 transition rounded-md font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]">Reset Email</button>
                                </form>
                            </div>
                        </dialog>
                    </div>

                    <div>
                        <Lottie style={{ width: '100%' }} animationData={LoginLottie}></Lottie>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;