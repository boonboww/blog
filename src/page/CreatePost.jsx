// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function CreatePost({ isAuth }) {

    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")
    let navigate = useNavigate()

    const postsCollectionRef = collection(db, "posts")
    const createPost = async () => {
        await addDoc(postsCollectionRef, { title, postText, author: { name: auth.currentUser.displayName, id: auth.currentUser.uid } })
        navigate("/")
    }

    useEffect(() => {
        !isAuth ? navigate("/login") : null;
    })


    return (
        <div className="createPostPage flex justify-center items-center min-h-screen bg-gray-100">
            <div className="cpContainer bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Create A Post</h1>
                <div className="inputGp mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title:</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Title..."
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Post:</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Post..."
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />
                </div>
                <button
                    className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                    onClick={createPost}
                >
                    Submit Post
                </button>
            </div>
        </div>

    )
}

export default CreatePost