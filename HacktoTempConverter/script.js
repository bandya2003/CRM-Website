
let celcius = document.getElementById("cel")
let Fahrenheit = document.getElementById("fer")
let kelvin = document.getElementById("kel")

function celInput(){
    let celValue = parseFloat(celcius.value);
    let ferOutput = (celValue * 9)/5 + 32;
    let kelOutput = celValue + 273;

    Fahrenheit.value = parseFloat(ferOutput.toFixed(2));
    kelvin.value = parseFloat(kelOutput.toFixed(2));
}

function ferInput(){
    let ferValue = parseFloat(Fahrenheit.value);
    let celOutput = (ferValue-32)*5/9;
    let kelOutput = celOutput + 273;

    celcius.value = parseFloat(celOutput.toFixed(2));
    kelvin.value = parseFloat(kelOutput.toFixed(2));
}
function kelInput(){
    let kelValue = parseFloat(kelvin.value);
    let celOutput = kelValue - 273;
    let ferOutput = (celOutput * 9)/5 + 32;

    celcius.value = parseFloat(celOutput.toFixed(2));
    Fahrenheit.value = parseFloat(ferOutput.toFixed(2));
}
