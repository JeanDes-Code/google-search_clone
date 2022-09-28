import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('Jean Desauw');

  const getResults = async (type) => {
    setIsLoading(true);

    const res = await fetch(`${baseUrl}${type}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '105a1bce78msh309261b26fdabc8p135c10jsn183f2ac64716',
        'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
      },
    });

    const data = await res.json();

    if (type.includes('/news')) {
      setResults(data.entries);
    } else if (type.includes('/image')) {
      setResults(data.image_results);
    } else {
      setResults(data.results);
    }

    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
