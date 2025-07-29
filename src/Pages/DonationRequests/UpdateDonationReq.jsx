import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/Spinner";
import useRole from "../../Hooks/useRole";

const UpdateDonationReq = () => {
    const { loading } = use(AuthContext);
    const { role } = useRole()
    const { donation_id } = useParams();
    const axiosInstanceIntercept = useAxiosSecure();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [districtData, setDistrictData] = useState([]);
    const [upazilaData, setUpazilaData] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    useEffect(() => {
        axiosInstanceIntercept.get(`/districts`).then(res => setDistrictData(res.data));
        axiosInstanceIntercept.get(`/upazilas`).then(res => setUpazilaData(res.data));
        axiosInstanceIntercept.get(`/getDoantionReqData-forUpdate/${donation_id}`)
            .then(res => setFormData(res.data));
    }, [donation_id]);

    useEffect(() => {
        if (formData?.recipientDistrict) {
            const filtered = upazilaData.filter(u => u.district_id === formData.recipientDistrict);
            setFilteredUpazilas(filtered);
        }
    }, [formData.recipientDistrict, upazilaData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());

        axiosInstanceIntercept.put(`/update-donation-request/${donation_id}`, data)
            .then((res) => {
                if (res.data.modifiedCount) {
                    toast.success('Successfully updated donation request!', { theme: "colored" });
                    if (role === 'SupperAdmin' || role === 'Admin' || role === 'Volunteer') {
                        navigate('/dashboard/all-donation-requests');
                    } else {
                        navigate('/dashboard/my-donation-requests');
                    }
                }
            })
            .catch(err => console.error(err));
    };

    if (loading || !formData?.requesterName) {
        return <Spinner />;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-8">
            <h2 className="text-3xl font-bold text-center text-red-600">Update This Blood Donation Request</h2>

            {/* Requester Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                    <label className="label font-semibold">Requester Name</label>
                    <input
                        type="text"
                        name="requesterName"
                        defaultValue={formData.requesterName}
                        onChange={handleChange}
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>
                <div>
                    <label className="label font-semibold">Requester Email</label>
                    <input
                        type="email"
                        name="requesterEmail"
                        defaultValue={formData.requesterEmail}
                        disabled
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>
            </div>

            {/* Recipient Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                    <label className="label font-semibold">Recipient Name</label>
                    <input
                        type="text"
                        name="recipientName"
                        defaultValue={formData.recipientName}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label font-semibold">Recipient District</label>
                    <select
                        name="recipientDistrict"
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                        defaultValue={formData.recipientDistrict}
                    >
                        <option value="">Select District</option>
                        <option defaultValue={formData.recipientDistrict}>{formData.districtName}</option>
                        {districtData.map((dis) => (
                            <option key={dis._id} value={dis.id}>
                                {dis.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="label font-semibold">Recipient Upazila</label>
                    <select
                        name="recipientUpazila"
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                        defaultValue={formData.recipientUpazila}
                    >
                        <option value="">Select Upazila</option>
                        <option defaultValue={formData.recipientUpazila}>{formData.recipientUpazila}</option>
                        {filteredUpazilas.map((upazila) => (
                            <option key={upazila._id} value={upazila.name}>
                                {upazila.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="label font-semibold">Hospital Name</label>
                    <input
                        type="text"
                        name="hospitalName"
                        defaultValue={formData.hospitalName}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="label font-semibold">Full Address</label>
                    <input
                        type="text"
                        name="fullAddress"
                        defaultValue={formData.fullAddress}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
            </div>

            {/* Donation Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
                <div>
                    <label className="label font-semibold">Blood Group</label>
                    <select
                        name="bloodGroup"
                        defaultValue={formData.bloodGroup}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Blood Group</option>
                        <option defaultValue={formData.bloodGroup}>{formData.bloodGroup}</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="label font-semibold">Donation Date</label>
                    <input
                        type="date"
                        name="donationDate"
                        defaultValue={formData.donationDate}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label font-semibold">Donation Time</label>
                    <input
                        type="time"
                        name="donationTime"
                        defaultValue={formData.donationTime}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="label font-semibold">Request Message</label>
                    <textarea
                        name="requestMessage"
                        defaultValue={formData.requestMessage}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full h-32 resize-none"
                        required
                    />
                </div>
            </div>

            {/* Submit */}
            <div className="text-center">
                <button type="submit" className="btn btn-error px-10 text-white">
                    Update Request
                </button>
            </div>
        </form>
    );
};

export default UpdateDonationReq;
