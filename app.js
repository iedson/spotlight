$(document).ready(function() {
  /* // API Call Don't make functional until within an onclick function, otherwise will make an API call every page refresh */
  let userLookup = "";
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

    // create a card for the show
    let cardWrapper = `<div id="cardWrapper${i}" class="df df-fdc">
      <img
      id="cardImage${i}"
        class="bp i-mz"
        src="${pictureUrl}"
      />
      <div id="contentWrapper${i}" class="bp m-s">
        <div id="title${i}">${showName}</div>
        <div>Watch On:</div>
        <div id="iconsWrapper${i}" class="df df-fdr ac-fs">
          <div class="c-r fas fa-minus-square m-s fz-l"></div>
          <div class="c-g fas fa-minus-square m-s fz-l"></div>
          <div class="c-b fas fa-minus-square m-s fz-l"></div>
        </div>
      </div>
    </div>`;
    // append the new card to the page
    $('#pageWrapper').append(cardWrapper);
  }

  // loops through each show result and displays appropriately
  function renderResults(showResultArray) {
    // for loop
    for (var i = 0; i < showResultArray.length; i++) {
      // renderWrapper, pass in i. (also pass in object in result array location i?)
      renderWrapper(i, showResultArray[i]);
    }
  }

  // makes the API call to Utelly! woo!
  function makeCall(userInput) {
    if (userInput === "") {
      return; // Don't search on empty
    }
    // assign user's search input to a variable
    userLookup = userInput;
    // clear the search box
    $('#searchBox').val("");
    clearResults();
    // update the API call's url with the user's search info
    settings.url = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${userLookup}&country=us`;
    // make the API call using the settings which now include the user's search
    $.ajax(settings).done(function(response) {
      console.log("response:");
      console.log(response);
      renderResults(createArrayFromCF(response));
    });
  }

  // returns an Object containing an array of results
  function createDummyAjaxObject() {
    var dummyAjax = {
    results:[
      {
        locations: [
          {
            display_name:"Netflix",
            name:"NetflixUS",
            url:"https://www.netflix.com/title/80113701",
            id:"58c141a37588d57a9522dd54",
            icon:"https://utellyassets7.imgix.net/locations_icons/utelly/black_new/NetflixUS.png?w=92&auto=compress&app_version=0f692b6a-217b-4753-a78b-4351ba443607_2019-10-24"
          },
          {
            display_name:"Amazon Prime",
            name:"AmazonUS",
            url:"http://www.amazon.com/gp/product/B0773R8MCP?tag=utellycom00-21",
            id:"58c141a37588d57a9722dd54",
            icon:"https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonUS.png?w=92&auto=compress&app_version=0f692b6a-217b-4753-a78b-4351ba443607_2019-10-24"
          }
        ],
        picture:"https://utellyassets2-9.imgix.net/2/Open/NBC_6/Program/27734620/_16by9/The_Good_Place_S4_KA2.jpg?fit=crop&auto=compress&crop=faces,top",
        id:"592a6051ebb7f91ca2569dd7",
        weight:768,
        name:"The Good Place"
      },
      {
        locations: [
          {
            display_name:"Notflix",
            name:"NotflixUS",
            url:"https://www.Notflix.com/title/80113701",
            id:"58c141a37588d57a9522dd54",
            icon:"https://utellyassets7.imgix.net/locations_icons/utelly/black_new/NotflixUS.png?w=92&auto=compress&app_version=0f692b6a-217b-4753-a78b-4351ba443607_2019-10-24"
          },
          {
            display_name:"Amazon Poop",
            name:"AmazonUS",
            url:"http://smile.amazon.com/gp/product/B0773R8MCP?tag=utellycom00-21",
            id:"58c141a37588d57a9722dd54",
            icon:"https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonUS.png?w=92&auto=compress&app_version=0f692b6a-217b-4753-a78b-4351ba443607_2019-10-24"
          }
        ],
        picture:"https://utellyassets2-9.imgix.net/2/Open/NBC_6/Program/27734620/_16by9/The_Good_Place_S4_KA2.jpg?fit=crop&auto=compress&crop=faces,top",
        id:"592a6051ebb7f91ca2569dd7",
        weight:768,
        name:"The Good Place"
      }
      
      ],
    updated:"2019-10-24T03:03:20+0100",
    term:"the good place",
    status_code:200,
    variant:"utelly"
    }
    return dummyAjax;
  }
  // returns an array containing objects representing show results
  function createArrayFromCF(ajaxResponse) {
    // print full object
    console.log("ajaxResponse:")
    console.log(ajaxResponse)
    var showResults = []; // each show, ie: The Office, The Office UK, The Office Adventures
    var temp1 = ajaxResponse.results;
    // For Each show result[]
    for (var i = 0; i < temp1.length; i++) {
      var showObject = {}; // individual show
      // save the show's picture
      showObject["picture"] = temp1[i].picture;
      // save the show's name
      showObject["showName"] = temp1[i].name;
      // for each location[] in this result
      var temp2 = temp1[i].locations;
      showObject["locationArray"] = [];
      for (var j = 0; j < temp2.length; j++) {
        var locationObject = {};
        // save the streaming site's name
        var siteName = temp2[j].display_name;
        locationObject["siteName"] = siteName;
        // save the url to watch the show on the streaming site
        var url = temp2[j].url;
        locationObject["url"] = url;
        // save the streaming site's icon
        var siteIcon = temp2[j].icon;
        locationObject["siteIcon"] = siteIcon;
        // tack the new location onto the show's location array
        showObject.locationArray[j] = locationObject;
      }
      // save the newly created full show object to our array of results
      showResults[i] = showObject;
    }

    // print individual items:
    console.log("full results array:")
    console.log(showResults)
    return showResults;
  }
  // remove old results
  function clearResults() {
    $('#pageWrapper').empty();
  }

  // auto generate dummy object
  // createArrayFromCF(createDummyAjaxObject());

  // Search Trigger
  $('#searchBox').keypress(function (e) {
    if (e.which == 13) {//Enter key pressed
      $('#searchSubmit').click();//Trigger search button click event
    }
  });

  // make a call when the user searches
  $("#searchSubmit").on("click", function () {
    // save user's search value
    let userSearch = $('#searchBox').val();
    makeCall(userSearch);
  });


});





