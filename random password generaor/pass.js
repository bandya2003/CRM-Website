//making the possible sets of nos and sybols and upper and lower chars
const upperset="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerset="abcdefghijklmnopqrstuvwxyz"
const numberset="1234567890"
const symbolset="~!@#$%^&*()_+/"

//selectors
const passbox=document.querySelector('.heading');//pass box
const leninput=document.querySelector('#total');//length input box
const upperinput=document.querySelector('#uppercase')//uppercase input
const lowerinput=document.querySelector('#lowercase')//lowercase input
const numberinput=document.querySelector('#numbers')//number input
const symbolinput=document.querySelector('#symbols')//symbol input

//now we have to write a function whuich will return the random thing from a PASSED  data set 
function getrandom(dataset){
    return dataset[Math.floor(Math.random()*dataset.length)] 
}

// now we have to write a function to generate password by given/passed  datset and put it in an empty password string 
function generatepassword(password=""){
    if(upperinput.checked){
        password=password+getrandom(upperset);
    }
    if(lowerinput.checked){
        password=password+getrandom(lowerset);
    }
    if(symbolinput.checked){
        password=password+getrandom(symbolset);
    }
    if(numberinput.checked){
        password=password+getrandom(numberset);
    }
    //now we have 2 choices we have a password of length>total and length<=total 
    //in case of len<total we should call the function agin to generate the further part of password 
    //in case of len>total we should trim/truncate the password to the given len
    //so we have to write a function of trimming the pass for len>total
    if(password.length < total.value){
        //calling the function recursively to generate the firther more password
        return generatepassword(password);
    }
    //else returning the passbox with trimmed password which will trim the password to the given val
    console.log(password)
    passbox.textContent=truncatestring(password,total.value);
}

//truncate 
function truncatestring(str,num){
    if(str.length>num){
        return str.substring(0,num);//will return the substring of str from 0 to num that means 0 to the given value of char
    }
    //else it would be len=num so just return the str
    else{
return str;
    }
}

//just callling all the function by button
document.querySelector('.btn').addEventListener("click",()=>{
generatepassword();
});
