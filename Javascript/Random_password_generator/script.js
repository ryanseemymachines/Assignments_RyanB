
const passwordlength=12;

const includeLower=true;
const includeUpper=true;
const includeNumbers=true;
const includeSymbols=true;

const SubmitBtn=document.getElementById("SubBtn");

SubmitBtn.onclick=function() {
    generatePassword(passwordlength,includeLower, includeUpper,includeSymbols,includeNumbers);
}

function generatePassword(length, includeLower, includeUpper, includeSymbols,includeNumbers){

    const lowerchars="abcdefghijklmnopqrstuvwxyz";
    const upperchars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers="0123456789";
    const symbols="!@#$%^&*()_-?|";

    let allowedchars="";
    let password="";

    allowedchars+=includeLower?lowerchars:"";
    allowedchars+=includeUpper?upperchars:"";
    allowedchars+=includeNumbers?numbers:"";
    allowedchars+=includeSymbols?symbols:"";

    if(length<=0){
        return("Passwor length must be at least 1");
    }
    if(allowedchars.length===0)
    {
        return("At least 1 set of characters needs to be selected");
    }


    for(let i=0;i<length;i++){
        const random=Math.floor(Math.random() * allowedchars.length);
        password+=allowedchars[random];
    }
    document.getElementById("result").innerText="The geneated password is "+password;
}
