let dark = document.getElementById("darkmode-icon")

dark.addEventListener('click', function() {
    document.body.classList.toggle("light-mode")

    if (document.body.classList.contains("light-mode"))
        dark.src = "./images/moon.svg"
    else
        dark.src = "./images/sun.svg"
})


let deg = document.getElementById("deg")
let trigo = document.getElementById("trigo")

deg.addEventListener('click', function() {
    document.querySelectorAll('.trig').forEach(button => {
        button.classList.toggle("radians")
    })

    deg.classList.toggle("off")
    if (deg.classList.contains("off"))
    {
        deg.innerText = "rad"
        trigo.classList.add("disabled")
        trigo.disabled = true;
    }
    else
    {
        deg.innerText = "deg"
        trigo.classList.remove("disabled")
        trigo.disabled = false
    }
})


trigo.addEventListener('click', function() {
    trigo.classList.toggle("inv")
    if (trigo.classList.contains("inv"))
    {
        document.querySelectorAll('.trig').forEach(button => {
            button.innerHTML += "<sup>-1</sup>"
        })

        deg.classList.add("disabled")
        deg.disabled = true
    }
    else
    {
        document.querySelectorAll('.trig').forEach(button => {
            button.innerHTML = button.innerText.slice(0, -2)
        })

        deg.classList.remove("disabled")
        deg.disabled = false
    }
})


const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operation')
const scientificButtons = document.querySelectorAll('.sci')
const sqrtButton = document.querySelector('.sqrt')
const inverseButton = document.querySelector('.inverse')
const factorialButton = document.querySelector('.factorial')
const constantButtons = document.querySelectorAll('.const-num')
const equalsButton = document.querySelector('.equals')
const deleteButton = document.querySelector('.data-delete')
const allClearButton = document.querySelector('.all-clear')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')


let currentOperand = '0'
let previousOperand = ''
let operation = undefined
let openbr = 0



numberButtons.forEach(button =>
{
    button.addEventListener('click', function() {
        appendNumber(button.innerText)
        updateDisplay()
    })
})


operationButtons.forEach(button =>
{
    button.addEventListener('click', function() {
        chooseOperation(button.innerText)
        updateDisplay()
    })
})

scientificButtons.forEach(button =>
{
    button.addEventListener('click', function() {
        science(button.innerText, button)
    })
})


sqrtButton.addEventListener('click', function() {
    if (isNaN(currentOperand))
        return

    let tmp = currentOperand

    currentOperand = "√" + currentOperand
    currhis = currentOperand
    updateDisplay()

    currentOperand = Math.sqrt(parseFloat(tmp)).toString()
})


inverseButton.addEventListener('click', function() {
    if (isNaN(currentOperand))
        return

    let tmp = currentOperand
    currentOperand += "^(-1)"
    currhis = currentOperand
    updateDisplay()

    let computation = Function("return 1/" + tmp)
    currentOperand = computation()
})


factorialButton.addEventListener('click', function() {
    if (isNaN(currentOperand))
        return

    let tmp = currentOperand
    currentOperand += "!"
    currhis = currentOperand
    updateDisplay()

    currentOperand = factorial(tmp).toString()
})


constantButtons.forEach(button =>
{
    button.addEventListener('click', function() {
        consts(button.innerText)
    })
})


equalsButton.addEventListener('click', function() {
    compute()
    updateDisplay()
    updateHistory()
})


allClearButton.addEventListener('click', function() {
    clear()
    updateDisplay()
})


deleteButton.addEventListener('click', function() {
    del()
    currhis = currentOperand
    updateDisplay()
})


function clear()
{
    currentOperand = '0'
    previousOperand = ''
    operation = undefined
}
  

function del()
{
    if (currentOperand === '0' || currentOperand.length === 1)
        currentOperand = '0'
    else
        currentOperand = currentOperand.toString().slice(0, -1)
}


function appendNumber(number)
{
    if (number === '.' && currentOperand.toString().includes('.'))
        return

    if (number === '(')
        openbr++
    else if (number === ')')
        openbr--

    if (currentOperand === '0' && number != '.')
        currentOperand = number.toString()
    else
        currentOperand = currentOperand.toString() + number.toString()
}


function consts(con)
{
    if (con === 'e')
    {
        previousOperandTextElement.innerText += ' e'
        currentOperand = (Math.E).toString()
        currentOperandTextElement.innerText = currentOperand
    }
    else if (con === 'π')
    {
        previousOperandTextElement.innerText += ' π'
        currentOperand = (Math.PI).toString()
        currentOperandTextElement.innerText = currentOperand
    }
}


function chooseOperation(op)
{
    if (currentOperand === '')
        return

    if (previousOperand !== '')
        compute()

    operation = op

    // if (openbr === 0)
    {
        previousOperand = currentOperand
        currentOperand = ''
    }
}


function compute()
{
    if (isNaN(previousOperand) || isNaN(currentOperand) || operation === undefined)
        return

    let computation
    switch (operation)
    {
        case '÷':
            computation = Function("return " + previousOperand + "/" + currentOperand)
            break
        case '%':
            computation = Function("return " + previousOperand + "/ 100 *" + currentOperand)
            break
        case '^':
            computation = Function("return Math.pow(" + previousOperand + ", " + currentOperand + ")")
            break
        default:
            computation = Function("return " + previousOperand + operation + currentOperand)
    }

    if (currhis === '')
        currhis = currentOperand

    prevhis = previousOperand + operation
    currentOperand = computation()
    operation = undefined
    previousOperand = ''
}


function science(op, btn)
{
    if (isNaN(currentOperand))
        return

    let tmp = parseFloat(currentOperand)

    let computation
    if (op === 'log')
    {
        computation = (Math.log10(tmp)).toFixed(7).toString()
        currentOperand = op + "(" + currentOperand + ")"
    }
    else if (op === 'ln')
    {
        computation = (Math.log(tmp)).toFixed(10).toString()
        currentOperand = op + "(" + currentOperand + ")"
    }
    else
    {
        if (op === 'sin' || op === 'cos' || op === 'tan')
        {
            if (!btn.classList.contains("radians"))
            {
                tmp *= Math.PI / 180
                currentOperand = op + "(" + currentOperand + "°)"
            }
            else
                currentOperand = op + "(" + currentOperand + ")"

                if (op === 'sin')
                    computation = (Math.sin(tmp)).toFixed(10).toString()
                else if (op === 'cos')
                    computation = (Math.cos(tmp)).toFixed(10).toString()
                else if (op === 'tan')
                    computation = (Math.tan(tmp)).toFixed(10).toString()
        }
        else
        {
            currentOperand = "arc" + op.slice(0, -2) + "(" + currentOperand + ")"
            
            if (op === 'sin-1')
                computation = Math.asin(tmp)
            else if (op === 'cos-1')
                computation = Math.acos(tmp)
            else if (op === 'tan-1')
                computation = Math.atan(tmp)

            computation = (computation * 180 / Math.PI).toFixed(10).toString() + "°"
        }
    }
    
    currhis = currentOperand
    updateDisplay()

    currentOperand = computation
}


function updateDisplay()
{
    currentOperandTextElement.innerText = currentOperand.toString()

    if (operation != null)
    {
        if (operation === 'xy')
            operation = '^'

        previousOperandTextElement.innerText = previousOperand + ' ' + operation
    }
    else
        previousOperandTextElement.innerText = ''
}


function factorial(n)
{
    let x = parseFloat(n)

    if (x < 0)
        return -factorial(-x)

    if (Number.isInteger(x))
    {
        if (x <= 1)
            return 1

        return x * factorial(x - 1)
    }

    return gamma(x + 1)
}


function gamma(z) 
{
    return (Math.sqrt(2 * Math.PI / z) * Math.pow((1 / Math.E) * (z + 1 / (12 * z - 1 / (10 * z))), z)).toFixed(10);
}


// HISTORY
let hisButton = document.querySelector('.his')
let historyElement = document.getElementById('history')
let prevhis = ''
let currhis = ''

historyElement.style.visibility = "hidden"

hisButton.addEventListener('click', function() {
    historyElement.classList.toggle('visible')
    if (historyElement.classList.contains('visible'))
        historyElement.style.visibility = "visible"
    else
        historyElement.style.visibility = "hidden"
})


function updateHistory()
{
    historyElement.innerHTML += prevhis + currhis + '=' + currentOperand + '<br>'
    prevhis = ''
    currhis = ''
}