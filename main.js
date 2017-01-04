$(function() {
    console.log("start");
    $("#results_loading").hide();

    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
});

function getFlights() {
    $("#results_loading").show();
    var from = $("#departure_airport").val();
    var to = $("#arrival_airport").val();
    var url = "http://seeyaapi.azurewebsites.net/schedule/" + from + "/" + to + "/2016-12-30"
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        success: function(data) {
            console.log(data);
            data.sort(function(a, b) {
                if (a.length != b.length) {
                    return a.length - b.length;
                } else {
                    var date1 = new Date(a[0].DepartureDate);
                    var date2 = new Date(b[0].DepartureDate);
                    return date1.getTime() - date2.getTime();
                }
            });
            displayData(data);
            $("#results_loading").hide();
        },
        error: function(data) {
            console.log(data);
            $("#results_loading").hide();
        }
    });
}

function displayData(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var flightScheduleDiv = $("<div></div>").attr("class", "col s12 card-panel hoverable").appendTo("#results");
        for (var j = 0; j < data[i].length; j++) {
            var flightSegmentDiv = $("<div></div>").attr("class", "col s12").appendTo(flightScheduleDiv);
            var departureAirport = $("<div></div>").attr("class", "col s3 firstrow").text(data[i][j].DepartureAirport).appendTo(flightSegmentDiv);
            var airplaneIcon = $("<i></i>").attr("class", "fa fa-plane firstrow").appendTo(flightSegmentDiv);
            var arrivalAirport = $("<div></div>").attr("class", "col s3").text(data[i][j].ArrivalAirport).appendTo(flightSegmentDiv);

            var departureDate = new Date(data[i][j].DepartureDate);
            var arrivalDate = new Date(data[i][j].ArrivalDate);
            var timeDiv = $("<div></div>").attr("class", "col s12").appendTo(flightScheduleDiv);
            var departureTime = $("<div></div>").attr("class", "col s3 firstrow").text(departureDate.toLocaleTimeString()).appendTo(timeDiv);
            var arrivalTime = $("<div></div>").attr("class", "col s3").text(arrivalDate.toLocaleTimeString()).appendTo(timeDiv);
        }

    }
}