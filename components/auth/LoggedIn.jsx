"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

const LoggedIn = ({ image}) => {
  return (
    <li>
      <button
        onClick={() => signOut()}
        className="bg-gray-500 text-white px-6 py-2 rounded-md"
      >
        Sign out
      </button>
      <Link href={'/dashboard'}>
        <Image width={64} height={64} src={image} alt="" priority className='rounded-full' />
      </Link>
    </li>
  );
};

export default LoggedIn;
