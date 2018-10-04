$(document).ready(function () {
    /**
    * pulls information from the form and build the query URL
    * @returns {string} URL for API based on form inputs
    */
    function getQueryURL() {
        var queryURL = "https://developers.zomato.com/api/v2.1/search?q=bones";
        //"https://developers.zomato.com/api/v2.1/search";
        var queryParams = {"user-key": "fafaa7da981182588674fb22841c865f"};
        queryParams.q = $("#search-term").val().trim();
        console.log("URL :" + queryURL);
        console.log(queryURL + $.param(queryParams));
        return queryURL + queryParams.q; //+ queryParams.q + $.param(queryParams);
    }

    function updatePage(Data){
        var numResults = $("#results-count").val();
        console.log(Data)
        for(var i = 0; i < numResults; i++){
            var result = Data.response;
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
            method: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('user-key', 'fafaa7da981182588674fb22841c865f');
            }
        }).then(updatePage);
    });
    $("#clear-all").on("click", clear);
});