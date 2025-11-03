// DATE & TIME DISPLAY
const DateDisplay = document.getElementById("date-display");
const TimeDisplay = document.getElementById("time-display");

const now = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = days[now.getDay()];
DateDisplay.textContent = `${dayName}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

function updateClock(){
    const present = new Date();
    let hours = present.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const time = `${String(hours).padStart(2, '0')} : ${String(present.getMinutes()).padStart(2, '0')} : ${String(present.getSeconds()).padStart(2, '0')} ${meridiem}`;
    TimeDisplay.textContent = time;
}

updateClock();
setInterval(updateClock, 1000);

// TASK MANAGEMENT
let tasks = [];
let editIndex = null;

const Createmodal = document.getElementById("Mymodal");
const TaskHeading = document.getElementById("taskHeading");
const NewTask = document.getElementById("new-task");
const CloseCreateTask = document.getElementById("close-create");
const MarkAsCompleted = document.getElementById("mark-as-completed");
const TaskForm = document.getElementById("taskFormModal");
const TaskTitle = document.getElementById("taskTitle");
const TaskDescription = document.getElementById("taskDescription");
const TaskDate = document.getElementById("taskDate");
const todayDate = new Date().toISOString().split("T")[0];
console.log(todayDate);
TaskDate.setAttribute("min", todayDate);
const TaskCreateSubmit = document.getElementById("taskCreateSubmit");
const searchInput = document.getElementById("search-input");

// Initialize
ListTasks();
// Mark all as completed
MarkAsCompleted.addEventListener("click", () =>{
    tasks.forEach(task => task.status = "Completed");
    ListTasks();
});

// Open modal for new task
NewTask.onclick = function(){
    clearForm();
    editIndex = null;
    TaskCreateSubmit.textContent = "Create Task";
    Createmodal.style.display = "flex";
    TaskHeading.textContent = "Create new Task";
    TaskCreateSubmit.classList.remove("inactive");
    TaskCreateSubmit.classList.add("active");
    TaskCreateSubmit.disabled = false;
};

// Close modal
CloseCreateTask.onclick = function(){
    Createmodal.style.display = "none";
    clearForm();
    editIndex = null;
};

window.onclick = function(event){
    if(event.target === Createmodal){
        Createmodal.style.display = "none";
        clearForm();
    }
};

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

    if(!title){
        showError(TaskTitle, "Title is required.");
        isValid = false;
    } 
    else if (title.length < 3){
        showError(TaskTitle, "Title must be at least 3 characters long.");
        isValid = false;
    } 
    else if (title.length > 50){
        showError(TaskTitle, "Title can't be longer than 50 characters.");
        isValid = false;
    } 
    else if (!/^[A-Za-z\s.,!?'"-]+$/.test(title)){
        showError(TaskTitle, "Title contains invalid characters.");
        isValid = false;
    } 
    else{
        showSuccess(TaskTitle);
    }

    if(description && description.length < 5){
        showError(TaskDescription, "Description must be at least 5 characters long.");
        isValid = false;
    } 
    else{
        showSuccess(TaskDescription);
    }

    if(!dateValue){
        showError(TaskDate, "Date is mandatory.");
        isValid = false;
    }
    else{
        showSuccess(TaskDate);
    }

    return isValid;
}

function clearForm(){
    TaskForm.reset();
    [TaskTitle, TaskDescription, TaskDate].forEach(input =>{
        input.classList.remove("error");
    });
    TaskForm.querySelectorAll(".error-message").forEach(err =>{
        err.textContent = "";
        err.classList.remove("show");
    });
    TaskCreateSubmit.classList.add("inactive");
    TaskCreateSubmit.classList.remove("active");
}

[TaskTitle, TaskDescription, TaskDate].forEach(input => {
    input.addEventListener("input", () => {
        showSuccess(input);
    });
});

// Handle form submit
TaskForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    if(validateInputs()){
        const TaskDetails ={
            title: TaskTitle.value.trim(),
            desc: TaskDescription.value.trim(),
            date: TaskDate.value.trim(),
            status: 'Pending'
        };

        if(editIndex !== null){
            TaskDetails.status = tasks[editIndex].status;
            tasks[editIndex] = TaskDetails;
            editIndex = null;
            TaskCreateSubmit.textContent = "Create Task";
        } 
        else{
            tasks.push(TaskDetails);
        }
        ListTasks();
        clearForm();
        Createmodal.style.display = "none";
    }
});

function ListTasks(){
    const ListArea = document.getElementById("tasksList");
    ListArea.innerHTML = "";

    // Update Mark All button state
    MarkAsCompleted.disabled = tasks.length === 0;

    if(tasks.length === 0){
        ListArea.innerHTML = '<p class="no-task">No tasks available.</p><p class="no-task-sub">Click "Add Task" to get started.</p>';
        return;
    }

    tasks.forEach((task, index) =>{
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.classList.add(task.status === "Pending" ? "pending" : "completed");

        taskCard.innerHTML = `
            <h4>Task ${index + 1}</h4>
            <h3>${task.title}</h3>
            <p class="task-description">${task.desc || "No description provided."}</p>
            <p class="card-date"><b>Date:</b> ${task.date}</p>
            <p class="status"><b>Status:</b> <span>${task.status}</span></p>
            <div class="task-actions">
                ${task.status === "Pending" ? `<button class="complete-btn" data-index="${index}">Mark as Completed</button><button class="edit-btn" data-index="${index}">Edit</button>` : ""}
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;

        ListArea.appendChild(taskCard);
    });

    // Add event listeners
    document.querySelectorAll(".delete-btn").forEach(btn =>{
        btn.addEventListener("click", (e) =>{
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            ListTasks();
        });
    });

    document.querySelectorAll(".edit-btn").forEach(btn =>{
        btn.addEventListener("click", (e) =>{
            const index = e.target.getAttribute("data-index");
            openEditModal(index);
        });
    });

    document.querySelectorAll(".complete-btn").forEach(btn =>{
        btn.addEventListener("click", (e) =>{
            const index = e.target.getAttribute("data-index");
            tasks[index].status = "Completed";
            ListTasks();
        });
    });
}

function openEditModal(index){
    editIndex = index;
    const task = tasks[index];

    TaskTitle.value = task.title;
    TaskDescription.value = task.desc;
    TaskDate.value = task.date;

    TaskHeading.textContent = `Editing Task ${Number(index) + 1}`;
    Createmodal.style.display = "flex";

    TaskCreateSubmit.textContent = "Update Task";
    TaskCreateSubmit.disabled = true;
    TaskCreateSubmit.classList.remove("active");
    TaskCreateSubmit.classList.add("inactive");

    enableButtonOnChange();
}

function enableButtonOnChange(){
    [TaskTitle, TaskDescription, TaskDate].forEach(input =>{
        input.addEventListener("input", () =>{
            if(editIndex !== null){
                const original = tasks[editIndex];
                const isChanged =TaskTitle.value.trim() !== original.title ||TaskDescription.value.trim() !== original.desc ||TaskDate.value.trim() !== original.date;

                if(isChanged){
                    TaskCreateSubmit.disabled = false;
                    TaskCreateSubmit.classList.remove("inactive");
                    TaskCreateSubmit.classList.add("active");
                } 
                else{
                    TaskCreateSubmit.disabled = true;
                    TaskCreateSubmit.classList.remove("active");
                    TaskCreateSubmit.classList.add("inactive");
                }
            }
        });
    });
}

// Search functionality
searchInput.addEventListener("input", () =>{
    const filter = searchInput.value.toUpperCase();
    const allTasks = document.querySelectorAll(".task-card");
    let hiddenCount = 0;

    allTasks.forEach(task =>{
        const cardTitle = task.querySelector("h3").textContent.toUpperCase();
        if(cardTitle.indexOf(filter) > -1){
            task.style.display = "";
        } 
        else{
            task.style.display = "none";
            hiddenCount++;
        }
    });

    const listArea = document.getElementById("tasksList");
    let msg = listArea.querySelector(".no-task");

    if(hiddenCount === allTasks.length && allTasks.length > 0){
        if(!msg){
            msg=document.createElement("p");
            msg.className="no-task";
            msg.textContent="No matching tasks available";
            listArea.appendChild(msg);
        }
    } 
    else if(msg){
        msg.remove();
    }
});