var question_length = 2.941;
const button = document.getElementById('theButton');
button.addEventListener('click', function(e) {
  var next = parseInt(this.dataset.next);
  if (next == 36) {
    var result_div = document.getElementById('result');
    result_div.innerHTML = generateMarkdown();
    result_div.classList.remove('hidden');
    var prev = next - 1;
    document.getElementById('question_' + prev).classList.add('hidden');
    this.classList.add('hidden');
    document.querySelector("#reload_link").classList.remove('hidden');
    sofar_raw = window.sessionStorage.removeItem('proust_answers')
  } else {
    var prev = next - 1;
    var bar = document.getElementById('progress');
    if (next == 1) {
      bar.classList.remove('hidden');
      this.innerHTML = "Next question";
    } 

    if (next > 1) {
      var current_length = question_length * prev;
      bar.style.width = current_length + "%";
      document.getElementById('question_' + prev).classList.add('hidden');
    } 
    if (next == 35) {
      this.innerHTML = "Generate markdown";
    }
    var answer = document.getElementById('answer_' + prev);
    if (answer != null) {
      sofar_raw = window.sessionStorage.getItem('proust_answers')
      sofar = JSON.parse(sofar_raw);
      if (sofar == null) {
        var sofar = [answer.value];
        window.sessionStorage.setItem('proust_answers', JSON.stringify(sofar))
      } else {
        sofar.push(answer.value);
        window.sessionStorage.setItem('proust_answers', JSON.stringify(sofar))
      }
    }
    document.getElementById('question_' + next).classList.remove('hidden');
    this.dataset.next = next + 1;
  } 
});

function generateMarkdown() {
  sofar_raw = window.sessionStorage.getItem('proust_answers')
  sofar = JSON.parse(sofar_raw);
  var output = "## Proust questionaire<br /><br />";
  for (let i=0; i <= 34; i++) {
    var current = sofar[i];
    if (typeof current === "string" && current.length > 0) {
      var question_id = i + 1;
      output = output + "### " + all_questions[question_id] + "<br />";
      output = output + current + "<br /><br />";
    } 
  }
  return output;
}

