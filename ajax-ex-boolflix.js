$(document).ready(function(){

  var source = $("#schedafilm").html();
  var template = Handlebars.compile(source);

  $('button').click(function(){

    $('.filmcontainer').empty();

    $.ajax({
      'url': 'https://api.themoviedb.org/3/search/movie',
      'method': 'GET',
      'data': {
        'api_key': 'eec20b4c5f03950e27efaf1ac357366d',
        'query': $('.cerca').val(),
        'language':'it-IT'
      },
      'success': function(res){
        // console.log(res);
        // console.log(res.results);

        var dettaglifilm = {
          'Titolo': '',
          'Titolo_originale': '' ,
          'Lingua': '',
          'Voto': ''
        }

        for (var i = 0; i < res.results.length; i++) {
          // console.log(res.results[i].title);
          // console.log($('.cerca').val());

          if (res.results[i].title.toLowerCase().includes($('.cerca').val())) {
            dettaglifilm.Titolo = res.results[i].title;
            dettaglifilm.Titolo_originale = res.results[i].original_title;
            dettaglifilm.Lingua = res.results[i].original_language;
            dettaglifilm.Voto = res.results[i].vote_average;

            var html = template(dettaglifilm);

            $('.filmcontainer').append(html);
          }
        };
      },
      'error': function() {
        alert('errore');
      }
    })
  });



});
