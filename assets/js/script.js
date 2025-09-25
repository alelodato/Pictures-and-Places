/**
 * Game Variables
 */
// Game title,intro message and start button variables
const title = document.getElementById("title");
const intro = document.getElementById("intro");
const playerNameInput = document.getElementById("player-name");
const newGame = document.getElementById("new-game-btn");
const nameSubmit = document.getElementById("player-name-form");
const start = document.querySelector(".title-intro-start");
const playerNameForm = document.getElementById("player-name-form");
// Questions, answers buttons, quiz images, next button and score tracker variables
const questionContainer = document.getElementById("question-container");
const quizImage = document.getElementById("quiz-image");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");
const scoreTracker = document.getElementById("score");
//Variable to get the finish button
const getResults = document.getElementById("results");
// End game and restart button variable
const endMessage = document.getElementById("quiz-end");
const restartButton = document.getElementById("restart");
const restartGameBtn = document.getElementById("start-again");
const leaderBtn = document.getElementById("leader-btn");
const leaderBoard = document.getElementById("leaderboard");
const gameBackground = document.getElementById("homepage");
// Variables for shuffled questions and the current question index
let shuffledQuestions, currentQuestionIndex;
// Variable to get the questions info text content
let questionsInfo;
let leaderList = document.getElementById("board");
// Empty array to store scores to render into the leaderboard
let scores = [];
// Deployed backend url, to be fetched to create a table and save player scores
const API_BASE = "https://pictures-and-places.onrender.com"

/**
 * Event Listeners
 */

document.addEventListener("DOMContentLoaded", function () {
  newGame.addEventListener("click", startGame);
  nextButton.addEventListener("click", nextQuestion);
  restartGameBtn.addEventListener("click", startGame);
  getResults.addEventListener("click", insertName);
  nameSubmit.addEventListener("submit", endQuiz);
  restartButton.addEventListener("click", startGame);
  leaderBtn.addEventListener("click", showLeaderboard);
});

/** Function that makes sure content is displayed dynamically on all devices
 * having different view height
 */
function setRealVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("load", setRealVH);
window.addEventListener("resize", setRealVH);

/**
 * Function that starts the game when start button clicked
 */
function startGame() {
  gameBackground.style.backgroundColor = "rgb(0 0 0 / 40%)";
  start.classList.add("hide");
  // Remove 'hide' class from quiz content to show when game starts
  questionContainer.classList.remove("hide");
  answerButtons.classList.remove("hide");
  nextButton.classList.remove("hide");
  scoreTracker.classList.remove("hide");
  quizImage.classList.remove("hide");
  restartGameBtn.classList.remove("hide");
  // Hide end message to show only when finish button is pressed
  endMessage.classList.add("hide");
  // Hide restart button to show only when end message is shown
  restartButton.classList.add("hide");
  leaderBtn.classList.add("hide");
  leaderBoard.classList.add("hide");
  // Set score tracker to 0 at the beginning of the game
  document.getElementById("right").textContent = 0;
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
  const image = document.createElement("img");
  image.src = questions.imageUrl;
  quizImage.appendChild(image);

  // Create answers buttons, and fills them with text related to the current question
  questions.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.textContent = answers.text;
    answerButtons.appendChild(button);
    // Event listener to call the checkAnswer function when answer button is clicked
    button.addEventListener("click", checkAnswer);
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
  if (correct) {
    selectedAnswer.style.backgroundColor = "lightgreen";
    // Increments score tracker for correct answers
    incrementCorrect();
    Swal.fire({
      title: "Correct!",
      text: ` ${questionsInfo}`,
      icon: "success",
      confirmButtonText: "OK",
    });
  } else {
    selectedAnswer.style.backgroundColor = "red";
    Swal.fire({
      title: "Sorry! That's not the correct answer...",
      text: `${questionsInfo}`,
      icon: "error",
      confirmButtonText: "OK",
    });
    let correctAnswer = document.querySelector("[data-correct='true']");
    correctAnswer.style.backgroundColor = "lightgreen";
  }
  // Disallows answer buttons to be clicked after answer is submitted
  answerButtons.style.pointerEvents = "none";
  // Checks if the user reached the last question, and in that case hides the next button and shows the finish button to allow to finish the game and show the results
  if (currentQuestionIndex === questions.length) {
    nextButton.classList.add("hide");
    getResults.classList.remove("hide");
  } else {
    nextButton.classList.remove("hide");
    scoreTracker.classList.remove("hide");
  }
}

/**
 * Function to reset answer buttons for current question, and to hide next button and score tracker
 */
function resetAnswers() {
  answerButtons.innerHTML = "";
  nextButton.classList.add("hide");
  scoreTracker.classList.add("hide");
}

/**
 * Function to increment incorrect answer score when incorrect answer is selected by the user
 */
function incrementCorrect() {
  let previousCorrect = parseInt(document.getElementById("right").textContent);
  document.getElementById("right").textContent = previousCorrect + 1;
}

function insertName() {
  // Hide all the quiz content to make space for results and end game message
  questionContainer.classList.add("hide");
  answerButtons.classList.add("hide");
  quizImage.classList.add("hide");
  getResults.classList.add("hide");
  restartGameBtn.classList.add("hide");
  playerNameForm.classList.remove("hide");
}

/**
 * Function to show quiz game end message and results, when finish button is pressed
 */
function endQuiz(event) {
  event.preventDefault();
  playerName = document.getElementById("player-name-input").value;
  let finalScore = parseInt(document.getElementById("right").textContent);
  if (scores.length < 10) {
    scores.push({ name: playerName, score: finalScore });
  } else {
    let lowestScore = scores.reduce(
      (lowestIdx, player, idx, arr) =>
        player.score < arr[lowestIdx].score ? idx : lowestIdx,
      0
    );
    if (finalScore > scores[lowestScore].score) {
      scores[lowestScore] = { name: playerName, score: finalScore };
    }
  }
  // Saves scores on backend server
  fetch(`${API_BASE}/scores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: playerName, score: finalScore }),
  })
    .then((res) => res.json())
    .then((data) => console.log("✅ Score saved:", data))
    .catch((err) => {
      console.error("❌ Error saving score:", err);
      window.location.href = "error.html"; // redirect to the error page
    });

  playerNameForm.classList.add("hide");
  // Shows end game results, message and restart game button
  endMessage.innerHTML = `Congratulations you completed the quiz! <br>
            You guessed <strong>${finalScore}</strong> places, click the button if you wanna play
            again!`;
  endMessage.classList.remove("hide");
  restartButton.classList.remove("hide");
  leaderBtn.classList.remove("hide");
}

function showLeaderboard() {
  // Shows the game leaderboard
  scoreTracker.classList.add("hide");
  leaderBtn.classList.add("hide");
  endMessage.classList.add("hide");
  leaderBoard.classList.remove("hide");
  leaderList.innerHTML = "";

  // Rendering the leaderboard
  fetch(`${API_BASE}/scores`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((player, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${player.name} - ${player.score}`;
        leaderList.appendChild(listItem);
      });
    })
    .catch((err) => {
      console.error("❌ Error fetching leaderboard:", err);
      window.location.href = "error.html";
    });
}
