import React, { useState, useEffect } from 'react';
import "../styles/market.css";

function Market() {
  const [marketData, setMarketData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    setCurrentPage(1); // Reset to first page on search
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

  const sortedData = React.useMemo(() => {
    let sortableItems = [...paginatedData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [paginatedData, sortConfig]);
  
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // In your table header

  return (
    <div className="market-container">
      <header>
        <h1>Real-Time Market Insights</h1>
      </header>
      <section className="market-data">
        <h2>Market Prices</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
        />
        
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('State')}>State</th>
              <th>District</th>
              <th>Market</th>
              <th>Commodity</th>
              <th>Variety</th>
              <th>Grade</th>
              <th>Arrival Date</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Modal Price</th>
              <th>Commodity Code</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage * rowsPerPage >= filteredData.length}>Next</button>
        </div>
      </section>
    </div>
  );
}

export default Market;