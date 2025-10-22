const API_URL = 'https://jsonplaceholder.typicode.com/comments'; 
const form = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

// Load some existing fake feedbacks
async function loadFeedbacks() {
  const res = await fetch(API_URL);
  const data = await res.json();

  // Take first 6 for demo
  data.slice(0, 6).forEach(fb => addFeedbackCard(fb.name, fb.body));
}

// Add new feedback
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, body: message })
  });

  const data = await res.json();
  addFeedbackCard(data.name, data.body);
  form.reset();
});

// Function to show feedback card
function addFeedbackCard(name, message) {
  const div = document.createElement('div');
  div.classList.add('feedback-card');
  div.innerHTML = `
    <h3>${name}</h3>
    <p>${message}</p>
  `;
  feedbackList.prepend(div);
}

// Load existing ones on page load
loadFeedbacks();
