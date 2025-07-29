import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AddDonationReq = () => {
    const { user } = use(AuthContext);
    const axiosInstanceIntercept = useAxiosSecure()
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset, } = useForm();

    const [districtData, setDistrictData] = useState([]);
    const [upazilaData, setUpazilaData] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const selectedDistrictId = watch("recipientDistrict");
    const selectedDistrict = districtData.find(div => div.id === String(selectedDistrictId));
    const districtName = selectedDistrict?.name

    const navigate = useNavigate()
    useEffect(() => {
        axiosInstanceIntercept.get(`/districts`).then(res => setDistrictData(res.data));
        axiosInstanceIntercept.get(`/upazilas`).then(res => setUpazilaData(res.data));
    }, []);

    useEffect(() => {
        if (selectedDistrict) {
            const matchedupazila = upazilaData.filter(
                (upazila) => upazila.district_id === selectedDistrict.id
            );
            setFilteredUpazilas(matchedupazila);
            setValue("recipientUpazila", ""); // reset district selection
        }
        if (user?.displayName) {
            setValue("requesterName", user.displayName);
            setValue("requesterEmail", user.email);
        }
    }, [selectedDistrict, upazilaData, setValue, user]);

    const successNotify = () =>
        toast.success('Your are successfully Created a Donation Request.', {
            theme: "colored",
        });
    const onSubmit = (data) => {
        const formData = { ...data, districtName, requesterPhotoUrl: user?.photoURL };

        axiosInstanceIntercept.post('/add-donation-request', formData).then((res) => {
            if (res.data.insertedId) {
                successNotify();
                navigate('/dashboard/all-donation-requests')
            }
        }).catch(err => console.log(err.data))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-8">
            <h2 className="text-3xl font-bold text-center text-red-600"> Blood Donation Request</h2>

            {/* Part 1: Requester Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                    <label className="label font-semibold">Requester Name</label>
                    <input
                        type="text"
                        readOnly
                        {...register("requesterName")}
                        defaultValue={user?.displayName}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="label font-semibold">Requester Email</label>
                    <input
                        type="email"
                        readOnly
                        {...register("requesterEmail")}
                        value={user?.email}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>
            </div>

            {/* Part 2: Recipient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                    <label className="label font-semibold">Recipient Name</label>
                    <input
                        type="text"
                        placeholder="Enter recipient name"
                        {...register("recipientName", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.recipientName && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>
                <div>
                    <label className="label font-semibold">Recipient District</label>
                    <select {...register("recipientDistrict", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select District</option>
                        {districtData.map((dis) => (<option key={dis._id} value={dis.id}>{dis.name}</option>))}
                    </select>
                    {errors.recipientDistrict && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>
                <div>
                    <label className="label font-semibold">Recipient Upazila</label>
                    <select
                        {...register("recipientUpazila", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map((upazila) => (<option key={upazila._id} value={upazila.name}> {upazila.name}</option>))}
                    </select>
                    {errors.recipientUpazila && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>
                <div>
                    <label className="label font-semibold">Hospital Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Dhaka Medical College Hospital"
                        {...register("hospitalName", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.hospitalName && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>
                <div className="md:col-span-2">
                    <label className="label font-semibold">Full Address</label>
                    <input
                        type="text"
                        placeholder="e.g. Zahir Raihan Rd, Dhaka"
                        {...register("fullAddress", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.fullAddress && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>
            </div>

            {/* Part 3: Donation Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                    <label className="label font-semibold">Blood Group</label>
                    <select {...register("bloodGroup", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                            <option key={group} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>
                    {errors.bloodGroup && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>
                <div>
                    <label className="label font-semibold">Donation Date</label>
                    <input
                        type="date"
                        {...register("donationDate", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.donationDate && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>
                <div>
                    <label className="label font-semibold">Donation Time</label>
                    <input
                        type="time"
                        {...register("donationTime", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.donationTime && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>
                <div className="md:col-span-2">
                    <label className="label font-semibold">Request Message</label>
                    <textarea
                        {...register("requestMessage", { required: true })}
                        className="textarea textarea-bordered w-full h-32 resize-none"
                        placeholder="Explain why you need blood in detail..."
                    ></textarea>
                    {errors.requestMessage && (
                        <p className="text-red-500 text-sm">This field is required</p>
                    )}
                </div>
            </div>

            {/* Hidden Status */}
            <input type="hidden" value="Pending" {...register("status")} />

            {/* Submit Button */}
            <div className="text-center">
                <button type="submit" className="btn btn-error px-10 text-white">
                    Send Request
                </button>
            </div>
        </form>
    );
};

export default AddDonationReq;
