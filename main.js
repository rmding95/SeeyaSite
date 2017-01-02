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
            console.log(data)
        },
        error: function(data) {
            console.log(data);
        }
    });
}