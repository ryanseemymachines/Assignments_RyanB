const BASE_URL = "http://localhost:8000/api";

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const message = data.message || "Something went wrong";
    throw new Error(message);
  }
  return data;
};

export const registerApi = async (form) => {
  return fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  }).then(handleResponse);
};

export const loginApi = async (form) => {
  return fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  }).then(handleResponse);
};

import styles from "./index.module.css";

const Button = ({ type, label, onClick, btnStyle, disabled }) => {
  return (
    <button
      className={`${styles.Btn} ${btnStyle ? styles[btnStyle] : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;


.Btn {
  width: fit-content;
  border: none;
  padding: 15px 45px;
  font-size: 1em;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.Btn:hover {
  cursor: pointer;
}

.Btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loginSwitchBtn {
  font-weight: 500;
  color: rgb(102, 104, 106);
  transition: all 0.2s ease;
}

.loginSwitchBtn:hover {
  color: white;
  background-color: rgb(41, 74, 127);
}

.regBtn {
  font-weight: 500;
  color: white;
  background-color: rgb(41, 74, 127);
  border: 2px solid rgb(41, 74, 127);
  transition: all 0.2s ease;
}

.regBtn:hover {
  border: 2px solid rgb(84, 84, 84);
  color: rgb(102, 104, 106);
  background-color: white;
}


const Input = (props) => {
     const { type, name, placeholder, value, onChange, min, max, onClear } = props;

     return (
       <div className={styles.inputWrapper}>
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
         {value && onClear && (
           <button
             className={styles.clearBtn}
             onClick={onClear}
             type="button"
             aria-label="Clear input"
           >
             ✕
           </button>
         )}
       </div>
     );
   };

const Input = (props) => {
     const { type, name, placeholder, value, onChange, min, max, onClear } = props;

     return (
       <div className={styles.inputWrapper}>
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
         {value && onClear && (
           <button
             className={styles.clearBtn}
             onClick={onClear}
             type="button"
             aria-label="Clear input"
           >
             ✕
           </button>
         )}
       </div>
     );
   };


.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.textInput {
  padding: 12px;
  font-size: 1.3em;
  border: 2px solid rgb(201, 199, 199);
  border-radius: 8px;
  transition: all 0.2s ease;
  width: 100%;
}

.textInput:focus {
  outline: none;
  border: 2px solid rgb(95, 95, 95);
}

.clearBtn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.2em;
  color: rgb(95, 95, 95);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.clearBtn:hover {
  color: rgb(41, 74, 127);
}


import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/users/signup" replace />;
  }
  return children;
};

export default ProtectedRoute;


import { useState, useEffect } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
// import { isLoggedIn } from "../../../auth";
import styles from "./index.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");

    if (error) {
      dispatch(clearError());
    }
  };

  const validate = () => {
    let valid = true;

    if (!formData.email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("Enter a valid email");
      valid = false;
    }

    if (!formData.password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }

    return valid;
  };

  const handleClearField = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const result = await dispatch(loginUser(formData));

    if (result.success) {
      setLoginSuccess(true);
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, navigate]);

  // if (isLoggedIn()) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <>
      <h2>LOGIN</h2>

      <div className={styles.fieldGroup}>
        <label>Your email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          onClear={() => handleClearField("email")}
        />
        {emailError && <p className={styles.errorMsg}>{emailError}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <label>Password</label>
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          onClear={() => handleClearField("password")}
        />
        {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
      </div>

      {error && <p className={styles.errorMsg}>{error}</p>}

      <Button
        btnStyle="regBtn"
        type="button"
        label={
          loginSuccess ? "Logging in..." : loading ? "Logging in..." : "Login"
        }
        onClick={handleSubmit}
        disabled={loading || loginSuccess}
      />
    </>
  );
};

export default Login;

label{
    font-size: 1.2em;
    font-weight: 500;
    color:rgb(98, 99, 102);
}

.fieldGroup {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.passwordRow {
  display: flex;
  gap: 20px;
}

.passwordRow .fieldGroup {
  flex: 1;
}

.errorMsg {
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
}

import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../../redux/userSlice";
import { useNavigate  } from "react-router-dom";
// import { isLoggedIn } from "../../../auth";
import styles from "./index.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
    if (name === "confirmPassword") setConfirmPasswordError("");

    if (error) {
      dispatch(clearError());
    }
  };

  const validate = () => {
    let valid = true;

    if (!formData.email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("Enter a valid email");
      valid = false;
    }

    if (!formData.password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!formData.confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    }

    return valid;
  };

  const handleClearField = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const result = await dispatch(registerUser(formData));

    if (result.success) {
      navigate("/users/login", { replace: true });
    }
  };

  // if (isLoggedIn()) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <>
      <h2>REGISTER</h2>

      <div className={styles.fieldGroup}>
        <label>Your email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          onClear={() => handleClearField("email")}
        />
        {emailError && <p className={styles.errorMsg}>{emailError}</p>}
      </div>

      <div className={styles.passwordRow}>
        <div className={styles.fieldGroup}>
          <label>Password</label>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            onClear={() => handleClearField("password")}
          />
          {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
        </div>

        <div className={styles.fieldGroup}>
          <label>Confirm Password</label>
          <Input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            onClear={() => handleClearField("confirmPassword")}
          />
          {confirmPasswordError && (
            <p className={styles.errorMsg}>{confirmPasswordError}</p>
          )}
        </div>
      </div>

      {error && <p className={styles.errorMsg}>{error}</p>}

      <Button
        btnStyle="regBtn"
        type="button"
        label={loading ? "Registering..." : "Register"}
        onClick={handleSubmit}
      />
    </>
  );
};

export default Register;


label{
    font-size: 1.2em;
    font-weight: 500;
    color:rgb(98, 99, 102);
}

.fieldGroup {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.passwordRow {
  display: flex;
  gap: 20px;
}

.passwordRow .fieldGroup {
  flex: 1;
}

.errorMsg {
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
}
import { Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import styles from "./index.module.css";
import { useState } from "react";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authContent}>
        <div className={styles.authContentLeft}>
          <h2>INFORMATION</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            corporis fuga aspernatur qui, fugiat quam sunt totam in cupiditate
            corrupti assumenda nisi, dolorum eius laudantium veritatis.
            Provident enim odio deleniti!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            nisi corporis consequatur cumque ad tempora eaque.
          </p>

          <Button
            btnStyle="loginSwitchBtn"
            type="button"
            label={isLogin ? "New Here? Register Now!" : "Have an account?"}
            onClick={() => {
              const nextState = !isLogin;
              setIsLogin(nextState);
              navigate(nextState ? "/users/login" : "/users/signup", { replace: true });
            }}
          />
        </div>

        <div className={styles.authContentRight}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;


.authContainer {
  height: 100vh;
  background-color: rgb(26, 59, 101);
  display: flex;
  justify-content: center;
  align-items: center;
}

.authContent {
  height: 60vh;
  width: 70vw;
  background-color: white;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.authContent h2 {
  font-size: 2em;
}

.authContent p {
  font-size: 1.2em;
}

.authContentLeft {
  color: white;
  padding: 30px;
  background-color: rgb(63, 100, 130);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 25px;
}

.authContentRight {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.authContentRight h2 {
  color: rgb(41, 74, 127);
}


import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import Button from "../../components/Button";
import styles from "./index.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/users/login", { replace: true });
  };

  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to Home!</h1>
      <Button
        btnStyle="logoutBtn"
        type="button"
        label="Logout"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Home;


import { createSlice } from "@reduxjs/toolkit";
import { loginApi , registerApi } from "../api/userApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || "",
    loading: false,
    error: "",
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    loginSuccess: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.loading = false;
      state.error = "";
    },
    registerSuccess: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      state.loading = false;
      state.error = "";
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
     state.error = "";
   },
   logout: (state) => {
     state.token = "";
     state.loading = false;
     state.error = "";
     localStorage.removeItem("token");
   },
  },
});

export const { startLoading, loginSuccess, registerSuccess, setError, clearError,logout } =
  userSlice.actions;

export const loginUser = (form) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await loginApi(form);
    dispatch(loginSuccess(data.data.token));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export const registerUser = (form) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await registerApi(form);
    dispatch(registerSuccess(data.data.token));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export default userSlice.reducer;

Step 1: Create api/employeeApi.js
javascriptconst BASE_URL = "http://localhost:8000/api";

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const message = data.message || "Something went wrong";
    throw new Error(message);
  }
  return data;
};

// Get token from localStorage
const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getEmployeesApi = async () => {
  return fetch(`${BASE_URL}/employee/list`, {
    method: "GET",
    headers: getAuthHeaders(),
  }).then(handleResponse);
};

export const getEmployeeByIdApi = async (employeeId) => {
  return fetch(`${BASE_URL}/employee/getEmployeeById?employeeId=${employeeId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  }).then(handleResponse);
};

export const registerEmployeeApi = async (employeeData) => {
  return fetch(`${BASE_URL}/employee/register`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(employeeData),
  }).then(handleResponse);
};

export const updateEmployeeApi = async (employeeData) => {
  return fetch(`${BASE_URL}/employee/edit`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(employeeData),
  }).then(handleResponse);
};

export const deleteEmployeeApi = async (employeeId) => {
  return fetch(`${BASE_URL}/employee/delete`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ employeeId }),
  }).then(handleResponse);
};

Step 2: Create redux/employeeSlice.js
javascriptimport { createSlice } from "@reduxjs/toolkit";
import {
  getEmployeesApi,
  getEmployeeByIdApi,
  registerEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from "../api/employeeApi";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    selectedEmployee: null,
    loading: false,
    error: "",
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    getEmployeesSuccess: (state, action) => {
      state.employees = action.payload;
      state.loading = false;
      state.error = "";
    },
    getEmployeeByIdSuccess: (state, action) => {
      state.selectedEmployee = action.payload;
      state.loading = false;
      state.error = "";
    },
    registerEmployeeSuccess: (state, action) => {
      state.employees.push(action.payload);
      state.loading = false;
      state.error = "";
    },
    updateEmployeeSuccess: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.employeeId === action.payload.employeeId
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
      state.selectedEmployee = action.payload;
      state.loading = false;
      state.error = "";
    },
    deleteEmployeeSuccess: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.employeeId !== action.payload
      );
      state.loading = false;
      state.error = "";
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
});

export const {
  startLoading,
  getEmployeesSuccess,
  getEmployeeByIdSuccess,
  registerEmployeeSuccess,
  updateEmployeeSuccess,
  deleteEmployeeSuccess,
  setError,
  clearError,
} = employeeSlice.actions;

// Thunks
export const getEmployees = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await getEmployeesApi();
    dispatch(getEmployeesSuccess(data.data));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export const getEmployeeById = (employeeId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await getEmployeeByIdApi(employeeId);
    dispatch(getEmployeeByIdSuccess(data.data));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export const registerEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await registerEmployeeApi(employeeData);
    dispatch(registerEmployeeSuccess(data.data));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export const updateEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await updateEmployeeApi(employeeData);
    dispatch(updateEmployeeSuccess(data.data));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await deleteEmployeeApi(employeeId);
    dispatch(deleteEmployeeSuccess(employeeId));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export default employeeSlice.reducer;

Step 3: Update redux/store.js
javascriptimport { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeeReducer from "./employeeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    employee: employeeReducer,
  },
});

export default store;

Step 4: Example Usage in Component
javascriptimport { useDispatch, useSelector } from "react-redux";
import { getEmployees, registerEmployee, deleteEmployee } from "../../redux/employeeSlice";
import { useEffect, useState } from "react";

const EmployeeManagement = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employee);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    doj: "",
    designation: "",
    experience: "",
    phoneNumber: "",
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const result = await dispatch(registerEmployee(formData));
    if (result.success) {
      setFormData({
        fname: "",
        lname: "",
        email: "",
        dob: "",
        doj: "",
        designation: "",
        experience: "",
        phoneNumber: "",
      });
      // Show success message
    }
  };

  const handleDelete = (employeeId) => {
    dispatch(deleteEmployee(employeeId));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Employee Management</h2>

      {/* Register Form */}
      <div>
        <h3>Add New Employee</h3>
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          value={formData.fname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          value={formData.lname}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          type="date"
          name="doj"
          value={formData.doj}
          onChange={handleChange}
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <button onClick={handleRegister}>Register Employee</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Employee List */}
      <div>
        <h3>Employee List</h3>
        {employees.map((emp) => (
          <div key={emp.employeeId} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h4>{emp.fname} {emp.lname}</h4>
            <p>Email: {emp.email}</p>
            <p>Designation: {emp.designation}</p>
            <button onClick={() => handleDelete(emp.employeeId)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
