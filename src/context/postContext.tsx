'use client'

import axios from 'axios'
import React, { createContext, useContext } from 'react'


interface ApiResponse {
  success: boolean
  message: string
  post?: any
}

interface PostContextType {
  deletePost: (id: string) => Promise<ApiResponse>
  editPost: (id: string, data: dataType) => Promise<ApiResponse>
  getPost: (id: string) => Promise<ApiResponse>
}

interface dataType {
  title: string,
  mediaUrl: string,
  mediaType: string,
  category: string
}

const PostContext = createContext<PostContextType | null>(null)


export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const deletePost = async (id: string): Promise<ApiResponse> => {
    if (!id) {
      return { success: false, message: 'Id is required!' }
    }

    try {
      const res = await axios.delete(`/api/post/delete/${id}`)
      return {
        success: res.data.success,
        message: res.data.message,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Something went wrong!',
      }
    }
  }

  const editPost = async (id: string, data: dataType): Promise<ApiResponse> => {
    try {
      console.log("Data inside of editPost: ", data);
      const res = await axios.put(`/api/post/edit/${id}`, data)
      return {
        success: res.data.success,
        message: res.data.message,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Something went wrong!',
      }
    }
  }

  const getPost = async (id: string): Promise<ApiResponse> => {
    try {
      const res = await axios.get(`/api/post/getpost/${id}`)
      return {
        success: res.data.success,
        message: res.data.message,
        post: res.data.post
      }
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Something went wrong!',
      }
    }
  }

  return (
    <PostContext.Provider value={{ deletePost, editPost, getPost }}>
      {children}
    </PostContext.Provider>
  )
}


export const usePost = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePost must be used within a PostProvider')
  }
  return context
}
