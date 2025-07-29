import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Spinner from '../../Components/Spinner';
import { toast } from 'react-toastify';
import Pagination from '../../Components/Pagination';

const AllUsers = () => {
    const { user, loading } = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const axiosInstanceIntercept = useAxiosSecure();

    const successNotify = () =>
        toast.success('Your are successfully Update The Role/Status for this user.', {
            theme: "colored",
        });
    useEffect(() => {
        if (user) {
            axiosInstanceIntercept.get('/usermatchByAdmin').then((res) => {
                setUserData(res.data);
            });
        }
    }, [user]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(userData.length / itemsPerPage);
    const currentItems = userData.slice(startIndex, endIndex);

    // Utility functions
    const getSelectColor = (role) => {
        switch (role) {
            case 'Admin':
                return 'bg-green-200 text-green-800 border-green-300';
            case 'Volunteer':
                return 'bg-yellow-200 text-yellow-800 border-yellow-300';
            case 'Donor':
                return 'bg-purple-200 text-purple-800 border-purple-300';
            default:
                return 'text-gray-700 border-gray-300';
        }
    };

    const getStatusSelectColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-200 text-green-800 border-green-300';
            case 'Block':
                return 'bg-red-200 text-red-800 border-red-300';
            default:
                return 'text-gray-700 border-gray-300';
        }
    };


    const handleRoleChange = (index, uId, value) => {
        const updatedUsers = [...userData];
        updatedUsers[index].role = value;
        setUserData(updatedUsers);

        const updatedData = updatedUsers[index]
        // console.log(updatedData)
        axiosInstanceIntercept.put(`/updateRoleOrStatus/${uId}`, updatedData).then(res => {
            if (res.data.modifiedCount) {
                successNotify();
            }
        }).catch(err => {
            console.log(err)
        })
    };

    const handleStatusChange = (index, uId, value) => {
        const updatedUsers = [...userData];
        updatedUsers[index].status = value;
        setUserData(updatedUsers);

        const updatedData = updatedUsers[index]
        axiosInstanceIntercept.put(`/updateRoleOrStatus/${uId}`, updatedData).then(res => {
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
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="w-full md:w-10/12 mx-auto mt-4 p-4">
            <div className="overflow-x-auto border border-gray-400 rounded-xl">
                <h1 className="text-2xl font-semibold p-2">All Users Details</h1>
                <h1 className="text-lg font-semibold p-2">You can Change users Role And Status</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>User Details</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((user, index) => (
                            <tr key={user._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoURL} alt={user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(index, user._id, e.target.value)}
                                        className={`px-3 py-1 text-xs rounded-xl focus:outline-none appearance-none border ${getSelectColor(user.role)}`}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Volunteer">Volunteer</option>
                                        <option value="Donor">Donor</option>
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={user.status}
                                        onChange={(e) => handleStatusChange(index, user._id, e.target.value)}
                                        className={`px-3 py-1 text-xs rounded-xl focus:outline-none appearance-none border ${getStatusSelectColor(user.status)}`}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Block">Blocked</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>User Details</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default AllUsers;
