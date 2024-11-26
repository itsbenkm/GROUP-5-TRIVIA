const questions = [
  {
    question: "What is the most expensive painting ever sold?",
    answers: [
      { text: "The Mona Lisa", correct: false },
      { text: "Salvator Mundi", correct: true },
      { text: "The Starry Night", correct: false },
      { text: "Clementine's Earth", correct: false },
    ],
  },
  {
    question: "What is the primary medium used by sculptors like Michaelangelo?",
    answers: [
      { text: "Marble", correct: true },
      { text: "Clay", correct: false },
      { text: "Wood", correct: false },
      { text: "Paint", correct: false },
    ],
  },
  {
    question: "What term describes a painting that uses only shades of one color?",
    answers: [
      { text: "Monochromatic", correct: true },
      { text: "Polychromatic", correct: false },
      { text: "Chromatic", correct: false },
      { text: "Dichromatic", correct: false },
    ],
  },
  {
    question: "If you are in heaven and you don't see Kanye West there, where are you?",
    answers: [
      { text: "You are in purgatory", correct: false },
      { text: "You are in heaven", correct: true },
      { text: "You are in hell", correct: false },
      { text: "You are nowhere", correct: false },
    ],
  },
  {
    question: "Who is the devil in Kenya?",
    answers: [
      { text: "Rumpelstiltskin", correct: false },
      { text: "Zakayo", correct: true },
      { text: "Tracie", correct: false },
      { text: "Clarence", correct: false },
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
