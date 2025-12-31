'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { usePost } from '@/src/context/postContext'

const CATEGORIES = ['kitchen', 'bedroom', 'living', 'bathroom'] as const

const Page = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    mediaUrl: '',
    mediaType: 'image' as 'image' | 'video',
    category: '' as string
  })
  const [originalData, setOriginalData] = useState({
    title: '',
    mediaUrl: '',
    mediaType: 'image' as 'image' | 'video',
    category: '' as string
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { getPost, editPost } = usePost();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  //get current post data
  const getPostData = async () => {
    const response = await getPost(id);
    console.log("response: ", response);
    if (response.success) {
      const postData = {
        title: response.post.title,
        mediaUrl: response.post.mediaUrl,
        mediaType: response.post.mediaType,
        category: response.post.category,
      }
      setFormData(postData)
      setOriginalData(postData)
      setPreviewUrl(response.post.mediaUrl)
    }
  }
  // getPostData();
  useEffect(() => {
    getPostData();
  }, [id])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      // Detect media type from file
      const detectedMediaType = file.type.startsWith('video/') ? 'video' : 'image'

      // Create preview URL
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)

      // Update media type in formData
      setFormData(prev => ({
        ...prev,
        mediaType: detectedMediaType
      }))

      setError('')
      setSuccess('')
    }
  }

  const uploadToCloudinary = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload')
      return null
    }

    setIsUploading(true)
    try {
      const fileFormData = new FormData()
      fileFormData.append('file', selectedFile)

      const response = await axios.post('/api/post/upload-media', fileFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log("Form data before: ", formData);

      console.log("response data inside of upload page: ", response.data);

      if (response.data.success) {
        return {
          mediaUrl: response.data.mediaUrl,
          mediaType: response.data.mediaType
        }
      } else {
        setError(response.data.message || 'Failed to upload file')
        return null
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload file to Cloudinary')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    const hasFormChanges =
      formData.title !== originalData.title ||
      formData.category !== originalData.category

    const hasFileChange = selectedFile !== null

    if (!hasFormChanges && !hasFileChange) {
      setSuccess('No changes. Redirecting...')
      setTimeout(() => {
        router.push(`/interiors/${formData.category}`)
      }, 1000)
      setIsLoading(false)
      return
    }

  
    if (!formData.title || !formData.category) {
      setError('Please fill in all required fields!')
      setIsLoading(false)
      return
    }

    try {
      let updatedMediaUrl = formData.mediaUrl
      let updatedMediaType = formData.mediaType

      // If a new file was selected, upload it
      if (selectedFile) {
        const uploadedData = await uploadToCloudinary()
        if (!uploadedData) {
          setIsLoading(false)
          return
        }
        updatedMediaUrl = uploadedData.mediaUrl
        updatedMediaType = uploadedData.mediaType
      }

      console.log("Updated media url: ", updatedMediaUrl);
      console.log("updated media type: ", updatedMediaType);

      // Update the post with the new data
      const response = await editPost(id, {
        title: formData.title,
        mediaUrl: updatedMediaUrl,
        mediaType: updatedMediaType,
        category: formData.category
      })

      const category = formData.category

      if (response.success) {
        setSuccess('Design updated successfully!')

        setTimeout(() => {
          router.push(`/interiors/${category}`)
        }, 2000)
      } else {
        setError(response.message || 'Failed to update design')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update design')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-2">Edit Design</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Design Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                placeholder="e.g., Modern Kitchen Design"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-gray-900 bg-white"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="file" className="block text-sm font-semibold text-gray-700 mb-2">
                Upload New File (Image or Video) <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-linear-to-r file:from-amber-500 file:to-orange-600 file:text-white hover:file:from-amber-600 hover:file:to-orange-700 file:cursor-pointer"
                />
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Preview Section */}
            {previewUrl && (
              <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {selectedFile ? 'New Preview:' : 'Current Media:'}
                </p>
                {formData.mediaType === 'image' ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-64 rounded-lg"
                  />
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isUploading}
              className="w-full bg-linear-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading || isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isUploading ? 'Uploading to Cloudinary...' : 'Updating Design...'}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Update Design
                </>
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/home"
              className="text-gray-600 hover:text-amber-600 font-medium transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page