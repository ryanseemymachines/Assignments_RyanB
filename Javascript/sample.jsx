// FINAL COMBINED SINGLE-FILE REACT + REDUX TASK APP (ADD + EDIT + DELETE)
// Clean, combined, no duplicates

import React, { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";

// ================= REDUX SETUP =================

const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const SET_EDITING_TASK = "SET_EDITING_TASK";

const addTask = (task) => ({ type: ADD_TASK, payload: task });
const deleteTask = (id) => ({ type: DELETE_TASK, payload: id });
const updateTask = (task) => ({ type: UPDATE_TASK, payload: task });
const setEditingTask = (task) => ({ type: SET_EDITING_TASK, payload: task });

const initialState = {
  tasks: [],
  editingTask: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case DELETE_TASK:
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.payload) };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.payload.id ? action.payload : t)),
        editingTask: null,
      };

    case SET_EDITING_TASK:
      return { ...state, editingTask: action.payload };

    default:
      return state;
  }
};

const store = createStore(taskReducer);

// =============== COMPONENTS =====================

const InputField = ({ type, name, value, onChange, placeholder }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border p-2 w-full mb-3 rounded"
  />
);

const TextArea = ({ name, value, onChange, placeholder }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border p-2 w-full mb-3 rounded h-24"
  />
);

const Button = ({ type, label, onClick }) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2"
  >
    {label}
  </button>
);

// ================= HOME (ADD + EDIT) =================

const Home = () => {
  const dispatch = useDispatch();
  const editingTask = useSelector((s) => s.editingTask);

  const [task, setTask] = useState({ id: "", title: "", desc: "" });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTask) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask({ ...task, id: Date.now() }));
    }

    setTask({ id: "", title: "", desc: "" });
  };

  return (
    <form className="p-5 border rounded w-96 mx-auto mt-10" onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="title"
        placeholder="Enter task title"
        value={task.title}
        onChange={handleChange}
      />

      <TextArea
        name="desc"
        placeholder="Enter task description"
        value={task.desc}
        onChange={handleChange}
      />

      <Button type="submit" label={editingTask ? "Update" : "Add"} />
    </form>
  );
};

// ================= TASK LIST =================

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <div className="mt-10 w-96 mx-auto">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>

      {tasks.length === 0 && <p>No tasks added yet.</p>}

      {tasks.map((task) => (
        <div key={task.id} className="p-3 border mb-2 rounded">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-gray-700 text-sm">{task.desc}</p>

          <div className="flex gap-2 mt-3">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded"
              onClick={() => dispatch(setEditingTask(task))}
            >
              Edit
            </button>

            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ================= MAIN APP ===================

export default function App() {
  return (
    <Provider store={store}>
      <Home />
      <TaskList />
    </Provider>
  );
}





import React, { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// ================= REDUX TOOLKIT SLICE =================

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    editingTask: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      state.editingTask = null;
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload;
    },
  },
});

export const { addTask, deleteTask, updateTask, setEditingTask } = taskSlice.actions;

const store = configureStore({ reducer: taskSlice.reducer });

// =============== COMPONENTS =====================

const InputField = ({ type, name, value, onChange, placeholder }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border p-2 w-full mb-3 rounded"
  />
);

const TextArea = ({ name, value, onChange, placeholder }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border p-2 w-full mb-3 rounded h-24"
  />
);

const Button = ({ type, label, onClick }) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2"
  >
    {label}
  </button>
);

// ================= HOME (ADD + EDIT) =================

const Home = () => {
  const dispatch = useDispatch();
  const editingTask = useSelector((s) => s.editingTask);

  const [task, setTask] = useState({ id: "", title: "", desc: "" });

  useEffect(() => {
    if (editingTask) setTask(editingTask);
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTask) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask({ ...task, id: Date.now() }));
    }

    setTask({ id: "", title: "", desc: "" });
  };

  return (
    <form className="p-5 border rounded w-96 mx-auto mt-10" onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="title"
        placeholder="Enter task title"
        value={task.title}
        onChange={handleChange}
      />

      <TextArea
        name="desc"
        placeholder="Enter task description"
        value={task.desc}
        onChange={handleChange}
      />

      <Button type="submit" label={editingTask ? "Update" : "Add"} />
    </form>
  );
};

// ================= TASK LIST =================

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <div className="mt-10 w-96 mx-auto">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>

      {tasks.length === 0 && <p>No tasks added yet.</p>}

      {tasks.map((task) => (
        <div key={task.id} className="p-3 border mb-2 rounded">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-gray-700 text-sm">{task.desc}</p>

          <div className="flex gap-2 mt-3">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded"
              onClick={() => dispatch(setEditingTask(task))}
            >
              Edit
            </button>

            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => dispatch(deleteTask(task.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ================= MAIN APP ===================

export default function App() {
  return (
    <Provider store={store}>
      <Home />
      <TaskList />
    </Provider>
  );
}



