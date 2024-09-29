import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const API_URL = 'http://localhost:8000';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editingId, setEditingId] = useState(null);

    const fetchEmployees = async () => {
        const response = await axios.get(`${API_URL}/employees`);
        setEmployees(response.data);
    };

    const fetchCompanies = async () => {
        const response = await axios.get(`${API_URL}/companies`);
        setCompanies(response.data);
    };

    useEffect(() => {
        fetchEmployees();
        fetchCompanies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeData = {
            first_name: firstName,
            last_name: lastName,
            company_id: companyId,
            email,
            phone,
        };

        try {
            if (editingId) {
                await axios.put(`${API_URL}/employees/${editingId}`, employeeData, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
            } else {
                await axios.post(`${API_URL}/employees`, employeeData, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
            }
            fetchEmployees();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating employee:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/employees/${id}`, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleEdit = (employee) => {
        setFirstName(employee.first_name);
        setLastName(employee.last_name);
        setCompanyId(employee.company_id);
        setEmail(employee.email);
        setPhone(employee.phone);
        setEditingId(employee.id);
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setCompanyId('');
        setEmail('');
        setPhone('');
        setEditingId(null);
    };

    return (
        <div className="employees-container">
            <h1 className="text-xl font-bold text-blue-600 mb-4">Employees</h1>
            <form onSubmit={handleSubmit} className="employee-form">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <select
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    required
                >
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                            {company.name}
                        </option>
                    ))}
                </select>
                <input
                    type="email"
                    placeholder="Employee Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit">{editingId ? 'Update Employee' : 'Add Employee'}</button>
                {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>
            <h2>Existing Employees</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Company</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.company ? employee.company.name : 'N/A'}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)}>Edit</button>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
