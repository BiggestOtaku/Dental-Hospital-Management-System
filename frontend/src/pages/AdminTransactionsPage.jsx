import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminTransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // --- Sorting State ---
    const [sortBy, setSortBy] = useState('transactionDate');
    const [sortDir, setSortDir] = useState('DESC');

    const [searchId, setSearchId] = useState('');
    const navigate = useNavigate();
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading page
        const idToNavigate = searchId.trim(); // Remove leading/trailing spaces
        if (idToNavigate && !isNaN(idToNavigate)) { // Check if it's a non-empty number
            navigate(`/admin/transactions/${idToNavigate}`);
        } else {
            alert('Please enter a valid Appointment ID (number).');
            setSearchId(''); // Clear invalid input
        }
    };

    async function fetchTransactions(page = 0, currentSortBy = sortBy, currentSortDir = sortDir) {
        try {
            setLoading(true);
            setError(null);

            const sortParam = `${currentSortBy},${currentSortDir.toLowerCase()}`;
            const response = await api.get(`/admin/transactions?page=${page}&sort=${sortParam}`);

            setTransactions(response.data.content || []);
            setCurrentPage(response.data.number);
            setTotalPages(response.data.totalPages);

        } catch (err) {
            console.error("Error fetching transactions:", err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch transactions.');
        } finally {
            setLoading(false);
        }
    }

    // Fetch data on initial load and whenever sort changes
    useEffect(() => {
        fetchTransactions(0, sortBy, sortDir);
    }, [sortBy, sortDir]);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            fetchTransactions(currentPage + 1, sortBy, sortDir);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            fetchTransactions(currentPage - 1, sortBy, sortDir);
        }
    };

    const handleSort = (column) => {
        if (column === sortBy) {
            const newSortDir = sortDir === 'ASC' ? 'DESC' : 'ASC';
            setSortDir(newSortDir);
        } else {
            setSortBy(column);
            setSortDir('DESC');
        }
    };
    const getSortIndicator = (column) => {
        if (column !== sortBy) return null;
        return sortDir === 'ASC' ? ' ▲' : ' ▼';
    };

    if (loading) {
        return <div className="container"><h3>Loading transactions...</h3></div>;
    }

    if (error) {
        return <div className="container alert alert-danger"><strong>Error:</strong> {error}</div>;
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>All Transactions</h2>
                <div>
                    <Link to="/admin/transactions/add" className="btn btn-primary me-2">
                        + Add Transaction
                    </Link>
                    <Link to="/admin" className="btn btn-secondary">&larr; Back to Admin</Link>
                </div>
            </div>
            <form onSubmit={handleSearchSubmit} className="input-group mb-3">
                <input
                    type="search" // Use type="search" for better semantics
                    className="form-control"
                    placeholder="Search by Transaction ID..."
                    aria-label="Search Transacion ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="submit">
                    Go
                </button>
            </form>



            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('transactionId')} style={{ cursor: 'pointer' }}>
                            ID{getSortIndicator('transactionId')}
                        </th>
                        <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
                            Amount{getSortIndicator('amount')}
                        </th>
                        <th onClick={() => handleSort('transactionDate')} style={{ cursor: 'pointer' }}>
                            Date{getSortIndicator('transactionDate')}
                        </th>
                        <th >
                            Area
                        </th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map(tx => (
                            <tr key={tx.transactionId}>
                                <td>
                                    <Link to={`/admin/transactions/${tx.transactionId}`}>
                                        {tx.transactionId}
                                    </Link>
                                </td>
                                <td>{tx.amount != null ? `$${Number(tx.amount).toFixed(2)}` : 'N/A'}</td>
                                <td>{tx.transactionDate ? new Date(tx.transactionDate).toLocaleDateString() : 'N/A'}</td>
                                <td>{tx.area || 'N/A'}</td>
                                <td>{tx.description || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            {/* --- UPDATED COLSPAN --- */}
                            <td colSpan="5" className="text-center">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="text-muted">
                    Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong>
                </p>
                <nav>
                    <ul className="pagination" style={{ margin: 0 }}>
                        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handlePrevPage}>Previous</button>
                        </li>
                        <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handleNextPage}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}