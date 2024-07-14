const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreContainerElement = document.getElementById('score-container')
const scoreElement = document.getElementById('score')
const finalScoreElement = document.getElementById('final-score')
const resultGifElement = document.getElementById('result-gif')
const questionCountElement = document.getElementById('question-count')

let shuffledQuestions, currentQuestionIndex
let score = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  scoreContainerElement.classList.add('hide')
  score = 0
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
  updateInfo()
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct === 'true'
  if (correct) {
    score++
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    displayScore()
  }
  updateInfo()
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function displayScore() {
  questionContainerElement.classList.add('hide')
  scoreContainerElement.classList.remove('hide')
  finalScoreElement.innerText = `Your Score: ${score}`
  if (score >= 7) {
    resultGifElement.innerHTML = '<img src="winner.gif" alt="Winner">'
  } else {
    resultGifElement.innerHTML = '<img src="loser.gif" alt="Loser">'
  }
}

function updateInfo() {
  scoreElement.innerText = `Score: ${score}`
  questionCountElement.innerText = `Questions Remaining: ${shuffledQuestions.length - currentQuestionIndex - 1}`
}

const questions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Lisbon', correct: false }
    ]
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Saturn', correct: false }
    ]
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true }
    ]
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    answers: [
      { text: 'Harper Lee', correct: true },
      { text: 'J.K. Rowling', correct: false },
      { text: 'Ernest Hemingway', correct: false },
      { text: 'Mark Twain', correct: false }
    ]
  },
  {
    question: 'Which element has the chemical symbol O?',
    answers: [
      { text: 'Gold', correct: false },
      { text: 'Oxygen', correct: true },
      { text: 'Hydrogen', correct: false },
      { text: 'Silver', correct: false }
    ]
  },
  {
    question: 'What is the square root of 64?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true },
      { text: '7', correct: false },
      { text: '9', correct: false }
    ]
  },
  {
    question: 'Which is the smallest country in the world?',
    answers: [
      { text: 'Monaco', correct: false },
      { text: 'Vatican City', correct: true },
      { text: 'San Marino', correct: false },
      { text: 'Liechtenstein', correct: false }
    ]
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    answers: [
      { text: 'Gold', correct: false },
      { text: 'Iron', correct: false },
      { text: 'Diamond', correct: true },
      { text: 'Platinum', correct: false }
    ]
  },
  {
    question: 'What is the chemical symbol for gold?',
    answers: [
      { text: 'Au', correct: true },
      { text: 'Ag', correct: false },
      { text: 'Pb', correct: false },
      { text: 'Pt', correct: false }
    ]
  },
  {
    question: 'What is the capital of Japan?',
    answers: [
      { text: 'Seoul', correct: false },
      { text: 'Beijing', correct: false },
      { text: 'Tokyo', correct: true },
      { text: 'Bangkok', correct: false }
    ]
  }
]


