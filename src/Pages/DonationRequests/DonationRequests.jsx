import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Components/Spinner';
import { toast } from 'react-toastify';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Pagination from '../../Components/Pagination';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import useRole from '../../Hooks/useRole';

const DonationReq = () => {
    const { loading } = useContext(AuthContext);
    const { role } = useRole()
    const axiosInstanceIntercept = useAxiosSecure();

    const successNotify = () =>
        toast.success('Your are successfully Update The Status for this Request.', {
            theme: "colored",
        });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [donationRequests, setDonationRequests] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const fetchPaginatedData = async () => {
            try {
                const res = await axiosInstanceIntercept.get(`/paginated-donation-requests?startIndex=${startIndex}&endIndex=${endIndex}`);
                setDonationRequests(res.data.data); // server response: { data, total, ... }
                setTotalPages(Math.ceil(res.data.total / itemsPerPage));
            } catch (error) {
                console.error("Error fetching paginated data:", error);
            }
        };

        fetchPaginatedData();
    }, [currentPage]);
    const getStatusSelectColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-200 text-yellow-800 border-yellow-300"
            case "Inprogress":
                return "bg-blue-200 text-blue-800 border-blue-300";
            case "Done":
                return "bg-green-200 text-green-800 border-green-300";
            case "Canceled":
                return "bg-red-200 text-red-800 border-red-300";
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

    const handleFilterChange = (e) => {
        const filterStatus = e.target.value
        // console.log(filterStatus)
        axiosInstanceIntercept.get(`/filteringDonationStatus?filterValue=${filterStatus}`,).then(res => setDonationRequests(res.data))
    }
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
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="w-full md:w-11/12 mx-auto mt-4 p-4">
            <h1 className="text-2xl font-semibold p-2">All Donation Requests</h1>
            <div className='flex flex-col mt-3 md:mt-0 me-4 md:flex-row justify-between items-center mb-1.5'>
                <h1 className="text-lg font-semibold p-2">You can Change Donation Status</h1>
                <div>
                    <select
                        onChange={handleFilterChange}
                        className="select select-sm">
                        <option value={'All'}>Filter By Status</option>
                        {["Pending", "Inprogress", "Done", "Cancled"].map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto border rounded-lg border-gray-300 ">
                <table className="table-auto w-full rounded-xl">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Requester Details</th>
                            <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Recipient Name</th>
                            <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Recipient Location</th>
                            <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Donor Info</th>
                            <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Hospital Name</th>
                            <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Donate Date/Time</th>
                            <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Blood Group</th>
                            <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Change Status</th>
                            {role !== 'Volunteer' &&
                                <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Actions</th>
                            }
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
                                        <td className="px-5 py-4 text-sm text-gray-900">{doantionReq.fullAddress}, {doantionReq.recipientUpazila}, {doantionReq.districtName}</td>
                                        <td className="px-5 py-4 text-sm text-gray-900">{doantionReq.donorName ? doantionReq.donorName + " | " + doantionReq.donoremail : "No Donor Info"}</td>
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
                                                value={doantionReq.status}
                                                onChange={(e) => handleStatusChange(index, doantionReq._id, e.target.value)}
                                                className={`px-3 py-1 text-xs rounded-xl focus:outline-none appearance-none border ${getStatusSelectColor(doantionReq.status)}`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Inprogress">Inprogress</option>
                                                <option value="Done">Done</option>
                                                <option value="Canceled">Canceled</option>
                                            </select>
                                        </td>
                                        {
                                            role !== 'Volunteer' &&
                                            <td className="px-5 py-4 flex gap-2">
                                                <Link to={`/dashboard/updateDonationReq/${doantionReq._id}`}>
                                                    <button className="p-2 rounded-full bg-white group hover:bg-indigo-600 transition duration-300 cursor-pointer">
                                                        <HiPencil className="text-indigo-500 group-hover:text-white" size={18} />
                                                    </button>
                                                </Link>
                                                <button onClick={() => handleDelete(doantionReq._id)} className="p-2 rounded-full bg-white group hover:bg-red-600 transition duration-300 cursor-pointer">
                                                    <HiTrash className="text-red-600 group-hover:text-white" size={18} />
                                                </button>
                                            </td>
                                        }
                                    </tr>
                                )
                        }

                    </tbody>
                </table>
            </div>
            <div>
                <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default DonationReq;
