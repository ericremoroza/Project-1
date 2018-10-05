$(document).ready(function () {
    /**
    * pulls information from the form and build the query URL
    * @returns {string} URL for ZOMATO API based on form inputs
    */
    function getQueryURL() {
        var queryURL = "https://developers.zomato.com/api/v2.1/search?q=";
        //"https://developers.zomato.com/api/v2.1/search";
        var querySearch = $("#search-term").val().trim();
        var user_key = "fafaa7da981182588674fb22841c865f";
        console.log("URL :" + queryURL);
        console.log(queryURL + querySearch + "&user-key=" + user_key);
        return queryURL + querySearch + "&user-key=" + user_key;

        //var yelpURL = "https://api.yelp.com/v3";
        //"https://api.yelp.com/v3";
       // var yelpSearch = $("#search-term").val().trim();
       // var yelp_key = "WfDBStvk-RznQpV5Auega8ENEV9OdW9RCqpz6zWvzc73RRoiSJq0FC_rJDE28YrIPkNZpOcHdfTUyvm3Ss9NM221DSRSbcXTtVoGYgl3zLL8kz6ZSgATL_7yXaK2W3Yx";
        //console.log("URL :" + yelpURL);
        //console.log(yelpURL + yelpSearch + "&yelp-key=" + yelp_key);
        //return yelpURL + yelpSearch + "&yelp-key=" + yelp_key;

    }


    function updatePage(data) {
        console.log(data);
        var restaurant = data.restaurants;
        console.log(restaurant);
        for (var i = 0; i < restaurant.length; i++) {
            var restaurantInfo = restaurant[i].restaurant;
            var restoName = $("<button class='list-group-item list-group-item-action active' id='list-restaurant-list' data-toggle='list' href='#list-restaurant' role='tab' aria-controls='restaurant'> </button>").text(restaurantInfo.name);
            var restoContent = $('<div class="tab-pane fade show active" id="list-restoContent" role="tabpanel" aria-labelledby="list-restoContent-list"> </div>').text(restaurantInfo.location);
            $(".searchResult").append(
                "<div class='col-4'> \
                    <div class='list-group' id='list-tab' role='tablist'> \
                    \
                    </div> \
                </div>");
            restoName.appendTo("#list-tab");
            $("#list-restaurant-list").click(function (e) {
                e.preventDefault();
                $(".searchResult").append(
                    "<div class='col-8'> \
                        <div class='tab-content' id='nav-tabContent'> \
                        \
                        </div> \
                    </div>");
                restoContent.appendTo("#list-restoContent");
            });
        }
        /*
        $(".searchResult").append("<div class='col-4'> \
        <div class='list-group' id='list-tab' role='tablist'> \
          <a class='list-group-item list-group-item-action active' id='list-restaurant-list' data-toggle='list' href='#list-restaurant' role='tab' aria-controls='restaurant'>restaurant</a> \
        </div> \
      </div>");
      */
        //$(".searchResult").append("<div class = 'col-4'>");
    };
    function clear() {
        $("#article-section").empty();
    }
    $("#searchButton").on("click", function () {
        event.preventDefault();
        clear();
        var queryURL = getQueryURL();
        $.ajax({
            type: "GET",
            url: queryURL,
            data: { "user-key": "fafaa7da981182588674fb22841c865f" },
            dataType: "json",
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('user-key', 'fafaa7da981182588674fb22841c865f');
            }
        }).then(data => updatePage(data));
    });
    $("#clear-all").on("click", clear);
});