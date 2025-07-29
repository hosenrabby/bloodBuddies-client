import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/Spinner";

const UpdateDonationReq = () => {
    const { loading } = use(AuthContext);
    const { donation_id } = useParams()
    const axiosInstanceIntercept = useAxiosSecure()
    const { register, handleSubmit, watch, reset } = useForm();

    const [donationData, setDonationData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [upazilaData, setUpazilaData] = useState([]);
    const selectedDistrictId = watch("recipientDistrict");
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axiosInstanceIntercept.get(`/districts`).then(res => setDistrictData(res.data));
        axiosInstanceIntercept.get(`/upazilas`).then(res => setUpazilaData(res.data));
        axiosInstanceIntercept.get(`/getDoantionReqData-forUpdate/${donation_id}`).then(res => setDonationData(...res.data));
    }, [districtData,upazilaData]);

    useEffect(() => {
        if (selectedDistrictId) {
            const filtered = upazilaData.filter(u => u.district_id === selectedDistrictId);
            setFilteredUpazilas(filtered);
        }
    }, [selectedDistrictId])



    useEffect(() => {
        if (selectedDistrictId) {
            const matched = districtData.find(d => d.id === selectedDistrictId);
            if (matched) {
                const filtered = upazilaData.filter(u => u.district_id === matched.id);
                setFilteredUpazilas(filtered);
            }
        }
    }, [selectedDistrictId, districtData, upazilaData]);
    const successNotify = () =>
        toast.success('Your are successfully Created a Donation Request.', {
            theme: "colored",
        });
    const onSubmit = (data) => {
        axiosInstanceIntercept.put(`/update-donation-request/${donation_id}`, data).then((res) => {
            // console.log(res.data)
            if (res.data.modifiedCount) {
                successNotify();
                navigate('/dashboard/all-donation-requests')
            }
        }).catch(err => console.log(err.data))
    };
    // SHowing loader until data is fetching
    if (loading) {
        return <Spinner></Spinner>;
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-8">
            <h2 className="text-3xl font-bold text-center text-red-600">Update This Blood Donation Request</h2>

            {/* Part 1: Requester Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                    <label className="label font-semibold">Requester Name</label>
                    <input
                        type="text"
                        {...register("requesterName")}
                        defaultValue={donationData.requesterName}
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>
                <div>
                    <label className="label font-semibold">Requester Email</label>
                    <input disabled
                        type="email"
                        {...register("requesterEmail")}
                        defaultValue={donationData.requesterEmail}
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>
            </div>

            {/* Part 2: Recipient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                    <label className="label font-semibold">Recipient Name</label>
                    <input
                        defaultValue={donationData.recipientName}
                        type="text" required
                        placeholder="Enter recipient name"
                        {...register("recipientName")}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label font-semibold">Recipient District</label>
                    <select {...register("recipientDistrict")}
                        className="select select-bordered w-full" required
                    // defaultValue={donationData.districtName}
                    >
                        <option value="">Select District</option>
                        <option selected value={donationData.recipientDistrict}>{donationData.districtName}</option>
                        {districtData.map((dis) => (<option key={dis._id} value={dis.id}>{dis.name}</option>))}
                    </select>
                </div>
                <div>
                    <label className="label font-semibold">Recipient Upazila</label>
                    <select
                        {...register("recipientUpazila")}
                        className="select select-bordered w-full" required
                        defaultValue={donationData.recipientUpazila}
                    >
                        <option value="">Select Upazila</option>
                        <option selected value={donationData.recipientUpazila}>{donationData.recipientUpazila}</option>
                        {filteredUpazilas.map((upazila) => (<option key={upazila._id} value={upazila.name}> {upazila.name}</option>))}
                    </select>
                </div>
                <div>
                    <label className="label font-semibold">Hospital Name</label>
                    <input type="text" placeholder="e.g. Dhaka Medical College Hospital"
                        {...register("hospitalName")}
                        defaultValue={donationData.hospitalName} required
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="label font-semibold">Full Address</label>
                    <input type="text" placeholder="e.g. Zahir Raihan Rd, Dhaka"
                        {...register("fullAddress")} required
                        defaultValue={donationData.fullAddress}
                        className="input input-bordered w-full"
                    />
                </div>
            </div>

            {/* Part 3: Donation Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                    <label className="label font-semibold">Blood Group</label>
                    <select {...register("bloodGroup")} required
                        className="select select-bordered w-full"
                        defaultValue={donationData.bloodGroup}
                    >
                        <option value="">Select Blood Group</option>
                        <option selected value={donationData.bloodGroup}>{donationData.bloodGroup}</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                            <option key={group} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="label font-semibold">Donation Date</label>
                    <input type="date"
                        {...register("donationDate")} required
                        defaultValue={donationData.donationDate}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label font-semibold">Donation Time</label>
                    <input type="time"
                        {...register("donationTime")} required
                        defaultValue={donationData.donationTime}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="label font-semibold">Request Message</label>
                    <textarea
                        defaultValue={donationData.requestMessage}
                        {...register("requestMessage")} required
                        className="textarea textarea-bordered w-full h-32 resize-none"
                        placeholder="Explain why you need blood in detail..."
                    ></textarea>
                </div>
            </div>
            {/* Submit Button */}
            <div className="text-center">
                <button type="submit" className="btn btn-error px-10 text-white">
                    Update Request
                </button>
            </div>
        </form>
    );
};

export default UpdateDonationReq;
