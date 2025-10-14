updateClock();
setInterval(updateClock,1000);

function updateClock(){

    const now=new Date();
    let hours=now.getHours();
    const merdiem= hours>12 ? "PM" : "AM";
    hours= hours % 12 || 12;
    hours=hours.toString().padStart(2,0);
    const mins=now.getMinutes().toString().padStart(2,0);
    const sec=now.getSeconds().toString().padStart(2,0);
    const CurrentTime=`${hours}:${mins}:${sec} ${merdiem}`;
    document.getElementById("clock").textContent=CurrentTime;
}