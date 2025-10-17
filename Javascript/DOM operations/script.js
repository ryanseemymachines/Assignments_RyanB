
//using getElementById
console.log(document.getElementById("container"));
console.log(document.getElementById("container").textContent);

// const var1=document.getElementById("container");
// console.log(var1);

//querySelector to select the first p element
console.log(document.querySelector("p"));
console.log(document.querySelector("p").textContent);


//Use querySelectorAll() to select all <p> elements and loop through them to print their text content.

const paragraphs=document.querySelectorAll("p");

console.log(paragraphs);

paragraphs.forEach((para,index) => {
    console.log(`Paragraph ${index+1}: ${para.textContent}`);
});

//Modifying elements

document.getElementById("frontend").innerHTML="Hello!! Initially this was not my content. Refer the console to know my original content";

document.getElementById("backend").textContent="Hello again!! This still isn't my content. Refer the console to know my original content";

const element=document.getElementById("intro");
element.classList.add("highlight");

let element2=document.querySelectorAll("#frontend,#backend");
element2.forEach((elem) => {
    elem.classList.add("highlight2");
});

let removeClass=document.getElementById("frontend");
removeClass.classList.remove("highlight2"); // comment this line to know the change

removeClass.setAttribute("title","This is tooltip of this paragraph!!");
removeClass.setAttribute("style","color:red");
removeClass.removeAttribute("style");

//create and appending elements

const newelement=document.createElement("p");
newelement.textContent="The IT field is rapidly evolving, offering diverse career opportunities in software, networking, and cybersecurity. Continuous learning and adaptability are key to staying relevant in this dynamic industry.";
newelement.id="highlight3";
document.body.append(newelement);

const newspan=document.createElement("span");
newspan.textContent="This is to show you that a span element has been created using createElement.";

document.body.insertBefore(newspan,newelement);

//event handling

let button=document.getElementById("actionBtn");
button.addEventListener("click",changecolor);

function changecolor(event){
    event.target.style.backgroundColor="blue";
    event.target.style.color="white";
    event.target.textContent="Button clicked!!";
}
// button.removeEventListener("click",changecolor);

let mouseoverp=document.querySelectorAll("p");
mouseoverp.forEach((elm) => {
    elm.addEventListener("mouseover",(event)=>
    {
        event.target.style.backgroundColor="black";
        event.target.style.color="white";
    })
})

mouseoverp.forEach((elm) => {
    elm.addEventListener("mouseout",(event)=>
    {
        event.target.style.backgroundColor="unset";
        event.target.style.color="unset";
    });
});
