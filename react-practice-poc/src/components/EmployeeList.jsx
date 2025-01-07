import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../output.css'

export default function EmployeeList(){
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        async function getEmployeeList(){
            await axios({
                url:"http://localhost:8080/employeeList",
                method:"GET",
            }).then((res) => {
                console.log(res);
                setEmployees(res.data);
            }).catch((err) => {
                console.log("Error cought"+err);
            })
        }

        getEmployeeList();
    }, [])
    return (
        <div>

        </div>
    )
}