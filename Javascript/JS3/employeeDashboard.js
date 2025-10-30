

viewEmployee();

async function viewEmployee(){
    try{
        const response= await fetch("https://6580190d6ae0629a3f54561f.mockapi.io/api/v1/employee");
        const employeeData= await response.json();
        console.log(employeeData);
    }
    catch(error){
        console.log(error);
    }
}