
const display=document.getElementById("display");

let timer=null;
let elapsedTime=0;
let startTime=0;
let isRunning=false;

document.getElementById("startBtn").onclick =function(){
    
    if(!isRunning){
        startTime=Date.now()-elapsedTime;
        timer=setInterval(update,10);
        isRunning=true;
    }

}

document.getElementById("stopBtn").onclick =function(){

    if(isRunning){
        clearInterval(timer);
        elapsedTime=Date.now()-startTime;
        isRunning=false;
    }
}

document.getElementById("resetBtn").onclick =function(){

    elapsedTime=0;
    startTime=0;
    isRunning=false;
    clearInterval(timer);
    display.textContent="00:00:00:00";
    
}

function update(){

    const currentTime=Date.now();
    elapsedTime=currentTime-startTime;

    let hours= Math.floor(elapsedTime / (1000 * 60 * 60));
    let min= Math.floor(elapsedTime /(1000 * 60) % 60);
    let sec= Math.floor(elapsedTime /1000 % 60);
    let millisec = Math.floor(elapsedTime % 1000 /10);

    hours=String(hours).padStart(2,0);
    min=String(min).padStart(2,0);
    sec=String(sec).padStart(2,0);
    millisec=String(millisec).padStart(2,0);

    display.textContent=`${hours}:${min}:${sec}:${millisec}`;
}