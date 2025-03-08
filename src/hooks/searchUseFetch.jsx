import { useState, useEffect } from "react";

export const searchUseFetch = (apiBasePath, searchType, queryTerm) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!queryTerm || !searchType) return;

        // Construct API endpoint dynamically based on search type
        let apiPath = `${apiBasePath}/${searchType}/${encodeURIComponent(queryTerm)}`;

        console.log("Fetching:", apiPath); // Debugging API Request

        const response = await fetch(apiPath);
        if (!response.ok) throw new Error("Error fetching data");

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fetch Error:", error);
        setData([]); // Return an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiBasePath, searchType, queryTerm]);

  return { data, loading };
};
