import React, { useState } from 'react'
import Url from '../components/Url'
import { axiosInstance } from '../utils/axiosInstance';
import { Link } from '@tanstack/react-router';

function Dashboard() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [slug, setSlug] = useState("");
    const [allUrls, setAllUrls] = useState([]);

    const handleSubmit = async () => {
        try {
            const { data } = await axiosInstance.post("/api/create", {
                url: url,
                slug: slug

            })
            setShortUrl(data);
            setError("");
        } catch (error) {
            console.error("Error creating short URL:", error);
            setError("You cannot leave the URL empty");
        }
    }

    const handleView = async () => {
        try {
            const { data } = await axiosInstance.get("/user/urls");
            setAllUrls(data.urls);
        } catch (error) {
            console.error("Error fetching user URLs:", error);
        }
    }

    return (
        <div>
            <nav>
                <ul className="flex justify-evenly items-center bg-[#634530] text-white p-5">
                    <Link to='/'><li>HOME</li></Link>
                    <Link to='/auth'>
                        <li>LOGOUT</li>
                    </Link>
                </ul>
            </nav>
            <div className='flex'>

                <div className='w-2/3'>
                    <div className="flex flex-col items-center gap-4 bg-[#e9ddd4] text-white justify-center h-screen">
                        <label htmlFor="url" className="text-2xl text-orange-950 font-serif">Enter your URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="border-gray-800 placeholder:text-zinc-600 text-zinc-900 bg-[#aa8469] outline-none px-3 border-2 py-2 w-1/2 rounded-md"
                        />
                        <label htmlFor="url" className="text-2xl text-orange-950 font-serif">Enter your text</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="xyz"
                            className="border-gray-800 placeholder:text-zinc-600 text-zinc-900 bg-[#aa8469] outline-none px-3 border-2 py-2 w-1/2 rounded-md"
                        />

                        <button
                            onClick={handleSubmit}
                            className="bg-green-900 rounded-md px-5 py-2 mx-5 hover:bg-green-800">Shorten my link</button>
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
                <div className='w-1/3 bg-[#1e384a] p-10 flex gap-3 flex-col'>
                    <h3 className='text-white text-center text-xl'>View all your links here</h3>
                    <button className='p-1 rounded-md mb-3 bg-green-500 hover:bg-green-400 w-1/4 mx-auto'
                        onClick={handleView}
                    >View</button>
                    <div className='flex flex-col gap-2 '>
                        {allUrls.length > 0 && allUrls.map((item, index) => (
                            <div key={index} className="text-white bg-[#14242e] p-4 text-balance rounded mb-2">
                                <p className='break-all'>Original: <span className='text-sm text-blue-500'>{item.longUrl}</span></p>
                                <p>Text: <span className='text-sm text-gray-300'>{item.shortUrl}</span></p>
                            </div>
                        ))}


                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard