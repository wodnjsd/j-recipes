"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

const LoggedIn = ({ image}) => {
  return (
    <li className="flex gap-3">
      <button
        onClick={() => signOut()}
        className="bg-stone-500 text-white px-6 py-2 rounded-md"
      >
        Sign out
      </button>
      <Link href={'/dashboard'}>
        <Image width={32} height={32} src={image} alt="" priority className='rounded-full' />
      </Link>
    </li>
  );
};

export default LoggedIn;
