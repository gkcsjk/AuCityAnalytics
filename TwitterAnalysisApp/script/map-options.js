(function(window, google, mapster) {
  mapster.MAP_OPTIONS = {
    center: {
      lat: -27.5480766,
      lng: 135.4477678
    },
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.DEFAULT
    },
  };
}(window, google, window.Mapster || (window.Mapster = {})))