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
        return queryURL + querySearch + "&user-key=" + user_key + "&count=20";
    }

    function updatePage(data) {
        console.log(data);
        var restaurant = data.restaurants;
        console.log(restaurant);
        for (var i = 0; i < restaurant.length; i++) {
            var restaurantInfo = restaurant[i].restaurant;
            var restoName = $('<a class="list-group-item list-group-item-action" id="list-restaurant' + i + '-list" data-toggle="tab" href="#list-restaurant' + i + '" role="tab" aria-controls="restaurant"> </a>').text(restaurantInfo.name);
            var restoContent = $('<div class="tab-pane fade show" id="list-restaurant' + i + '" role="tabpanel" aria-labelledby="list-restoContent-list"> </div>').text("Address: " + restaurantInfo.location.address);
            var restoWebsite = $('<div class="tab-pane fade show" id="list-restaurant' + i + '" role="tabpanel" aria-labelledby="list-restoContent-list"> </div>').text("Website: " + restaurantInfo.url);
            restoName.appendTo("#list-tab");
            restoContent.appendTo("#nav-tabContent");
            restoWebsite.appendTo(restoContent);
        }
        //activate Tab on click
        $('#list-tab a').on('click', function (e) {
            e.preventDefault();
            $(this).tab('show');
        });

    };

    function clear() {
        $("#list-tab").empty();
        $("#list-restoContent").empty();
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