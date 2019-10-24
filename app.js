$(document).ready(function() {
  /* API Call Don't make functional until within an onclick function, otherwise will make an API call every page refresh */
  let settings = {
    async: true,
    crossDomain: true,
    url: `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${tempVariable}&country=us`,
    method: 'GET',
    headers: {
      'x-rapidapi-host':
        'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
      'x-rapidapi-key': '71c3453161msh2745d751f269a45p112d9ajsnd73fb1b467b2'
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
  });
});
