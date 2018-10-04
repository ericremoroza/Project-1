$(document).ready(function () {
    /**
    * pulls information from the form and build the query URL
    * @returns {string} URL for ZOMATO API based on form inputs
    */
    function getQueryURL() {
        var queryURL = "https://developers.zomato.com/api/v2.1/search?q=";
        //"https://developers.zomato.com/api/v2.1/search";
        var querySearch = $("#search-term").val().trim();
        var user_key = "b62b830baae8f96987ca00269a09c856";
        console.log("URL :" + queryURL);
        console.log(queryURL + querySearch + "&user-key=" + user_key);
        return queryURL + querySearch + "&user-key=" + user_key;
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
            data: { "user-key": "b62b830baae8f96987ca00269a09c856" },
            dataType: "json",
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('user-key', 'b62b830baae8f96987ca00269a09c856');
            }
        }).then(data => updatePage(data));
    });
    $("#clear-all").on("click", clear);
});