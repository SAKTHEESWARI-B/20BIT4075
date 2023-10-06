import React, { useEffect, useState } from 'react';

const Home = () => {
  const [merge, sak] = useState([]);
  const urls = [
    "http://20.244.56.144/numbers/primes",
    "http://20.244.56.144/numbers/fibo",
    "http://20.244.56.144/numbers/odd"
  ];

  useEffect(() => {
    const ab = async () => {
      const promises = urls.map(async (url) => {
        try {
          const response = await fetch(url, { timeout: 500 });
          if (!response.ok) {
            throw new Error ('Error fetching data from ${url}');
          }
          const data = await response.json();
          return data.numbers;
        } catch (error) {
          console.error(error);
          return [];
        }
      });

      const results = await Promise.all(promises);
      const merged = [].concat(...results); 
      const uniqueNumbers = [...new Set(merged)]; 
      const sortedNumbers = uniqueNumbers.sort((a, b) => a - b); 
      sak(sortedNumbers);
    };

    ab();
  }, []);

  return (
    <div>
      <div>
        <p>{JSON.stringify({ numbers: merge }, null, 2)}</p>
      </div>
    </div>
  );
}

export default Home;