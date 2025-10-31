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

//Modal close function
closeModal.addEventListener("click",closeModalFunc);

window.addEventListener("click" ,(e) =>{
    if(e.target === employeeModal)
        closeModalFunc(); 
});

function closeModalFunc(){
    employeeModal.style.display="none";
    employeeForm.reset();   
}

//Base URL
const API_URL = "https://6580190d6ae0629a3f54561f.mockapi.io/api/v1/employee";