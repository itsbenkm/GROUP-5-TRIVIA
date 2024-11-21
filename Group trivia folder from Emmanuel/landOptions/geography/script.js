const questions = [
  {
    question: "Which is the largest continent by land area?",
    answers: [
      { text: "Africa", correct: false },
      { text: "Asia", correct: true },
      { text: "Europe", correct: false },
      { text: "Antarctica", correct: false },
    ],
  },
  {
    question: "Which river is the longest in the world?",
    answers: [
      { text: "Nile", correct: true },
      { text: "Amazon", correct: false },
      { text: "Yangtze", correct: false },
      { text: "Mississippi", correct: false },
    ],
  },
  {
    question: "Which country has the most time zones?",
    answers: [
      { text: "France", correct: true },
      { text: "Russia", correct: false },
      { text: "United states", correct: false },
      { text: "China", correct: false },
    ],
  },
  {
    question: "What's the capital city of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Canberra", correct: true },
      { text: "Melbourne", correct: false },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "Which desert is the largest in the world by area?",
    answers: [
      { text: "Gobi desert", correct: false },
      { text: "Antarctic desert", correct: true },
      { text: "Sahara desert", correct: false },
      { text: "Arabian Desert", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

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

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz);
}

startQuiz();
