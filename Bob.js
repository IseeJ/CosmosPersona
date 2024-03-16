// Please do not use my code, pictures without permission! I'm happy to share this with you just please please let me know first!
// took me a year to finish this project and all I had then was python knowledge lol

const questions = [
    {
        question: "...?",
        image: "images/B1.gif",
        answers: {
            C: {
                text: "OMG BOB IT'S YOU!!!",
                scores: { U: 0, C: +1 },
            },
            U: {
                text: "Here we go again...Where am I?",
                scores: { U: +1, C: 0 },
            },
        },
    },
    {
        question: "'You! You're not suposed to be here!'",
        image: "images/B2.gif",
        answers: {
            C: {
                text: "This place is cool! Is this where you work? Is this how the quiz was created?!",
                scores: { U: 0, C: +1 },
            },
            U: {
                text: "I was told by the creator to find an easter egg, any ideas?",
                scores: { U: +1, C: 0 },
            },
        },
    },
    {
        question: "'An easter egg?! Wow, my boss really need to touch some grass with all these free time in her hands...'",
        image: "images/B3.gif",
        answers: {
            U: {
                text: "Hey...It's not a crime being a homebody.",
                scores: { U: +1, C: 0 },
            },
            C: {
                text: "lol I know right, she must be really bored..",
                scores: { U: 0, C: +1 },
            },
        },
    },
    {
        question: "'To be honest, I have no idea. Where do people normally keep eggs?'",
        image: "images/B4.gif",
        answers: {
            C: {
                text: "Maybe I should crack you open and see if you're hiding it in there?",
                scores: { U: 0, C: +1 },
            },
            U: {
                text: "You know you're a bad liar, right?",
                scores: { U: +1, C: 0 },
            },
        },
    },
    {
        question: "'Fine! Fine! She asked me to keep the secret! There... one of those boxes! Gosh, I don't get paid enough for this...'",
        image: "images/B5.gif",
        answers: {
            U: {
                text: "Open 'Trash with potential' box",
                scores: { U: +1, C: 0 },
            },
            C: {
                text: "Open 'I forgot I made these' box",
                scores: { U: 0, C: +1 },
            },
        },
    },
];

const resultOptions = {
    "U": {
        image: "BA.PNG",
    },
    "C": {
        image: "BT.PNG"
    },
};

let currentQuestion = 0;
// let userAnswers = {};


function displayQuestion() {
    const quizElement = document.getElementById('quiz');
    const question = questions[currentQuestion];
    if (question) {
        let html = `<p>${question.question}</p>`;
        if (question.image) {
            html += `<img src="${question.image}" alt="Question ${currentQuestion + 1}">`;
        }
        for (const option in question.answers) {
            html += `<button class="large-rectangular" value="${option}" id="${option}">${question.answers[option].text}</button>`;
        }
        quizElement.innerHTML = html;
        attachButtonClickHandlers();
    } else {
    
    }
}


document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    currentQuestion = 0;
    userAnswers = {};
    displayQuestion(); 
    // userAnswers.userName = userName;
});


//click
function attachButtonClickHandlers() {
    const choiceButtons = document.querySelectorAll('.large-rectangular');
    choiceButtons.forEach((button) => {
        button.addEventListener('click', handleAnswer);
    });
}



//answers
function handleAnswer(event) {
    const selectedOption = event.target;
    const answerKey = selectedOption.value;
    const question = questions[currentQuestion];
    const answer = question.answers[answerKey];

    for (const dimension in answer.scores) {
        userAnswers[dimension] = (userAnswers[dimension] || 0) + answer.scores[dimension];
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResult();
    }
}

// ...

function showResult() {
    const resultElement = document.getElementById('result');
    const resultTextContainer = document.querySelector('.result-text');
    const resultImage = document.getElementById('result-image');

    // Decide the result based on the scores
    const result = (userAnswers['U'] || 0) > (userAnswers['C'] || 0) ? 'U' : 'C';

    // Show result
    const personalityData = resultOptions[result];
    if (personalityData) {
        resultTextContainer.innerHTML = `
            <!-- You can add any result text here -->
        `;
        resultImage.src = "images/" + personalityData.image;
        resultImage.alt = `${personalityData.image} Image`;
    } else {
        // Handle case if result is not found
    }

    // Hide the quiz, show the result, and show the restart button
    document.getElementById('quiz').style.display = 'none';
    resultElement.style.display = 'block'; // Show the result
}




//Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    userAnswers = {};
    document.getElementById('result').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    displayQuestion(); // Start the quiz from the beginning
}

document.getElementById('restart-button').addEventListener('click', restartQuiz);

displayQuestion();
