// eslint-disable-next-line no-unused-vars
import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Login({ setIsAuth }) {

    let navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <p className="text-lg font-medium text-gray-700 mb-4">
                Sign In With Google to Continue
            </p>
            <button
                onClick={signInWithGoogle}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Sign In With Google
            </button>
        </div>

    )
}

export default Login