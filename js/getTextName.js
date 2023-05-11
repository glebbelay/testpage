(function () {
    var app = "https://script.google.com/macros/s/AKfycbyDsepL-3WRzkqR7ytjgPyIYMEhrofYyOUD4KpCYy15OvYIVAqbqq9MoUlIhLQKsFYp/exec",
        output = '',
        xhr = new XMLHttpRequest();
    xhr.open('GET', app);
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
  
      if (xhr.status == 200) {
        try {
          var r = JSON.parse(xhr.responseText),
              result = r["result"];
          for (var i = 0; i < result.length; i++){
            var obj = r["result"][i][0];
            output += '<a href="page.html?id=' + i + '"><div style="cursor:pointer">' + obj + '</div></a>';
            output += '<hr/>';
          }
        } catch(e) {}
      } 
  
      document.getElementById('info').innerHTML = output;
    }
    xhr.send();
  
    function loadDetails(id) {
      window.location.href = 'page.html?id=' + id;
    }
})();
