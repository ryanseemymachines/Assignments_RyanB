const BASE_URL = "http://localhost:8000/api";

// Helper to handle fetch responses
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


import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);

  if (!token) return <Navigate to="/auth/login" replace />;

  return children;
};

export default ProtectedRoute;


import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/userSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (result.success) navigate("/");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <p>
        Don’t have an account? <Link to="/auth/register">Register →</Link>
      </p>
    </form>
  );
};

export default Login;

h2 {
  color: rgb(41, 74, 127);
  font-size: 2em;
}

.fieldGroup {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-size: 1.2em;
  font-weight: 500;
  color: rgb(98, 99, 102);
}

.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.clearBtn {
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 1.1em;
  color: #444;
}

.errorMsg {
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
}

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (result.success) navigate("/");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Create Account"}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <p>
        Already have an account? <Link to="/auth/login">Login →</Link>
      </p>
    </form>
  );
};

export default Register;

h2 {
  color: rgb(41, 74, 127);
  font-size: 2em;
}

.fieldGroup {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-size: 1.2em;
  font-weight: 500;
  color: rgb(98, 99, 102);
}

.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.clearBtn {
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 1.1em;
  color: #444;
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

import { Outlet } from "react-router-dom";
import styles from "./index.module.css";

const Auth = () => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;

/* Auth.module.css */

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

.authContentLeft {
  color: white;
  padding: 30px;
  background-color: rgb(63, 100, 130);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 25px;
}

.authContentLeft h2 {
  font-size: 2em;
}

.authContentLeft p {
  font-size: 1.2em;
}

.authContentRight {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome Home 🚀</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Home;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../api/userApi";

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
    logout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { startLoading, loginSuccess, registerSuccess, setError, logout } = userSlice.actions;

// Async functions WITHOUT createAsyncThunk
export const loginUser = (form) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const data = await loginApi(form);
    dispatch(loginSuccess(data.token));
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
    dispatch(registerSuccess(data.token));
    return { success: true };
  } catch (err) {
    dispatch(setError(err.message));
    return { success: false };
  }
};

export default userSlice.reducer;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "../src/pages/Auth/Login";
import Register from "../src/pages/Auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          {/* Protected Home */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Auth Pages */}
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

