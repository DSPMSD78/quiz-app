const questions = [
  {
    question: "MS Dhoni DOB?",
    answers: [
      { text: "07/08/1981", correct: false },
      { text: "07/07/1981", correct: true },
      { text: "07/06/1981", correct: false },
      { text: "08/07/1981", correct: false },
    ],
  },
  {
    question: "MS Dhoni first international wicket?",
    answers: [
      { text: "Desmond Haynes", correct: false },
      { text: "Petersen", correct: false },
      { text: "Travis Dowlin", correct: true },
      { text: "	Ranjit Fernando", correct: false },
    ],
  },
  {
    question: "MS Dhoni International debut year?",
    answers: [
      { text: "2006", correct: false },
      { text: "2003", correct: true },
      { text: "2007", correct: false },
      { text: "2005", correct: false },
    ],
  },
  {
    question: "MS Dhoni highest score in ODIs Ins?",
    answers: [
      { text: "181", correct: false },
      { text: "183", correct: false },
      { text: "181*", correct: false },
      { text: "183*", correct: true },
    ],
  },
  {
    question: "MS Dhoni score in 2011 WC final?",
    answers: [
      { text: "91*", correct: true },
      { text: "92*", correct: false },
      { text: "92", correct: false },
      { text: "97", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("btn-next");

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
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
