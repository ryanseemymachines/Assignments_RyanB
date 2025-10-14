const myInput=document.getElementById("myInput");
const toFahrenheit=document.getElementById("toFahrenheit");
const toCelsius=document.getElementById("toCelsius");
const result=document.getElementById("result");
let temp=0;

function convert(){

    if(toFahrenheit.checked){
        temp=myInput.value;
        temp=Number(temp);
        temp=temp * 9 / 5 + 32;
        result.textContent = temp.toFixed(3)+"°F";
    }
    else if(toCelsius.checked){
        temp=myInput.value;
        temp=Number(temp);
        temp=(temp-32)*(5/9);
        result.textContent = temp.toFixed(3)+"°C";
    }
    else{
        result.textContent = "Select a unit";
    }
}