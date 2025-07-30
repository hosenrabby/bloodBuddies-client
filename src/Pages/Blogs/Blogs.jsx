import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Pagination from "../../Components/Pagination";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/Spinner";

const BlogPosts = () => {
    const { loading } = use(AuthContext)
    const [currentPage, setCurrentPage] = useState(1);
    const axiosInstanceIntercept = useAxiosSecure()
    const itemsPerPage = 6;
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const fetchPaginatedData = async () => {
            try {
                const res = await axiosInstanceIntercept.get(`/paginated-all-blogsByPublished?startIndex=${startIndex}&endIndex=${endIndex}`);
                setBlogs(res.data.data); // server response: { data, total, ... }
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

    const getPlainText = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };
    if (loading) return <Spinner />;
    return (
        <div className="max-w-screen-lg mx-auto p-5 sm:p-10 md:p-16">
            {blogs.map((blog, idx) => (
                <div key={idx} className="mb-10 rounded overflow-hidden flex flex-col mx-auto">
                    <Link
                        to={`/blog/${blog._id}`}
                        className="text-xl sm:text-4xl font-semibold inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
                    >
                        {blog.title}
                    </Link>

                    <div className="relative">
                        <Link to={`/blog/${blog._id}`}>
                            <img
                                className="w-full object-cover max-h-[450px]"
                                src={blog.thumbnail}
                                alt={blog.title}
                            />
                        </Link>

                        <span className="hidden sm:flex absolute z-10 bottom-0 left-0 bg-indigo-600 px-6 m-2 py-2 text-white text-xs items-center">
                            <span className="text-lg">|</span>&nbsp;&nbsp;<span>Blood Donation</span>
                        </span>

                        <Link
                            to={`/blog/${blog._id}`}
                            className="hidden sm:flex absolute z-10 bottom-0 right-0 bg-indigo-600 px-6 m-2 py-2 text-white text-xs items-center hover:bg-white hover:text-indigo-600 transition"
                        >
                            <span className="text-lg">|</span>&nbsp;&nbsp;<span>Read More</span>
                        </Link>
                    </div>


                    <p className="text-gray-700 py-5 text-base leading-8">
                        {getPlainText(blog.content).slice(0, 200)}...
                    </p>

                    <div className="py-5 text-sm font-regular text-gray-900 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <svg className="text-indigo-600" fill="currentColor" height="13px" width="13px" viewBox="0 0 512 512">
                                <path d="M256,0C114.8,0,0,114.8,0,256s114.8,256,256,256s256-114.8,256-256S397.2,0,256,0z M277.3,256 c0,11.8-9.5,21.3-21.3,21.3h-85.3c-11.8,0-21.3-9.5-21.3-21.3s9.5-21.3,21.3-21.3h64v-128c0-11.8,9.5-21.3,21.3-21.3 s21.3,9.5,21.3,21.3V256z" />
                            </svg>
                            <span>{blog.timeAgo || "Just now"}</span>
                        </span>

                        <span className="flex items-center gap-2 hover:text-indigo-600">
                            <svg className="text-indigo-600" fill="currentColor" height="16px" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2 c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span>{blog.creatorName}</span>
                        </span>
                    </div>

                    <hr />
                </div>
            ))}
            <div>
                <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default BlogPosts;
