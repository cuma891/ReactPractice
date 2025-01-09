import React , {useState, useEffect} from 'react'
import '../output.css'
import axios from 'axios';

export default function AddEmployee({onClose, onSave, isAdd, editData}){
  
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [salary, setSalary] = useState('');
    const [address, setAddress] = useState('');


    useEffect(() => {
      if (!isAdd && editData) {
        //setId(editData.id || "")
        setName(editData.name || "");
        setAge(editData.age || "");
        setEmail(editData.email || "");
        setSalary(editData.salary || "");
        setAddress(editData.address || "");
      }
    }, [isAdd, editData]);

    const handleSubmit = async() => {
      if(isAdd){
        const newEmployee = {
          name: name,
          age: age,
          email: email,
          address: address,
          salary: salary
        }
        await axios.post(`http://localhost:8080/employee/add`, newEmployee)
            .then(response => {
              console.log(response);
              onSave(response.data);
            });
      }
      else{
        const selectedEmployee = {
            id: editData.id,
            name: name,
            age: age,
            email: email,
            address: address,
            salary: salary
        }
        if (selectedEmployee) {
          const { id } = selectedEmployee;
          await axios.put(`http://localhost:8080/employee/${id}`, selectedEmployee)
            .then(response => {
              onSave(response.data);
              
            })
            .catch(error => {
              console.error("There was an error updating the employee data!", error);
            });
        }
    }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{isAdd ? "Add Employee" : "Update Employee"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            name='name'
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            name='age'
            onChange={(e) => setAge(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your age"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Salary</label>
          <input
            type="number"
            value={salary}
            name='salary'
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your salary"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your address"
          />
        </div>
        <div className="flex justify-center items-center">
        <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
            onClick={handleSubmit}
          >
           {isAdd ? "Add" : "Update"}
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
     
  );

  
    
}