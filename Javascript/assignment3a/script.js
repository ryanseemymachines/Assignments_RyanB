const homeClick = document.getElementById("homeClick");
const servicesClick = document.getElementById("servicesClick");
const addressClick = document.getElementById("addressClick");

document.getElementById("content-services").style.display = "none";
document.getElementById("content-address").style.display = "none";

homeClick.addEventListener("click", displayHome);
servicesClick.addEventListener("click", displayServices);
addressClick.addEventListener("click", displayAddress);

function displayHome() {
    document.getElementById("content-home").style.display = "flex";
    document.getElementById("content-services").style.display = "none";
    document.getElementById("content-address").style.display = "none";
}

function displayServices() {
    document.getElementById("content-services").style.display = "flex";
    document.getElementById("content-home").style.display = "none";
    document.getElementById("content-address").style.display = "none";
}

function displayAddress() {
    document.getElementById("content-address").style.display = "flex";
    document.getElementById("content-services").style.display = "none";
    document.getElementById("content-home").style.display = "none";
}

// Carousel functionality
const carousel = document.querySelector(".carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".carousel-dot");
const cards = document.querySelectorAll(".service-card");

let currentIndex = 0;

// Function to update active dot
function updateDots(index) {
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

// Function to scroll to specific card
function scrollToCard(index) {
    const cardWidth = cards[0].offsetWidth + 20;
    carousel.scrollLeft = cardWidth * index;
    currentIndex = index;
    updateDots(index);
}

// Slider button navigation (Previous/Next buttons)
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    scrollToCard(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % cards.length;
    scrollToCard(currentIndex);
});

// Dot button navigation
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", () => scrollToCard(i));
}

// Accordion functionality
const revealAdd = document.querySelectorAll(".accordion-heading i");
revealAdd.forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.parentElement.nextElementSibling;

        content.classList.toggle("show");
        
        btn.classList.toggle("rotate");
    });
});

const address=document.querySelectorAll(".accordion-content p");
address.forEach(para =>{

    const text=para.textContent;

    const parts=text.split(",");

    para.innerHTML = parts.map(part => part.trim()).join(",<br>");
});










