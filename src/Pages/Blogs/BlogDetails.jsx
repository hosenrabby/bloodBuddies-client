import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Spinner from "../../Components/Spinner";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const BlogDetails = () => {
    const { loading } = use(AuthContext)
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const axiosInstanceIntercept = useAxiosSecure()
    const navigate = useNavigate()
    useEffect(() => {
        axiosInstanceIntercept.get(`/blog-details/${id}`).then(res => {
            setBlog(res.data);
        })
    }, [id]);

    if (loading) return <Spinner />;

    if (!blog) return <p className="text-center py-10">Blog not found.</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

            <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                <p>By <span className="font-medium">{blog.creatorName}</span></p>
                <p>{new Date(blog.createDate).toDateString()}</p>
            </div>

            {blog.thumbnail && (
                <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full max-h-[500px] object-cover rounded mb-6"
                />
            )}

            <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <button onClick={() => navigate(-1)} className={`py-2 px-4 transition rounded-md font-semibold text-red-600 border border-red-600 cursor-pointer hover:shadow-[0_0_0_1px_#f00,0_5px_0_0_#f01]`}>
                Back To Blogs
            </button>
        </div>
    );
};

export default BlogDetails;
