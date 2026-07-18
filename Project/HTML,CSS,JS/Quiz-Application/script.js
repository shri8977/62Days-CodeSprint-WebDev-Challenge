const questions = [
  {
    question: 'Which HTML tag is used to create a hyperlink?',
    options: ['<link>', '<a>', '<img>', '<div>'],
    answer: 1,
  },
  {
    question: 'Which CSS property controls the space between elements?',
    options: ['padding', 'color', 'display', 'font-family'],
    answer: 0,
  },
  {
    question: 'What does JS stand for?',
    options: ['Java Source', 'Java Style', 'JavaScript', 'Just Syntax'],
    answer: 2,
  },
  {
    question: 'Which method adds an item to the end of an array in JavaScript?',
    options: ['push()', 'add()', 'append()', 'insert()'],
    answer: 0,
  },
  {
    question: 'What does HTML stand for?',
    options: ['Hyper Transfer Modern Language', 'Hyper Text Markup Language', 'High Text Machine Language', 'Hyper Trainer Markup Language'],
    answer: 1,
  },
  {
    question: 'What does JS stand for?',
    options: ['Java Source', 'Java Style', 'JavaScript', 'Just Syntax'],
    answer: 2,
  },
  {
    question: 'Which symbol is used for comments in JavaScript?',
    options: ['//', '<!-- -->', '#', '**'],
    answer: 0,
  },
  {
    question: 'Which keyword is used to declare a variable?',
    options: ['var', 'int', 'string', 'define'],
    answer: 0,
  },
  {
    question: 'Which keyword creates a constant?',
    options: ['let', 'var', 'const', 'fixed'],
    answer: 2,
  },
  {
    question: 'Which company developed JavaScript?',
    options: ['Microsoft', 'Sun Microsystems', 'Netscape', 'Google'],
    answer: 2,
  },
  {
    question: 'Which method prints output in the browser console?',
    options: ['console.print()', 'print()', 'console.log()', 'echo()'],
    answer: 2,
  },
  {
    question: 'Which operator checks both value and type?',
    options: ['==', '!=', '===', '='],
    answer: 2,
  },
  {
    question: 'Which value represents "no value"?',
    options: ['null', 'undefined', '0', 'false'],
    answer: 1,
  },
  {
    question: 'How do you write an arrow function?',
    options: ['=>', '->', '==>', '<='],
    answer: 0,
  },
  {
    question: 'Which function converts a string to an integer?',
    options: ['Number()', 'parseInt()', 'parseFloat()', 'toInt()'],
    answer: 1,
  },
  {
    question: 'Which loop executes at least once?',
    options: ['for', 'while', 'do...while', 'foreach'],
    answer: 2,
  },
  {
    question: 'How do you find the length of a string?',
    options: ['size()', 'count()', '.length', '.size'],
    answer: 2,
  },
  {
    question: 'Which keyword stops a loop?',
    options: ['continue', 'exit', 'break', 'stop'],
    answer: 2,
  },
  {
    question: 'Which keyword skips the current loop iteration?',
    options: ['skip', 'continue', 'next', 'pass'],
    answer: 1,
  },
  {
    question: 'What is the result of typeof []?',
    options: ['array', 'object', 'list', 'undefined'],
    answer: 1,
  },
  {
    question: 'Which array method adds an item to the end?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    answer: 0,
  },
  {
    question: 'Which array method removes the last item?',
    options: ['shift()', 'pop()', 'slice()', 'splice()'],
    answer: 1,
  },
  {
    question: 'Which method joins array elements into a string?',
    options: ['join()', 'concat()', 'merge()', 'append()'],
    answer: 0,
  },
  {
    question: 'Which keyword is used to define a function?',
    options: ['func', 'function', 'method', 'define'],
    answer: 1,
  },
  {
    question: 'Which event occurs when a button is clicked?',
    options: ['onhover', 'onclick', 'onchange', 'onsubmit'],
    answer: 1,
  },
  {
    question: 'Which method selects an element by its ID?',
    options: [
      'document.query()',
      'document.getElementById()',
      'document.id()',
      'document.find()',
    ],
    answer: 1,
  },
  {
    question: 'Which method is used to display a popup message?',
    options: ['prompt()', 'confirm()', 'alert()', 'notify()'],
    answer: 2,
  },
  {
    question: 'Which value is considered falsy?',
    options: ['"Hello"', '1', '0', '[]'],
    answer: 2,
  },
  {
    question: 'Which object represents the current webpage?',
    options: ['window', 'document', 'screen', 'navigator'],
    answer: 1,
  },
  {
    question: 'Which method converts an object to JSON?',
    options: [
      'JSON.stringify()',
      'JSON.parse()',
      'toJSON()',
      'objectToJSON()',
    ],
    answer: 0,
  },
];

const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const nextBtn = document.getElementById('nextBtn');
const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('options');
const timerDisplay = document.getElementById('timerDisplay');
const progressFill = document.getElementById('progressFill');
const scoreDisplay = document.getElementById('scoreDisplay');
const resultMessage = document.getElementById('resultMessage');
const resultSummary = document.getElementById('resultSummary');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerId;
let selectedAnswers = [];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers = [];
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  showQuestion();
}

function showQuestion() {
  clearInterval(timerId);
  timeLeft = 15;
  const question = questions[currentQuestionIndex];
  questionNumber.textContent = currentQuestionIndex + 1;
  questionText.textContent = question.question;
  optionsContainer.innerHTML = '';
  progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  timerDisplay.textContent = `${timeLeft}s`;

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });

  startTimer();
}

function startTimer() {
  timerId = setInterval(() => {
    timeLeft -= 1;
    timerDisplay.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleTimeout();
    }
  }, 1000);
}

function selectAnswer(selectedIndex) {
  clearInterval(timerId);
  const correctIndex = questions[currentQuestionIndex].answer;
  const buttons = optionsContainer.querySelectorAll('button');

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) {
      button.classList.add('correct');
    }
    if (index === selectedIndex && index !== correctIndex) {
      button.classList.add('wrong');
    }
  });

  selectedAnswers[currentQuestionIndex] = selectedIndex;
  if (selectedIndex === correctIndex) {
    score += 1;
  }

  nextBtn.classList.remove('hidden');
}

function handleTimeout() {
  const correctIndex = questions[currentQuestionIndex].answer;
  const buttons = optionsContainer.querySelectorAll('button');

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) {
      button.classList.add('correct');
    }
  });

  selectedAnswers[currentQuestionIndex] = -1;
  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    showQuestion();
    nextBtn.classList.add('hidden');
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreDisplay.textContent = `${score}/${questions.length}`;
  const percent = Math.round((score / questions.length) * 100);
  resultMessage.textContent = percent >= 70
    ? 'Excellent work! You scored highly.'
    : 'Nice effort. Keep practicing and try again!';

  resultSummary.innerHTML = '';
  questions.forEach((question, index) => {
    const item = document.createElement('div');
    item.className = 'result-item';
    const userAnswer = selectedAnswers[index];
    const correctAnswer = question.options[question.answer];
    const userText = userAnswer >= 0 ? question.options[userAnswer] : 'No answer';
    item.innerHTML = `<strong>${index + 1}.</strong> ${question.question}<br><span>Your answer: ${userText}</span><br><span>Correct answer: ${correctAnswer}</span>`;
    resultSummary.appendChild(item);
  });
}

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
