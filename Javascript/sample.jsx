// components/Spinner/index.jsx
import styles from "./index.module.css";

const Spinner = ({ isVisible = false }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;

/* components/Spinner/index.module.css */

.spinnerOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Tablet: 768px and below */
@media (max-width: 768px) {
  .spinner {
    width: 45px;
    height: 45px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
  }
}

/* Mobile: 480px and below */
@media (max-width: 480px) {
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
  }
}

// components/Toast/index.jsx

import { useState, useEffect } from "react";
import styles from "./index.module.css";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!isVisible || !message) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.toastContent}>
        <span className={styles.toastIcon}>
          {type === "success" ? "✓" : "✕"}
        </span>
        <p className={styles.toastMessage}>{message}</p>
      </div>
      <button
        className={styles.toastClose}
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        aria-label="Close toast"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;

/* components/Toast/index.module.css */

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  max-width: 400px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  z-index: 9999;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast.success {
  background-color: #10b981;
  color: white;
  border-left: 4px solid #059669;
}

.toast.error {
  background-color: #ef4444;
  color: white;
  border-left: 4px solid #dc2626;
}

.toastContent {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.toastIcon {
  font-size: 1.4em;
  font-weight: bold;
  flex-shrink: 0;
}

.toastMessage {
  margin: 0;
  font-size: 0.95em;
  font-weight: 500;
  line-height: 1.4;
}

.toastClose {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: opacity 0.2s ease;
}

.toastClose:hover {
  opacity: 0.8;
}

/* Tablet: 768px and below */
@media (max-width: 768px) {
  .toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
    padding: 14px 16px;
  }

  .toastMessage {
    font-size: 0.9em;
  }

  .toastIcon {
    font-size: 1.2em;
  }
}

/* Mobile: 480px and below */
@media (max-width: 480px) {
  .toast {
    bottom: 12px;
    right: 12px;
    left: 12px;
    max-width: none;
    padding: 12px 14px;
    gap: 10px;
  }

  .toastMessage {
    font-size: 0.85em;
  }

  .toastIcon {
    font-size: 1.1em;
  }

  .toastClose {
    width: 20px;
    height: 20px;
    font-size: 1.3em;
  }
}

/* Extra Small: 320px and below */
@media (max-width: 320px) {
  .toast {
    padding: 10px 12px;
  }

  .toastMessage {
    font-size: 0.75em;
  }
}

// components/ToastContainer/index.jsx

import { useContext } from "react";
import Toast from "../Toast";
import ToastContext from "../../context/ToastContext";
import styles from "./index.module.css";

const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;

/* components/ToastContainer/index.module.css */

.toastContainer {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  pointer-events: none;
}

.toastContainer > * {
  pointer-events: auto;
  margin-bottom: 8px;
}

// context/ToastContext.jsx

import { createContext, useState, useEffect } from "react";
import { setToastListener } from "../utils/ToastManager";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Register the addToast function globally when component mounts
  useEffect(() => {
    setToastListener(addToast);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;

// pages/Auth/Login/index.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError, clearSuccess } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../../utils/ToastManager";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import styles from "./index.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { loading, error, successMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle error messages
  useEffect(() => {
    if (error) {
      showError(error);
      dispatch(clearError());
    }
  }, [error]);

  // Handle success messages
  useEffect(() => {
    if (successMessage) {
      showSuccess(successMessage);
      dispatch(clearSuccess());
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (error) dispatch(clearError());
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClearField = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
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

  return (
    <>
      <Spinner isVisible={loading} />
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
        <p className={`${styles.errorMsg} ${errors.email ? styles.visible : ""}`}>
          {errors.email || "\u00A0"}
        </p>
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
        <p className={`${styles.errorMsg} ${errors.password ? styles.visible : ""}`}>
          {errors.password || "\u00A0"}
        </p>
      </div>

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

// pages/Auth/Register/index.jsx

import {
  registerUser,
  clearError,
  clearSuccess,
} from "../../../redux/userSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../../utils/ToastManager";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import styles from "./index.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const { loading, error, successMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle error messages
  useEffect(() => {
    if (error) {
      showError(error);
      dispatch(clearError());
    }
  }, [error]);

  // Handle success messages
  useEffect(() => {
    if (successMessage) {
      showSuccess(successMessage);
      dispatch(clearSuccess());
      navigate("/users/login", { replace: true });
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (error) dispatch(clearError());
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClearField = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const result = await dispatch(registerUser(formData));
    if (result.success) {
      // Navigation handled in useEffect
    }
  };

  return (
    <>
      <Spinner isVisible={loading} />
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
        <p className={`${styles.errorMsg} ${errors.email ? styles.visible : ""}`}>
          {errors.email || "\u00A0"}
        </p>
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
          <p className={`${styles.errorMsg} ${errors.password ? styles.visible : ""}`}>
            {errors.password || "\u00A0"}
          </p>
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
          <p className={`${styles.errorMsg} ${errors.confirmPassword ? styles.visible : ""}`}>
            {errors.confirmPassword || "\u00A0"}
          </p>
        </div>
      </div>

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

// pages/EmployeeAddEdit/index.jsx - KEY SECTIONS

import {
  registerEmployee,
  updateEmployee,
  clearError,
  clearSuccess,
} from "../../redux/employeeSlice";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSuccess, showError } from "../../utils/ToastManager";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import styles from "./index.module.css";

const EmployeeAddEdit = () => {
  const { id } = useParams();
  const isEditMode = !!id;
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

  const [originalData, setOriginalData] = useState(formData);
  const [isModified, setIsModified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { error, selectedEmployee, loading, successMessage } = useSelector(
    (state) => state.employee
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle error messages
  useEffect(() => {
    if (error) {
      showError(error);
      dispatch(clearError());
    }
  }, [error]);

  // Handle success messages
  useEffect(() => {
    if (successMessage) {
      showSuccess(successMessage);
      dispatch(clearSuccess());
      navigate("/", { replace: true });
    }
  }, [successMessage]);

  const today = new Date();
  const year18 = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  const todayDate = new Date().toISOString().split("T")[0];

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && selectedEmployee) {
      const emp = selectedEmployee?.data?.employee;

      const data = {
        fname: emp?.fname || "",
        lname: emp?.lname || "",
        email: emp?.email || "",
        dob: emp?.dob?.split("T")[0] || "",
        doj: emp?.doj?.split("T")[0] || "",
        designation: emp?.designation || "",
        experience: emp?.experience || "",
        phoneNumber: emp?.phoneNumber || "",
      };

      setFormData(data);
      setOriginalData(data);
      setIsModified(false);
    }
  }, [isEditMode, selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    setErrors((prev) => ({ ...prev, [name]: "" }));

    const changed =
      JSON.stringify(updatedData) !== JSON.stringify(originalData);

    setIsModified(changed);

    if (error) dispatch(clearError());
  };

  const handleClearField = (fieldName) => {
    const updatedData = { ...formData, [fieldName]: "" };
    setFormData(updatedData);

    setErrors((prev) => ({ ...prev, [fieldName]: "" }));

    const changed =
      JSON.stringify(updatedData) !== JSON.stringify(originalData);
    setIsModified(changed);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fname.trim()) {
      newErrors.fname = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.fname)) {
      newErrors.fname = "Name must contain only alphabets";
    }

    if (!formData.lname.trim()) {
      newErrors.lname = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.lname)) {
      newErrors.lname = "Name must contain only alphabets";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.doj) newErrors.doj = "Date of join is required";

    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(formData.experience)) {
      newErrors.experience = "Experience must be a number";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (formData.doj && formData.experience !== "") {
      const dojDate = new Date(formData.doj);
      const today = new Date();
      const experience = parseInt(formData.experience);

      let yearsDiff = today.getFullYear() - dojDate.getFullYear();

      const hasNotHadAnniversary =
        today.getMonth() < dojDate.getMonth() ||
        (today.getMonth() === dojDate.getMonth() &&
          today.getDate() < dojDate.getDate());

      if (hasNotHadAnniversary) {
        yearsDiff -= 1;
      }

      if (experience < 0) {
        newErrors.experience = "Experience cannot be negative";
      } else if (experience > yearsDiff) {
        newErrors.experience =
          "Experience cannot be more than years since date of joining";
      } else if (experience < yearsDiff) {
        newErrors.experience =
          "Experience cannot be less than years since date of joining";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    let result;

    if (isEditMode) {
      result = await dispatch(updateEmployee({ ...formData, employeeId: id }));
    } else {
      result = await dispatch(registerEmployee(formData));
    }

    if (result.success) {
      navigate("/", { replace: true });
    }

    setIsSubmitting(false);
  };

  const buttonLabel = isEditMode ? "Edit" : "Register";
  const pageTitle = isEditMode ? "EDIT EMPLOYEE" : "REGISTER";
  const disableSubmit = isEditMode ? !isModified : loading || isSubmitting;

  return (
    <div className={styles.detailContainer}>
      <Spinner isVisible={loading} />
      <div className={styles.detailContent}>
        <h1>{pageTitle}</h1>

        <form className={styles.inputForm}>
          <div className={styles.fieldGroup}>
            <label>First Name</label>
            <Input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="Enter first name..."
              onClear={() => handleClearField("fname")}
            />
            <p className={`${styles.errorMsg} ${errors.fname ? styles.visible : ""}`}>
              {errors.fname || "\u00A0"}
            </p>
          </div>

          <div className={styles.fieldGroup}>
            <label>Last Name</label>
            <Input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Enter last name..."
              onClear={() => handleClearField("lname")}
            />
            <p className={`${styles.errorMsg} ${errors.lname ? styles.visible : ""}`}>
              {errors.lname || "\u00A0"}
            </p>
          </div>

          <div className={styles.fieldGroup}>
            <label>Email address</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              onClear={() => handleClearField("email")}
            />
            <p className={`${styles.errorMsg} ${errors.email ? styles.visible : ""}`}>
              {errors.email || "\u00A0"}
            </p>
          </div>

          <div className={styles.dateRow}>
            <div className={styles.fieldGroup}>
              <label>Date of Birth</label>
              <Input
                type="date"
                name="dob"
                max={year18}
                value={formData.dob}
                onChange={handleChange}
              />
              <p className={`${styles.errorMsg} ${errors.dob ? styles.visible : ""}`}>
                {errors.dob || "\u00A0"}
              </p>
            </div>

            <div className={styles.fieldGroup}>
              <label>Date of Join</label>
              <Input
                type="date"
                name="doj"
                max={todayDate}
                value={formData.doj}
                onChange={handleChange}
              />
              <p className={`${styles.errorMsg} ${errors.doj ? styles.visible : ""}`}>
                {errors.doj || "\u00A0"}
              </p>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Designation</label>
            <Input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter designation..."
              onClear={() => handleClearField("designation")}
            />
            <p className={`${styles.errorMsg} ${errors.designation ? styles.visible : ""}`}>
              {errors.designation || "\u00A0"}
            </p>
          </div>

          <div className={styles.phoneRow}>
            <div className={styles.fieldGroup}>
              <label>Experience (in Yrs)</label>
              <Input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter experience..."
                onClear={() => handleClearField("experience")}
              />
              <p className={`${styles.errorMsg} ${errors.experience ? styles.visible : ""}`}>
                {errors.experience || "\u00A0"}
              </p>
            </div>

            <div className={styles.fieldGroup}>
              <label>Phone</label>
              <Input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone..."
                onClear={() => handleClearField("phoneNumber")}
              />
              <p className={`${styles.errorMsg} ${errors.phoneNumber ? styles.visible : ""}`}>
                {errors.phoneNumber || "\u00A0"}
              </p>
            </div>
          </div>

          <div className={styles.btnRow}>
            <Button
              btnStyle="regBtn"
              type="button"
              label={buttonLabel}
              onClick={handleSubmit}
              disabled={disableSubmit}
            />
            <Button
              btnStyle="regBtn"
              type="button"
              label="Cancel"
              onClick={() => navigate("/", { replace: true })}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAddEdit;

// pages/EmployeeList/index.jsx

import {
  getEmployee,
  getEmployeeById,
  deleteEmployee,
  clearSuccess,
  clearError,
} from "../../redux/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../utils/ToastManager";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spinner from "../../components/Spinner";
import styles from "./index.module.css";

const Employeelist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSelectedEmployee, setDeleteSelectedEmployee] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading, successMessage, error } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    dispatch(getEmployee());
  }, [dispatch]);

  // Handle success messages
  useEffect(() => {
    if (successMessage) {
      showSuccess(successMessage);
      dispatch(clearSuccess());
      dispatch(getEmployee());
    }
  }, [successMessage]);

  // Handle error messages
  useEffect(() => {
    if (error) {
      showError(error);
      dispatch(clearError());
    }
  }, [error]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const handleEdit = async (employeeId) => {
    const result = await dispatch(getEmployeeById(employeeId));
    if (result.success) navigate(`/employee/edit/${employeeId}`);
  };

  const handleDelete = (emp) => {
    setDeleteSelectedEmployee(emp);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteEmployee(deleteSelectedEmployee.employeeId));
    setIsModalOpen(false);
  };

  const employeeList = employees || [];

  const filteredEmployees = employeeList.filter(
    (emp) =>
      `${emp.fname} ${emp.lname}`.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search) ||
      emp.designation.toLowerCase().includes(search)
  );

  return (
    <div className={styles.container}>
      <Spinner isVisible={loading} />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Confirm Deletion</h1>

        <h3>
          Are you sure you want to delete employee
          <strong>
            {" "}
            "{deleteSelectedEmployee?.fname} {deleteSelectedEmployee?.lname}"
          </strong>
          ?
        </h3>

        <div className={styles.modalActions}>
          <Button onClick={confirmDelete} btnStyle="regBtn" label="Confirm" />
          <Button
            onClick={() => setIsModalOpen(false)}
            btnStyle="regBtn"
            label="Cancel"
          />
        </div>
      </Modal>

      <div className={styles.searchBox}>
        <Input
          inputStyle="searchInput"
          type="search"
          value={searchInput}
          onChange={(e) => {
            const value = e.target.value;
            setSearchInput(value);

            if (value.trim() === "") {
              setSearch("");
            }
          }}
          placeholder="Search for employee name, email or designation"
        />

        <Button
          label="Search"
          btnStyle="regBtn"
          onClick={() => setSearch(searchInput.toLowerCase())}
        />
      </div>

      {filteredEmployees.length > 0 ? (
        <table className={styles.employeeTable}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerData}>Name</th>
              <th className={styles.headerData}>Designation</th>
              <th className={styles.headerData}>Date of Join</th>
              <th className={styles.headerData}>Experience</th>
              <th className={styles.headerData}>Email</th>
              <th className={styles.headerData}>Date of Birth</th>
              <th className={styles.headerData}>Phone Number</th>
              <th className={styles.headerActionData}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.employeeId} className={styles.dataRow}>
                <td className={styles.tableData}>
                  {emp.fname} {emp.lname}
                </td>
                <td className={styles.tableData}>{emp.designation}</td>
                <td className={styles.tableData}>{formatDate(emp.doj)}</td>
                <td className={styles.tableData}>{emp.experience}</td>
                <td className={styles.tableData}>{emp.email}</td>
                <td className={styles.tableData}>{formatDate(emp.dob)}</td>
                <td className={styles.tableData}>{emp.phoneNumber}</td>
                <td className={styles.actionBtnCell}>
                  <ul className={styles.actionBtns}>
                    <li
                      onClick={() => handleEdit(emp.employeeId)}
                      className={styles.editBtn}
                    >
                      Edit
                    </li>
                    <li
                      onClick={() => handleDelete(emp)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
};

export default Employeelist;

// pages/Home/index.jsx
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Employeelist from "../EmployeeList";
import styles from "./index.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [isComponentReady, setIsComponentReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/users/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log("Expires at:", new Date(decoded.exp * 1000));

      const isExpired = decoded.exp < Math.floor(Date.now() / 1000);

      if (isExpired) {
        localStorage.removeItem("token");
        navigate("/users/login");
      } else {
        // Component is ready, now API calls can proceed
        setIsComponentReady(true);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/users/login");
    }
  }, [navigate]);

  return (
    <div className={styles.homeContainer}>
      <Header />
      {isComponentReady && <Employeelist />}
    </div>
  );
};

export default Home;

// redux/employeeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  registerEmployeeApi,
  getEmployeeApi,
  getEmployeeByIdApi,
  deleteEmployeeApi,
  updateEmployeeApi,
} from "./api/employeeApi";

const employeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    selectedEmployee: null,
    loading: false,
    error: "",
    successMessage: "",
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = "";
    },
    getEmployeeSuccess: (state, action) => {
      state.employees = action.payload.data.list;
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
      state.successMessage = "Employee registered successfully!";
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
      state.successMessage = "Employee updated successfully!";
    },
    deleteEmployeeSuccess: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.employeeId !== action.payload
      );
      state.loading = false;
      state.error = "";
      state.successMessage = "Employee deleted successfully!";
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = "";
    },
    clearSuccess: (state) => {
      state.successMessage = "";
    },
  },
});

export const {
  startLoading,
  registerEmployeeSuccess,
  getEmployeeSuccess,
  getEmployeeByIdSuccess,
  updateEmployeeSuccess,
  deleteEmployeeSuccess,
  setError,
  clearError,
  clearSuccess,
} = employeSlice.actions;

export const registerEmployee = (form) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await registerEmployeeApi(form);
    dispatch(registerEmployeeSuccess(form));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export const getEmployee = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await getEmployeeApi();
    dispatch(getEmployeeSuccess(data));
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
    dispatch(getEmployeeByIdSuccess(data));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export const updateEmployee = (form) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await updateEmployeeApi(form);
    dispatch(updateEmployeeSuccess(form));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await deleteEmployeeApi(id);
    dispatch(deleteEmployeeSuccess(data));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export default employeSlice.reducer;

// utils/toastManager.js

let toastListener = null;

export const setToastListener = (listener) => {
  toastListener = listener;
};

export const showToast = (message, type = "success", duration = 3000) => {
  if (!toastListener) {
    console.warn("Toast system not initialized. Make sure ToastProvider is mounted.");
    return;
  }
  toastListener(message, type, duration);
};

export const showSuccess = (message, duration = 3000) => {
  showToast(message, "success", duration);
};

export const showError = (message, duration = 3000) => {
  showToast(message, "error", duration);
};

// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";       // <-- FIXED
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ToastContainer";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

// Lazy load all page components
const Auth = lazy(() => import("./pages/Auth"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const EmployeeAddEdit = lazy(() => import("./pages/EmployeeAddEdit"));

// Fallback component for lazy loading
const LazyFallback = () => {
  return <Spinner isVisible={true} />;
};

function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <BrowserRouter>
          <ToastContainer />
          <Suspense fallback={<LazyFallback />}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/employee/signup"
                element={
                  <ProtectedRoute>
                    <EmployeeAddEdit />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/employee/edit/:id"
                element={
                  <ProtectedRoute>
                    <EmployeeAddEdit />
                  </ProtectedRoute>
                }
              />

              <Route path="/users" element={<Auth />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Register />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  );
}

export default App;
