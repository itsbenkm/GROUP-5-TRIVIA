/*JAVA DICTIONARIES*/

const questions = [
  {
    question: "Which company produces the Mustang?",
    answers: [
      { text: "Chevrolet", correct: false },
      { text: "Ford", correct: true },
      { text: "Dodge", correct: false },
      { text: "Toyota", correct: false },
    ],
  },
  {
    question: "What is the name of Tesla's fully electric truck model?",
    answers: [
      { text: "Cybertruck", correct: true },
      { text: "Roadster", correct: false },
      { text: "Model X", correct: false },
      { text: "Silverado", correct: false },
    ],
  },
  {
    question: "Which car brand is known for its prancing horse logo?",
    answers: [
      { text: "Ferrari", correct: true },
      { text: "Lamborghini", correct: false },
      { text: "Porsche", correct: false },
      { text: "Maserati", correct: false },
    ],
  },
  {
    question: "Which country is home to the car manufacturer Volvo?",
    answers: [
      { text: "Germany", correct: false },
      { text: "Sweden", correct: true },
      { text: "Japan", correct: false },
      { text: "Italy", correct: false },
    ],
  },
  {
    question: "What was the first mass-produced car?",
    answers: [
      { text: "Volkswagen Beetle", correct: false },
      { text: "Ford Model T", correct: true },
      { text: "Chevrolet Corvette", correct: false },
      { text: "Mercedes-Benz 300SL", correct: false },
    ],
  },
];

/*VARIABLES*/
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


/*fUNCTIONS*/

  /*START FUNCTION*/
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


/*FUNCTION FOR ANSWER*/
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct) {
      button.classList.add("correct");
    }
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});


/*FUNCTION TO SHOW SCORE*/
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz);
}

startQuiz();
