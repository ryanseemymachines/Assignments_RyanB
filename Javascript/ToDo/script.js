const DateDisplay=document.getElementById("date-display");
const TimeDisplay=document.getElementById("time-display");

const now= new Date();
const TodayDate=now.getDate();
const TodayMonth=now.getMonth()+1;
const TodayYear=now.getFullYear();
const TodayDay=now.getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = days[TodayDay];
DateDisplay.textContent=`${dayName}, ${TodayDate}/${TodayMonth}/${TodayYear}`;

updateClock();
setInterval(updateClock,1000);

function updateClock(){

    const present= new Date();
    let hours=present.getHours();
    const merdiem= hours>=12 ? "PM" : "AM";
    hours= hours % 12 || 12;
    hours=hours.toString().padStart(2,0);
    const mins=present.getMinutes().toString().padStart(2,0);
    const sec=present.getSeconds().toString().padStart(2,0);
    const CurrentTime=`${hours} : ${mins} : ${sec} ${merdiem}`;
    TimeDisplay.textContent=CurrentTime;
}

//modal open and close

let tasks=[];
const Createmodal = document.getElementById("Mymodal");
const TaskId=document.getElementById("taskid");
let taskno=0;
//button that opens the modal
const NewTask = document.getElementById("new-task");

//element that closes the modal
const CloseCreateTask = document.getElementById("close-create");

//open the modal 
NewTask.onclick = function(){
    taskno++;
    Createmodal.style.display = "flex";
    TaskId.textContent=`Task ${taskno}`;
}

//close the modal
CloseCreateTask.onclick = function(){
    Createmodal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === Createmodal) {
    Createmodal.style.display = "none";
    taskno--;
  }
};

//get data from create form and validate
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    input.classList.add('error');
    input.classList.remove('success');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    input.classList.remove('error');
    input.classList.add('success');
    errorDiv.textContent = '';
    errorDiv.classList.remove('show');
}

function validateInputs(titleInput, descInput,dateInput) {
    let isValid = true;
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const dateValue=dateInput.value.trim();

    //Title validation
    if (!title) 
    {
        showError(titleInput, "Title is required.");
        isValid = false;
    } 
    else if (title.length < 3) 
    {
        showError(titleInput, "Title must be at least 3 characters long.");
        isValid = false;
    } 
    else if (title.length > 50) 
    {
        showError(titleInput, "Title can't be longer than 50 characters.");
        isValid = false;
    } 
    else if (!/^[A-Za-z0-9\s.,!?'"-]+$/.test(title)) 
    {
        showError(titleInput, "Title contains invalid characters.");
        isValid = false;
    } 
    else 
    {
        showSuccess(titleInput);
    }

    // Description validation
    if (description) 
    {
        if (description.length < 5) 
        {
            showError(descInput, "Description must be at least 5 characters long.");
            isValid = false;
        } 
        else if (description.length > 500)
        {
            showError(descInput, "Description can't be longer than 500 characters.");
            isValid = false;
        } 
        else if (!/^[A-Za-z0-9\s.,!?'"()-]*$/.test(description)) 
        {
            showError(descInput, "Description contains invalid characters.");
            isValid = false;
        } 
        else 
        {
            showSuccess(descInput);
        }
    } 
    else 
    {
        // Empty description is allowed
        showSuccess(descInput);
    }

    //Date validation

    if(!dateValue)
    {
        showError(dateInput, "Date is mandatory");
        isValid=false
    }
    else{
        showSuccess(dateInput);
    }

    return isValid;
}

function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.classList.remove('show'));
    const success = form.querySelector('.success-message');
    if (success) success.classList.remove('show');
}

// ---- Submit handler ----
const TaskCreateSubmit = document.getElementById("taskCreateSubmit");
TaskCreateSubmit.classList.add("inactive");

const TaskTitle = document.getElementById("taskTitle");
const TaskDescription = document.getElementById("taskDescription");
const TaskDate = document.getElementById("taskDate");

const TaskForm = document.getElementById("taskFormModal");

//Activate/deactivate button when user types
TaskForm.addEventListener("input", () => {
    const isValid = validateInputs(TaskTitle, TaskDescription, TaskDate);

    if (isValid) {
        TaskCreateSubmit.classList.remove("inactive");
    } else {
        TaskCreateSubmit.classList.add("inactive");
    }
});

//Handle form submission
TaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = validateInputs(TaskTitle, TaskDescription, TaskDate);

    if (isValid) {
        let TaskDetails = {
            title: TaskTitle.value.trim(),
            desc: TaskDescription.value.trim(),
            date: TaskDate.value.trim()
        };

        tasks.push(TaskDetails);
        console.log(tasks);

        clearForm('taskFormModal');
        Createmodal.style.display = "none";
        taskno--;
    }
});


