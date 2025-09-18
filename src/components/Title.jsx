import React from 'react'

export default function Title({ text }) {
  return (
    <div className="w-full flex justify-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
      <h2 className="bg-terciary w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-12 sm:h-14 md:h-16 flex justify-center items-center text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl rounded-lg shadow-md">{text}</h2>
    </div>
  )
}
