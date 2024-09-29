import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Companies.css';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const API_URL = 'http://localhost:8000';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [editingId, setEditingId] = useState(null);

    const fetchCompanies = async () => {
        try {
            const response = await axios.get(`${API_URL}/companies`);
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const companyData = {
            name,
            email,
            website,
        };

        try {
            if (editingId) {
                await axios.put(`${API_URL}/companies/${editingId}`, companyData, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
            } else {
                await axios.post(`${API_URL}/companies`, companyData, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
            }
            fetchCompanies();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating company:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this company?');
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/companies/${id}`, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
                fetchCompanies();
            } catch (error) {
                console.error('Error deleting company:', error);
            }
        }
    };

    const handleEdit = (company) => {
        setName(company.name);
        setEmail(company.email);
        setWebsite(company.website);
        setEditingId(company.id);
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setWebsite('');
        setEditingId(null);
    };

    return (
        <div className="companies-container">
            <h1 className="text-xl font-bold text-blue-600 mb-4">Companies</h1>
            <form onSubmit={handleSubmit} className="company-form">
                <input
                    type="text"
                    placeholder="Company Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Company Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Company Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                />
                <button type="submit">{editingId ? 'Update Company' : 'Add Company'}</button>
                {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Existing Companies</h2>
            <table className="companies-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.id}>
                            <td>{company.name}</td>
                            <td>{company.email}</td>
                            <td>{company.website}</td>
                            <td>
                                <button onClick={() => handleEdit(company)}>Edit</button>
                                <button onClick={() => handleDelete(company.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Companies;
