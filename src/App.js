import React, { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem("employees");
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  const [editingEmployee, setEditingEmployee] = useState(null);

  // Load employees from localStorage on mount
  useEffect(() => {
    const storedEmployees = localStorage.getItem("emoployees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  // Save employees to localStorage whenever employees state changes
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
    toast.success("Employee added successfully!");
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setEditingEmployee(null);
    toast.success("Employee updated successfully!");
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
    toast.error("Employee deleted successfully!");
  };

  const editEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  return (
    <div className="app-container">
      <EmployeeForm
        addEmployee={addEmployee}
        editingEmployee={editingEmployee}
        updateEmployee={updateEmployee}
      />

      <EmployeeTable
        employees={employees}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
