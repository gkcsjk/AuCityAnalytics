(function(window, google, mapster) {
  mapster.MAP_OPTIONS = {
    center: {
      lat: -37.96,
      lng: 145
    },
    zoom: 9,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.DEFAULT
    },
  };
}(window, google, window.Mapster || (window.Mapster = {})))