import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tasks.css';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const API_URL = 'http://localhost:8000';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [status, setStatus] = useState('new');
    const [editingId, setEditingId] = useState(null);

    const fetchTasks = async () => {
        const response = await axios.get(`${API_URL}/tasks`);
        setTasks(response.data);
    };

    const fetchEmployees = async () => {
        const response = await axios.get(`${API_URL}/employees`);
        setEmployees(response.data);
    };

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            name,
            description,
            employee_id: employeeId,
            status,
        };

        try {
            if (editingId) {
                await axios.put(`${API_URL}/tasks/${editingId}`, taskData, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
            } else {
                await axios.post(`${API_URL}/tasks`, taskData, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                });
            }
            fetchTasks();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating task:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        setName(task.name);
        setDescription(task.description);
        setEmployeeId(task.employee_id);
        setStatus(task.status);
        setEditingId(task.id);
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setEmployeeId('');
        setStatus('new');
        setEditingId(null);
    };

    return (
        <div className="tasks-container">
            <h1>Tasks</h1>
            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.first_name} {employee.last_name}
                        </option>
                    ))}
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="new">New</option>
                    <option value="started">Started</option>
                    <option value="done">Done</option>
                </select>
                <button type="submit">{editingId ? 'Update Task' : 'Add Task'}</button>
                {editingId && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>
            <h2>Existing Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Employee</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>{task.employee ? `${task.employee.first_name} ${task.employee.last_name}` : 'N/A'}</td>
                            <td>{task.status}</td>
                            <td>
                                <button onClick={() => handleEdit(task)}>Edit</button>
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tasks;
