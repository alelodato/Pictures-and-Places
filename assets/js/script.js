import Swal from 'sweetalert2/dist/sweetalert2.js';
/**
 * Game Variables
 */
// Game title,intro message and start button variables
const title = document.getElementById('title');
const intro = document.getElementById('intro');
const startButton = document.getElementById("start-button");
// Questions, answers buttons, quiz images, next button and score tracker variables
const questionContainer = document.getElementById('question-container');
const quizImage = document.getElementById('quiz-image');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next');
const scoreTracker = document.getElementById('score');
//Variable to get the finish button
const getResults = document.getElementById('results');
// End game and restart button variable
const endMessage = document.getElementById('quiz-end');
const restartButton = document.getElementById('restart');
// Variables for shuffled questions and the current question index
let shuffledQuestions, currentQuestionIndex;
// Variable to get the questions info text content
let questionsInfo;
/**
 * Event Listeners
 */
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextQuestion);
getResults.addEventListener('click', endQuiz);
restartButton.addEventListener('click', startGame);

/**
 * Function that starts the game when start button clicked
 */
function startGame() {
  // Hide title,intro message and start button, to make space for the quiz game content
  title.classList.add('hide');
  intro.classList.add('hide');
  startButton.classList.add('hide');
  // Remove 'hide' class from quiz content to show when game starts
  questionContainer.classList.remove('hide');
  answerButtons.classList.remove('hide');
  nextButton.classList.remove('hide');
  scoreTracker.classList.remove('hide');
  quizImage.classList.remove('hide');
  // Hide end message to show only when finish button is pressed
  endMessage.classList.add('hide');
  // Hide restart button to show only when end message is shown
  restartButton.classList.add('hide');
  // Set score tracker to 0 at the beginning of the game
  document.getElementById('right').textContent = 0;
  document.getElementById('wrong').textContent = 0;
  // Set questions to appear in random order
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  // Call next question function
  nextQuestion();
}

/**
 * Function to reset quiz area and show next question when user progresses
 */
function nextQuestion() {
  // Call function to reset answers
  resetAnswers();
  // Shows next question in a random order
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  currentQuestionIndex++;
  // Enables answer buttons to be clicked for current question
  answerButtons.style.pointerEvents = "auto";
}

/**
 * Function to show all the quiz content, the questions and the related images and answers buttons
 */
function showQuestion(questions) {
  // Shows the question
  questionContainer.innerText = questions.question;
  // Empty the answer buttons text area to show new ones related to the correct question
  answerButtons.innerHTML = "";
  // Empty the quiz image area to show new one related to the correct question
  quizImage.innerHTML = "";
  // Define questionsInfo variable to show infos related to the question, as this function has 'questions' as attribute
  questionsInfo = questions.info;
  // Create img element and assign correct imageUrl to the current question, so the related image is going to show 
  const image = document.createElement('img');
  image.src = questions.imageUrl;
  quizImage.appendChild(image);

  
  // Create answers buttons, and fills them with text related to the current question
  questions.answers.forEach(answers => {
    const button = document.createElement('button');
    button.textContent = answers.text;
    answerButtons.appendChild(button);
    // Event listener to call the checkAnswer function when answer button is clicked
    button.addEventListener('click', checkAnswer);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
  }
  });
}

/**
 * Function to check either the selected answer is correct or incorrect
 * And to show alert message related to the current question
 */
function checkAnswer(event) {
  // Define variables for the selected answer to be targeted, and to check if is correct
  const selectedAnswer = event.target;
  const correct = selectedAnswer.dataset.correct === "true";
  // Check if the selected answer is correct, assigning styles to the buttons and showing an alert message
  if (correct){
    selectedAnswer.style.backgroundColor = "lightgreen";
    // Increments score tracker for correct answers
    incrementCorrect();
    alert(`Correct! ${questionsInfo}`);
  } else {selectedAnswer.style.backgroundColor = "red";
    alert(`Sorry! That's not the correct answer...${questionsInfo}`);
    let correctAnswer = document.querySelector("[data-correct='true']");
    correctAnswer.style.backgroundColor = "lightgreen";
    // Increments score tracker for incorrect answers 
    incrementIncorrect();
  }
  // Disallows answer buttons to be clicked after answer is submitted
  answerButtons.style.pointerEvents = "none";
  // Checks if the user reached the last question, and in that case hides the next button and shows the finish button to allow to finish the game and show the results
  if (currentQuestionIndex === questions.length){
    nextButton.classList.add('hide');
    getResults.classList.remove('hide');
  }else {nextButton.classList.remove('hide');
  scoreTracker.classList.remove('hide');
  }
}

/**
 * Function to reset answer buttons for current question, and to hide next button and score tracker 
 */
function resetAnswers() {
  answerButtons.innerHTML = "";
  nextButton.classList.add('hide');
  scoreTracker.classList.add('hide');
}

/**
 * Function to increment incorrect answer score when incorrect answer is selected by the user
 */
function incrementCorrect () {
  let previousCorrect = parseInt(document.getElementById('right').textContent);
    document.getElementById('right').textContent = previousCorrect + 1;

}

/**
 * Function to increment correct answer score when correct answer is selected by the user
 */
function incrementIncorrect () {
  let previousIncorrect = parseInt(document.getElementById('wrong').textContent);
    document.getElementById('wrong').textContent = previousIncorrect + 1;

}

/**
 * Function to show quiz game end message and results, when finish button is pressed
 */
function endQuiz(){
  // Hide all the quiz content to make space for results and end game message
  questionContainer.classList.add('hide');
  answerButtons.classList.add('hide');
  quizImage.classList.add('hide');
  getResults.classList.add('hide');
  // Shows end game results, message and restart game button
  endMessage.classList.remove('hide');
  restartButton.classList.remove('hide');
  scoreTracker.classList.remove('hide');
}