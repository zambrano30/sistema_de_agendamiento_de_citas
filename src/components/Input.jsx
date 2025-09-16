import React from 'react'

export default function Input({placeholder}) {
  return (
    <input type="text" placeholder={placeholder} className='bg-white text-black w-[250px] py-1 rounded-xl px-2' />
  )
}
