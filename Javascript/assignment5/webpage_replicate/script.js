//Navbar Buttons
const navButtons ={
    home: document.getElementById("homeBtn"),
    about: document.getElementById("aboutBtn"),
    practices: document.getElementById("practicesBtn"),
    lawyers: document.getElementById("lawyersBtn"),
    news: document.getElementById("newsBtn"),
    contact: document.getElementById("contactBtn")
};

//Page Sections
const sections ={
    home: document.getElementById("home"),
    about: document.getElementById("about"),
    practices: document.getElementById("practices"),
    lawyers: document.getElementById("lawyers"),
    news: document.getElementById("news"),
    contact: document.getElementById("contact")
};

//Subsections
const practicesSub ={
    right: document.getElementById("practice-right-area"),
    prenuptial: document.getElementById("prenuptial-area"),
    marriage: document.getElementById("marriage-area"),
    divorce: document.getElementById("divorce-area")
};

const newsSub ={
    right: document.getElementById("news-right-area"),
    sub: document.getElementById("news-sub-area")
};

// Hide all main sections
function hideAllSections(){
    Object.values(sections).forEach(sec => sec.style.display = "none");
}

// Set active navbar button
function setActiveNav(currentBtn){
    Object.values(navButtons).forEach(btn => btn.classList.remove("active"));
    currentBtn.classList.add("active");
}

// Show a specific main section
function showSection(sectionName){
    hideAllSections();
    sections[sectionName].style.display = "block";
    setActiveNav(navButtons[sectionName]);
}

// Reset all practices subsections to main view
function resetPractices(){
    Object.values(practicesSub).forEach(sub => sub.style.display = "none");
    practicesSub.right.style.display = "block";
}

// Reset news to main view
function resetNews(){
  newsSub.right.style.display = "block";
  newsSub.sub.style.display = "none";
}

//Initial State
hideAllSections();
sections.home.style.display = "block";
setActiveNav(navButtons.home);
resetPractices();
resetNews();

//Navbar Click Events
navButtons.home.addEventListener("click", () => showSection("home"));
navButtons.about.addEventListener("click", () => showSection("about"));
navButtons.lawyers.addEventListener("click", () => showSection("lawyers"));
navButtons.contact.addEventListener("click", () => showSection("contact"));

navButtons.practices.addEventListener("click", () =>{
    showSection("practices");
    resetPractices();
});

navButtons.news.addEventListener("click", () =>{
    showSection("news");
    resetNews();
});

//Practices Buttons
document.getElementById("prenuptial-button").addEventListener("click", () =>{
    practicesSub.right.style.display = "none";
    practicesSub.prenuptial.style.display = "block";
});

document.getElementById("marriage-button").addEventListener("click", () =>{
    practicesSub.right.style.display = "none";
    practicesSub.marriage.style.display = "block";
});

document.getElementById("divorce-button").addEventListener("click", () =>{
    practicesSub.right.style.display = "none";
    practicesSub.divorce.style.display = "block";
});

// Back buttons in Practices subsections
document.querySelectorAll(".backBtn").forEach(btn =>{
    btn.addEventListener("click", resetPractices);
});

//News "Read More" Buttons
document.querySelectorAll(".news-read-more").forEach(btn =>{
    btn.addEventListener("click", () => {
        newsSub.right.style.display = "none";
        newsSub.sub.style.display = "block";
    });
});

//"Why Choose Us" Buttons on Home
document.getElementById("lawyersLinkBtn").addEventListener("click", () => showSection("lawyers"));
document.getElementById("aboutLinkBtn").addEventListener("click", () => showSection("about"));
document.getElementById("practicesLinkBtn").addEventListener("click", () => showSection("practices"));
document.getElementById("contactLinkBtn").addEventListener("click", () => showSection("contact"));

//Footer Contact Button
document.getElementById("footerMsgBtn").addEventListener("click", () => showSection("contact"));

//Dropdown Menu Items (Practices Submenu)
document.getElementById("navPrenup").addEventListener("click", () =>{
    showSection("practices");
    resetPractices();
    practicesSub.right.style.display = "none";
    practicesSub.prenuptial.style.display = "block";
});

document.getElementById("navMarriage").addEventListener("click", () =>{
    showSection("practices");
    resetPractices();
    practicesSub.right.style.display = "none";
    practicesSub.marriage.style.display = "block";
});

document.getElementById("navDivorce").addEventListener("click", () =>{
    showSection("practices");
    resetPractices();
    practicesSub.right.style.display = "none";
    practicesSub.divorce.style.display = "block";
});