$(document).ready(function() {
  /* API Call Don't make functional until within an onclick function, otherwise will make an API call every page refresh */
  //   let settings = {
  //     async: true,
  //     crossDomain: true,
  //     url: `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${tempVariable}&country=us`,
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-host':
  //         'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
  //       'x-rapidapi-key': '71c3453161msh2745d751f269a45p112d9ajsnd73fb1b467b2'
  //     }
  //   };

  //   $.ajax(settings).done(function(response) {
  //     console.log(response);
  //   });
  // });
  /* Renders 1 card wrapper.  All fields are empty */
  function renderWrapper() {
    let i = 0;
    // create a new Card div
    let cardWrapper = $(`<div id="cardWrapper${i}" class="df df-fdc"></div>`);
    // assign the page wrapper ID to a variable
    let pageWrapper = $('#pageWrapper');
    let contentWrapper = $(`<div id="contentWrapper${i}" class="bp m-s">`);
    pageWrapper.append(cardWrapper);
    let cardWrapperID = $(`cardWrapper${i}`);
    cardWrapperID.append(
      `<img id="cardImage${i}" class="bp i-mz" src="https://utellyassets2-8.imgix.net/2/Open/TMDB4_2462/Misc/5u3Y2HpD0wlK697lnpvNn6h5lYK.jpg?fit=crop&auto=compress&crop=faces,top" />`
    );
    cardWrapperID.append(contentWrapper);
    let contentWrapperID = $(`contentWrapper${i}`);
    contentWrapperID.append(`<div id="title${i}"> Title </div>`);
    contentWrapperID.append('<div>Watch On:</div>');
    contentWrapperID.append(
      `<div id="iconsWrapper${i}" class="df df-fdr ac-fs"></div>`
    );
    // Let iconWrappersID =
    // append icon divs to iconWrapperID

    pageWrapper.append(cardWrapperID);
  }
  renderWrapper();
});
