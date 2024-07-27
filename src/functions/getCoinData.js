import axios from 'axios';

export const getCoinData = async (id, setError) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (response.data) {
      return response.data;
    } else {
      console.error('No data found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching coin data:', error.message);
    if (setError) {
      setError(true);
    }
    return null; // Ensure the function returns null if there is an error
  }
};
