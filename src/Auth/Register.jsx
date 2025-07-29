import Lottie from 'lottie-react';
import React, { use, useEffect } from 'react';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import registerLottie from '../../public/assets/RegisterLottie.json'
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { setUser, signUpWithEmailPassword, updateUserProfile, explocation } = use(AuthContext)
    const axiosInstanceIntercept = useAxiosSecure()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm();
    const [districtData, setDistrictData] = useState([]);
    const [upazilaData, setUpazilaData] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const password = watch("password");
    const selectedDistrictId = watch("district");
    const selectedDistrict = districtData.find(div => div.id === String(selectedDistrictId));
    const districtName = selectedDistrict?.name
    useEffect(() => {
        axiosInstanceIntercept.get(`/districts`).then(res => setDistrictData(res.data));
        axiosInstanceIntercept.get(`/upazilas`).then(res => setUpazilaData(res.data));
    }, []); // ✅ No need for [selectedDivision] here!

    useEffect(() => {
        if (selectedDistrict) {
            const matchedupazila = upazilaData.filter(
                (upazila) => upazila.district_id === selectedDistrict.id
            );
            setFilteredUpazilas(matchedupazila);
            setValue("upazila", ""); // reset district selection
        }
    }, [selectedDistrict, upazilaData, setValue]);
    const onSubmit = (data) => {
        const { name, email, photoURL, password, district, upazila, bloodGroup } = data; // remove confirmPassword
        const formData = { name, email, photoURL, password, districtName, upazila, district, bloodGroup, role: "Donor", status: "Active" };
        signUpWithEmailPassword(email, password).then(res => {
            const user = res.user;
            updateUserProfile({ displayName: name, photoURL: photoURL, }).then(() => {
                setUser({ ...user, displayName: name, photoURL: photoURL })
                axiosInstanceIntercept.post('/add-userInfo', formData).then(() => {
                    navigate(explocation || '/')
                    Swal.fire({
                        title: "Welcome!!!",
                        text: "You are successfully In.",
                        icon: "success"
                    });
                }).catch(err => {
                    console.log(err.data)
                })
            }).catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid Cradintial"
                });
            })
        }).catch(() => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email or password"
            });
        })
    };

    return (
        <>
            <title>Blood Buddies | Sign Up</title>
            <div className='flex justify-center items-center bg-[#1A1A1A]'>
                <div className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">

                    <div className='w-full md:w-[40%]'>
                        <Lottie animationData={registerLottie}></Lottie>
                    </div>


                    <div className="bg-base-100 rounded-2xl p-8 shadow-lg w-full max-w-md">
                        <h1 className="text-3xl text-base-content font-bold text-center mb-1">Register</h1>
                        <p className="text-center mb-6 text-gray-500">Register your account to connect with us.</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Full Name</span>
                                </label>
                                <input {...register("name", { required: true })} placeholder="Full Name" className="input input-bordered w-full" />
                                {errors.name && <p className="text-red-500 text-sm mt-1">Full name is required</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <label className="input validator w-full">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </g>
                                    </svg>
                                    <input type="email" {...register("email", { required: true })} placeholder="mail@site.com" />
                                </label>
                                {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                            </div>

                            {/* Blood Group */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Blood Group</span>
                                </label>
                                <select {...register("bloodGroup", { required: true })} className="select select-bordered w-full">
                                    <option value="">Select Blood Group</option>
                                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                                        <option key={group} value={group}>
                                            {group}
                                        </option>
                                    ))}
                                </select>
                                {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">Blood group is required</p>}
                            </div>

                            {/* Division & District */}
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <label className="label">
                                        <span className="label-text font-medium">District</span>
                                    </label>
                                    <select {...register("district", { required: true })} className="select select-bordered w-full">
                                        <option value="">Select Division</option>
                                        {districtData.map((dis) => (
                                            <option key={dis._id} value={dis.id}>{dis.name}</option>
                                        ))}
                                    </select>
                                    {errors.selectedDivision && <p className="text-red-500 text-sm mt-1">Division is required</p>}
                                </div>

                                <div className="w-1/2">
                                    <label className="label">
                                        <span className="label-text font-medium">Upazila</span>
                                    </label>
                                    <select {...register("upazila", { required: true })} className="select select-bordered w-full" disabled={!selectedDistrict} >
                                        <option value="">Select Upazila</option>
                                        {filteredUpazilas.map((upazila) => (<option key={upazila._id} value={upazila.name}> {upazila.name}</option>))}
                                    </select>
                                    {errors.district && <p className="text-red-500 text-sm mt-1">District is required</p>}
                                </div>
                            </div>

                            {/* Photo URL */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Photo URL</span>
                                </label>
                                <input {...register("photoURL")} placeholder="Photo URL" className="input input-bordered w-full" />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <label className="input validator w-full relative">
                                    <input type={showPassword ? "text" : "password"} {...register("password", { required: true, minLength: 8 })} placeholder="Password" className="pr-10" />
                                    <span className="absolute right-3 top-3 cursor-pointer text-lg text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </label>
                                {errors.password && <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Confirm Password</span>
                                </label>
                                <input type="password" {...register("confirmPassword", { required: "Confirm Password is required", validate: (value) => value === password || "Passwords do not match", })} placeholder="Confirm Password" className="input input-bordered w-full"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-2">
                                <input type="checkbox" {...register("terms", { required: true })} className="checkbox checkbox-primary" />
                                <p className="text-sm">
                                    You accept our{" "}
                                    <a href="#" className="link link-primary">
                                        Terms and Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="link link-primary">
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                            {errors.terms && <p className="text-red-500 text-sm mt-1">You must accept the terms</p>}

                            {/* Already have account */}
                            <div>
                                <p className="text-sm">
                                    Already have an account?{" "}
                                    <Link to="/login" className="link link-primary">
                                        Sign in
                                    </Link>
                                </p>
                            </div>

                            {/* Submit */}
                            <button type="submit" className="py-2 px-4 flex justify-center items-center transition rounded-md w-full font-semibold text-red-600 border border-red-600 cursor-pointer hover:shadow-[0_0_0_1px_#f00,0_5px_0_0_#f01]">
                                Register Now <GoArrowUpRight />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;