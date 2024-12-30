// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore' // Import deleteDoc
import { auth, db } from '../firebase-config'

// eslint-disable-next-line react/prop-types
function Home({ isAuth }) {

  const [postList, setPostList] = useState([])
  const postsCollectionRef = collection(db, "posts")

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef)
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts()
  }, [])

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc) // Sử dụng deleteDoc từ Firebase để xóa tài liệu
  }

  return (
    <div className="space-y-8 px-4 md:px-6">
      {postList.length > 0 ? (
        postList.map((post) => (
          <div key={post.id || post.title} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div className="border-b pb-4 mb-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                {post.title || "Untitled"}
              </h1>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm text-gray-500">@{post.author?.name || "Anonymous"}</h3>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  🗑️
                </button>
              )}
            </div>

            <p className="text-gray-600 mb-4">
              {post.postText || "No content available."}
            </p>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No posts available.</div>
      )}
    </div>
  )
}

export default Home
