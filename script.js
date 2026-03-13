const quizAnswers  = { q1: 'sports', q2: 'summer', q3: 'night' };
const quizSelected = {};

function pick(btn, qid) {
  document.querySelectorAll('#' + qid + ' .opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  quizSelected[qid] = btn.dataset.val;
}

function checkQuiz() {
  let score = 0;
  const total = Object.keys(quizAnswers).length;

  Object.keys(quizAnswers).forEach(qid => {
    document.querySelectorAll('#' + qid + ' .opt').forEach(b => {
      b.disabled = true;
      b.classList.remove('correct', 'wrong');
      if (b.dataset.val === quizAnswers[qid])       b.classList.add('correct');
      else if (b.classList.contains('selected'))    b.classList.add('wrong');
    });
    if (quizSelected[qid] === quizAnswers[qid]) score++;
  });

  const msgs = [
    { title: "Stranger alert 👀",   body: "You don't know Youssef yet! Check the green answers to learn more about him." },
    { title: "Getting there 🌙",    body: "One right! You know a little about Youssef. Check the green ones to learn the rest." },
    { title: "Pretty close ⭐",     body: "Two out of three! You know Youssef well — just missed one sneaky one." },
    { title: "You know Youssef! 🎯",body: "Perfect score! You really know him well." }
  ];

  document.getElementById('result-score').textContent = score + '/' + total;
  document.getElementById('result-title').textContent = msgs[score].title;
  document.getElementById('result-body').textContent  = msgs[score].body;

  const card = document.getElementById('result');
  card.style.display = 'block';
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function retryQuiz() {
  Object.keys(quizAnswers).forEach(qid => {
    document.querySelectorAll('#' + qid + ' .opt').forEach(b => {
      b.disabled = false;
      b.classList.remove('selected', 'correct', 'wrong');
    });
    delete quizSelected[qid];
  });
  document.getElementById('result').style.display = 'none';
}