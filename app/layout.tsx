"use client"

import { Inter } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'


import './globals.css'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>VeriFi</title>
      </head>
      <body className={inter.className}>
        <ChakraProvider>
            <Navbar/>
            {children}
        </ChakraProvider></body>
    </html>
  )
}