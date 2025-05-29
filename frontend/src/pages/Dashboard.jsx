import React, { useState } from 'react'
import Url from '../components/Url'
import { axiosInstance } from '../utils/axiosInstance'
import { Link } from '@tanstack/react-router'

function Dashboard() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const [slug, setSlug] = useState("")
  const [allUrls, setAllUrls] = useState([])

  const handleSubmit = async () => {
    try {
      const { data } = await axiosInstance.post("/api/create", {
        url: url,
        slug: slug,
      })
      setShortUrl(data)
      setError("")
    } catch (error) {
      console.error("Error creating short URL:", error)
      setError("You cannot leave the URL empty")
    }
  }

  const handleView = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/urls")
      setAllUrls(data?.urls || [])
    } catch (error) {
      console.error("Error fetching user URLs:", error)
      setAllUrls([])
    }
  }

  return (
    <div>
      {/* Navbar */}
      <nav>
        <ul className="flex justify-evenly items-center bg-[#634530] text-white p-5">
          <Link to="/"><li>HOME</li></Link>
          <Link to="/auth"><li>LOGOUT</li></Link>
        </ul>
      </nav>

      {/* URL Shortener Section */}
      <div className="bg-[#e9ddd4] flex flex-col items-center justify-center gap-6 p-8 min-h-[60vh]">
        <label htmlFor="url" className="text-2xl text-orange-950 font-serif">Enter your URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full md:w-1/2 border-gray-800 placeholder:text-zinc-600 text-zinc-900 bg-[#aa8469] outline-none px-3 border-2 py-2 rounded-md"
        />

        <label htmlFor="slug" className="text-2xl text-orange-950 font-serif">Enter your text</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="xyz"
          className="w-full md:w-1/2 border-gray-800 placeholder:text-zinc-600 text-zinc-900 bg-[#aa8469] outline-none px-3 border-2 py-2 rounded-md"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-900 rounded-md px-5 py-2 hover:bg-green-800 text-white"
        >
          Shorten my link
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {shortUrl && (
          <div className="mt-10 text-center">
            <p className="mb-2 font-semibold text-black">Your shortened URL</p>
            <div className="p-4 text-green-700 border-2 border-slate-500 rounded-md flex flex-col md:flex-row items-center justify-center gap-2">
              <span>{shortUrl}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 1500)
                }}
                className="px-3 py-2 text-black bg-zinc-400 rounded-md hover:bg-zinc-500 transition"
              >
                Copy
              </button>
            </div>
            {copied && <p className="text-green-700 mt-2">Copied!</p>}
          </div>
        )}
      </div>

      {/* View All URLs Section */}
      <div className="bg-[#1e384a] p-6 flex flex-col items-center gap-4 min-h-[40vh]">
        <h3 className="text-white text-xl font-semibold text-center">View all your links here</h3>
        <button
          className="p-2 rounded-md bg-green-500 hover:bg-green-400"
          onClick={handleView}
        >
          View
        </button>

        <div className="w-full max-w-4xl flex flex-col gap-2 overflow-y-auto max-h-[50vh]">
          {Array.isArray(allUrls) && allUrls.length > 0 ? (
            allUrls.map((item, index) => (
              <div key={index} className="text-white bg-[#14242e] p-4 text-sm rounded mb-2 break-all">
                <p><strong>Original:</strong> <span className="text-blue-400">{item.longUrl}</span></p>
                <p><strong>Text:</strong> <span className="text-gray-300">{item.shortUrl}</span></p>
              </div>
            ))
          ) : (
            <p className="text-white text-center">No links found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
