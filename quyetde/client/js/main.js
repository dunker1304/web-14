$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:6969/question',
    method: 'GET',
    success: function(data) {
      $('#questionContent').text(data.question.questionContent);
    },
    error: function() {
      console.log("fail!");
    }
  });
});