import axios from "axios"
import { useEffect, useState } from "react"



const useGetData = (url) => {

    const [getUrl, setUrl] = useState(url)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const apiCall = async () => {
        try {
            const res = await axios.get(getUrl)
            setData(res['data'])
            setLoading(false)
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        setUrl(url)
        apiCall();
    }, [url])

    return { loading, error, data, apiCall }

}

export default useGetData;