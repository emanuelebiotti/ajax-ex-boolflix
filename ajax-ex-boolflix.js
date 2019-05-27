$(document).ready(function(){

  var source = $("#schedafilm").html();
  var template = Handlebars.compile(source);

  var filmcercato = $('.cerca').text();


$('button').click(function(){
  console.log(filmcercato);



  var url_base = 'https://api.themoviedb.org/3';

  $.ajax({
    'url': 'https://api.themoviedb.org/3',
    'method': 'GET',
    'data': {
      'api_key': 'eec20b4c5f03950e27efaf1ac357366d',
      'query': '',
      'title': '',
      'language': '',
    },
    'success': function(data){

      var dettaglifilm = {
        'Titolo': '',
        'Titolo_originale': '' ,
        'Lingua': '',
        'Voto': ''
      }

      var html = template(dettaglifilm);

      $('.ricerca').append(html);


    },
    'error': function() {
      alert('errore');
    }
  })


});





});
