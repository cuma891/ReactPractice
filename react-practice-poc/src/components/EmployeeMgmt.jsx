import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../output.css'

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
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
                                <button className="border border-zinc-400 bg-blue-600 p-1 rounded-xl text-white w-full">
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
        </div>
    )
}