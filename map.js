'use strict';

$(function() {
    var map = L.map('map');
    map.setView([39.50, -98.35], 3);
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmljaGFyZGRpbmciLCJhIjoiY2l2N3M3NWY0MDAyNDJ0cGJsejdmOXN2cyJ9.RaIxdkH4qDQrGtfHDkcCWg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 100,
        id: 'richardding.223065kd',
        accessToken: 'pk.eyJ1IjoicmljaGFyZGRpbmciLCJhIjoiY2l4eTU2ZmR5MDA2ZDJ3cGlreHExem9tZyJ9.nJ3S8peDYh3U6q5T07UL9A'
    }).addTo(map);

    var url = "http://seeyaapi.azurewebsites.net/airports/asqx"
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        success: function(data) {
            console.log(data);
            if (data.AirportInfo != null && data.AirportInfo.Airports != null) {
                var airports = data.AirportInfo.Airports;
                for (var i = 0; i < airports.length; i++) {
                    var marker = L.marker([airports[i].Latitude, airports[i].Longitude]).addTo(map);
                }
            }
        },
        error: function(data) {
            console.log(data);
        }
    });

    createMarkers();
});

function createMarkers() {

}