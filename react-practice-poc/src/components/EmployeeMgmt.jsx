import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../output.css'
import AddEmployee from './AddEmployee'

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    const [editData, setEditData] = useState({
      id: '',
      name: '',
      age: '',
      email: '',
      address: '',
      salary: ''
    });

    const [showAddDialog, setShowAddDialog] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

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

        setEditData({
          id: employee.id,
          name: employee.name,
          age: employee.age,
          email: employee.email,
          address: employee.address,
          salary: employee.salary
        });
        setShowAddDialog(true);
        setIsAdd(false); 
      };

    const handleAdd = () => {
        setShowAddDialog(true);
        setIsAdd(true);
      }
      const closeAddDialog = () => {
        setShowAddDialog(false);
      };


      const handleDeleteClick = (employeeId) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            axios.delete(`http://localhost:8080/employee/${employeeId}`)
                .then(response => {
                    // Remove the deleted employee from the state
                    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
                    console.log("Employee deleted successfully");
                })
                .catch(error => {
                    console.error("There was an error deleting the employee", error);
                });
        }
    };

    const handleSave = (newEmployee) => {
      if (isAdd) {
        setEmployees((prev) => [...prev, newEmployee]);
      } else {
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === newEmployee.id ? newEmployee : emp))
        );
      }
      setShowAddDialog(false);
    };

    return (
        <div className="flex flex-col justify-center mt-28 w-full" >
            <div className="flex justify-center  items-center">
             <span className="text-2xl font-bold mb-4 w-3/5 ml-5">Employee's List</span>
            
      <button className="bg-blue-500 text-white py-1 px-6 rounded hover:bg-blue-600 m-1" onClick={handleAdd}>Add</button>

      </div>
            <div className="flex justify-center">
            <table className="bg-white border border-gray-300 shadow-lg rounded-lg w-3/4">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-center">Name</th>
                        <th className="px-6 py-3 text-center">Email</th>
                        <th className="px-6 py-3 text-center">Age</th>
                        <th className="px-6 py-3 text-center">Address</th>
                        <th className="px-6 py-3 text-center">Salary</th>
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
                                <button className="border bg-blue-500  hover:bg-blue-600 py-1 px-3 rounded-md text-white w-full" onClick={() => handleEditClick(employee)}>
                                    Edit
                                </button>
                            </td>
                            <td className="px-4 py-4">

                            <button className="border bg-red-500 hover:bg-red-600 p-1 rounded-md text-white w-full" onClick={() => handleDeleteClick(employee.id )}>
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            {showAddDialog && <AddEmployee onClose={closeAddDialog} onSave={handleSave} isAdd={isAdd} editData={editData} />}
            </div>
        </div>
        
    )
}