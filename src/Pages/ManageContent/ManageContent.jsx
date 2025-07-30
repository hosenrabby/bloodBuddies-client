import React, { use, useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import Pagination from '../../Components/Pagination';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useRole from '../../Hooks/useRole';

const ManageContent = () => {
    const { user } = use(AuthContext);
    const { role } = useRole()
    const axiosInstanceIntercept = useAxiosSecure()

    const formRef = useRef();
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const fetchPaginatedData = async () => {
            try {
                const res = await axiosInstanceIntercept.get(`/paginated-all-blogs?startIndex=${startIndex}&endIndex=${endIndex}`);
                setBlogs(res.data.data); // server response: { data, total, ... }
                setTotalPages(Math.ceil(res.data.total / itemsPerPage));
            } catch (error) {
                console.error("Error fetching paginated data:", error);
            }
        };

        fetchPaginatedData();
    }, [currentPage]);

    const successNotify = () =>
        toast.success('Your are successfully Create Blog.', {
            theme: "colored",
        });
    const statusNotify = () =>
        toast.success('Your are successfully Update the Status.', {
            theme: "colored",
        });
    const getStatusSelectColor = (status) => {
        switch (status) {
            case 'Published':
                return 'bg-green-100 text-green-800 border border-green-300';
            case 'Unpublished':
                return 'bg-red-100 text-red-800 border border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-300';
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const createDate = new Date().toDateString()
        const blogData = { title, thumbnail, content, createDate, creatorName: user?.displayName, creatorEmail: user?.email, creatorPhoto: user?.photoURL, status: "Unpublished" };
        // console.log(blogData);

        axiosInstanceIntercept.post('/create-blog', blogData).then((res) => {
            if (res.data.insertedId) {
                setBlogs(prev => [...prev, blogData]);
                successNotify();
                setModalOpen(false)
                formRef.current.reset();
            }
        }).catch(err => console.log(err.data))

    };
    const handleFilterChange = (e) => {
        const filterStatus = e.target.value
        // console.log(filterStatus)
        axiosInstanceIntercept.get(`/filteringBlogStatus?filterValue=${filterStatus}`,).then(res => setBlogs(res.data))
    }
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const handleStatusChange = (index, uId, value) => {
        const updatedBlogs = [...blogs];
        updatedBlogs[index].status = value;
        setBlogs(updatedBlogs);

        const updatedData = updatedBlogs[index]
        // console.log(updatedData)
        axiosInstanceIntercept.put(`/updateBlogstStatus/${uId}`, updatedData).then(res => {
            if (res.data.modifiedCount) {
                statusNotify();
            }
        }).catch(err => {
            console.log(err)
        })
    };
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
                axiosInstanceIntercept.delete(`/blogs-del/${id}`).then(res => {
                    if (res.data.deletedCount) {
                        const reminReq = blogs.filter(req => req._id !== id)
                        setBlogs(reminReq)
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
        <>
            <div className='flex justify-end items-center'>
                <button onClick={() => setModalOpen(true)} className={`py-2 px-4 transition rounded-md font-semibold text-red-600 border border-red-600 cursor-pointer hover:shadow-[0_0_0_1px_#f00,0_5px_0_0_#f01]`}>
                    Add Blog
                </button>

                <dialog open={modalOpen} className="modal">
                    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
                        <div className='flex justify-between'>
                            <h2 className="text-2xl font-bold mb-6 text-center">Create New Blog</h2>
                            <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-error">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title & Thumbnail - 1 row 2 column */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-medium mb-2">Blog Title</label>
                                    <input type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter blog title"
                                        className="w-full input input-bordered"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-2">Thumbnail Image URL</label>
                                    <input
                                        type="text"
                                        value={thumbnail}
                                        onChange={(e) => setThumbnail(e.target.value)}
                                        placeholder="Paste thumbnail image URL"
                                        className="w-full input input-bordered"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Rich Text Content Editor */}
                            <div>
                                <label className="block font-medium mb-2">Blog Content</label>
                                <JoditEditor
                                    value={content}
                                    tabIndex={1}
                                    onChange={(newContent) => setContent(newContent)}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button type='submit' className={`py-2 px-4 transition rounded-md font-semibold text-red-600 border border-red-600 cursor-pointer hover:shadow-[0_0_0_1px_#f00,0_5px_0_0_#f01]`}>
                                    Create Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
            <div className="overflow-x-auto pb-4">
                <h1 className="text-2xl font-semibold p-2">All Blogs Data</h1>
                <div className='flex flex-col mt-3 md:mt-0 me-4 md:flex-row justify-between items-center'>
                    <h1 className="text-lg font-semibold p-2">You can Change Blogs Status</h1>
                    <div>
                        <select
                            onChange={handleFilterChange}
                            className="select select-sm">
                            <option value={'All'}>Filter By Status</option>
                            {["Published", "Unpublished"].map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg border-gray-300">
                        <table className="table-auto min-w-full rounded-xl">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Creator Info</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Contant Thambnail</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Contant Title</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Create Date</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Content Status</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-300 items-center">
                                {
                                    blogs.length <= 0
                                        ? <tr><td colSpan={8}><div><h1 className="text-2xl font-semibold p-2 text-center">No Blogs data Found</h1></div></td></tr>
                                        : blogs.map((blogs, index) =>
                                            <tr key={blogs?._id} className="bg-white hover:bg-gray-50 transition-all duration-300">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src={blogs?.creatorPhoto} alt="Requester" className="w-10 h-10 rounded-lg" />
                                                        <div>
                                                            <p className="text-sm text-gray-900">{blogs?.creatorName}</p>
                                                            <p className="text-xs text-gray-400">{blogs.creatorEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <img src={blogs?.thumbnail} alt="Requester" className="w-10 h-10 rounded-lg" />
                                                </td>
                                                <td className="px-5 py-4 text-sm text-gray-900">{blogs?.title}</td>
                                                <td className="px-5 py-4 text-sm text-gray-900">{blogs?.createDate}</td>
                                                <td className="px-5 py-4">
                                                    <select
                                                        disabled={role === 'Volunteer'}
                                                        value={blogs?.status}
                                                        onChange={(e) => handleStatusChange(index, blogs._id, e.target.value)}
                                                        className={`px-3 py-1 text-xs rounded-xl focus:outline-none appearance-none border ${getStatusSelectColor(blogs?.status)}`}
                                                    >
                                                        <option value="Published">Published</option>
                                                        <option value="Unpublished">Unpublished</option>
                                                    </select>
                                                </td>
                                                <td className="px-5 py-4 flex gap-2">
                                                    <Link to={`/dashboard/update-Content/${blogs._id}`}>
                                                        <button className="p-2 rounded-full bg-white group hover:bg-indigo-600 transition duration-300 cursor-pointer">
                                                            <HiPencil className="text-indigo-500 group-hover:text-white" size={18} />
                                                        </button>
                                                    </Link>
                                                    {
                                                        role !== 'Volunteer' &&
                                                        <button onClick={() => handleDelete(blogs._id)} className="p-2 rounded-full bg-white group hover:bg-red-600 transition duration-300 cursor-pointer">
                                                            <HiTrash className="text-red-600 group-hover:text-white" size={18} />
                                                        </button>
                                                    }
                                                </td>
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
            </div>

        </>
    );
};

export default ManageContent;