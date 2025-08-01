import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Pagination from '../../Components/Pagination';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const RicentDonationReq = () => {
    const { user } = useContext(AuthContext);
    const axiosInstanceIntercept = useAxiosSecure();


    const [donationRequests, setDonationRequests] = useState([]);
    const successNotify = () =>
        toast.success('Your are successfully Update The Status for this Request.', {
            theme: "colored",
        });

    useEffect(() => {
        axiosInstanceIntercept.get(`/recent-donation-requestsByEmail?email=${user?.email}`).then((res) => {
            setDonationRequests(res.data);
        });
    }, [user]);

    // console.log(currentItems)
    const getStatusSelectColor = (status) => {
        switch (status) {
            case "Inprogress":
                return "bg-blue-100 text-blue-800 border border-blue-300";
            case "Done":
                return "bg-green-100 text-green-800 border border-green-300";
            case "Canceled":
                return "bg-red-100 text-red-800 border border-red-300";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    const handleStatusChange = (index, uId, value) => {
        const updatedUsers = [...donationRequests];
        updatedUsers[index].status = value;
        setDonationRequests(updatedUsers);

        const updatedData = updatedUsers[index]
        // console.log(updatedData)
        axiosInstanceIntercept.put(`/updateDonationRequestStatus/${uId}`, updatedData).then(res => {
            if (res.data.modifiedCount) {
                successNotify();
            }
        }).catch(err => {
            console.log(err)
        })
    };
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstanceIntercept.delete(`/donationReq-del/${id}`).then(res => {
                    if (res.data.deletedCount) {
                        const reminReq = donationRequests.filter(req => req._id !== id)
                        setDonationRequests(reminReq)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                }).catch(err => () => {
                    console.log(err)
                })
            }
        });
    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto pb-4">
                <h1 className="text-2xl font-semibold p-2">Recent Donation Requests</h1>
                <div className='flex flex-col mt-3 md:mt-0 me-4 md:flex-row justify-between items-center'>
                    <h1 className="text-lg font-semibold p-2">You can Change The status or any Actions <span className='text-red-600'>one time when it &quot;Inprogress&quot;</span></h1>
                </div>
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg border-gray-300">
                        <table className="table-auto min-w-full rounded-xl">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Requester Details</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Recipient Name</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Recipient Location</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Hospital Name</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Donate Date/Time</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Blood Group</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Donation Status</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-300">
                                {
                                    donationRequests.length <= 0
                                        ? <tr><td colSpan={8}><div><h1 className="text-2xl font-semibold p-2 text-center">No Donation Request Found</h1></div></td></tr>
                                        :
                                        donationRequests.map((doantionReq, index) =>
                                            <tr key={doantionReq._id} className="bg-white hover:bg-gray-50 transition-all duration-300">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={doantionReq.requesterPhotoUrl} alt="Requester" className="w-10 h-10 rounded-full" />
                                                        <div>
                                                            <p className="text-sm text-gray-900">{doantionReq.requesterName}</p>
                                                            <p className="text-xs text-gray-400">{doantionReq.requesterEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-sm text-gray-900">{doantionReq.recipientName}</td>
                                                <td className="px-5 py-4 text-sm text-gray-900">{doantionReq.fullAddress},{doantionReq.recipientUpazila},{doantionReq.districtName}</td>
                                                <td className="px-5 py-4 text-sm text-gray-900">{doantionReq.hospitalName}</td>
                                                <td className="px-5 py-4 text-sm text-gray-900">
                                                    <div className='flex flex-col'>
                                                        <span>Date - {new Date(doantionReq.donationDate).toLocaleDateString("en-GB")}</span>
                                                        <span>Time - {(doantionReq.donationTime)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-sm text-gray-900">{doantionReq.bloodGroup}(ve)</td>
                                                <td className="px-5 py-4">
                                                    <select
                                                        disabled={doantionReq.status !== 'Inprogress'}
                                                        value={doantionReq.status}
                                                        onChange={(e) => handleStatusChange(index, doantionReq._id, e.target.value)}
                                                        className={`px-3 py-1 text-xs rounded-xl focus:outline-none appearance-none border ${getStatusSelectColor(doantionReq.status)}`}
                                                    >
                                                        <option value="">Select Status</option>
                                                        <option value="Inprogress">Inprogress</option>
                                                        <option value="Done">Done</option>
                                                        <option value="Canceled">Canceled</option>
                                                    </select>
                                                </td>
                                                <td className="px-5 py-4 flex gap-2">
                                                    <Link to={`/dashboard/updateDonationReq/${doantionReq._id}`}>
                                                        <button disabled={doantionReq.status !== 'Inprogress'} className="p-2 rounded-full bg-white group hover:bg-indigo-600 transition duration-300 cursor-pointer">
                                                            <HiPencil className="text-indigo-500 group-hover:text-white" size={18} />
                                                        </button>
                                                    </Link>
                                                    <button disabled={doantionReq.status !== 'Inprogress'} onClick={() => handleDelete(doantionReq._id)} className="p-2 rounded-full bg-white group hover:bg-red-600 transition duration-300 cursor-pointer">
                                                        <HiTrash className="text-red-600 group-hover:text-white" size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                    <Link to={'/dashboard/my-donation-requests'}>
                        <button className={`mt-4 py-2 px-4 transition rounded-md font-semibold text-red-600 border border-red-600 cursor-pointer hover:shadow-[0_0_0_1px_#f00,0_5px_0_0_#f01]`}>
                            View All Donation Requests
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RicentDonationReq;
