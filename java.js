const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const result = document.getElementById('result')
const newElement = document.getElementById('new')
let shuffledQuestions, currentQuestionIndex
var resultPoints = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
// Arrumar bug da ultima questão nao contar ponto e deixar trabalho mais bonito
function startGame() {
  result.classList.add('hide')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  newElement.classList.add('hide')
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
    //Comparação
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
    //Condicional
    question: 'Tudo o que quiser,"desde que" estude e passe de ano.',
    answers: [
      { text: 'Conclusão', correct: false },
      { text: 'Consformativa', correct: false },
      { text: 'Condicionais', correct: true },
      { text: 'Causais', correct: false }
    ]
  },
  {
    //final
    question: 'É tarde "para que" reverta o estrago.',
    answers: [
      { text: 'Integrantes', correct: false },
      { text: 'Finais', correct: true },
      { text: 'Temporal', correct: false },
      { text: 'Proporcionais', correct: false}
    ]
  },
  {
    //causal
    question: 'A casa incendiou "porque" esqueceram o gás ligado.',
    answers: [
      { text: 'Causais', correct: true },
      { text: 'Concessivas', correct: false },
      { text: 'Condicionais', correct: false },
      { text: 'Conformativas', correct: false }
    ]
  },
  {
    //Concessiva
    question: 'Angélica, "posto que" muito emocionada, voltou-se para a rua.',
    answers: [
      { text: 'Proporcionais', correct: false },
      { text: 'Concessivas', correct: true },
      { text: 'Temporais', correct: false },
      { text: 'Comparativa', correct: false }
    ]
  },  
  {
    //Temporal
    question: 'Desaprovou o comportamento do filho "assim que" soube do ocorrido.',
    answers: [
      { text: 'Proporcionais', correct: false },
      { text: 'Concessivas', correct: false },
      { text: 'Temporais', correct: true },
      { text: 'Comparativa', correct: false }
    ]
  },  
  {
    //Proporcionais
    question: '"À medida" em que o tempo passava, confortava-se',
    answers: [
      { text: 'Proporcionais', correct: true },
      { text: 'Causais', correct: false },
      { text: 'Temporais', correct: false },
      { text: 'Comparativa', correct: false }
    ]
  },  
  {
    //Integrantes
    question: 'Não sei "se" você notou que as cortinas são senhoriais.',
    answers: [
      { text: 'Proporcionais', correct: false },
      { text: 'Concessivas', correct: false },
      { text: 'Temporais', correct: false },
      { text: 'Integrantes', correct: true }
    ]
  },
  {
    //Consecutivas
    question: 'Não sei "se" você notou que as cortinas são senhoriais.',
    answers: [
      { text: 'Proporcionais', correct: false },
      { text: 'Causais', correct: false },
      { text: 'Consecutivas', correct: true },
      { text: 'Finais', correct: false }
    ]
  }
]