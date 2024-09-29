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
    const [editId, setEditId] = useState(null);

    const fetchCompanies = async () => {
        const response = await axios.get(`${API_URL}/companies`);
        setCompanies(response.data);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const companyData = { name, email, website };

        try {
            if (editId) {
                // Update existing company
                await axios.put(`${API_URL}/companies/${editId}`, companyData, {
                    headers: { 'X-CSRF-TOKEN': csrfToken },
                });
            } else {
                // Create new company
                await axios.post(`${API_URL}/companies`, companyData, {
                    headers: { 'X-CSRF-TOKEN': csrfToken },
                });
            }
            fetchCompanies();
            resetForm();
        } catch (error) {
            console.error('Error saving company:', error);
        }
    };

    const handleEdit = (company) => {
        setEditId(company.id);
        setName(company.name);
        setEmail(company.email);
        setWebsite(company.website);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            try {
                await axios.delete(`${API_URL}/companies/${id}`, {
                    headers: { 'X-CSRF-TOKEN': csrfToken },
                });
                fetchCompanies();
            } catch (error) {
                console.error('Error deleting company:', error);
            }
        }
    };

    const resetForm = () => {
        setEditId(null);
        setName('');
        setEmail('');
        setWebsite('');
    };

    return (
        <div className="companies-container">
            <h1>Companies</h1>
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
                />
                <input
                    type="text"
                    placeholder="Company Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
                <button type="submit">{editId ? 'Update Company' : 'Add Company'}</button>
                {editId && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>
            <h2>Existing Companies</h2>
            <table>
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
