var id = getParameterByName('id');

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

(function() {
  var app = "https://script.google.com/macros/s/AKfycbyDsepL-3WRzkqR7ytjgPyIYMEhrofYyOUD4KpCYy15OvYIVAqbqq9MoUlIhLQKsFYp/exec?id=" + id,
      xhr = new XMLHttpRequest();
  xhr.open('GET', app);
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;

    if (xhr.status == 200) {
      try {
        var r = JSON.parse(xhr.responseText),
            value = r["result"][id][1];

            function rep(value) {
              const replacedValue = value.replace(/~\S+/g, '<span class="word" data-word="$&">____</span>');
              return replacedValue;
            }

        function repBig(value) {
          return value.replace(/\+\S+/g, function(match) {
            return "<b>" + match.slice(1) + "</b>";
          });
        }

        function repSmall(value) {
          return value.replace(/\*\S+/g, function(match) {
            return "<i>" + match.slice(1) + "</i>";
          });
        }

        function repLine(value) {
          return value.replace(/\^\S+/g, function(match) {
            return "<u>" + match.slice(1) + "</u>";
          });
        }

        function hideWords(value) {
          const repValue = rep(value);
          const newValue = repValue.replace(/<span class="word">(.*?)<\/span>/g, '____');
          document.getElementById('output').innerHTML = newValue;
          const words = document.querySelectorAll('.word');
          words.forEach(word => {
            word.addEventListener('click', showWord);
          });
        }
        
        
        function showWord() {
          const word = this.getAttribute("data-word").substring(1);
          this.innerHTML = word;
          this.removeEventListener('click', showWord);
        }
        
        value = repLine(value)
        value = repSmall(value)
        value = repBig(value)
        valuer = rep(value);

        document.getElementById('output').innerHTML = valuer;
        hideWords(value);

      } catch(e) {}
    }
  }
  xhr.send();
})();