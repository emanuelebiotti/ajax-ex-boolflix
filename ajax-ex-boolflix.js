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
        // console.log(res);

        var dettaglifilm = {
          'Titolo': '',
          'Titolo_originale': '' ,
          'Lingua': '',
          'Voto': ''
        }

        for (var i = 0; i < res.results.length; i++) {
          // console.log(res.results[i]);

          var stellina = '<i class="fas fa-star"></i>';

          if ($('.cerca').val().length > 0 && res.results[i].title.toLowerCase().includes($('.cerca').val().toLowerCase())) {
            dettaglifilm.Titolo = res.results[i].title;
            dettaglifilm.Titolo_originale = res.results[i].original_title;
            dettaglifilm.Lingua = res.results[i].original_language;
            // trasformo il voto numerico da 1 a 10 in un voto in stelline da 1 a 5
            dettaglifilm.Voto = stellina.repeat(Math.ceil((Math.ceil(res.results[i].vote_average))/2));
            dettaglifilm.Locandina = 'https://image.tmdb.org/t/p/w92' + res.results[i].poster_path;

            if (res.results[i].original_language == "en") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/20px-Flag_of_the_United_Kingdom.svg.png" alt="">';
            }
            else if (res.results[i].original_language == "fr") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/20px-Flag_of_France.svg.png" alt="">';
            }
            else if (res.results[i].original_language == "de") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/20px-Flag_of_Germany.svg.png" alt="">';
            }
            else if (res.results[i].original_language == "it") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/20px-Flag_of_Italy.svg.png" alt="">';
            }
            else if (res.results[i].original_language == "ja") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/20px-Flag_of_Japan.svg.png" alt="">';
            }
            else if (res.results[i].original_language == "ru") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/20px-Flag_of_Russia.svg.png" alt="">';
            }
            else if (res.results[i].original_language == "zh") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/20px-Flag_of_the_People%27s_Republic_of_China.svg.png" alt="">';
            }
            else if (res.results[i].original_language == "es") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/20px-Flag_of_Spain.svg.png" alt="">';
            }
            else if (res.results[i].original_language == "ko") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/20px-Flag_of_South_Korea.svg.png" alt="">';
            }

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
        console.log(restv.results);
        // console.log(restv);

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
          console.log(restv.results);

          var stellina = '<i class="fas fa-star"></i>';

          if ($('.cerca').val().length > 0 && restv.results[i].name.toLowerCase().includes($('.cerca').val().toLowerCase())) {
            dettaglifilm.Titolo = restv.results[i].name;
            dettaglifilm.Titolo_originale = restv.results[i].original_name;
            dettaglifilm.Lingua = restv.results[i].original_language;
            // trasformo il voto numerico da 1 a 10 in un voto in stelline da 1 a 5
            dettaglifilm.Voto = stellina.repeat(Math.ceil((Math.ceil(restv.results[i].vote_average))/2));
            dettaglifilm.Locandina = 'https://image.tmdb.org/t/p/w92' + restv.results[i].poster_path;

            if (restv.results[i].original_language == "en") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/20px-Flag_of_the_United_Kingdom.svg.png" alt="">';
            }
            else if (restv.results[i].original_language == "fr") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/20px-Flag_of_France.svg.png" alt="">';
            }
            else if (restv.results[i].original_language == "de") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/20px-Flag_of_Germany.svg.png" alt="">';
            }
            else if (restv.results[i].original_language == "it") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/20px-Flag_of_Italy.svg.png" alt="">';
            }
            else if (restv.results[i].original_language == "ja") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/20px-Flag_of_Japan.svg.png" alt="">';
            }
            else if (restv.results[i].original_language == "ru") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/20px-Flag_of_Russia.svg.png" alt="">';
            }
            else if (restv.results[i].original_language == "zh") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/20px-Flag_of_the_People%27s_Republic_of_China.svg.png" alt="">';
            }
            else if (restv.results[i].original_language == "es") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/20px-Flag_of_Spain.svg.png" alt="">';
            }
            else if (restv.results[i].original_language == "ko") {
              dettaglifilm.Lingua = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/20px-Flag_of_South_Korea.svg.png" alt="">';
            }

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
