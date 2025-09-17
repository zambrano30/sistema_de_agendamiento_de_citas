import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer';
import AsideBar from '../components/AsideBar';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto flex-grow">
         <AsideBar />
        {children}
      </main>
      <Footer />
    </div>
  )
}
