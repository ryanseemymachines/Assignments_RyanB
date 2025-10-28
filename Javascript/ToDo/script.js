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

function validateInputs(title, description){

    // Title validation
    if (!title.trim()){
        showError(title,"Title is required.");
    } 
    else if (title.trim().length < 3){
        showError(title,"Title must be at least 3 characters long.");
    } 
    else if (title.trim().length > 50){
        showError(title,"Title can't be longer than 50 characters.");
    } 
    else if (!/^[A-Za-z0-9\s.,!?'"-]+$/.test(title)){
        showError(title,"Title contains invalid characters.");
    } 

    // Description validation
    if (description.trim()){
        if (description.trim().length < 5){
            showError(description,"Description must be at least 5 characters long.");
        } 
        else if (description.trim().length > 500){
            showError(description,"Description can't be longer than 500 characters.");
        } 
        else if (!/^[A-Za-z0-9\s.,!?'"()-]*$/.test(description)) {
            showError(description,"Description contains invalid characters.");
        }
    }
}

const TaskCreateSubmit =document.getElementById("taskCreateSubmit");
TaskCreateSubmit.classList.add("inactive");

const TaskForm = document.getElementById("taskFormModal");

TaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid=true;
    const TaskTitle=document.getElementById("taskTitle");
    const TaskDescription=document.getElementById("taskDescription");
    const TaskDate=document.getElementById("taskDate");

    const titleValue = TaskTitle.value.trim();
    const titleDescription=TaskDescription.value.trim();
});
