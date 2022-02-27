import axios from "axios"
import { useEffect, useState } from "react"



const usePostData = (url, data) => {

    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.post(url, data)
                setResponse(res['data'])
                setLoading(false)
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        apiCall();
    }, [url])

    return { loading, error, response }

}

export default usePostData;