import Link from "next/link";
import Login from "./Login";
import { useSession } from "next-auth/react";
import LoggedIn from "./LoggedIn";
import { IoClose } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Nav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sm:hidden h-full w-full fixed z-20 left-0 top-0">
      <button onClick={toggle}>
        {isOpen ? <IoClose /> : <AiOutlineMenu />}
      </button>
      {isOpen && (
        <motion.nav
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          className=" bg-stone-100 flex flex-col h-full justify-center gap-20 items-center"
        >
          <ul className="flex flex-col  gap-5 ">
            <li onClick={toggle}>
              <Link href={"/recipes"}>Home</Link>
            </li>
            <li onClick={toggle}>
              <Link href={"/recipes"}>Cuisines</Link>
            </li>
            <li onClick={toggle}>
              <Link href={"/add-recipe"}>Add new recipe</Link>
            </li>
          </ul>
          <div className="flex justify-center py-5">
            {!session?.user && <Login />}
            {session?.user && <LoggedIn image={session.user?.image} />}
          </div>
        </motion.nav>
      )}
    </div>
  );
}
