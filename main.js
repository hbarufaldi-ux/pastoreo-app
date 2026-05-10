const map = L.map('map').setView([-32.41, -63.24], 13);

// Satélite de Google (Más estable para ver el campo real)
L.tileLayer('https://google.com{x}&y={y}&z={z}', {
    attribution: 'Google Maps'
}).addTo(map);

const grupoLotes = new L.FeatureGroup().addTo(map);

function cargarLote(archivo, color, nombreTipo) {
    fetch(archivo)
        .then(res => res.json())
        .then(data => {
            L.geoJSON(data, {
                style: { 
                    color: "white", 
                    weight: 1, 
                    fillColor: color, 
                    fillOpacity: 0.4 // Bajamos opacidad para ver el pasto abajo
                },
                onEachFeature: (feature, layer) => {
                    const nombre = (feature.properties && feature.properties.name) ? feature.properties.name : nombreTipo;
                    layer.bindPopup(`<b>Tipo: ${nombreTipo}</b><br>Lote: ${nombre}`);
                }
            }).addTo(grupoLotes);
            
            map.fitBounds(grupoLotes.getBounds());
        })
        .catch(err => console.error("Error cargando:", archivo));
}

// Carga de archivos
cargarLote('lotes_tambo.geojson', '#3498db', 'Tambo');
cargarLote('lotes_cria.geojson', '#e67e22', 'Cría');
cargarLote('lote_agricultura.geojson', '#f1c40f', 'Agricultura');
