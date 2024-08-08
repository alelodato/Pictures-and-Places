const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const answerButton = document.getElementsByClassName('option');
const startButton = document.getElementById("start-button");
const title = document.getElementById('title');
const intro = document.getElementById('intro');
const nextButton = document.getElementById('next');
const scoreTracker = document.getElementById('score');
const container = document.getElementById('container');
const infoContainer = document.getElementById('info');
const quizImage = document.getElementById('quiz-image');
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextQuestion);

function startGame() {
  startButton.classList.add('hide')
  title.classList.add('hide')
  intro.classList.add('hide')
  questionContainer.classList.remove('hide')
  answerButtons.classList.remove('hide')
  nextButton.classList.remove('hide')
  scoreTracker.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  nextQuestion()

}

function nextQuestion() {
  resetAnswers();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  currentQuestionIndex++;
}

function showQuestion(questions) {
  questionContainer.innerText = questions.question
  answerButtons.innerHTML = "";
  quizImage.innerHTML = "";
  const image = document.createElement('img');
  image.src = questions.imageUrl;
  quizImage.appendChild(image);
  questions.answers.forEach(answers => {
    const button = document.createElement('button');
    button.textContent = answers.text;
    answerButtons.appendChild(button);
    button.addEventListener('click', checkAnswer);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
  }
  })
};

function checkAnswer(event) {
  const selectedAnswer = event.target;
  const correct = selectedAnswer.dataset.correct;
  answerButtons.appendChild(button);
  if (questions.answers === correct){
    button.style.backgroundColor = "lightgreen"
  } else {button.style.backgroundColor = "red"};
  answerInfo();
}


function resetAnswers() {
  answerButtons.innerHTML = "";
}

function answerInfo (questions) {
  infoContainer.classList.remove('hide');
  infoContainer.innerHTML = "";
}

function endQuiz(){

}



