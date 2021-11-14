const returnPorcentageBar = document.getElementById("return");
const returnPorcentageNum = document.getElementById("returnPorcentage");
let income = document.getElementById("income");
let time = document.getElementById("time");
let initialDeposit = document.getElementById("initialDeposit");
const timeOptions = document.querySelectorAll(".timeOption");
let months = timeOptions[0];
let years = timeOptions[1];
let periodTime = years.value;

const calcularBtn = document.querySelector(".calcular");

const futureBalanceMessage = document.querySelector(".benefits");

returnPorcentageBar.addEventListener("pointermove", ()=>{
    returnPorcentageNum.innerHTML = returnPorcentageBar.value + '%';
})
returnPorcentageBar.addEventListener("keyup", ()=>{
    returnPorcentageNum.innerHTML = returnPorcentageBar.value + '%';
})

timeOptions.forEach(option =>{
    option.addEventListener("change", ()=>{
        periodTime = option.value
    })
})

calcularBtn.addEventListener("click", ()=>{
    obtenerDatos();
    let values = obtenerDatos()
    console.log(values)
    try {
        validarDatos(values);
    } catch (e) {
        alert(e + "Porfavor vuelva a intentarlo")
    }
})

function obtenerDatos(){
    if(periodTime === "months") {
        return {
            returnPorcentage: parseFloat(returnPorcentageBar.value/12),  
            income: parseInt(income.value),
            time: parseInt(time.value * 12),
            periodTime,
            initialDeposit: parseInt(initialDeposit.value),
        }
    }
    return {
        returnPorcentage: parseInt(returnPorcentageBar.value),  
        income: parseInt(income.value),
        time: parseInt(time.value),
        periodTime,
        initialDeposit: parseInt(initialDeposit.value),
    }
}

function validarDatos(v){
    if(!isNaN(v.returnPorcentage) && !isNaN(v.income) && !isNaN(v.time) && !isNaN(v.initialDeposit)) return calculateBenefits(v);
    alert("Datos incompletos");
}

function calculateBenefits(v){
    let benefits = 0;
    let porcentage = v.returnPorcentage / 100;
    for(let i = 0; i < v.time; i++){
        if(i == 0){
            benefits = v.initialDeposit + v.income;
            benefits += Math.ceil(benefits*porcentage);
        }
        else{
            benefits += v.income
            benefits += Math.round(benefits*porcentage);
        } 
    }
    v.benefits = benefits;
    futureBalanceMessage.style = "display: block;"
    return document.querySelector(".benefits__total").innerHTML = benefits
}