import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Table.css";

const EmployeeTable = ({ employees, deleteEmployee, editEmployee }) => {
    return (
        <div className="table-container">
            <h2><b>Employee List</b></h2>
           
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Job Description</th>
                            <th scope="col">Job Role</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center text-muted">
                                No employees added yet.
                            </td>
                        </tr>
                    ) : (
                        employees.map((emp, index) => (
                            <tr key={emp.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.jobTitle}</td>
                                <td>{emp.jobDescription}</td>
                                <td>{emp.jobRole}</td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-primary me-2" onClick={() => editEmployee(emp)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(emp.id)}>
                                        Delete
                                    </button>
                                </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
        </div>
    );
};

export default EmployeeTable;
