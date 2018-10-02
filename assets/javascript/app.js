$(document).ready(function () {
    /**
    * pulls information from the form and build the query URL
    * @returns {string} URL for NYT API based on form inputs
    */
    function getQueryURL() {
        var queryURL = "https://developers.zomato.com/api/v2.1/search";
        var queryParams = {"user-key": "b62b830baae8f96987ca00269a09c856"};
        queryParams.q = $("#search-term").val().trim();
        console.log("URL :" + queryURL);
        console.log(queryURL + $.param(queryParams));
        return queryURL + queryParams.p + $.param(queryParams);
    }

    function updatePage(Data){
        var numResults = $("#results-count").val();
        console.log(Data)
        for(var i = 0; i < numResults; i++){
            var result = Data.response.docs[i];
            var resultCount = i + 1;
            var resultList = $("<ul>");
            resultList.addClass("list-group");
            $("#article-section").append(resultList);
        }
    };

    function clear(){
        $("#article-section").empty();
    }

    $("#searchButton").on("click", function(){
        event.preventDefault();
        clear();
        var queryURL = getQueryURL();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePage);
    });
    $("#clear-all").on("click", clear);
});