import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function AddRawMaterialPage() {
    const [materialName, setMaterialName] = useState('');
    const [maximumQuantity, setMaximumQuantity] = useState('');
    const [available, setAvailable] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [supplierFirstName, setSupplierFirstName] = useState('');
    const [supplierMiddleName, setSupplierMiddleName] = useState('');
    const [supplierLastName, setSupplierLastName] = useState('');
    const [supplierAddressLane, setSupplierAddressLane] = useState('');
    const [supplierCity, setSupplierCity] = useState('');
    const [supplierState, setSupplierState] = useState('');
    const [supplierPinCode, setSupplierPinCode] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            materialName,
            maximumQuantity: maximumQuantity ? Number(maximumQuantity) : null,
            available: available ? Number(available) : null,
            unitPrice: unitPrice ? parseFloat(unitPrice) : null,
            supplierFirstName,
            supplierMiddleName,
            supplierLastName,
            supplierAddressLane,
            supplierCity,
            supplierState,
            supplierPinCode: supplierPinCode ? Number(supplierPinCode) : null,
        };

        // Simple validation
        if (!materialName || payload.maximumQuantity == null || payload.available == null || payload.unitPrice == null) {
            setError("Please fill in all primary material and price fields.");
            setLoading(false);
            return;
        }

        try {

            await api.post('/admin/add-raw-material', payload);
            alert('Raw Material added successfully!');
            navigate('/admin/raw-materials');
        } catch (err) {
            console.error("Error adding raw material:", err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to add raw material.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>Add New Raw Material</h2>
                <div>
                    <Link to="/admin/raw-materials/add" className="btn btn-primary me-2">
                        + Add New Material
                    </Link>
                    <Link to="/admin" className="btn btn-secondary">&larr; Back to Admin</Link>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="card p-3">
                {error && <div className="alert alert-danger">{error}</div>}

                <h5 className="mb-3">Material Information</h5>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="materialName" className="form-label">Material Name</label>
                        <input type="text" className="form-control" id="materialName" value={materialName} onChange={(e) => setMaterialName(e.target.value)} required />
                    </div>
                    <div className="col">
                        <label htmlFor="unitPrice" className="form-label">Unit Price</label>
                        <input type="number" step="0.01" className="form-control" id="unitPrice" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} min="0.01" required />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="maximumQuantity" className="form-label">Maximum Quantity</label>
                        <input type="number" className="form-control" id="maximumQuantity" value={maximumQuantity} onChange={(e) => setMaximumQuantity(e.target.value)} min="1" required />
                    </div>
                    <div className="col">
                        <label htmlFor="available" className="form-label">Available Quantity</label>
                        <input type="number" className="form-control" id="available" value={available} onChange={(e) => setAvailable(e.target.value)} min="0" required />
                    </div>
                </div>

                <h5 className="mb-3">Supplier Information</h5>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="sFirstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="sFirstName" value={supplierFirstName} onChange={(e) => setSupplierFirstName(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="sMiddleName" className="form-label">Middle Name</label>
                        <input type="text" className="form-control" id="sMiddleName" value={supplierMiddleName} onChange={(e) => setSupplierMiddleName(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="sLastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="sLastName" value={supplierLastName} onChange={(e) => setSupplierLastName(e.target.value)} />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="sAddressLane" className="form-label">Address Lane/Details</label>
                    <input type="text" className="form-control" id="sAddressLane" value={supplierAddressLane} onChange={(e) => setSupplierAddressLane(e.target.value)} />
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="sCity" className="form-label">City</label>
                        <input type="text" className="form-control" id="sCity" value={supplierCity} onChange={(e) => setSupplierCity(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="sState" className="form-label">State</label>
                        <input type="text" className="form-control" id="sState" value={supplierState} onChange={(e) => setSupplierState(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="sPinCode" className="form-label">PIN Code</label>
                        <input type="number" className="form-control" id="sPinCode" value={supplierPinCode} onChange={(e) => setSupplierPinCode(e.target.value)} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Raw Material'}
                </button>
            </form>
        </div>
    );
}