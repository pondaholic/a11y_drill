'use strict';

// Should I start questionNum at 0 instead? I could just have the display render questionNum + 1

const questionSet = [
  { 
    number: 1,
    text: `Which queen physically picked up her opponent during a lip sync, prompting RuPaul to quip that "Drag is not a contact sport?"`,
    ans1: `Victoria 'Porkchop' Parker`,
    ans2: `Phi Phi O'Hara`, 
    ans3: `Mimi Imfurst`, 
    ans4: `Vivacious`
  }, 

  {
    number: 2,
    text: `Violet Chachki was the winner of which season of RuPaul's Drag race?`,
    ans1: `Season 1`, 
    ans2: `Season 3`, 
    ans3: `Season 5`, 
    ans4: `Season 7`
  }, 

  {
    number: 3,
    text: `Which of these is one of Latrice Royale's catch phrases?`,
    ans1: `Backrolls?!`, 
    ans2: `Water off a duck's back`, 
    ans3: `Good luck, and don't f*ck it up`, 
    ans4: `Good God, get a grip girl`
  }, 
  {
    number: 4, 
    text: `Who among these queens was CLEARLY ROBBED of the crown?`,
    ans1: `Katya Zamolodchikova`, 
    ans2: `Serena Cha Cha`, 
    ans3: `Tempest DuJour`, 
    ans4: `Laila McQueen`
  }, 
  {
    number: 5,
    text: `Name RuPaul's Jersey-girl co-host:`,
    ans1: `Michelle Visage`, 
    ans2: `Jane Krakowski`, 
    ans3: `Queen Latifah`, 
    ans4: `Wendy Williams`
  }, 
  {
    number: 6,
    text: `Which judge was replaced after the first two seasons of the show?`,
    ans1: `Merle Ginsberg`, 
    ans2: `Santino Rice `, 
    ans3: `Ross Matthews`, 
    ans4: `Carson Kressley`
  }, 
  {
    number: 7,
    text: `Which queen famously said "Bitch, I am from Chi-ca-go!"`,
    ans1: `Shea Coule\u00e9`, 
    ans2: `Kim Chi`, 
    ans3: `Mystique Summers`, 
    ans4: `Alyssa Edwards`
  }, 
  {
    number: 8,
    text: `Who is feeling very attacked?!?!`,
    ans1: `Phi Phi O'Hara`, 
    ans2: `Laganja Estranja`, 
    ans3: `Alexis Michelle`, 
    ans4: `Jasmine Masters`
  }, 
  {
    number: 9,
    text: `Who refused to take off her mask during a lip sync?`,
    ans1: `Acid Betty`, 
    ans2: `Detox`, 
    ans3: `Adore Delano`, 
    ans4: `Valentina`
  }, 
  {
    number: 10,
    text: `Which of these has NOT been a product placement on the show?`,
    ans1: `Squatty Potty`, 
    ans2: `boobsforqueens.com`, 
    ans3: `Benefit Cosmetics`, 
    ans4: `Kryolan Cosmetics`
  }
];

const ANSWERS = [ 
  `Mimi Imfurst`, 
  `Season 7`, 
  `Good God, get a grip girl`, 
  `Katya Zamolodchikova`, 
  `Michelle Visage`, 
  `Merle Ginsberg`, 
  `Mystique Summers`, 
  `Laganja Estranja`, 
  `Valentina`, 
  `Benefit Cosmetics`
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>Correct!</h2>
    <img src="https://media.giphy.com/media/26tP3iVFa8RQsAXba/giphy.gif" alt="Jinx Monsoon laughing.">
    <button id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Nope! It was ${ANSWERS[questionNum - 1]}!</h2>
      <img src="https://media1.tenor.com/images/8bf0dad6643926d55d4cb4182510cd54/tenor.gif?itemid=5947779" alt="Sassy 'choices' Tatiana.">
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button">Play Again?</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();