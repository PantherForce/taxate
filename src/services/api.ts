export const fetchTradingData = async () => {
    const response = await fetch('https://testdata-bh0z.onrender.com/data');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  