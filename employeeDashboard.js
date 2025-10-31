// ---------- Modal Elements ----------
const employeeModal = document.getElementById("employeeModal");
const modalHeading = document.getElementById("modalHeading");
const closeModal = document.getElementById("closeModal");
const employeeForm = document.getElementById("employeeForm");
const saveEmployee = document.getElementById("saveEmployee");

// Input Fields
const empName = document.getElementById("empName");
const empDesignation = document.getElementById("empDesignation");
const empDob = document.getElementById("empDob");

// Form message element
const formMessage = document.getElementById("formMessage");

// Buttons
const addBtn = document.getElementById("addEmployee");
const editBtn = document.getElementById("editEmployee");

let currentAction = "";
let employees = [];
let selectedEmployee = null;

// Base API
const API_URL = "https://6580190d6ae0629a3f54561f.mockapi.io/api/v1/employee";

// ---------- Inline Message Utility ----------
function showFormMessage(message, type = "success") {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";

    setTimeout(() => {
        formMessage.style.display = "none";
        formMessage.textContent = "";
        formMessage.className = "form-message";
    }, 2500);
}

// ---------- Modal Handling ----------
function openModal(action) {
    currentAction = action;
    employeeModal.style.display = "flex";
    employeeForm.reset();
    disableButton();
    formMessage.style.display = "none";

    if (action === "add") {
        modalHeading.textContent = "Add Employee";
        saveEmployee.textContent = "Save Employee";
        empName.style.display = "block";
        empDesignation.style.display = "block";
        empDob.style.display = "block";
        removeDropdown();
    }

    if (action === "edit") {
        modalHeading.textContent = "Edit Employee";
        saveEmployee.textContent = "Update Employee";
        createDropdown();
        fetchEmployeeList();
    }
}

function closeModalFunc() {
    employeeModal.style.display = "none";
    employeeForm.reset();
    removeDropdown();
    disableButton();
    formMessage.style.display = "none";
}

closeModal.addEventListener("click", closeModalFunc);
window.addEventListener("click", (e) => {
    if (e.target === employeeModal) closeModalFunc();
});

// ---------- Enable/Disable Submit Button ----------
function activateButton() {
    saveEmployee.classList.remove("inactive");
    saveEmployee.classList.add("active");
    saveEmployee.disabled = false;
}
function disableButton() {
    saveEmployee.classList.add("inactive");
    saveEmployee.classList.remove("active");
    saveEmployee.disabled = true;
}

// ---------- Validation ----------
employeeForm.addEventListener("input", () => {
    if (empName.value.trim() && empDesignation.value.trim() && empDob.value) {
        activateButton();
    } else {
        disableButton();
    }
});

// ---------- Create Dropdown for Edit ----------
function createDropdown() {
    if (document.getElementById("employeeDropdown")) return;

    const dropdown = document.createElement("select");
    dropdown.id = "employeeDropdown";
    dropdown.className = "form-dropdown";
    const defaultOption = document.createElement("option");
    defaultOption.text = "Select an employee";
    defaultOption.value = "";
    dropdown.add(defaultOption);
    empName.parentElement.insertBefore(dropdown, empName);

    dropdown.addEventListener("change", (e) => {
        const selectedName = e.target.value;
        const employee = employees.find(emp => emp.name === selectedName);
        if (employee) {
            selectedEmployee = employee;
            empName.value = employee.name;
            empDesignation.value = employee.designation;
            empDob.value = employee.dob ? employee.dob.split("T")[0] : "";
            activateButton();
        }
    });
}

function removeDropdown() {
    const dropdown = document.getElementById("employeeDropdown");
    if (dropdown) dropdown.remove();
}

// ---------- Fetch Employee List ----------
function fetchEmployeeList() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            employees = data;
            populateDropdown(data);
        })
        .catch(() => showFormMessage("Error fetching employee list!", "error"));
}

function populateDropdown(data) {
    const dropdown = document.getElementById("employeeDropdown");
    dropdown.innerHTML = "<option value=''>Select an employee</option>";
    data.forEach(emp => {
        const option = document.createElement("option");
        option.text = emp.name;
        option.value = emp.name;
        dropdown.add(option);
    });
}

// ---------- API Functions (Promises) ----------

// Add Employee
function addEmployee(empData) {
    return new Promise((resolve, reject) => {
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empData)
        })
        .then(res => res.ok ? res.json() : Promise.reject("Failed to add employee"))
        .then(resolve)
        .catch(reject);
    });
}

// Edit Employee
function editEmployee(empId, updatedData) {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/${empId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
        .then(res => res.ok ? res.json() : Promise.reject("Failed to update employee"))
        .then(resolve)
        .catch(reject);
    });
}

// ---------- Form Submission ----------
employeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const empData = {
        name: empName.value.trim(),
        designation: empDesignation.value.trim(),
        dob: empDob.value,
    };

    if (currentAction === "add") {
        addEmployee(empData)
            .then(() => {
                showFormMessage("Employee added successfully!", "success");
                employeeForm.reset();
                disableButton();
            })
            .catch(() => showFormMessage("Error adding employee!", "error"));
    }

    if (currentAction === "edit" && selectedEmployee) {
        editEmployee(selectedEmployee.id, empData)
            .then(() => {
                showFormMessage("Employee updated successfully!", "success");
                employeeForm.reset();
                disableButton();
            })
            .catch(() => showFormMessage("Error updating employee!", "error"));
    }
});

// ---------- Button Listeners ----------
addBtn.addEventListener("click", () => openModal("add"));
editBtn.addEventListener("click", () => openModal("edit"));
