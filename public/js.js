document.addEventListener("DOMContentLoaded", function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9sdHl0aGVkb2dlIiwiYSI6ImNtN3piNmtmdjBneXYybHNmaGphYzNteWgifQ.ubDGAtrIrH17C7SpodMzsw';

    var map = new mapboxgl.Map({
        container: 'map', // Ensure this ID exists in your HTML
        style: 'mapbox://styles/mapbox/satellite-streets-v12', // 3D Satellite
        center: [-5.6154, 43.55102], // GijÃ³n, Spain
        zoom: 17,
        pitch: 60, // 3D tilt
        bearing: 0, // Start at 0 degrees
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

    // Set up variables for rotation
    let bearing = 0;
    let rotationSpeed = 1; // Degrees per frame
    let isDecelerating = false;
    let startTime = Date.now();
    let decelerationDuration = 3000; // 3 seconds to slow down
    
    // Animation function
    function animateMap() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        
        // Start deceleration after 5 seconds
        if (elapsedTime > 5000 && !isDecelerating) {
            isDecelerating = true;
            startTime = currentTime; // Reset timer for deceleration phase
        }
        
        // Calculate speed during deceleration
        if (isDecelerating) {
            const decelerationProgress = Math.min((currentTime - startTime) / decelerationDuration, 1);
            rotationSpeed = 1 * (1 - decelerationProgress); // Gradually reduce from 1 to 0
            
            // Stop the animation when rotation speed is very small
            if (rotationSpeed < 0.01) {
                return false; // Return false to stop the animation loop
            }
        }
        
        // Update bearing and apply to map
        bearing = (bearing + rotationSpeed) % 360;
        map.easeTo({
            bearing: bearing,
            duration: 0 // Immediate update for smoother animation
        });
        
        return true; // Continue animation
    }
    
    // Use requestAnimationFrame for smoother animation
    function animationLoop() {
        if (animateMap()) {
            requestAnimationFrame(animationLoop);
        }
    }
    
    // Start the animation once the map is loaded
    map.on('load', function() {
        requestAnimationFrame(animationLoop);
    });
});

//MUSICA

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('backgroundMusic');
    const muteButton = document.getElementById('muteBtn');
    
    try {
        // Intentar reproducir automáticamente
        music.play();
    } catch (error) {
        console.log('La reproducción automática falló: ' + error);
    }

    // Controlador del botón de silencio
    muteButton.addEventListener('click', function() {
        music.muted = !music.muted;
        muteButton.textContent = music.muted ? 'Desilenciar' : 'Silenciar';
    });
});