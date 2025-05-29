import React from 'react'
import { useState } from 'react';
import { axiosInstance } from '../utils/axiosInstance';

function Url() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
        if (!url.trim()) {
        setError("You cannot leave the URL empty");
        return;
    }
        setLoading(true);
        try {
            const { data } = await axiosInstance.post("/api/create", {
                url: url,
            })
            setShortUrl(data);
            setError("");
        } catch (error) {
            console.error("Error creating short URL:", error);
            setError("Something went wrong. Please try again.");
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-[#e9ddd4]'>
            <div className='h-28 p-24 flex flex-col  items-center justify-center gap-2'>
                <h2 className='text-4xl text-center text-black'>Link Shortener</h2>
            <p className='text-sm text-center text-black'>Shorten your links in a CLICK!!</p>
            </div>
            <div className="flex flex-col items-center rounded-md gap-4 text-orange-950 h-full mx-24">
                <label htmlFor="url" className="lg:text-2xl text-xl font-serif">Enter your URL</label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="border-gray-800 placeholder:text-zinc-600 text-zinc-900 w-[85vw] px-3 border-2 py-2 lg:w-1/2 rounded-md outline-none bg-[#aa8469]"
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="rounded-md text-white px-5 py-2 bg-green-900 mx-5 hover:bg-green-800">{loading ? "Shortening..." : "Shorten my URL"}</button>
                {error && (
                    <div className="text-red-500">
                        {error}
                    </div>
                )}
                {shortUrl && (
                    <div className=''><p className='mt-10 mb-2 font-semibold'>Your shortened URL</p>
                        <div className='p-4 text-green-500 border-2 border-slate-500 rounded-md'>
                            {shortUrl}
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(shortUrl);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 1500);
                                }}
                                className="px-3 mx-2 py-2 text-black bg-zinc-300 rounded-md hover:bg-zinc-400 transition"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                )}
                {copied && <p className="text-green-400">Copied!</p>}

            </div>
        </div>
    )
}

export default Url