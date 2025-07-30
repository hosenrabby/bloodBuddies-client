import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { useNavigate, useParams } from 'react-router';

const UpdateContent = () => {
    const { content_id } = useParams();
    const axiosInstanceIntercept = useAxiosSecure();

    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
const navigate = useNavigate()
    // Fetch existing content for update
    useEffect(() => {
        axiosInstanceIntercept.get(`/getContentData-forUpdate/${content_id}`)
            .then(res => {
                const data = res.data;
                setTitle(data?.title || '');
                setThumbnail(data?.thumbnail || '');
                setContent(data?.content || '');
            })
            .catch(err => console.error("Error loading content:", err));
    }, [content_id, axiosInstanceIntercept]);

    const successNotify = () =>
        toast.success('Blog updated successfully.', {
            theme: "colored",
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        const updateDate = new Date().toDateString();
        const updatedData = {
            title,
            thumbnail,
            content,
            updatedDate: updateDate,
        };
        axiosInstanceIntercept.put(`/update-blog/${content_id}`, updatedData)
            .then((res) => {
                if (res.data.modifiedCount) {
                    successNotify();
                    navigate('/dashboard/manage-content')
                }
            })
            .catch(err => console.error("Update failed:", err));
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl mt-8 shadow-2xl shadow-red-400">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Update Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title & Thumbnail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-2">Blog Title</label>
                        <input
                            type="text"
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

                {/* Rich Text Editor */}
                <div>
                    <label className="block font-medium mb-2">Blog Content</label>
                    <JoditEditor
                        value={content}
                        tabIndex={1}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-error px-6 text-white font-semibold"
                    >
                        Update Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateContent;
