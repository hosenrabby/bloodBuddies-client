import React, { use, useEffect, useState } from 'react';
import StripeProvider from '../../Stripe/StripeProvider';
import PaymentForm from '../../Stripe/PaymentForm';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Pagination from '../../Components/Pagination';
import { AuthContext } from '../../Context/AuthContext';

const Funds = () => {
    const axiosInstanceIntercept = useAxiosSecure();
    const {user} = use(AuthContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [donateAmount, setDonateAmount] = useState(0)
    const [totalFundsData, setTotalFundsData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const fetchPaginatedData = async () => {
            try {
                const res = await axiosInstanceIntercept.get(`/paginated-all-FundsByEmail?startIndex=${startIndex}&endIndex=${endIndex}`);
                setTotalFundsData(res.data.data); // server response: { data, total, ... }
                setTotalPages(Math.ceil(res.data.total / itemsPerPage));
            } catch (error) {
                console.error("Error fetching paginated data:", error);
            }
        };

        fetchPaginatedData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    return (
        <>
            <div className="relative bg-cover bg-center flex items-center min-h-[500px] mt-[-98px] md:mt-[-149px] lg:mt-[-100px]" style={{ backgroundImage: "url('/assets/banner.webp')" }}>
                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
                {/* Content */}
                <div className="z-10 mt-20 md:mt-0 md:text-left w-9/12 mx-auto space-y-3">
                    <h1 className="text-3xl md:text-6xl text-center font-bold coiny-regular text-white"> Your Donation Can Be Someone’s Hope.</h1>
                    <div className='flex justify-center items-center mt-6'>
                        <button onClick={() => setModalOpen(true)} className={`py-2 px-4 transition rounded-md font-semibold text-white border border-red-600 cursor-pointer hover:shadow-[0_0_0_1px_#f00,0_5px_0_0_#f01]`}>
                            Donate Now
                        </button>
                    </div>
                </div>
                <dialog open={modalOpen} className="modal">
                    <div className="min-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl">
                        <div className='flex justify-between'>
                            <div></div>
                            <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-error">✕</button>
                        </div>
                        <div className="space-y-6">
                            {/* Title & Thumbnail - 1 row 2 column */}
                            <div className="">
                                <div className='max-w-[85%] mx-auto'>
                                    <label className="block font-medium mb-1">Donate Amount</label>
                                    <input onChange={(e) => setDonateAmount(e.target.value)} value={donateAmount} type="number" name='donorName' className="w-full input input-bordered mb-2" />
                                </div>
                            </div>
                            <StripeProvider><PaymentForm donateAmount={donateAmount} setModalOpen={setModalOpen}></PaymentForm></StripeProvider>
                        </div>
                    </div>
                </dialog>
            </div>
            <div className='my-6'>
                <h1 className='text-4xl font-semibold text-center'>Your Funding Amount</h1>
            </div>
            <div className="w-7/12 mx-auto border border-gray-400 rounded-xl overflow-x-auto">
                <table className="table min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900">User Details</th>
                            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900">Donate Date</th>
                            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900">Donate Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {totalFundsData.map((fundData, index) => (
                            <tr key={fundData._id} className="bg-white hover:bg-gray-50 transition">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={user.photoURL} alt={user.displayName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.displayName}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{fundData.currentDate}</td>
                                <td className="px-4 py-3">${fundData.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="my-6">
                <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </>
    );
};

export default Funds;