import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Components/Spinner';
import { toast } from 'react-toastify';
import { FaBriefcase, FaEdit, FaMapMarkerAlt, FaRegEnvelope } from 'react-icons/fa';
import { Link } from 'react-router';

const Profile = () => {
    const { user, setUser, updateUserProfile, loading } = use(AuthContext);
    const axiosInstanceIntercept = useAxiosSecure()

    const [editable, setEditable] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [userData, setUserData] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const { register, handleSubmit, reset, watch } = useForm();
    const selectedDistrictId = watch("district");
    const successNotify = () =>
        toast.success('Your Your Profil Updated successfully.', {
            theme: "colored",
        });

    // ✅ Fetch districts and upazilas
    useEffect(() => {
        axiosInstanceIntercept.get(`/districts`).then(res => setDistricts(res.data));
        axiosInstanceIntercept.get(`/upazilas`).then(res => setUpazilas(res.data));
    }, []);

    // ✅ Filter upazilas when district changes
    useEffect(() => {
        if (selectedDistrictId) {
            const filtered = upazilas.filter(u => u.district_id === selectedDistrictId);
            setFilteredUpazilas(filtered);
        } else {
            setFilteredUpazilas([]);
        }
    }, [selectedDistrictId, upazilas]);

    // ✅ Fetch user data after data loaded
    useEffect(() => {
        if (user?.email) {
            axiosInstanceIntercept.get(`/userMatchByEmail`)
                .then(res => {
                    setUserData(res.data);
                    const user = res.data
                    // Get district ID based on saved name
                    const selectedDistrict = districts.find(d => d.name === user.districtName);
                    const selectedUpazila = upazilas.find(u => u.name === user.upazila);
                    if (selectedDistrict) {
                        const filtered = upazilas.filter(u => u.district_id === selectedDistrict.id);
                        setFilteredUpazilas(filtered);
                    }
                    reset({
                        name: user.name ,
                        email: user.email,
                        image: user.photoURL,
                        district: selectedDistrict?.id,
                        upazila: selectedUpazila?.name ,
                        bloodGroup: user.bloodGroup 
                    });
                });
        }
    }, [user?.email, districts, upazilas, reset]);

    // ✅ Handle Update
    const onSubmit = data => {
        const selectedDistrict = districts.find(d => d.id === data.district);
        const selectedUpazila = upazilas.find(u => u.name === data.upazila);

        updateUserProfile({ displayName: data.name, photoURL: data.image })
            .then(() => {
                setUser({ ...user, displayName: data.name, photoURL: data.image })
            }).catch(error => {
                console.log(error)
            })

        const finalData = {
            ...data,
            districtName: selectedDistrict?.name,
            district: selectedDistrict?.id,
            upazila: selectedUpazila?.name,
        };

        axiosInstanceIntercept.put(`/update-profile?email=${data.email}`, finalData)
            .then(() => {
                successNotify();
                setEditable(false);
            });
    };
  // SHowing loader until data is fetching
    if (loading) {
        return <Spinner></Spinner>;
    }
    return (
        <>
            <div>
                <div className="max-w-6xl mx-auto px-4 py-10">
                    {/* Profile Header */}
                    <div className="bg-linear-to-r from-red-300 to-red-400 shadow-md p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 ">
                        <img src={user ? user.photoURL : "https://i.pravatar.cc/150?img=3"} alt="avatar" className="rounded-full w-32 h-32 border-4 border-red-500 object-cover" />
                        <div className="flex-1 text-white space-y-1">
                            <h2 className="text-2xl font-bold">{user.displayName}</h2>
                            <p className=" opacity-80 flex items-center gap-2 text-white"><FaRegEnvelope />{userData.email}</p>
                            <p className=" opacity-80 flex items-center gap-2 text-white"><FaMapMarkerAlt />{userData.upazila}, {userData.districtName}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="w-full flex justify-center p-6 ">
                <div className="w-full max-w-5xl bg-white rounded-2xl p-10 border border-gray-200 shadow-2xl shadow-red-400">
                    <div className="flex justify-end mb-6">
                        {!editable ? (
                            <button onClick={() => setEditable(true)} className={`py-2 px-4 transition rounded-lg font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>Edit Profie</button>
                        ) : (
                            <div className="flex gap-3">
                                <button onClick={handleSubmit(onSubmit)} className="btn btn-success">Update</button>
                                <button onClick={() => setEditable(false)} className="btn btn-outline">Cancel</button>
                            </div>
                        )}
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label font-semibold">Name</label>
                            <input
                                {...register("name")}
                                disabled={!editable}
                                className="input input-bordered w-full pl-10 text-black focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="label font-semibold">Email</label>
                            <input
                                {...register("email")}
                                disabled
                                className="input input-bordered w-full pl-10 text-black focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="label font-semibold">Avatar URL</label>
                            <input
                                {...register("image")}
                                disabled={!editable}
                                className="input input-bordered w-full pl-10 text-black focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="label font-semibold">District</label>
                            <select
                                {...register("district")}
                                disabled={!editable}
                                className="select select-bordered w-full text-black focus:outline-none focus:border-primary"
                            >
                                <option value="">Select district</option>
                                {districts.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="label font-semibold">Upazila</label>
                            <select
                                {...register("upazila")}
                                disabled={!editable}
                                className="select select-bordered w-full text-black focus:outline-none focus:border-primary"
                            >
                                <option value="">Select upazila</option>
                                {filteredUpazilas.map(u => (
                                    <option key={u.id} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="label font-semibold">Blood Group</label>
                            <select
                                {...register("bloodGroup")}
                                disabled={!editable}
                                className="select select-bordered w-full text-black focus:outline-none focus:border-primary"
                            >
                                <option value="">Select blood group</option>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                                    <option key={group} value={group}>{group}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
