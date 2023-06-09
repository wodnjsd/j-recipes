import Nav from "@/components/auth/Nav"
import SideNav from "@/components/auth/SideNav"
import { Toaster } from "react-hot-toast"

export default function Layout({children}) {
  return (
    <>

    <Nav />
    <Toaster />
    <main>   {children}</main>
    </>
  )
}