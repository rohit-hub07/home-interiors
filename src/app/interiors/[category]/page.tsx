'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'

interface Post {
  _id: string
  title: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  category: string
  createdAt: string
  updatedAt: string
}

export default function Page() {
  const params = useParams<{ category?: string }>()
  const searchParams = useSearchParams()
  const category = params?.category ?? searchParams.get('category') ?? ''

  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!category) return
    setLoading(true)
      ; (async () => {
        try {
          const res = await fetch(`/api/post/designs/${encodeURIComponent(category)}`, { cache: 'no-store' })
          if (!res.ok) throw new Error(`Failed to fetch designs: ${res.status}`)
          const data = await res.json()
          setPosts(data?.posts ?? [])
          setError(null)
        } catch (e: any) {
          setError(e.message)
        } finally {
          setLoading(false)
        }
      })()
  }, [category])

  // Separate images and videos
  const images = posts.filter(post => post.mediaType === 'image')
  const videos = posts.filter(post => post.mediaType === 'video')

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 capitalize">
          {category || 'Category'}
        </h1>
        <p className="text-gray-600 mb-8">
          Explore our {category} design collection
        </p>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Error: {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No designs found for this category.</p>
          </div>
        )}

        {/* Images Section */}
        {images.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Images ({images.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((post) => (
                <div
                  key={post._id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.mediaUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Videos Section */}
        {videos.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Videos ({videos.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-video">
                    <video
                      src={post.mediaUrl}
                      controls
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}