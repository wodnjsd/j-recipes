import Link from 'next/link'
import Login from './Login'
import { useSession } from 'next-auth/react'
import LoggedIn from './LoggedIn'

export default function Nav() {
  const { data:session } = useSession()
  console.log(session)

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1>J Recipes</h1>
      </Link>
      <ul>
        {!session?.user && <Login />}
        {session?.user && <LoggedIn image={session.user?.image} />}
      </ul>
    </nav>
  )
  
}