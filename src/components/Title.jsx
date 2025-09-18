import React from 'react'

export default function Title({ text }) {
  return (
    <div className="w-full">
      <h2 className="bg-terciary w-full h-12 sm:h-14 md:h-16 flex justify-center items-center text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl rounded-lg shadow-md mx-2 sm:mx-4 md:mx-6 lg:mx-8">{text}</h2>
    </div>
  )
}
