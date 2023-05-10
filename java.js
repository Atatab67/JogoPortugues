const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const result = document.getElementById('result')
let shuffledQuestions, currentQuestionIndex
var resultPoints = 0
var numberQuestion = 1

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
// Arrumar bug da ultima questão nao contar ponto
function startGame() {
  result.classList.add('hide')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
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
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    document.getElementById('result2').innerHTML = resultPoints
    resultPoints = resultPoints - resultPoints
    questionContainerElement.classList.add('hide')
    result.classList.remove('hide')
  }
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
// quando vai apagar as classes ele ve se é correto e adiciona mais um nos pontos
  if (element.classList.contains('correct')){
    resultPoints = resultPoints + 1
    console.log('pontos atuais:', resultPoints)
  }
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Em: “… ouviam-se amplos bocejos, fortes como o marulhar das ondas…” a partícula como expressa uma ideia de:',
    answers: [
      { text: 'comparação', correct: true },
      { text: 'causa', correct: false },
      { text: 'explicação', correct: false },
      { text: 'conclusão', correct: false },
      { text: 'proporção', correct: false }
    ]
  },
  {
    question: 'Perguntas2',
    answers: [
      { text: 'A', correct: true },
      { text: 'B', correct: false },
      { text: 'C', correct: false },
      { text: 'D', correct: false }
    ]
  },
  {
    question: 'Pergunta3',
    answers: [
      { text: 'A', correct: false },
      { text: 'B', correct: true },
      { text: 'C', correct: false },
    ]
  },
  {
    question: 'Pergunta4',
    answers: [
      { text: 'A', correct: false },
      { text: 'B', correct: true }
    ]
  }
]