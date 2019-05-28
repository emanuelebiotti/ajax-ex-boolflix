$(document).ready(function(){

  var source = $("#schedafilm").html();
  var template = Handlebars.compile(source);

  // chiamo la funzione cercatore al click sul pulsante
  $('button').click(function(){
    cercatore();
  });

  // per comodità chiamo la stessa funzione anche quando si preme invio nell'input
  $('input').keypress(function(event){
    if(event.which == 13) {
      cercatore();
    };
  });

  // creo la funzione cercatore, che imposta la chiamata ajax e detta le condizioni per estrapolare dati
  function cercatore() {
    // a ogni nuova ricerca voglio che il contenitore si svuoti dei risultati della ricerca precendente
    $('.filmcontainer').empty();

    // imposto chiamata ajax che interroga database. Mi identifico con la mia api_key e richiedo
    // di cercare ciò che l'utente ha inserito nell'input
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

          var stellina = '<i class="fas fa-star"></i>';

          if ($('.cerca').val().length > 0 && res.results[i].title.toLowerCase().includes($('.cerca').val().toLowerCase())) {
            dettaglifilm.Titolo = res.results[i].title;
            dettaglifilm.Titolo_originale = res.results[i].original_title;
            dettaglifilm.Lingua = res.results[i].original_language;
            // trasformo il voto numerico da 1 a 10 in un voto in stelline da 1 a 5
            dettaglifilm.Voto = stellina.repeat(Math.ceil((Math.ceil(res.results[i].vote_average))/2));
            dettaglifilm.Locandina = 'https://image.tmdb.org/t/p/w92' + res.results[i].poster_path;

            var html = template(dettaglifilm);

            $('.filmcontainer').append(html);

          };
        };

      },
      'error': function() {
        alert('errore');
      }
    })

    $.ajax({
      'url': 'https://api.themoviedb.org/3/search/tv',
      'method': 'GET',
      'data': {
        'api_key': 'eec20b4c5f03950e27efaf1ac357366d',
        'query': $('.cerca').val(),
        'language':'it-IT'
      },
      'success': function(restv){
        // console.log(res);
        // console.log(res.results);
        console.log(restv);
        //
        var dettaglifilm = {
          'Locandina': '',
          'Titolo': '',
          'Titolo_originale': '' ,
          'Lingua': '',
          'Voto': ''
        }

        for (var i = 0; i < restv.results.length; i++) {
          // console.log(res.results[i].title);
          // console.log($('.cerca').val());

          var stellina = '<i class="fas fa-star"></i>';

          if ($('.cerca').val().length > 0 && restv.results[i].name.toLowerCase().includes($('.cerca').val().toLowerCase())) {
            dettaglifilm.Titolo = restv.results[i].name;
            dettaglifilm.Titolo_originale = restv.results[i].original_title;
            dettaglifilm.Lingua = restv.results[i].original_language;
            // trasformo il voto numerico da 1 a 10 in un voto in stelline da 1 a 5
            dettaglifilm.Voto = stellina.repeat(Math.ceil((Math.ceil(restv.results[i].vote_average))/2));
            dettaglifilm.Locandina = 'https://image.tmdb.org/t/p/w92' + restv.results[i].poster_path;

            var html = template(dettaglifilm);

            $('.filmcontainer').append(html);

          };
        };

      },
      'error': function() {
        alert('errore');
      }
    })
  }


});
