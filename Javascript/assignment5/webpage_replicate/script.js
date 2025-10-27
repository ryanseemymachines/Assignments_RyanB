//navbar buttons
const Homebtn=document.getElementById("homeBtn");
const Aboutbtn=document.getElementById("aboutBtn");
const PracticesBtn=document.getElementById("practicesBtn");
const LawyersBtn=document.getElementById("lawyersBtn");
const NewsBtn=document.getElementById("newsBtn");
const ContactBtn=document.getElementById("contactBtn");

//sections
const Home=document.getElementById("home");
const About= document.getElementById("about");
const Practices= document.getElementById("practices");
const Lawyers= document.getElementById("lawyers");
const News= document.getElementById("news");
const SubNews=document.getElementById("news-sub-area");
const Contact= document.getElementById("contact");

//practices sub sections buttons
const PrenuptialBtn=document.getElementById("prenuptial-button");
const MarriageBtn=document.getElementById("marriage-button");
const DivorceBtn=document.getElementById("divorce-button");
const BackBtns=document.querySelectorAll(".backBtn");

//practices sub sections
const Prenuptial=document.getElementById("prenuptial-area");
const Marriage=document.getElementById("marriage-area");
const Divorce=document.getElementById("divorce-area");
const PracticesRight=document.getElementById("practice-right-area");

Prenuptial.style.display="none";
Marriage.style.display="none";
Divorce.style.display="none";    
SubNews.style.display="none";


BackBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    PracticesRight.style.display = "block";
    Prenuptial.style.display = "none";
    Marriage.style.display = "none";
    Divorce.style.display = "none";
  });
});


PrenuptialBtn.addEventListener("click" , () =>{
    PracticesRight.style.display="none";
    Prenuptial.style.display="block";
    Marriage.style.display="none";
    Divorce.style.display="none";
});

MarriageBtn.addEventListener("click" , () =>{
    PracticesRight.style.display="none";
    Prenuptial.style.display="none";
    Marriage.style.display="block";
    Divorce.style.display="none";
});

DivorceBtn.addEventListener("click" , () =>{
    PracticesRight.style.display="none";
    Prenuptial.style.display="none";
    Marriage.style.display="none";
    Divorce.style.display="block";
});

// news read more buttons
const NewsReadMore=document.querySelectorAll(".news-read-more");
const NewsRight=document.getElementById("news-right-area");

//starting
About.style.display="none";
Practices.style.display="none";
Lawyers.style.display="none";
News.style.display="none";
Contact.style.display="none";

Homebtn.addEventListener("click" , () =>{
    Home.style.display="block";
    About.style.display="none";
    Practices.style.display="none";
    Lawyers.style.display="none";
    News.style.display="none";
});


Aboutbtn.addEventListener("click" , () =>{
    About.style.display="block";
    Home.style.display="none";
    Practices.style.display="none";
    Lawyers.style.display="none";
    News.style.display="none";
});

PracticesBtn.addEventListener("click" , () =>{
    Practices.style.display="block";
    About.style.display="none";
    Home.style.display="none";
    Lawyers.style.display="none";
    News.style.display="none";
});

NewsBtn.addEventListener("click" , () =>{
    Practices.style.display="none";
    About.style.display="none";
    Home.style.display="none";
    Lawyers.style.display="none";
    News.style.display="block";
});

LawyersBtn.addEventListener("click", () =>{
    Lawyers.style.display="block";
    Home.style.display="none";
    About.style.display="none";
    Practices.style.display="none";
    News.style.display="none";
});

ContactBtn.addEventListener("click", () =>{
    Lawyers.style.display="none";
    Home.style.display="none";
    About.style.display="none";
    Practices.style.display="none";
    News.style.display="none";
    Contact.style.display="block";
});


NewsReadMore.forEach((btn) => {
  btn.addEventListener("click", () => {
    NewsRight.style.display = "none";
    SubNews.style.display = "block";
  });
});