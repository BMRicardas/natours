/* eslint-disable */

const mapBox = document.getElementById('map');

function displayMap(locations) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYm1yaWNoYXJkIiwiYSI6ImNtOHU2ankyNzBpaGEybHNldG1tNzdmNm8ifQ.RgRTkMKPGJPYlcDOI13c2g';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/bmrichard/cm8u72op800gk01s78r5ee5as',
    scrollZoom: false
    //   center: [25.211153, 54.730416],
    //   zoom: 8,
    //   interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(({ coordinates, day, description }) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //   Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(coordinates)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(coordinates);

    // Add popup
    new mapboxgl.Popup({ offset: 30, focusAfterOpen: false })
      .setLngLat(coordinates)
      .setHTML(`<p>Day: ${day}: ${description}</p>`)
      .addTo(map);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 75,
      right: 75
    }
  });
}

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
