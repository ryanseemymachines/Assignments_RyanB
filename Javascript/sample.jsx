const EmployeeCard = ({ emp }) => {
  const dob = new Date(emp.dob); 
  return (
    <div>
      <h3>{emp.name}</h3>
      <p>{emp.designation}</p>
      <p>{dob.toLocaleDateString("en-IN")}</p>
    </div>
  );
};

export default EmployeeCard;

import styles from "./index.module.css";

const InputField = (props) => {
  const { type, name, placeholder, value, onChange, min, max } = props;

  return (
    <input
      className={styles.textInput}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
    />
  );
};

export default InputField;


import { useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { addEmployee } from "../../redux/employeeSplice";
import InputFields from "../InputFields";
import Button from "../Button";
import styles from "./index.module.css";

const NewEmployee = ({ onClose }) => {
  const dispatch = useDispatch();

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    designation: "",
    date: "",
  });

  const getMaxAllowedDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0];
  };

  const maxDate = getMaxAllowedDate();

  const validateName = (name) => /^[A-Za-z ]+$/.test(name);

  const validateDesignation = (designation) =>
    /^[A-Za-z \-]+$/.test(designation);

  const handleSubmit = () => {
    const { name, designation, date } = newEmployee;

    if (!name || !designation || !date) {
      alert("Please fill all fields");
      return;
    }

    if (!validateName(name)) {
      alert("Name can only contain letters and spaces.");
      return;
    }

    if (!validateDesignation(designation)) {
      alert("Designation can only contain letters, spaces, and hyphens (-).");
      return;
    }

    const formattedDOB = new Date(date).toISOString();

    const employeeData = {
      name,
      designation,
      dob: formattedDOB,
    };

    dispatch(addEmployee(employeeData));
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <form
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>Add New Employee</h2>
          <IoMdClose className={styles.closeModal} onClick={onClose} />
        </div>

        <InputFields
          type="text"
          value={newEmployee.name}
          placeholder="Enter Name..."
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, name: e.target.value })
          }
        />

        <InputFields
          type="text"
          value={newEmployee.designation}
          placeholder="Enter Designation..."
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, designation: e.target.value })
          }
        />

        <InputFields
          type="date"
          value={newEmployee.date}
          max={maxDate}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, date: e.target.value })
          }
        />

        <Button type="button" label="Add Employee" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default NewEmployee;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "https://6580190d6ae0629a3f54561f.mockapi.io/api/v1/employee";

export const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async () => {
    const response = await fetch(API);
    return response.json();
  }
);

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",//action type prefix
  async (data) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      });
  },
});

export default employeeSlice.reducer;
