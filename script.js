function add (a, b)
{
    return Number(a) + Number(b);
}

function substract (a, b)
{
    return a - b;
}

function multiply (a, b)
{
    return a * b;
}

function divide (a, b)
{
    if (b === 0)
    {
        return "bruh";
    }
    return a / b;
}

function operate (num1, num2, operator)
{
    switch (operator)
    {
        case '+':
            return add(num1, num2);
        case '-':
            return substract(num1, num2);
        case 'X':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return "ERROR";
    }
}

function allClear()
{
    eraseButton.addEventListener('click', () =>
    {
        resultPanel.textContent = '0';
        operatorUsed = false;
        //console.log('1before');
        //console.log(inputNumber1);
        inputNumber1.length = 0;
        //console.log('1after');
        //console.log(inputNumber1);

        //console.log('2before');
        //console.log(inputNumber2);
        inputNumber2.length = 0;
        //console.log('2after');
        //console.log(inputNumber2);

        lightOff(previousButton);
        
        decimalUsed = false;
        inputResult1 = '';
        inputResult2 = '';
        //equalsUsed = false;
        //equalsButtonPressed = false;
    });
}

function percent ()
{
    percentButton.addEventListener('click', () =>
    {
        if (operatorUsed === false)
        {
            number1 = number1 / 100;
            if (number1.toString().length > 7)
            {
                number1 = scientificNotationE(number1.toString(), 1);
            }
            resultPanel.textContent = number1;
            //console.log('num1');
            //console.log(number1);
        }
        else if (operatorUsed === true)
        {   
            number2 = number2 / 100;
            if (number2.toString().length > 7)
            {
                number2 = scientificNotationE(number2.toString(), 1);
            }
            resultPanel.textContent = number2;
            //console.log('num2');
            //console.log(number2);
        }
    });
}

function changeSign ()
{
    changeSignButton.addEventListener('click', () =>
    {
        if (operatorUsed === false)
        {
            currentNumber1 = Array.from(number1.toString());
            if (currentNumber1[0] === '-')
            {
                currentNumber1.splice(0, 1);
            }
            else 
            {
                currentNumber1.splice(0, 0, '-');
            }
            number1 = Number(currentNumber1.join(''));
            resultPanel.textContent = number1;
            //console.log('num1');
            //console.log(number1);
        }
        else if (operatorUsed === true)
        {
            currentNumber2 = Array.from(number2.toString());
            if (currentNumber2[0] === '-')
            {
                currentNumber2.splice(0, 1);
            }
            else 
            {
                currentNumber2.splice(0, 0, '-');
            }
            number2 = Number(currentNumber2.join(''));
            resultPanel.textContent = number2;
            //console.log('num2');
            //console.log(number2);
        }
    });
}

function writeNumber ()
{
    numberButtons.forEach((button) => 
    {
        button.addEventListener('click', () =>
        {
        
            if (operatorUsed === false && equalsButtonPressed === true)
            {
                inputNumber1.length = 0;
                number1 = 0;
                inputResult1 = inputNumber1.join('');
                //console.log('num1 to zero');
                //console.log(number1);
                equalsButtonPressed = false;
                decimalUsed = false;
            }
            if (button.textContent !== '.' || decimalUsed !== true)
            {    
                if (operatorUsed === false && inputResult1.length < 7)
                {
                    if (button.textContent === '.')
                    {
                        decimalUsed = true;
                    }
                    if (inputNumber1.length === 0 && button.textContent === '.')
                    {
                        inputNumber1.push('0');
                        inputResult1 = inputNumber1.join('');
                    }
                    if (inputNumber1.length === 0 && button.textContent === '0')
                    {
                        resultPanel.textContent = '0';
                        return;
                    }
                    inputNumber1.push(button.textContent);
                    inputResult1 = inputNumber1.join('');
                    number1 = Number(inputResult1);
                    resultPanel.textContent = inputResult1;
                    //console.log('num1');
                    //console.log(number1);
                }
                else if (operatorUsed === true && inputResult2.length < 7)
                {
                    if (button.textContent === '.')
                    {
                        decimalUsed = true;
                    }
                    if (inputNumber2.length === 0 && button.textContent === '.')
                    {
                        inputNumber2.push('0');
                        inputResult2 = inputNumber2.join('');
                    }
                    if (inputNumber2.length === 0 && button.textContent === '0')
                    {
                        resultPanel.textContent = '0';
                        return;
                    }
                    inputNumber2.push(button.textContent);
                    inputResult2 = inputNumber2.join('');
                    number2 = Number(inputResult2);
                    resultPanel.textContent = inputResult2;
                    //console.log('num2');
                    //console.log(number2);
                    number2Manual = true;
                    lightOff(previousButton);
                }
            }
        });
    });
}

function lightTheOperator (button)
{
    button.style.background = 'white';
    button.style.color = 'darkorange';
}

function lightOff (button)
{
    button.style.background = 'darkorange';
    button.style.color = 'white';
}

function displayOperator ()
{
    operatorButtons.forEach((button) =>
    {
        button.addEventListener('click', () =>
        {
            if (operatorUsed === true)
            {
               lightOff(previousButton);
               equalsUsed = true;
            }
            if (operatorUsed === true && equalsUsed === true)
            {
                if ((inputOperator === '/' || inputOperator === 'X') &&
                 number2Manual === false)
                {
                    number2 = 1;
                }
                operationDone();
            }
            inputOperator = button.textContent;
            previousButton = button;           
            operatorUsed = true;
            lightTheOperator(button);
            decimalUsed = false;            
        });
    });
}

function scientificNotationE (x, f) 
{
    return Number.parseFloat(x).toExponential(f);
}

function decimalInResult (resultString)
{
    let decimalFound = false;
    for (let i = 0; i < resultString.length; i++)
    {
        if (resultString[i] === '.')
        {
            decimalFound = true;
        }
        else 
        {
            continue;
        }
    }
    return decimalFound;
}

function operationDone ()
{
    operationResult = operate(number1, number2, inputOperator);
    equalsUsed = true;
    let operationResultString = operationResult.toString();
    //console.log(operationResult);
    if(decimalInResult(operationResultString) === true)
    {
        operationResultString = operationResult.toFixed(3).toString();
        operationResult = Number(operationResultString);
    }
    if (operationResultString.length > 7)
    {
        operationResult = scientificNotationE(operationResultString, 1);
    }
    //console.log(operationResult);
    resultPanel.textContent = operationResult;

    number1 = operationResult;
    
    inputNumber2.length = 0;
    number2 = 0;
    number2Manual = false;
    inputResult1 = '';
    inputResult2 = '';
}

function equals ()
{
    equalsButton.addEventListener('click', () =>
    {
        operationDone();
        lightOff(previousButton);
        operatorUsed = false;
        decimalUsed = false;
        equalsButtonPressed = true;
    });
}
// execution
let inputNumber1 = [];
let number1 = 0;
let inputNumber2 = [];
let number2 = 0;
let number2Manual = true;
let inputResult1 = '';
let inputResult2 = '';
let decimalUsed = false;

let inputOperator = '';
let operatorUsed = false;
let previousButton;

let operationResult;

let equalsUsed = false;
let equalsButtonPressed = false;

let currentNumber1;
let currentNumber2;

const numberButtons = document.querySelectorAll('.numberButtons');
const operatorButtons = document.querySelectorAll('.operatorButtons');
const equalsButton = document.querySelector('#equalsButton');
const eraseButton = document.querySelector('#eraseButton');
const changeSignButton = document.querySelector('#signButton');
const percentButton = document.querySelector('#percentButton');

const resultPanel = document.querySelector('#resultPanel');
resultPanel.textContent = '0';

writeNumber();
allClear();
displayOperator();
equals();
changeSign();
percent();