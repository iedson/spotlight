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

  /* Renders 1 card wrapper.  All fields are empty */
  function renderWrapper(i) {
    let cardWrapper = `<div id="cardWrapper${i}" class="df df-fdc">
      <img
      id="cardImage${i}"
        class="bp i-mz"
        src="https://utellyassets2-8.imgix.net/2/Open/TMDB4_2462/Misc/5u3Y2HpD0wlK697lnpvNn6h5lYK.jpg?fit=crop&auto=compress&crop=faces,top"
      />
      <div id="contentWrapper${i}" class="bp m-s">
        <div id="title${i}">Title</div>
        <div>Watch On:</div>
        <div id="iconsWrapper${i}" class="df df-fdr ac-fs">
          <div class="c-r fas fa-minus-square m-s fz-l"></div>
          <div class="c-g fas fa-minus-square m-s fz-l"></div>
          <div class="c-b fas fa-minus-square m-s fz-l"></div>
        </div>
      </div>
    </div>`;
    $('#pageWrapper').append(cardWrapper);
  }
});
