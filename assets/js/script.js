const questionContainer = document.getElementById('question-container');
const answerButton = document.getElementById('answer-buttons');
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
  answerButton.classList.remove('hide')
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

function resetAnswers() {
  answerButton.innerHTML = "";


}



 function checkAnswer() {
  const correctAnswer = questions.correct;
  if (answerButton === correctAnswer) {
    answerInfo ();
  }
  


}

function answerInfo (question) {
  infoContainer.classList.remove('hide');
  infoContainer.innerText = question.info;
}

function showQuestion(questions) {
  questionContainer.innerText = questions.question
  answerButton.innerHTML = "";
  quizImage.innerHTML = "";
  const image = document.createElement('img');
  image.src = questions.imageUrl;
  quizImage.appendChild(image);
  questions.answers.forEach(answers => {
    const button = document.createElement('button');
    button.textContent = answers.text;
    answerButton.appendChild(button);
    button.addEventListener('click', checkAnswer);
  })
};


