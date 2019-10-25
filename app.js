$(document).ready(function () {




  $('#searchBox').keypress(function (e) {
    if (e.which == 13) {//Enter key pressed
      $('#searchSubmit').click();//Trigger search button click event
    }
  });

  //ajax call on click
  $("#searchSubmit").on("click", function () {



    /* // API Call Don't make functional until within an onclick function, otherwise will make an API call every page refresh */
    let userLookup = $('#searchBox').val();

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

    $.ajax(settings).done(function (response) {
      console.log(response);

      $('#searchBox').val('');
      $('#pageWrapper').html('');

      var list = response.results;
  
      

      for (i = 0; i < list.length; i++) {

        var showName = list[i].name;
        var showPic = list[i].picture;
        var showLocation = list[i].locations.display_name;


       console.log(showLocation)

        var newCard = $('<div>')


        newCard.html(`<div id="cardWrapper${i}" class="ai-c df df-fdc">
       <img
       id="cardImage${i}"
         class="w-75 h-a"
         src=${showPic}
       />
       <div id="contentWrapper${i}" class="m-s">
         <div id="title${i}">${showName}</div>
         <div>Watch On:</div>
         <div id="iconsWrapper${i}" class="df df-fdr ac-fs">
           <div class="">${showLocation}</div>
           <div class=""></div>
           <div class=""></div>
         </div>
       </div>
     </div>`)
        $('#pageWrapper').append(newCard);
      }


    });
  });
});







  // /* Renders 1 card wrapper.  All fields are empty */
  // function renderWrapper(i) {
  //   let cardWrapper = `<div id="cardWrapper${i}" class="df df-fdc">
  //     <img
  //     id="cardImage${i}"
  //       class="bp i-mz"
  //       src="https://utellyassets2-8.imgix.net/2/Open/TMDB4_2462/Misc/5u3Y2HpD0wlK697lnpvNn6h5lYK.jpg?fit=crop&auto=compress&crop=faces,top"
  //     />
  //     <div id="contentWrapper${i}" class="bp m-s">
  //       <div id="title${i}">Title</div>
  //       <div>Watch On:</div>
  //       <div id="iconsWrapper${i}" class="df df-fdr ac-fs">
  //         <div class="c-r fas fa-minus-square m-s fz-l"></div>
  //         <div class="c-g fas fa-minus-square m-s fz-l"></div>
  //         <div class="c-b fas fa-minus-square m-s fz-l"></div>
  //       </div>
  //     </div>
  //   </div>`;
  //   $('#pageWrapper').append(cardWrapper);
  // }

  // function makeCall() {
  //   $.ajax(settings).done(function(response) {
  //     console.log(response);
  //   });
  // }



  // returns an array containing objects representing show results


  // function createArrayFromCF(response) {
  //   // print full object
  //   console.log(ajaxResponse)
  //   var showResults = []; // each show, ie: The Office, The Office UK, The Office Adventures
  //   var temp1 = ajaxResponse.results;
  //   // For Each show result[]
  //   for (var i = 0; i < temp1.length; i++) {
  //     var showObject = {}; // individual show
  //     // save the show's picture
  //     showObject["picture"] = temp1[i].picture;
  //     // save the show's name
  //     showObject["showName"] = temp1[i].name;
  //     // for each location[] in this result
  //     var temp2 = temp1[i].locations;
  //     showObject["locationArray"] = [];

  //     for (var j = 0; j < temp2.length; j++) {
  //       var locationObject = {};
  //       // save the streaming site's name
  //       var siteName = temp2[j].display_name;
  //       locationObject["siteName"] = siteName;
  //       // save the url to watch the show on the streaming site
  //       var url = temp2[j].url;
  //       locationObject["url"] = url;
  //       // save the streaming site's icon
  //       var siteIcon = temp2[j].icon;
  //       locationObject["siteIcon"] = siteIcon;
  //       // tack the new location onto the show's location array
  //       showObject.locationArray[j] = locationObject;
  //     }
  //     // save the newly created full show object to our array of results
  //     showResults[i] = showObject;
  //   }

  //   // print individual items:
  //   console.log("full results array:")
  //   console.log(showResults)
  //   return showResults;
  // }
  // //createArrayFromCF(createDummyAjaxObject());








  // returns an Object containing an array of results
  // function createDummyAjaxObject() {
  //   var dummyAjax = {
  //   results:[
  //     {
  //       locations: [
  //         {
  //           display_name:"Netflix",
  //           name:"NetflixUS",
  //           url:"https://www.netflix.com/title/80113701",
  //           id:"58c141a37588d57a9522dd54",
  //           icon:"https://utellyassets7.imgix.net/locations_icons/utelly/black_new/NetflixUS.png?w=92&auto=compress&app_version=0f692b6a-217b-4753-a78b-4351ba443607_2019-10-24"
  //         },
  //         {
  //           display_name:"Amazon Prime",
  //           name:"AmazonUS",
  //           url:"http://www.amazon.com/gp/product/B0773R8MCP?tag=utellycom00-21",
  //           id:"58c141a37588d57a9722dd54",
  //           icon:"https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonUS.png?w=92&auto=compress&app_version=0f692b6a-217b-4753-a78b-4351ba443607_2019-10-24"
  //         }
  //       ],
  //       picture:"https://utellyassets2-9.imgix.net/2/Open/NBC_6/Program/27734620/_16by9/The_Good_Place_S4_KA2.jpg?fit=crop&auto=compress&crop=faces,top",
  //       id:"592a6051ebb7f91ca2569dd7",
  //       weight:768,
  //       name:"The Good Place"
  //     },
  //     {
  //       locations: [
  //         {
  //           display_name:"Notflix",
  //           name:"NotflixUS",
  //           url:"https://www.Notflix.com/title/80113701",
  //           id:"58c141a37588d57a9522dd54",
  //           icon:"https://utellyassets7.imgix.net/locations_icons/utelly/black_new/NotflixUS.png?w=92&auto=compress&app_version=0f692b6a-217b-4753-a78b-4351ba443607_2019-10-24"
  //         },
  //         {
  //           display_name:"Amazon Poop",
  //           name:"AmazonUS",
  //           url:"http://smile.amazon.com/gp/product/B0773R8MCP?tag=utellycom00-21",
  //           id:"58c141a37588d57a9722dd54",
  //           icon:"https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonUS.png?w=92&auto=compress&app_version=0f692b6a-217b-4753-a78b-4351ba443607_2019-10-24"
  //         }
  //       ],
  //       picture:"https://utellyassets2-9.imgix.net/2/Open/NBC_6/Program/27734620/_16by9/The_Good_Place_S4_KA2.jpg?fit=crop&auto=compress&crop=faces,top",
  //       id:"592a6051ebb7f91ca2569dd7",
  //       weight:768,
  //       name:"The Good Place"
  //     }

  //     ],
  //   updated:"2019-10-24T03:03:20+0100",
  //   term:"the good place",
  //   status_code:200,
  //   variant:"utelly"
  //   }
  //   return dummyAjax;
  // }