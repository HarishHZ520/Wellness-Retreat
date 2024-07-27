'use client'
import React, { useState, useRef, useEffect } from 'react'
import { FaTimes, FaChevronDown } from 'react-icons/fa'

interface CustomSelectProps {
    options: string[]
    selectedValue: string
    onChange: (value: string) => void
    onClear: () => void
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, selectedValue, onChange, onClear }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const handleSelect = (value: string) => {
        onChange(value)
        setIsOpen(false)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div ref={dropdownRef} className='relative'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full md:w-[200px] p-2 border rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#1B3252] sm:bg-[#1B3252] ${selectedValue ? 'sm:text-white text-[#1B3252]' : 'text-gray-400'}`}
            >
                <span>{selectedValue || 'Select Type'}</span>
                {selectedValue ? (
                    <FaTimes
                        onClick={(e) => {
                            e.stopPropagation()
                            onClear()
                        }}
                        className={`text-[#1B3252] md:text-gray-400 cursor-pointer ml-2 md:text-white`}
                    />
                ) : (
                    <FaChevronDown
                        className={`ml-2 text-gray-400`}
                    />
                )}
            </button>
            {isOpen && (
                <div className='absolute top-full left-0 w-full mt-1 border rounded-lg bg-white text-[#1B3252] shadow-lg overflow-y-auto h-[200px] z-10'>
                    <ul className='list-none p-0 m-0'>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className='p-2 hover:bg-[#f0f0f0] cursor-pointer'
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default CustomSelect
