import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Search, TrendingUp, Calendar, MapPin } from 'lucide-react';

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

  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}></div>
        <div className="relative container mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 animate-pulse">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Live Market Data</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Real-Time Market Insights</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">Track agricultural commodity prices across markets in real-time</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Market Prices Section */}
        <section className="mb-12 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                Market Prices
              </h2>
            </div>
            
            <div className="p-6">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search by commodity, state, district, or market..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                      <th className="p-4 text-left font-semibold">State</th>
                      <th className="p-4 text-left font-semibold">District</th>
                      <th className="p-4 text-left font-semibold">Market</th>
                      <th className="p-4 text-left font-semibold">Commodity</th>
                      <th className="p-4 text-left font-semibold">Variety</th>
                      <th className="p-4 text-left font-semibold">Grade</th>
                      <th className="p-4 text-left font-semibold">Arrival Date</th>
                      <th className="p-4 text-right font-semibold">Min Price</th>
                      <th className="p-4 text-right font-semibold">Max Price</th>
                      <th className="p-4 text-right font-semibold">Modal Price</th>
                      <th className="p-4 text-left font-semibold">Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((row, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-gray-200 hover:bg-emerald-50 transition-colors duration-200"
                          style={{
                            animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                          }}
                        >
                          {Object.values(row).map((value, idx) => (
                            <td key={idx} className={`p-4 ${idx >= 7 && idx <= 9 ? 'text-right font-semibold text-emerald-700' : ''}`}>
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center p-8 text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <Search className="w-12 h-12 text-gray-300" />
                            <p>No data available</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <button 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1} 
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Previous
                </button>
                <span className="text-gray-700 font-medium bg-gray-100 px-6 py-3 rounded-xl">
                  Page <span className="font-bold text-emerald-600">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                </span>
                <button 
                  onClick={handleNextPage} 
                  disabled={currentPage * rowsPerPage >= filteredData.length} 
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Price Trends Chart */}
        <section className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Price Trends
              </h2>
            </div>
            
            <div className="p-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={priceData}>
                  <XAxis 
                    dataKey="commodity" 
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: '2px solid #10b981',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="minPrice" name="Min Price" radius={[8, 8, 0, 0]}>
                    {priceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#10b981" />
                    ))}
                  </Bar>
                  <Bar dataKey="maxPrice" name="Max Price" radius={[8, 8, 0, 0]}>
                    {priceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#3b82f6" />
                    ))}
                  </Bar>
                  <Bar dataKey="modalPrice" name="Modal Price" radius={[8, 8, 0, 0]}>
                    {priceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#f59e0b" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}

export default Market;