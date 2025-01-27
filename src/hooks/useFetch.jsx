import { useEffect, useState } from 'react'

export const useFetch = (apiPath, queryTerm = "") => {
    const [data, setData] = useState([]);
    const key = import.meta.env.VITE_API_KEY;

    const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&query=${queryTerm}`;

    useEffect(() => {
        async function fetchMovies() {
            fetch(url)
                .then((res) => res.json())
                .then((jsonData) => setData(jsonData.results));
        }
        fetchMovies();
    }, [url]);
    return { data };
}

