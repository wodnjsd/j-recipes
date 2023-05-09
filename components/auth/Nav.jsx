import Link from 'next/link'
import Login from './Login'
import { useSession } from 'next-auth/react'
import LoggedIn from './LoggedIn'

export default function Nav() {
  const { data:session } = useSession()
  console.log(session)

  return (
    <nav className="hidden sm:flex justify-between items-center py-8 font-castoro">
      <Link href={"/"}>
        <h1 className='text-xl'>J Recipes</h1>
      </Link>
      <ul className='flex gap-5 '>
        <li className="font-castoro"><Link href={"/recipes"}>Cuisines</Link></li>
        <li><Link href={"/add-recipe"}>Add new recipe</Link></li>
        </ul>
        <div>
        {!session?.user && <Login />}
        {session?.user && <LoggedIn image={session.user?.image} />}
        </div>
    </nav>
  )
  
}