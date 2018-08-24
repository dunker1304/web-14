const questionInput = document.getElementById('questionInput');
const count = document.getElementById('count');

questionInput.addEventListener("input", function() {
  count.innerText = 200 - questionInput.value.length;
});