import Nav from "@/components/auth/Nav"

export default function Layout({children}) {
  return (
    <>
    <Nav />
    <main>{children}</main>
    </>
  )
}