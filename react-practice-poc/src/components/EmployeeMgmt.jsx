import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../output.css'

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editData, setEditData] = useState({
      name: '',
      age: '',
      email: '',
      address: '',
      salary: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);  // State for opening the modal
    useEffect(() => {
        async function getEmployeeList() {
            await axios({
                url: "http://localhost:8080/employee/employeeList",
                method: "GET",
            }).then((res) => {
                console.log(res);
                setEmployees(res.data);
            }).catch((err) => {
                console.log("Error cought" + err);
            })
        }

        getEmployeeList();
    }, [])
    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setEditData({
          name: employee.name,
          age: employee.age,
          email: employee.email,
          address: employee.address,
          salary: employee.salary
        });
        setIsModalOpen(true); // Open the modal when "Edit" is clicked
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedEmployee) {
          const { id } = selectedEmployee;
          axios.put(`http://localhost:8080/employee/${id}`, editData)
            .then(response => {
              // Update the employee list after successful update
              const updatedEmployees = [...employees];
              const index = updatedEmployees.findIndex(emp => emp.id === id);
              updatedEmployees[index] = response.data;
              setEmployees(updatedEmployees);
              setIsModalOpen(false); // Close modal after submitting
            })
            .catch(error => {
              console.error("There was an error updating the employee data!", error);
            });
        }
      };
    return (
        <div className="flex flex-col justify-center  w-full mt-28" >
            <div>
                <h2 className="font-extrabold text-xl mb-5">
                    Employee's List
                </h2>
            </div>
            <div className="flex justify-center">
            <table className="bg-white border border-gray-300 shadow-lg rounded-lg w-1/2">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Age</th>
                        <th className="px-6 py-3 text-left">Address</th>
                        <th className="px-6 py-3 text-left">Salary</th>
                        <th colSpan={2} className="px-6 py-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="border-t border-gray-200">
                            <td className="px-6 py-4">{employee.name}</td>
                            <td className="px-6 py-4">{employee.email}</td>
                            <td className="px-6 py-4">{employee.age}</td>
                            <td className="px-6 py-4">{employee.address}</td>
                            <td className="px-6 py-4">{employee.salary}</td>
                            <td className="px-4 py-4">
                                <button className="border border-zinc-400 bg-blue-600 p-1 rounded-xl text-white w-full" onClick={() => handleEditClick(employee)}>
                                    Edit
                                </button>
                            </td>
                            <td className="px-4 py-4">
                                <button className="border border-zinc-400 bg-red-600 p-1 rounded-xl text-white w-full">
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Employee</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={editData.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Salary:</label>
                <input
                  type="number"
                  name="salary"
                  value={editData.salary}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>
              <button type="button" className="close-button" onClick={() => setIsModalOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
        </div>
        
    )
}