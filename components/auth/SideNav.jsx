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
    <div className="sm:hidden fixed ">
      <button onClick={toggle}>
        {isOpen ? <IoClose /> : <AiOutlineMenu />}
      </button>
      {isOpen && (
        <motion.nav
          initial={{ width: 0 }}
          animate={{ width: 400 }}
        >
          <ul className="flex flex-col gap-5 items-center">
            <li>
              <Link href={"/recipes"}>Home</Link>
            </li>
            <li>
              <Link href={"/recipes"}>Cuisines</Link>
            </li>
            <li>
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
