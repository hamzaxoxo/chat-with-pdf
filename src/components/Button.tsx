import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    handleChange: (e?: React.FormEvent) => void
}
export default function Button({ children, handleChange }: ButtonProps) {
    return (
        <button type="button" className="mx-auto w-full flex justify-center items-center gap-2 bg-blue-500 text-gray-100 px-4 py-3 rounded-xl tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300" onClick={handleChange}>{children}</button>
    )
}
