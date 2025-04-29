import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Form.css"

const EmployeeForm = ({ addEmployee, editingEmployee, updateEmployee }) => {


    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            jobTitle: "",
            jobDescription: "",
            jobRole: ""
        },

        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required "),
            jobTitle: Yup.string().required("Job Title is required "),
            jobDescription: Yup.string().required("Job Description is required "),
            jobRole: Yup.string().required("Job Role is required "),
        }),

        onSubmit: (values, { resetForm }) => {
            if (editingEmployee) {
                updateEmployee({ ...values, id: editingEmployee.id });
            }
            else {
                addEmployee(values);
            }
            resetForm();
        },
    });

    useEffect(() => {
        if (editingEmployee) {
            formik.setValues(editingEmployee);
        }
    }, [editingEmployee]);




    return (
        <div className="form-container">
            <h2><b>{editingEmployee ? "Edit Employee" : "Add Employee"}</b></h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="First Name"
                        {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName &&
                        (<div className="error">{formik.errors.firstName}</div>)}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Last Name"
                        {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName &&
                        (<div className="error">{formik.errors.lastName}</div>)}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Job title"
                        {...formik.getFieldProps("jobTitle")}
                    />
                    {formik.touched.jobTitle && formik.errors.jobTitle &&
                        (<div className="error">{formik.errors.jobTitle}</div>)}
                </div>

                <div className="form-group">
                    <textarea
                        placeholder="Job Description"
                        {...formik.getFieldProps("jobDescription")}
                    />
                    {formik.touched.jobDescription && formik.errors.jobDescription &&
                        (<div className="error">{formik.errors.jobDescription}</div>)}
                </div>

                <div className="form-group">
                    <select {...formik.getFieldProps("jobRole")}>
                        <option value="">Select Job Role</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                        <option value="Tester">Tester</option>
                    </select>
                    {formik.touched.jobRole && formik.errors.jobRole &&
                        (<div className="error">{formik.errors.jobRole}</div>)}
                </div>

                <button className="addEmpBtn" type="submit">
                    {editingEmployee ? "Update Employee" : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;