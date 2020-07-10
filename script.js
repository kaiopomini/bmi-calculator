const form = document.getElementById('form');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const calculateBtn = document.getElementById('calc-btn');
const result = document.getElementById('result')

//Show success - reset field error
function showSuccess(input) {
  const formControl = input.parentElement.parentElement
  formControl.className = 'form-control'

}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement.parentElement
  formControl.className = 'form-control error'

  const small = formControl.querySelector('small')
  small.innerText = message

}

// Check errors
function checkErrors(inputArr) {
  let errors = false
  inputArr.forEach( input => {
    if(input.value.trim() === NaN || input.value.trim() <= 0) {
      showError(input, `Valor inválido`)
      errors = true
    } else {
      showSuccess(input)
    }
  })
  return errors
}

// Get attributes from BMI value
function getResultAttr(bmi) {
  let resultAttr = {
    color: '',
    message: ''
  }

  if(bmi < 18.5) {
    resultAttr = {color: 'yellow', message: 'Baixo peso'}
  } else if(bmi <= 25) {
    resultAttr = {color: 'green', message: 'Peso ideal'}
  } else if(bmi <= 30) {
    resultAttr = {color: 'yellow', message: 'Sobrepeso'}
  } else if(bmi <= 35) {
    resultAttr = {color: 'orange', message: 'Obesidade Grau 1'}
  } else if(bmi <= 40) {
    resultAttr = {color: 'orange-red', message: 'Obesidade Grau 2'}
  } else {
    resultAttr = {color: 'red', message: 'Obesidade Grau 3'}
  }
  return resultAttr
}

// Calculate BMI and show
function calculateBMI(){
  resetResultField()
  const bmi = (weight.value / Math.pow(height.value, 2)).toFixed(2)
  const resultAttr = getResultAttr(bmi)
  result.classList.add(resultAttr.color)
  result.innerHTML = `
    <h2>Seu IMC: ${bmi}</h2>
    <p>${resultAttr.message}</p>
  `
}

// Reset results 
function resetResultField(){
  result.className = 'result'
  result.innerHTML= ''
}

// Event Listeners
calculateBtn.addEventListener('click', () => {
  if (!checkErrors([weight, height])) {
    calculateBMI()
  } else{
    resetResultField()
  }
  
})
