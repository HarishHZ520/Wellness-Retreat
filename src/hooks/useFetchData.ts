import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from '@/store/slice/dataSlice'

const useFetchData = (url: string) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchDataStart())

            try {
                const response = await axios.get(url)
                dispatch(fetchDataSuccess(response?.data))
            } catch (error: any) {
                dispatch(fetchDataFailure(error?.response?.data))
            }
        }

        if (url) {
            fetchData()
        }
    }, [url, dispatch])
}

export default useFetchData
