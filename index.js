const inputSlider = document.querySelector('[data-lengthSlider]')
const lengthDisplay = document.querySelector('[data-lengthNumber]')

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = ''
let passwordLength = 10
let checkCount = 0
handleSlider();

//set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength;

}

function setIndicator(color){
    indicator.style.backgroundColor= color
    //shadow
    // --do
  
}

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min
}

function generateRandomNumber(){
    return getRndInteger(0,9)    
}

function generateLowerCase(){
    
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperrCase(){
    
    return String.fromCharCode(getRndInteger(65,97))
}

function generateSymbol(){
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0")
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0")
    } else {
      setIndicator("#f00")
    }
}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied"
    } catch (error) {
        console.error(error)
        copyMsg.innerText ="failed"
    }
    //copy span visible
    copyMsg.classList.add('active')

    setTimeout( ()=>{
        copyMsg.classList.remove('active')
    }, 2000)
    
}

inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider()
})

copyBtn.addEventListener("click", () =>{
    if(passwordDisplay.value){
        copyContent()
    }else{
        passwordDisplay.placeholder = 'Password is empty!'
    }
})

//count for checked boxes
function handleCheckBoxChange(){
    checkCount =0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    })


    if(passwordLength <checkCount){
        passwordLength = checkCount
        handleSlider()
    }


   
}
allCheckBox.forEach( (checkbox) =>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})

function shufflePassword( array){
    //Fisher Yates Method --> used for shuffling array
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function generateButton(){
    //if none of the checkbox are selcted
    if(checkCount <= 0){
        return
    }

     //special condition

     if(passwordLength <checkCount){
        passwordLength = checkCount
        handleSlider()
    }

    // new password -----------------------------

    //remove old password
    password ='';

    //put the required stuff as mentioned in checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperrCase()
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase()
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber()
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol()
    // }
    
    let functArr= []
    if(uppercaseCheck.checked){
        functArr.push(generateUpperrCase)
    }
    if(lowercaseCheck.checked){
        functArr.push(generateLowerCase)
    }
    if(numbersCheck.checked){
        functArr.push(generateRandomNumber)
    }
    if(symbolsCheck.checked){
        functArr.push(generateSymbol)
    }

    //compulsory addition
    for(let i =0; i<functArr.length; i++ ){
        password += functArr[i];
    }

    //remaining addition in password

    for(let i=0; i< (passwordLength - functArr.length); i++){
        let randIndex = getRndInteger(0, functArr.length)
        password += functArr[randIndex]()
    }

    //shuffle the password

    password = shufflePassword(Array.from(password));

    // display password
    passwordDisplay.value = password

    //calculate strength
    calcStrength()
}

generateBtn.addEventListener("click", ()=>{
    if(checkCount == 0){
        return;
    }

     //special condition

     if(passwordLength <checkCount){
        passwordLength = checkCount
        handleSlider()
    }

    // new password -----------------------------

    //remove old password
    password ='';

    //put the required stuff as mentioned in checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperrCase()
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase()
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber()
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol()
    // }
    
    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperrCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i =0; i<funcArr.length; i++ ){
        password += funcArr[i]();
    }

    //remaining addition in password

    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    //shuffle the password

    password = shufflePassword(Array.from(password));

    // display password
    passwordDisplay.value = password

    //calculate strength
    calcStrength()
});


