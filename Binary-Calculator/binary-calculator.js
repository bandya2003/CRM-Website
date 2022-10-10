// Result Formation
function express(operand1, operand2, operator) {
    let op1 = parseInt(operand1, 2);
    let op2 = parseInt(operand2, 2);
    let res;

    switch(operator) {
        case '+':
            res = op1+op2;
            break;
        case '-':
            res = op1-op2;
            break;
        case '*':
            res = op1*op2;
            break;
        case '/':
            res = op1/op2;
            break;
    }
    return res.toString(2);
}

let operand1="", operand2="", operator="", myres="", opvis=false;
document.getElementById('btnEql').onclick = function() {
    myres = express(operand1, operand2, operator);
    document.getElementById('res').innerHTML = myres;
}

function showex() {
    document.getElementById('res').innerHTML = operand1+operator+operand2;
}


document.getElementById('btnClr').onclick = function() {
    myres = "";
    operand1 = "";
    operand2 = "";
    operator = "";
    opvis = false;
    document.getElementById('res').innerHTML = myres;
}

// Different Functional Button

// Sum
document.getElementById('btnSum').onclick = function() {
    operator = '+';
    opvis = true;
    showex();
}

// Subtraction
document.getElementById('btnSub').onclick = function() {
    operator = '-';
    opvis = true;
    showex();
}

// Multiply
document.getElementById('btnMul').onclick = function() {
    operator = '*';
    opvis = true;
    showex();
}

// Division
document.getElementById('btnDiv').onclick = function() {
    operator = '/';
    opvis = true;
    showex();
}

document.getElementById('btn0').onclick = function() {
    if (opvis === true) {
        operand2 += '0';
    } else {
        operand1 += '0';
    }
    showex();
}

document.getElementById('btn1').onclick = function() {
    if (opvis === true) {
        operand2 += '1';
    } else {
        operand1 += '1';
    }
    showex();
}
