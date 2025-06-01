
var google;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    // 39.399872
    // -8.224454
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 7,

        // The latitude and longitude to center the map (always required)
        center: myLatlng,

        // How you would like to style the map. 
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);
    
    var addresses = ['Ростов-на-Дону, Таганрогская 123а', 'Ростов-на-Дону, Большая Садовая 45']; // пример нескольких адресов

for (var x = 0; x < addresses.length; x++) {
    (function(address) {
        ymaps.geocode(address).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            if (firstGeoObject) {
                var coords = firstGeoObject.geometry.getCoordinates();

                var placemark = new ymaps.Placemark(coords, {
                    balloonContentHeader: address,
                    balloonContentBody: '<strong>' + address + '</strong>'
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: 'images/loc.png', // путь к вашей иконке
                    iconImageSize: [30, 42],
                    iconImageOffset: [-15, -42]
                });

                map.geoObjects.add(placemark);
            } else {
                alert('Адрес не найден: ' + address);
            }
        });
    })(addresses[x]);
}
    
}
google.maps.event.addDomListener(window, 'load', init);