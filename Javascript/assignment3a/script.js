
const homeClick=document.getElementById("homeClick");

const servicesClick=document.getElementById("servicesClick");

const addressClick=document.getElementById("addressClick");


document.getElementById("content-services").style.display="none";

document.getElementById("content-address").style.display="none";

homeClick.addEventListener("click", displayHome);
servicesClick.addEventListener("click", displayServices);
addressClick.addEventListener("click", displayAddress);

function displayHome(){
    document.getElementById("content-home").style.display="flex";

    document.getElementById("content-services").style.display="none";
 
}

function displayServices(){

    document.getElementById("content-services").style.display="flex";

    document.getElementById("content-home").style.display="none"

    document.getElementById("content-address").style.display="none";
}

function displayAddress(){

    document.getElementById("content-address").style.display="flex";

    document.getElementById("content-services").style.display="none";

    document.getElementById("content-home").style.display="none"
}


//next and prev buttons
const carousel = document.querySelector(".carousel");
const arrowBtns= document.querySelectorAll(".content-services i");


arrowBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        const cardWidth=document.querySelector(".service-card").offsetWidth+20;
        carousel.scrollLeft+= btn.id ==="left"?-cardWidth:cardWidth;
    })
})

const address=document.querySelectorAll(".accordion-content p");

address.forEach(para =>{

    const text=para.textContent;

    const parts=text.split(",");

    para.innerHTML = parts.map(part => part.trim()).join(",<br>");
});

//accordions

const revealAdd = document.querySelectorAll(".accordion-heading i");

revealAdd.forEach(btn => {
    btn.addEventListener("click",()=>{
        const content = btn.parentElement.nextElementSibling;

        if (content.style.display === "flex") {
            content.style.display = "none";
        } else {
            content.style.display = "flex";
        }
        
        btn.classList.toggle("rotate");
    });
});
