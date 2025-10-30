import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminEmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('lastName');
    const [sortDir, setSortDir] = useState('ASC');


    const [searchId, setSearchId] = useState('');
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString + 'T00:00:00Z').toLocaleDateString();
        } catch (e) { return 'Invalid Date'; }
    };

    async function fetchEmployees(page = 0, currentSortBy = sortBy, currentSortDir = sortDir) {
        try {
            setLoading(true);
            setError(null);

            const sortParam = `${currentSortBy},${currentSortDir.toLowerCase()}`;
            const response = await api.get(`/admin/employees?page=${page}&sort=${sortParam}`);

            setEmployees(response.data.content || []);
            setCurrentPage(response.data.number);
            setTotalPages(response.data.totalPages);

        } catch (err) {
            console.error("Error fetching employees:", err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch employee list.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployees(0, sortBy, sortDir);
    }, [sortBy, sortDir]);


    const handleNextPage = () => {
        if (currentPage < totalPages - 1) fetchEmployees(currentPage + 1, sortBy, sortDir);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) fetchEmployees(currentPage - 1, sortBy, sortDir);
    };

    const handleSort = (column) => {
        if (column === sortBy) {
            setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC');
        } else {
            setSortBy(column);
            setSortDir('ASC');
        }
    };

    const getSortIndicator = (column) => {
        if (column !== sortBy) return null;
        return sortDir === 'ASC' ? ' ▲' : ' ▼';
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const emailToNavigate = searchId.trim();

        if (!emailToNavigate) {
            alert('Please enter an Employee Email ID.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailToNavigate)) {
            alert('Please enter a valid email format (e.g., user@domain.com).');
            setSearchId('');
            return;
        }

        navigate(`/admin/employees/${emailToNavigate}`);

        setSearchId('');
    };


    if (loading) {
        return <div className="container"><h3>Loading employees...</h3></div>;
    }

    if (error) {
        return <div className="container alert alert-danger"><strong>Error:</strong> {error}</div>;
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>Employee List</h2>
                <div>
                    <Link to="/admin/employees/add" className="btn btn-primary me-2">
                        + Add New Employee
                    </Link>
                    <Link to="/admin" className="btn btn-secondary">&larr; Back to Admin</Link>
                </div>
            </div>


            <form onSubmit={handleSearchSubmit} className="input-group mb-3">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Search by Employee emailID..."
                    aria-label="Search Employee emailID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="submit">Go</button>
            </form>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('employeeId')} style={{ cursor: 'pointer' }}>ID{getSortIndicator('employeeId')}</th>
                        <th onClick={() => handleSort('lastName')} style={{ cursor: 'pointer' }}>Name{getSortIndicator('lastName')}</th>
                        <th onClick={() => handleSort('employeeType')} style={{ cursor: 'pointer' }}>Role{getSortIndicator('employeeType')}</th>
                        <th onClick={() => handleSort('emailId')} style={{ cursor: 'pointer' }}>Email{getSortIndicator('emailId')}</th>
                        <th onClick={() => handleSort('joiningDate')} style={{ cursor: 'pointer' }}>Joined{getSortIndicator('joiningDate')}</th>
                        <th onClick={() => handleSort('city')} style={{ cursor: 'pointer' }}>Location{getSortIndicator('city')}</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map(emp => (
                            <tr key={emp.employeeId}>
                                <td>
                                    {emp.employeeId}
                                </td>
                                <td>{`${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'N/A'}</td>
                                <td>{emp.employeeType || 'N/A'}</td>
                                <td>
                                    <Link to={`/admin/employees/${emp.emailId}`}>
                                        {emp.emailId}
                                    </Link>
                                </td>
                                <td>{formatDate(emp.joiningDate)}</td>
                                <td>{emp.city || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No employees found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className="text-muted">
                    Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong>
                </p>
                <nav>
                    <ul className="pagination" style={{ margin: 0 }}>
                        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
                        </li>
                        <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}