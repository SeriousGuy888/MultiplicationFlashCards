const squaresOnlyCheckbox = document.querySelector(".squares-only")
const toggleButton = document.querySelector(".toggle-activation")

const paramInput = document.querySelector(".get-params")
const actualApp = document.querySelector(".app")

const questionField = document.querySelector(".question")
const answerField = document.querySelector(".answer")
const skipButton = document.querySelector(".skip-button")

const correctCounter = document.querySelector(".correct-counter")
const skipCounter = document.querySelector(".skip-counter")
const incorrectCounter = document.querySelector(".incorrect-counter")

const defaultOptions = {
  min1: 1,
  max1: 9,
  min2: 1,
  max2: 9
}

let squaresOnly = false
let activated = false
let options = {
  min1: 1,
  max1: 9,
  min2: 1,
  max2: 9
}

let skipCount = 0
let correctAnswerCount = 0
let incorrectAnswerCount = 0

let displayingSolution
let question = null
let solution = null

const setQuestion = (factor1, factor2) => {
  question = `${factor1} × ${factor2}`
  solution = factor1 * factor2

  updateDisplay()
}

const displayToQuestionField = str => {
  questionField.innerHTML = str
}

const updateCounters = () => {
  skipCounter.innerHTML = skipCount
  correctCounter.innerHTML = correctAnswerCount
  incorrectCounter.innerHTML = incorrectAnswerCount
}

const clearAnswerField = () => {
  answerField.value = ""
}

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const getNewQuestion = () => {
  for(let loopOpt of Object.keys(options)) {
    if(isNaN(options[loopOpt])) {
      options[loopOpt] = defaultOptions[loopOpt]
    }
  }

  const num1 = randomNumber(options.min1, options.max1)
  const num2 = squaresOnly ? num1 : randomNumber(options.min2, options.max2)
  setQuestion(num1, num2)
}

const updateDisplay = () => {
  paramInput.style.display = activated ? "none" : "block"
  actualApp.style.display = activated ? "block" : "none"

  displayToQuestionField(question)
}

squaresOnlyCheckbox.addEventListener("click", () => {
  const factor1Span = document.querySelector(".factor-1-text")
  const factor2Para = document.querySelector(".factor-2-input")
  squaresOnly = squaresOnlyCheckbox.checked
  
  if(squaresOnly) {
    factor2Para.style.display = "none"
    factor1Span.innerHTML = "Factor"
  }
  else {
    factor2Para.style.display = "block"
    factor1Span.innerHTML = "First factor"
  }
})

toggleButton.addEventListener("click", () => {
  activated = !activated

  toggleButton.innerHTML = activated ? "Settings" : "Start"
  for(let loopOpt of Object.keys(options)) {
    options[loopOpt] = parseInt(document.querySelector(`.${loopOpt}`).value)
  }

  clearAnswerField()

  if(!activated) {
    displayingSolution = false
    skipCount++
    updateCounters()
  }

  getNewQuestion()
})

answerField.addEventListener("keyup", ({ key }) => {
  if(key == "Enter") {
    if(displayingSolution) {
      getNewQuestion()
      displayingSolution = false
      clearAnswerField()

      correctCounter.classList.remove("correct-flash")
      incorrectCounter.classList.remove("incorrect-flash")
    }
    else {
      displayingSolution = true
      let givenAnswer = parseInt(answerField.value) || 0

      if(givenAnswer == solution) {
        correctAnswerCount++
        correctCounter.classList.add("correct-flash")
        displayToQuestionField(`${question} = ${solution}`)
      }
      else {
        incorrectAnswerCount++
        incorrectCounter.classList.add("incorrect-flash")
        displayToQuestionField(`${question} = ${solution} ≠ ${givenAnswer}`)
      }
      updateCounters()

      clearAnswerField()
    }
  }
})

skipButton.addEventListener("click", () => {
  displayingSolution = false
  skipCount++
  updateCounters()
  getNewQuestion()
})