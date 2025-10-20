
const homeClick=document.getElementById("homeClick");

const servicesClick=document.getElementById("servicesClick");

const addressClick=document.getElementById("addressClick");

document.getElementById("content-services").style.display="none";

homeClick.addEventListener("click", displayHome);
servicesClick.addEventListener("click", displayServices);

function displayHome(){
    document.getElementById("content-home").style.display="flex";

    document.getElementById("content-services").style.display="none";
}

function displayServices(){

    document.getElementById("content-services").style.display="flex";

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

