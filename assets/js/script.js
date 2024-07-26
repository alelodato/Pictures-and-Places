const questionContainer = document.getElementById('question-container');
const answerButton = document.getElementById('answer-buttons');
const startButton = document.getElementById("start-button");
const title = document.getElementById('title')
const intro = document.getElementById('intro')
const nextButton = document.getElementById('next-button')
const scoreTracker = document.getElementById('score')
const container = document.getElementById('container')
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', nextQuestion)

function startGame() {
  startButton.classList.add('hide')
  title.classList.add('hide')
  intro.classList.add('hide')
  questionContainer.classList.remove('hide')
  answerButton.classList.remove('hide')
  nextButton.classList.remove('hide')
  scoreTracker.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  nextQuestion()

}

 function checkAnswer() {
  

 }

function nextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(questions) {
  questionContainer.innerText = questions.question
  answerButton.innerHTML = "";
  questions.answers.forEach(answers => {
    const button = document.createElement('button');
    button.textContent = answers.text;
    answerButton.appendChild(button);
    button.addEventListener('click', checkAnswer)
  })
};