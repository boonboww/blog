import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './page/Home'
import CreatePost from './page/CreatePost'
import Login from './page/Login'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'

function App() {

  const [isAuth, setIsAuth] = useState(false)

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    } catch (error) {
      console.error("Logout Error: ", error.message);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-black text-white p-4 fixed top-0 left-0 w-full uppercase z-10">
          <div className="flex justify-center space-x-8">
            <Link to="/" className="hover:underline hover:text-gray-400">Home</Link>
            <Link to="/createpost" className="hover:underline hover:text-gray-400">Create Post</Link>
            {!isAuth ? <Link to="/login" className="hover:underline hover:text-gray-400">Login</Link> : <button onClick={signUserOut}>Logout</button>}
          </div>
        </nav>
        <div className="container mx-auto p-4 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          </Routes>
        </div>
      </div>
    </Router>

  )
}

export default App
