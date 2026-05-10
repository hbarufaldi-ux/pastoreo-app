const map = L.map('map').setView([-32.41, -63.24], 13);

// Satélite Esri - URL robusta para evitar el fondo oscuro
L.tileLayer('https://arcgisonline.com{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, GeoEye'
}).addTo(map);

const grupoLotes = new L.FeatureGroup().addTo(map);

function cargarLote(archivo, color, nombreTipo) {
    fetch(archivo)
        .then(res => res.json())
        .then(data => {
            L.geoJSON(data, {
                // ESTO QUITA LOS MARCADORES AZULES
                pointToLayer: (feature, latlng) => { return null; },
                style: { 
                    color: "white", 
                    weight: 1, 
                    fillColor: color, 
                    fillOpacity: 0.4 
                },
                onEachFeature: (feature, layer) => {
                    const nombre = (feature.properties && feature.properties.name) ? feature.properties.name : nombreTipo;
                    layer.bindPopup(`<b>${nombreTipo}</b><br>Lote: ${nombre}`);
                }
            }).addTo(grupoLotes);
            
            if (grupoLotes.getLayers().length > 0) {
                map.fitBounds(grupoLotes.getBounds());
            }
        })
        .catch(err => console.error("Error cargando:", archivo));
}

cargarLote('lotes_tambo.geojson', '#3498db', 'Tambo');
cargarLote('lotes_cria.geojson', '#e67e22', 'Cría');
cargarLote('lote_agricultura.geojson', '#f1c40f', 'Agricultura');
