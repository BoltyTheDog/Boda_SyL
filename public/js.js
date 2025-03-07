document.addEventListener("DOMContentLoaded", function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9sdHl0aGVkb2dlIiwiYSI6ImNtN3piNmtmdjBneXYybHNmaGphYzNteWgifQ.ubDGAtrIrH17C7SpodMzsw';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v12', 
        center: [-5.6154, 43.55102], // Gijón, Spain
        zoom: 15,
        pitch: 60, 
        bearing: 0, 
        antialias: true
    });

    // Add a marker
    var marker = new mapboxgl.Marker()
        .setLngLat([-5.6154, 43.55102])
        .addTo(map);

    // Make the marker clickable and open Google Maps directly
    marker.getElement().addEventListener('click', function () {
        window.open('https://www.google.com/maps?q=43.55102,-5.6154', '_blank');
    });

    // Animate rotation
    let bearing = 0;
    setInterval(() => {
        bearing = (bearing + 0.5) % 360; 
        map.easeTo({
            bearing: bearing,
            duration: 100  
        });
    }, 50); 
});
