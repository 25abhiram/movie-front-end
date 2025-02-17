import { useEffect, useState } from 'react'

export const useFetch = (apiPath, queryTerm = "") => {
    const [data, setData] = useState([]);

    const url = `http://localhost:8080/api/v1/${apiPath}?query=${queryTerm}`;

    useEffect(() => {
        async function fetchMovies() {
            fetch(url)
                .then((res) => res.json())
                .then((jsonData) => setData(jsonData));
        }
        fetchMovies();
    }, [url]);
    return { data };
}

