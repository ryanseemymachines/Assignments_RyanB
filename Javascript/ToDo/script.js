//DATE & TIME DISPLAY
const DateDisplay=document.getElementById("date-display");
const TimeDisplay=document.getElementById("time-display");

const now= new Date();
const TodayDate=now.getDate();
const TodayMonth=now.getMonth()+1;
const TodayYear=now.getFullYear();
const TodayDay=now.getDay();
const days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName=days[TodayDay];
DateDisplay.textContent=`${dayName}, ${TodayDate}/${TodayMonth}/${TodayYear}`;

updateClock();
setInterval(updateClock,1000);

function updateClock(){
    const present= new Date();
    let hours=present.getHours();
    const merdiem= hours>=12 ? "PM" : "AM";
    hours=hours % 12 || 12;
    hours=hours.toString().padStart(2,0);
    const mins=present.getMinutes().toString().padStart(2,0);
    const sec=present.getSeconds().toString().padStart(2,0);
    const CurrentTime=`${hours} : ${mins} : ${sec} ${merdiem}`;
    TimeDisplay.textContent=CurrentTime;
}

//modal open and close

let tasks=JSON.parse(localStorage.getItem("tasks")) || [];
ListTasks();
console.log(tasks);
const Createmodal=document.getElementById("Mymodal");
const TaskHeading=document.getElementById("taskHeading");
const NewTask=document.getElementById("new-task");
const CloseCreateTask=document.getElementById("close-create");
const MarkAsCompleted=document.getElementById("mark-as-completed");

MarkAsCompleted.addEventListener("click" , () =>{
    tasks.forEach(task=>task.status = "Completed");
    localStorage.setItem("tasks", JSON.stringify(tasks));
    ListTasks();
});

NewTask.onclick = function (){
    clearForm();
    editIndex = null;
    TaskCreateSubmit.textContent = "Create Task";
    TaskCreateSubmit.disabled = true;
    TaskCreateSubmit.classList.add("inactive");
    TaskCreateSubmit.classList.remove("active");
    Createmodal.style.display = "flex";
    TaskHeading.textContent=`Create new Task`;
};

CloseCreateTask.onclick = function (){
    Createmodal.style.display = "none";
    clearForm();
    editIndex = null;
};

window.onclick = function (event){
    if (event.target === Createmodal){
        Createmodal.style.display = "none";
        clearForm();
    }
};

//FORM HANDLING
const TaskForm=document.getElementById("taskFormModal");
const TaskTitle=document.getElementById("taskTitle");
const TaskDescription=document.getElementById("taskDescription");
const TaskDate=document.getElementById("taskDate");

const TaskCreateSubmit=document.getElementById("taskCreateSubmit");

TaskCreateSubmit.disabled=true;

TaskForm.addEventListener("input", () =>{
    if (TaskTitle.value.trim() && TaskDate.value.trim()){
        TaskCreateSubmit.classList.remove("inactive");
        TaskCreateSubmit.classList.add("active");
        TaskCreateSubmit.disabled=false;
    } 
    else{
        TaskCreateSubmit.classList.add("inactive");
        TaskCreateSubmit.classList.remove("active");
        TaskCreateSubmit.disabled=true;
    }
});


function showError(input, message){
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector(".error-message");
    input.classList.add("error");
    errorDiv.textContent = message;
    errorDiv.classList.add("show");
}

function showSuccess(input){
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector(".error-message");
    input.classList.remove("error");
    errorDiv.textContent = "";
    errorDiv.classList.remove("show");
}

function validateInputs(){
    let isValid = true;

    const title = TaskTitle.value.trim();
    const description = TaskDescription.value.trim();
    const dateValue = TaskDate.value.trim();

    // Title validation
    if (!title){
        showError(TaskTitle, "Title is required.");
        isValid = false;
    } 
    else if (title.length < 3){
        showError(TaskTitle, "Title must be at least 3 characters long.");
        isValid = false;
    } 
    else if (title.length > 50) 
    {
        showError(TaskTitle, "Title can't be longer than 50 characters.");
        isValid = false;
    } 
    else if (!/^[A-Za-z0-9\s.,!?'"-]+$/.test(title)) 
    {
        showError(TaskTitle, "Title contains invalid characters.");
        isValid = false;
    } 
    else{
        showSuccess(TaskTitle);
    }

    // Description (optional)
    if (description && description.length < 5){
        showError(TaskDescription, "Description must be at least 5 characters long.");
        isValid = false;
    } 
    else{
        showSuccess(TaskDescription);
    }

    // Date validation
    if (!dateValue){
        showError(TaskDate, "Date is mandatory.");
        isValid = false;
    }
    else {
        showSuccess(TaskDate);
    }

    return isValid;
}

// ---- Clear form ----
function clearForm(){
    TaskForm.reset();
    [TaskTitle, TaskDescription, TaskDate].forEach((input) => {
        input.classList.remove("error", "success");
    });
    const errors = TaskForm.querySelectorAll(".error-message");
    errors.forEach((err) => {
        err.textContent = "";
        err.classList.remove("show");
    });
    TaskCreateSubmit.classList.add("inactive");
}



let editIndex = null;
// ---- Handle submit ----
TaskForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const isValid = validateInputs();

    if (isValid){
        const TaskDetails ={
            title: TaskTitle.value.trim(),
            desc: TaskDescription.value.trim(),
            date: TaskDate.value.trim(),
            status:'Pending'
        };

        if (editIndex !== null){
            TaskDetails.status = tasks[editIndex].status;
            tasks[editIndex] = TaskDetails;
            editIndex = null;
            TaskCreateSubmit.textContent = "Create Task";
        } 
        else{
            tasks.push(TaskDetails);
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        ListTasks();
        clearForm();
        Createmodal.style.display = "none";
    }
});

function ListTasks(){
    const ListArea = document.getElementById("tasksList");
    ListArea.innerHTML = "";

    if (tasks.length === 0) {
        ListArea.innerHTML = '<p class="no-task">No tasks available.</p><p class="no-task-sub">Click "Add New Task" to get started.</p>';
        return;
    }
    // console.log(tasks)
    tasks.forEach((task, index) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        taskCard.innerHTML = `
            <h4>Task ${index+1}</h4>
            <h3>${task.title}</h3>
            <p class="task-description">${task.desc || "No description provided."}</p>
            <p class="card-date"><b>Date:</b> ${task.date}</p>
            <p class="status">
                <b>Status:</b> 
                <span>
                    ${task.status}
                </span>
            </p>
            <div class="task-actions">
                ${task.status === "Pending" ? `<button class="complete-btn" data-index="${index}">Mark as Completed</button><button class="edit-btn" data-index="${index}">Edit</button>` : ""}
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;

        if (task.status === "Pending"){
            taskCard.classList.add("pending");
        } 
        else{
            taskCard.classList.add("completed");
        }

        ListArea.appendChild(taskCard);
    }); 

    // Add delete functionality
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            deleteTask(index);
        });
    });

    // Edit button functionality
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((btn) => {
        btn.addEventListener("click", (e) =>{
            const index = e.target.getAttribute("data-index");
            openEditModal(index);
        });
    });

    // Complete button functionality
    const completeButtons = document.querySelectorAll(".complete-btn");
    completeButtons.forEach((btn) =>{
        btn.addEventListener("click", (e) =>{
            const index = e.target.getAttribute("data-index");
            markTaskCompleted(index);
        });
    });
}

function openEditModal(index){
    editIndex = index;
    const task = tasks[index];

    // Prefill modal inputs
    TaskTitle.value = task.title;
    TaskDescription.value = task.desc;
    TaskDate.value = task.date;

    // Update modal title (optional)
    TaskHeading.textContent = `Editing Task ${Number(index) + 1}`;

    // Open the modal
    Createmodal.style.display = "flex";

    // Enable the submit button and change text
    TaskCreateSubmit.textContent = "Update Task";
    TaskCreateSubmit.disabled = false;
    TaskCreateSubmit.classList.add("active");
}

function markTaskCompleted(index){
    tasks[index].status = "Completed";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    ListTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
    ListTasks();
}

//searching
const searchInput=document.getElementById("search-input");

searchInput.addEventListener("input" , ()=>{
    const filter=searchInput.value.toUpperCase();
    const allTasks=document.querySelectorAll(".task-card");
    let count=0;
    allTasks.forEach((task) => {
        const cardTitle=task.querySelector("h3").textContent.toUpperCase();
        if(cardTitle.indexOf(filter)> -1){
            task.style.display="";
        }
        else{
            task.style.display="none";
            count++;
        }
    });

    const listArea=document.getElementById("tasksList");
    let msg=document.querySelector(".no-task");

    if(count===allTasks.length){
        if(!msg){
            msg=document.createElement("p");
            msg.className="no-task";
            msg.textContent="No tasks available";
            listArea.appendChild(msg);
        }
    }    
    else{
        if(msg){
            msg.remove();
        }
    }
});



