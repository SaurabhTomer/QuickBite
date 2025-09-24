import React, { useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../config.js'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      )
      console.log('Sign in success:', res.data)
      // Navigate to a protected/home page if you have one
      navigate('/signup')
    } catch (err) {
      console.error('Sign in error:', err?.response?.data || err.message)
      setError(
        typeof err?.response?.data === 'string'
          ? err.response.data
          : err?.response?.data?.message || 'Failed to sign in'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-[#ff4d2d]">QuickBite</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer disabled:opacity-60"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-center mt-6 cursor-pointer" onClick={() => navigate('/signup')}>
          New here? <span className="text-[#ff4d2d]">Create an account</span>
        </p>
      </div>
    </div>
  )
}

export default SignIn