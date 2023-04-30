'use client'

import {signIn} from 'next-auth/react'


export default function Login() {
  return (
    <li className="list-none">
      <button onClick={()=> signIn()} className="bg-gray-700 py-2 px-6 rounded-xl text-white">
        Sign In
      </button>

    </li>
  )
}