import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" >
      <Head />
      <body className="bg-stone-300 text-stone-700 my-10 mx-10 sm:mx-20">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
