import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Market() {
  const [marketData, setMarketData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'State', direction: 'ascending' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('../market.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        const parsedData = parseCSV(data);
        setMarketData(parsedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the CSV file:', error);
        setLoading(false);
      });
  }, []);

  const parseCSV = (data) => {
    const rows = data.split("\n").filter(row => row.trim() !== "");
    const headers = rows.shift().split(",");
    return rows.map(row => {
      const values = row.split(",");
      return headers.reduce((acc, header, index) => {
        acc[header.trim()] = values[index] ? values[index].trim() : '';
        return acc;
      }, {});
    });
  };

  const filterData = (query) => {
    return marketData.filter(row => 
      Object.values(row).some(value => value.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const paginateData = (data, page, rowsPerPage) => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage * rowsPerPage < filterData(searchQuery).length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredData = filterData(searchQuery);
  const paginatedData = paginateData(filteredData, currentPage, rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const priceData = marketData.map(row => ({
    commodity: row.Commodity,
    minPrice: Number(row['Min Price']) || 0,
    maxPrice: Number(row['Max Price']) || 0,
    modalPrice: Number(row['Modal Price']) || 0

  })).slice(0, 10);

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Real-Time Market Insights</h1>
      </header>
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Market Prices</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-gray-100">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-3">State</th>
                <th className="p-3">District</th>
                <th className="p-3">Market</th>
                <th className="p-3">Commodity</th>
                <th className="p-3">Variety</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Arrival Date</th>
                <th className="p-3">Min Price</th>
                <th className="p-3">Max Price</th>
                <th className="p-3">Modal Price</th>
                <th className="p-3">Commodity Code</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr key={index} className="text-center border-b border-gray-300">
                    {Object.values(row).map((value, index) => (
                      <td key={index} className="p-2">{value}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center p-4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300">Previous</button>
          <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage * rowsPerPage >= filteredData.length} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300">Next</button>
        </div>
      </section>
      <section className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Price Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceData}>
            <XAxis dataKey="commodity" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="minPrice" fill="#82ca9d" name="Min Price" />
            <Bar dataKey="maxPrice" fill="#8884d8" name="Max Price" />
            <Bar dataKey="modalPrice" fill="#ffc658" name="Modal Price" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

export default Market;
