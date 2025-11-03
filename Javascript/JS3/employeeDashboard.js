//Base URL
const API_URL = "https://6580190d6ae0629a3f54561f.mockapi.io/api/v1/employee";

const TableContainer=document.querySelector(".table-container");
//Modal elements
const employeeModal = document.getElementById("employeeModal");
const modalHeading = document.getElementById("modalHeading");
const closeModal = document.getElementById("closeModal");
const employeeForm = document.getElementById("employeeForm");
const saveEmployee = document.getElementById("saveEmployee");

//Input fields
const empName = document.getElementById("empName");
const empDesignation = document.getElementById("empDesignation");
const empDob = document.getElementById("empDob");

const today = new Date();
today.setFullYear(today.getFullYear() - 18);''
const maxDate = today.toISOString().split("T")[0];
empDob.setAttribute("max", maxDate);

// Form message element
const formMessage = document.getElementById("formMessage");

//form message 
function showFormMessage(message, type = "success") {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";
}

//Buttons
const addBtn = document.getElementById("addEmployee");
const editBtn = document.getElementById("editEmployee");
const deletebtn = document.getElementById("deleteEmployee");
const fetchbtn = document.getElementById("fetchEmployee");

//Button Listener
addBtn.addEventListener("click", () => openModal("add"));
editBtn.addEventListener("click", () => openModal("edit"));
deletebtn.addEventListener("click", () => openModal("delete"));
fetchbtn.addEventListener("click", () => createTable());

let currentAction=null;
let employees=[];
let employee=[];
let selectedEmployee=null;

//Modal open function
async function openModal(action){
    currentAction=action;
    employeeModal.style.display="flex";
    employeeForm.reset();
    disableButton();
    formMessage.style.display="none";

    if(action==="add"){
        modalHeading.textContent="Add Element";
        saveEmployee.textContent="Save Employee";
        TableContainer.style.display="none";
        empName.disabled=false;
        empDesignation.disabled=false;
        empDob.disabled=false;
    }

    if(action==="edit"){
        modalHeading.textContent="Edit Element";
        saveEmployee.textContent="Update Employee";
        await fetchEmployeeList();
        removeDropdown();
        createDropdown();
        TableContainer.style.display="none";
    }

    if(action==="delete"){
        modalHeading.textContent="Delete Element";
        saveEmployee.textContent="Delete Employee";
        empName.disabled=true;
        empDesignation.disabled=true;
        empDob.disabled=true;
        await fetchEmployeeList();
        removeDropdown();
        createDropdown();
        TableContainer.style.display="none";
    }
}

//Modal close function
closeModal.addEventListener("click",closeModalFunc);

window.addEventListener("click" ,(e) =>{
    if(e.target === employeeModal)
        closeModalFunc(); 
});

function closeModalFunc(){
    employeeModal.style.display="none";
    employeeForm.reset();   
    removeDropdown();
}

//Form validation
employeeForm.addEventListener("input", () =>{
    if(empName.value.trim() && empDesignation.value.trim() && empDob.value.trim())
        activateButton();
    else
        disableButton();
});

//Enable/Disable submit button
function activateButton(){
    saveEmployee.classList.remove("inactive");
    saveEmployee.classList.add("active");
    saveEmployee.disabled=false;
}

function disableButton(){
    saveEmployee.classList.remove("active");
    saveEmployee.classList.add("inactive");
    saveEmployee.disabled=true;
}

//dropdown functions
function createDropdown(){
    const dropdown=document.createElement("select");
    dropdown.id="employeeDropdown";
    dropdown.class="form-dropdown";
    const defaultOption=document.createElement("option");
    defaultOption.textContent="Select an employee";
    defaultOption.value="";
    dropdown.appendChild(defaultOption);
    empName.parentElement.insertBefore(dropdown,empName);
    dropdown.addEventListener("change", (e) =>{
        const chosenId = e.target.value;
        const ChosenEmployee=employees.find(emp => emp.id === chosenId);
        
        if(ChosenEmployee){
            selectedEmployee=ChosenEmployee;
            empName.value=ChosenEmployee.name;
            empDesignation.value=ChosenEmployee.designation;
            const formattedDate = new Date(ChosenEmployee.dob).toISOString().split("T")[0];
            empDob.value = formattedDate;
            activateButton();
        }
    });
}

function populateDropdown(data){
    const dropdown=document.getElementById("employeeDropdown");
    data.forEach(emp => {
        const option=document.createElement("option");
        option.textContent=emp.name;
        option.value=emp.id;
        dropdown.appendChild(option);
    })
}

function removeDropdown(){
    const dropdown=document.getElementById("employeeDropdown");
    if(dropdown)
        dropdown.remove();
}

//Add employee function
async function addEmployee(empData){
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empData),
    })
    if (!response.ok) {
        throw new Error("Failed to add employee");
    }

    return await response.json();
}

//Edit employee function
async function editEmployee(id, empData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empData)
    });

    if (!response.ok) {
        throw new Error("Failed to edit employee");
    }

    return await response.json();
}

//delete employee function
async function deleteEmployee(id){
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete employee");
    }

    return await response.json();
}

//fetch employees for dropdown
function fetchEmployeeList(){
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            employees = data;
            populateDropdown(data);
        })
        .catch(() => showFormMessage("Error fetching employee list!", "error"));
}

//fetch employees to display
async function fetchEmployee(){
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        employee=data;
        return data;
    } 
    catch(error){
        showFormMessage("Error fetching employee list!", "error");
    }
}

async function createTable() {
    TableContainer.style.display = "flex";

    const existingTable = document.getElementById("employeeTable");
    if (existingTable) existingTable.remove();

    const loadingMsg = document.createElement("p");
    loadingMsg.id = "loadingMessage";
    loadingMsg.textContent = "Loading employee data...";
    loadingMsg.style.margin = "auto";
    loadingMsg.style.fontWeight = "bold";
    loadingMsg.style.fontSize = "1.5em";
    TableContainer.appendChild(loadingMsg);

    try {
        await fetchEmployee();
        loadingMsg.remove();

        const TableView = document.createElement("table");
        TableView.id = "employeeTable";
        TableView.className = "employee-table";
        TableContainer.append(TableView);

        if (employee.length > 0) {
            const tableHeadingRow = document.createElement("tr");
            let headings = Object.keys(employee[0]);
            headings.splice(0, 1);
            const last_key = headings.pop();
            headings.unshift(last_key);

            headings.forEach(key => {
                const tableHeading = document.createElement("th");
                tableHeading.textContent = key.toUpperCase();
                tableHeadingRow.appendChild(tableHeading);
            });

            TableView.appendChild(tableHeadingRow);
        }

        employee.forEach(emp => {
            let rowData = Object.values(emp);
            rowData.splice(0, 1);
            const last_value = rowData.pop();
            rowData.unshift(last_value);
            const Row = document.createElement("tr");
            rowData.forEach(value => {
                const cellData = document.createElement("td");
                cellData.textContent = value.toUpperCase();
                Row.appendChild(cellData);
            });
            const iconCell = document.createElement("td");
            const icon = document.createElement("i");
            icon.className = "fas fa-trash-alt";
            icon.style.cursor = "pointer";
            icon.style.color = "orangered";

            icon.addEventListener("click", async () =>{
                const confirmDelete = confirm("Are you sure you want to delete this employee?");
                if (confirmDelete){
                    await deleteEmployee(emp.id);
                    createTable(); 
                }
            });

            iconCell.appendChild(icon);
            Row.appendChild(iconCell);
            TableView.appendChild(Row);
        });

    } 
    catch(error){
        loadingMsg.textContent = "Error loading employee data!";
        loadingMsg.style.color = "red";
    }
}

//input validations
function validateForm() {
    let valid = true;

    // Name validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!empName.value.trim() || !nameRegex.test(empName.value.trim())) {
        showFormMessage("Name must contain only letters.", "error");
        valid = false;
    }

    // Designation validation
    if (!empDesignation.value.trim() || !nameRegex.test(empDesignation.value.trim())) {
        showFormMessage("Designation must contain only letters.", "error");
        valid = false;
    }

    return true;
}


//form submission
employeeForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    const empData={
        name:empName.value.trim(),
        designation: empDesignation.value.trim(),
        dob:empDob.value.trim().toISOString
    };

    if(currentAction==="add"){
        if(!validateForm()) return;

        disableButton();
        showFormMessage("Adding employee...", "info");
        addEmployee(empData)
        .then(() =>{
            showFormMessage("Employee added successfully!", "success");
            employeeForm.reset();
            setTimeout(() => {
                closeModalFunc();
            }, 1500);
        })
        .catch(() => {
            showFormMessage("Error adding employee!", "error");
            enableButton();
        });
    }

    if(currentAction==="edit"){
        if(!validateForm()) return;

        disableButton();
        showFormMessage("Updating employee...", "info");
        editEmployee(selectedEmployee.id,empData)
        .then(() =>{
            showFormMessage("Employee edited successfully!", "success");
            employeeForm.reset();
            setTimeout(() => {
                closeModalFunc();
            }, 1500);
        })
        .catch(() => {
            showFormMessage("Error editing employee!", "error");
            enableButton();
        });
    }

    if(currentAction==="delete"){
        disableButton();
        showFormMessage("Deleting employee...", "info");
        deleteEmployee(selectedEmployee.id)
        .then(() =>{
            showFormMessage("Employee deleted successfully!", "success");
            setTimeout(() => {
                closeModalFunc();
            }, 1500);
        })
        .catch(() => {
            showFormMessage("Error deleting employee!", "error");
            enableButton();
        });
    }
});


