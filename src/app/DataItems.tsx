/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import CustomSelect from '@/components/CustomSelect'
import axios from 'axios'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaTimes } from 'react-icons/fa'
import useFetchData from '@/hooks/useFetchData'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { DataItem } from '@/store/slice/dataSlice'
import debounce from 'lodash/debounce'
import { formatDateRange } from '@/helpers/helper'
import { Slide, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DataItems = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedType, setSelectedType] = useState<string>('')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filterDateTime, setFilterDateTime] = useState<boolean>(false)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [itemsPerPage, setItemsPerPage] = useState<number>(3)
    const [Url, setUrl] = useState<string>('')
    const retreatItems = useSelector((state: RootState) => state?.retreats)
    const containerRefs = useRef<HTMLParagraphElement[]>([])
    const [debounceSearch, setDebounceSearch] = useState<string>('')
    const [uniqueTags, setUniqueTags] = useState<string[]>([])

    useEffect(() => {
        if (retreatItems?.error) {
            toast.error(retreatItems?.error)
        }
    }, [retreatItems])

    useEffect(() => {
        const fetchTotalCount = async () => {
            try {
                let apiUrl = 'https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?'

                if (debounceSearch) {
                    apiUrl += `search=${debounceSearch}`
                }

                if (selectedType) {
                    apiUrl += `&filter=${selectedType}`
                }

                if (filterDateTime && selectedDate) {
                    const unixTimestamp = Math.floor(selectedDate.getTime() / 1000)
                    apiUrl += `&date=${unixTimestamp}`
                }

                const response = await axios.get(apiUrl)
                setTotalCount(response?.data?.length || 0)

                if (!debounceSearch && !selectedType && !selectedDate) {
                    const tagsSet = new Set<string>()
                    response?.data.forEach((item: DataItem) => {
                        item.tag.forEach((tag) => tagsSet.add(tag))
                    })
                    setUniqueTags(Array.from(tagsSet))
                }
            } catch (error: any) {
                console.error('Error fetching total count:', error)
            }
        }

        fetchTotalCount()
    }, [debounceSearch, selectedType, filterDateTime])

    useEffect(() => {
        let apiUrl = 'https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?'

        if (debounceSearch) {
            apiUrl += `search=${debounceSearch}`
        }

        if (selectedType) {
            apiUrl += `&filter=${selectedType}`
        }

        if (selectedDate && filterDateTime) {
            const unixTimestamp = Math.floor(selectedDate.getTime() / 1000)
            apiUrl += `&date=${unixTimestamp}`
        }

        apiUrl += `&page=${currentPage}&limit=${itemsPerPage}`

        setUrl(apiUrl)
    }, [debounceSearch, selectedType, filterDateTime, currentPage, itemsPerPage])

    useFetchData(Url)

    const isNextDisabled = currentPage >= Math.ceil(totalCount / itemsPerPage)
    const isPreviousDisabled = currentPage === 1

    const handleFilterClick = () => {
        setFilterDateTime(true)
        setCurrentPage(1)
    }

    const handleClearDate = () => {
        setSelectedDate(null)
        setFilterDateTime(false)
        setCurrentPage(1)
    }

    const handleClearSearch = () => {
        setSearchQuery('')
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleSelect = (val: string) => {
        setSelectedType(val)
        setCurrentPage(1)
    }

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value))
        setCurrentPage(1)
    }

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [showViewMore, setShowViewMore] = useState<boolean[]>(new Array(retreatItems?.items?.length || 0).fill(false))

    useEffect(() => {
        containerRefs.current.forEach((ref, index) => {
            if (ref) {
                const isOverflowing = ref.scrollHeight > ref.clientHeight
                setShowViewMore(prev => {
                    const newShowViewMore = [...prev]
                    newShowViewMore[index] = isOverflowing
                    return newShowViewMore
                })
            }
        })
    }, [retreatItems?.items])

    const handleViewMoreClick = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    const debouncedSearch = useCallback(debounce((query: string) => {
        setDebounceSearch(query)
        setCurrentPage(1)
    }, 800), [])

    useEffect(() => {
        debouncedSearch(searchQuery)

        return () => {
            debouncedSearch.cancel()
        }
    }, [searchQuery, debouncedSearch])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className='w-11/12 mx-auto'>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
            <div className='flex flex-col md:flex-row justify-between mb-5'>
                <div className='flex flex-col md:flex-row md:space-x-4 mb-5 md:mb-0'>
                    <div className='flex items-center gap-2 mb-5 mt-5 sm:m-0'>
                        <DatePicker
                            id='datepicker'
                            name='datepicker'
                            selected={selectedDate}
                            onChange={(date: Date | null) => setSelectedDate(date)}
                            showTimeSelect
                            placeholderText="Select Start Date and Time"
                            timeIntervals={1}
                            className='w-full md:w-[200px] p-2 border rounded-lg bg-white text-[#1B3252] focus:outline-none focus:ring-2 focus:ring-[#1B3252] sm:bg-[#1B3252] sm:text-white flex-grow'
                            dateFormat="dd/MM/yyyy h:mm aa"
                            disabledKeyboardNavigation
                            showPopperArrow={false}
                            todayButton="Today"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            shouldCloseOnSelect={false}
                        />
                        <button className='bg-red-300 p-2 text-red-500 cursor-pointer rounded-lg m-0' onClick={handleClearDate}>
                            <FaTimes />
                        </button>
                        <button
                            onClick={handleFilterClick}
                            className='px-4 m-0 py-2 bg-[#1B3252] text-white rounded-lg focus:outline-none hover:bg-[#142a42]'
                        >
                            Filter
                        </button>
                    </div>

                    <CustomSelect
                        options={uniqueTags}
                        selectedValue={selectedType}
                        onChange={handleSelect}
                        onClear={() => { setSelectedType(''); setCurrentPage(1) }}
                    />
                </div>

                <div className='relative'>
                    <input
                        type='text'
                        id='search'
                        name='search'
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder='Search By Title'
                        className='w-full md:w-[200px] lg:w-[400px] p-2 border rounded-lg bg-white text-[#1B3252] focus:outline-none focus:ring-2 focus:ring-[#1B3252] sm:bg-[#1B3252] sm:text-white'
                    />
                    {searchQuery && (
                        <FaTimes
                            onClick={handleClearSearch}
                            className='absolute right-2 top-3 text-[#1B3252] cursor-pointer sm:text-white'
                        />
                    )}
                </div>
            </div>

            <div className='flex flex-wrap gap-5 justify-center items-center w-full md:flex-row flex-col '>
                {retreatItems.loading ? (
                    <div className='flex justify-center items-center my-4 sm:h-[400px]'>
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-[#1B3252]"></div>
                    </div>
                ) : retreatItems?.items?.length ? (
                    retreatItems?.items?.map((item: DataItem, index: number) => {
                        return (
                            <div className='flex flex-col md:w-[400px] min-h-[400px] md:h-[400px] w-full border bg-[#e0d9cf] rounded-lg p-5 gap-2' key={index}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className='w-full md:w-1/2 h-1/2 rounded-lg object-cover'
                                />
                                <h3 className='text-xl font-semibold'>{item.title}</h3>
                                <div className='relative grid justify-items-stretch'>
                                    <p
                                        className={`text-sm overflow-hidden ${expandedIndex === index ? 'h-auto' : 'h-[40px]'} text-ellipsis`}
                                        style={{ display: '-webkit-box', WebkitLineClamp: expandedIndex === index ? 'unset' : 2, WebkitBoxOrient: 'vertical' }}
                                        ref={el => { if (el) containerRefs.current[index] = el }}
                                    >
                                        {item.description}
                                    </p>
                                    {showViewMore[index] && (
                                        <span
                                            className='text-red-500 hover:underline hover:text-[#1b3252] text-sm cursor-pointer ms-2 flex justify-self-end'
                                            onClick={() => handleViewMoreClick(index)}
                                        >
                                            {expandedIndex === index ? 'View Less' : 'View More'}
                                        </span>
                                    )}
                                </div>
                                <div className='text-sm flex flex-col gap-2'>
                                    <p>Date : {formatDateRange(item.date, item.duration)}</p>
                                    <p>Location : {item.location}</p>
                                    <p className='sm:font-normal font-semibold'>Price : ${item.price}</p>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div>No Items To Show</div>
                )}
            </div>

            <div className='flex justify-center items-center m-5 gap-5'>
                <select
                    id='pagesizeoptions'
                    name='pagesizeoptions'
                    className="block w-14 text-center py-2 border bg-[#1B3252] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B3252] sm:text-sm text-white"
                    onChange={handleItemsPerPageChange}
                    value={itemsPerPage}
                >
                    <option className="py-2">3</option>
                    <option className="py-2">5</option>
                    <option className="py-2">10</option>
                </select>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={isPreviousDisabled}
                    className={`px-4 py-2 rounded-lg focus:outline-none ${isPreviousDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1B3252] text-white hover:bg-[#142a42]'}`}
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={isNextDisabled}
                    className={`px-4 py-2 rounded-lg focus:outline-none ${isNextDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1B3252] text-white hover:bg-[#142a42]'}`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default DataItems
