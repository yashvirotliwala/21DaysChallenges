const questions = [
    { text: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0 },
    { text: "Which CSS property changes text color?", options: ["text-color", "font-color", "color", "bg-color"], correct: 2 },
    { text: "Which keyword declares a variable in JS?", options: ["var", "let", "const", "All of the above"], correct: 3 },
    { text: "What does CSS stand for?", options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], correct: 2 },
    { text: "Which HTML tag displays an image?", options: ["<img>", "<tr>", "<pic>", "<src>"], correct: 0 },
    { text: "Which CSS property adds space INSIDE an element?", options: ["margin", "padding", "border-spacing", "inner-space"], correct: 1 },
    { text: "Correct way to write a JS function?", options: ["function myFunc() {}", "def myFunc() {}", "create myFunc() {}", "func myFunc() {}"], correct: 0 },
    { text: "Which HTML attribute defines inline styles?", options: ["class", "style", "id", "css"], correct: 1 },
    { text: "Which method writes to console?", options: ["console.write()", "console.output()", "console.log()", "console.print()"], correct: 2 },
    { text: "Which CSS unit is relative to root font-size?", options: ["px", "em", "rem", "vh"], correct: 2 }
];

const TOTAL = questions.length;
let userName = "";
let currentQ = 0;
let score = 0;
let answered = false;
let timer = null;
let timeLeft = 30;

const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const userNameSpan = document.getElementById('userNameDisplay');
const scoreSpan = document.getElementById('score');
const qNumSpan = document.getElementById('qNum');
const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const timerSpan = document.getElementById('timer');
const finalScoreSpan = document.getElementById('finalScore');
const feedbackSpan = document.getElementById('feedback');
const totalQsSpan = document.getElementById('totalQs');

totalQsSpan.innerText = TOTAL;

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function startTimer() {
    timeLeft = 30;
    timerSpan.innerText = timeLeft;
    stopTimer();

    timer = setInterval(() => {
        if (!answered && timeLeft > 0) {
            timeLeft--;
            timerSpan.innerText = timeLeft;
            if (timeLeft === 0) {
                if (!answered) {
                    answered = true;
                    stopTimer();
                    document.querySelectorAll('.option').forEach(opt => {
                        opt.classList.add('disabled');
                    });
                    const correctIdx = questions[currentQ].correct;
                    const allOpts = document.querySelectorAll('.option');
                    allOpts[correctIdx].classList.add('correct');
                    nextBtn.disabled = false;
                }
            }
        }
    }, 1000);
}

function loadQuestion() {
    answered = false;
    nextBtn.disabled = true;
    const q = questions[currentQ];
    questionDiv.innerText = q.text;
    qNumSpan.innerText = currentQ + 1;

    optionsDiv.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const optDiv = document.createElement('div');
        optDiv.className = 'option';
        optDiv.innerText = `${String.fromCharCode(65 + idx)}. ${opt}`;
        optDiv.dataset.index = idx;
        optDiv.onclick = () => selectOption(idx);
        optionsDiv.appendChild(optDiv);
    });

    startTimer();
}

function selectOption(selectedIdx) {
    if (answered) return;

    const q = questions[currentQ];
    const isCorrect = (selectedIdx === q.correct);

    answered = true;
    stopTimer();

    const options = document.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.add('disabled');
        if (idx === q.correct) {
            opt.classList.add('correct');
        }
        if (idx === selectedIdx && !isCorrect) {
            opt.classList.add('wrong');
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.innerText = score;
    }

    nextBtn.disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    if (currentQ + 1 < TOTAL) {
        currentQ++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    stopTimer();
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    finalScoreSpan.innerText = `${score}/${TOTAL}`;
    const percent = (score / TOTAL) * 100;
    let msg = "";
    if (percent === 100) msg = `Perfect! ${userName}, you're a coding master! 🏆`;
    else if (percent >= 70) msg = `Great job, ${userName}! You know your code well! 🎉`;
    else if (percent >= 50) msg = `Good effort, ${userName}! Keep practicing! 👍`;
    else msg = `Keep learning, ${userName}! Review and try again! 💪`;
    feedbackSpan.innerText = msg;
}

function startQuiz() {
    const nameInput = document.getElementById('userName');
    userName = nameInput.value.trim();
    if (userName === "") {
        alert("Please enter your name");
        return;
    }

    userNameSpan.innerText = userName;
    currentQ = 0;
    score = 0;
    scoreSpan.innerText = score;

    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');

    loadQuestion();
}

function playAgain() {
    stopTimer();
    startScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    document.getElementById('userName').value = "";
    currentQ = 0;
    score = 0;
    answered = false;
}

document.getElementById('startBtn').addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
document.getElementById('playAgainBtn').addEventListener('click', playAgain);

document.getElementById('userName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startQuiz();
});