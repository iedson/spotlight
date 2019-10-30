$(document).ready(function() {

    $('#searchWrapper').animate({'opacity': 1,'margin-top': '15rem'}, 500);

  $(window).on('scroll', function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 0) {
      $('#jumbotron')
        .stop()
        .animate({ height: '4rem' }, 10);
      $('#logoBig')
        .stop()
        .fadeOut(25);

      $('#jumbotron').html(
        `<img id="logoSmall" class="iz-s" src="./Assets/logo-icon.jpg" alt="Spotlight Icon">`
      );
      $('#logoSmall').fadeIn(25);
    } else {
      $('#jumbotron')
        .stop()
        .animate({ height: '18rem' }, 10);
      $('#logoSmall')
        .stop()
        .fadeOut(25);

      $('#jumbotron').html(
        `<img id="logoBig" class="iz-l" src="./Assets/updated-logo.jpg" alt="Spotlight Logo">`
      );
      $('#logoBig').fadeIn(25);
    }
  });
  /* // API Call Don't make functional until within an onclick function, otherwise will make an API call every page refresh */
  let userLookup = '';
  let toggleLookup = true; // true is US, off is UK?
  let DEBUG = true;
  DEBUG = confirm('Debug mode?');
  let settings = {
    async: true,
    crossDomain: true,
    url: `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${userLookup}&country=us`,
    method: 'GET',
    headers: {
      'x-rapidapi-host':
        'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
      'x-rapidapi-key': '71c3453161msh2745d751f269a45p112d9ajsnd73fb1b467b2'
    }
  };

  /* Renders 1 card wrapper.  All fields are empty */
  function renderWrapper(i, singleShowResult) {
    // var j = 0;

    // FOR YOUR VISUALIZATION ENJOYMENT:
    // singleShowResult = {
    // picture: "urlSrcString",
    // showName: "string",
    // locationArray: []
    // }
    // locationArray = [{}]
    // locationArray[0] = {
    // siteName: "string",
    // url: "url string to take you to the show on the streaming site",
    // siteIcon: "urlSrcString"
    // }

    let pictureUrl = singleShowResult.picture;
    let showName = singleShowResult.showName;
    // LOCATION ARRAY NOT HANDLED YET.
    // ^Append divs to iconWrapper for each streaming service (location)
    let locationArray = singleShowResult.locationArray;

    // create a card for the show
    let cardWrapper = `<div id="cardWrapper${i}" class="df df-fdc ai-c jc-c">
    <img id="cardImage${i}" class="br-t i-c"
      src="${pictureUrl}">
    <div id="contentWrapper${i}" class="bgc-g p-s w-75 br-b mb-s">
      <div class="ff-m fz-l" id="title${i}">${showName}</div>
      <div class="ff-m fs-i c-cg fz-m">Watch On:</div>
      <div id="iconsWrapper${i}" class="bgc-g df df-fdr ai-c ji-c ac-fs">`;
    // append the new card to the page
    $('#pageWrapper').append(cardWrapper);

    // create and append <a><img></a> for each available streaming site
    for (var k = 0; k < locationArray.length; k++) {
      var junkID = '';

      // welcome to the dumbest way
      if (i === 0) {
        junkID = 'iconsWrapper0';
      }
      if (i === 1) {
        junkID = 'iconsWrapper1';
      }
      if (i === 2) {
        junkID = 'iconsWrapper2';
      }
      if (i === 3) {
        junkID = 'iconsWrapper3';
      }
      if (i === 4) {
        junkID = 'iconsWrapper4';
      }
      if (i === 5) {
        junkID = 'iconsWrapper5';
      }
      if (i === 6) {
        junkID = 'iconsWrapper6';
      }
      if (i === 7) {
        junkID = 'iconsWrapper7';
      }
      var wrap = $('#' + junkID);
      wrap.append(createIconWrapper(k, locationArray[k]));
      $('#greetingWrapper').animate({'opacity': 0,'margin-top': '1rem'}, 500);
      $('#pageWrapper').animate({'opacity': 1,'margin-top': '0'}, 500);

    }
  }

  // loops through each show result and displays appropriately
  function renderResults(showResultArray) {
    // for loop
    for (var i = 0; i < showResultArray.length; i++) {
      renderWrapper(i, showResultArray[i]);
    }
  }

  // makes the API call to Utelly! woo!
  function makeCall(userInput, toggleValue) {
    if (userInput === '') {
      return; // Don't search on empty
    }
    // assign user's search input to a variable
    userLookup = userInput;
    if (toggleValue === true) {
      // alert("true");
      toggleLookup = "uk";
    }
    if (toggleValue === false) {
      // alert("false");
      toggleLookup = "us";
    }

    // clear the search box
    $('#searchBox').val('');
    clearResults();
    // update the API call's url with the user's search info
    settings.url = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${userLookup}&country=${toggleLookup}`;
    // make the API call using the settings which now include the user's search
    if (DEBUG === true) {
      // use fake API call object
      renderResults(createArrayFromCF(createDummyAjaxObject()));
    } else {
      $.ajax(settings).done(function(response) {
        console.log('response:');
        console.log(response);
        renderResults(createArrayFromCF(response));
      });
    }
  }

  // returns an Object containing an array of results
  function createDummyAjaxObject() {
    var dummyAjax = {
      results: [
        {
          locations: [
            {
              display_name: 'Netflix',
              name: 'NetflixUS',
              url: 'https://www.netflix.com/title/80113701',
              id: '58c141a37588d57a9522dd54',
              icon:
                'https://assets.pcmag.com/media/images/434952-netflix-logo.png?width=333&height=245'
            },
            {
              display_name: 'Amazon Prime',
              name: 'AmazonUS',
              url:
                'http://www.amazon.com/gp/product/B0773R8MCP?tag=utellycom00-21',
              id: '58c141a37588d57a9722dd54',
              icon:
                'https://images-na.ssl-images-amazon.com/images/G/01/rainier/available_at_amazon_1200x600_Nvz5h2M.png'
            }
          ],
          picture:
            'https://utellyassets2-9.imgix.net/2/Open/NBC_6/Program/27734620/_16by9/The_Good_Place_S4_KA2.jpg?fit=crop&auto=compress&crop=faces,top',
          id: '592a6051ebb7f91ca2569dd7',
          weight: 768,
          name: 'The Good Place'
        },
        {
          locations: [
            {
              display_name: 'Notflix',
              name: 'NotflixUS',
              url: 'https://www.netflix.com/title/80113701',
              id: '58c141a37588d57a9522dd54',
              icon:
                'https://assets.pcmag.com/media/images/434952-netflix-logo.png?width=333&height=245'
            },
            {
              display_name: 'Amazon Poop',
              name: 'AmazonUS',
              url:
                'http://www.amazon.com/gp/product/B0773R8MCP?tag=utellycom00-21',
              id: '58c141a37588d57a9722dd54',
              icon:
                'https://images-na.ssl-images-amazon.com/images/G/01/rainier/available_at_amazon_1200x600_Nvz5h2M.png'
            }
          ],
          picture:
            'https://utellyassets2-9.imgix.net/2/Open/NBC_6/Program/27734620/_16by9/The_Good_Place_S4_KA2.jpg?fit=crop&auto=compress&crop=faces,top',
          id: '592a6051ebb7f91ca2569dd7',
          weight: 768,
          name: 'The Good Place'
        }
      ],
      updated: '2019-10-24T03:03:20+0100',
      term: 'the good place',
      status_code: 200,
      variant: 'utelly'
    };
    return dummyAjax;
  }
  // returns an array containing objects representing show results
  function createArrayFromCF(ajaxResponse) {
    // print full object
    console.log('ajaxResponse:');
    console.log(ajaxResponse);
    var showResults = []; // each show, ie: The Office, The Office UK, The Office Adventures
    var temp1 = ajaxResponse.results;
    // For Each show result[]
    for (var i = 0; i < temp1.length; i++) {
      var showObject = {}; // individual show
      // save the show's picture
      if (temp1[i].picture === "" ||temp1[i].picture === null) {
        showObject['picture'] = "./Assets/imageUnavailable.jpg";
      }
      else {
        showObject['picture'] = temp1[i].picture;
      }
      // save the show's name
      showObject['showName'] = temp1[i].name;
      // for each location[] in this result
      var temp2 = temp1[i].locations;
      showObject['locationArray'] = [];
      for (var j = 0; j < temp2.length; j++) {
        var locationObject = {};
        // save the streaming site's name
        var siteName = temp2[j].display_name;
        locationObject['siteName'] = siteName;
        // save the url to watch the show on the streaming site
        var url = temp2[j].url;
        locationObject['url'] = url;
        // save the streaming site's icon
        var siteIcon = temp2[j].icon;
        locationObject['siteIcon'] = siteIcon;
        // tack the new location onto the show's location array
        showObject.locationArray[j] = locationObject;
      }
      // save the newly created full show object to our array of results
      showResults[i] = showObject;
    }

    // print individual items:
    console.log('full results array:');
    console.log(showResults);
    return showResults;
  }
  // remove old results
  function clearResults() {
    $('#pageWrapper').empty();
  }

  /* Creates one site Icon w/ link wrapper */
  function createIconWrapper(i, locationObject) {
    let tempIcon = locationObject.siteIcon;
    let tempName = locationObject.siteName;
    let tempURL = locationObject.url;
    let wrapper = `<a href="${tempURL}" class="iz-i m-s">
      <img src="${tempIcon}" alt="${tempName}" title="${tempName}" class="h-f w-f s">
    </a>`;
    return wrapper;
  }

  // Search Trigger
  $('#searchBox').keypress(function(e) {
    if (e.which == 13) {
      //Enter key pressed
      $('#searchSubmit').click(); //Trigger search button click event
    }
  });

  // make a call when the user searches
  $('#searchSubmit').on('click', function() {
    // save user's search value
    let userSearch = $('#searchBox').val();
    let toggleSetting = $('#toggle').val();
    // DEBUGGGGG toggle setting
    toggleSetting = true; // DEBUG
    makeCall(userSearch, toggleSetting);
  });
});
