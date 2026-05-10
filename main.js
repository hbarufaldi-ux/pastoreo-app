const map = L.map('map').setView([-32.41, -63.24], 14);

// SATÉLITE DE GOOGLE (Esta URL es la más compatible de todas)
L.tileLayer('https://google.cn{x}&y={y}&z={z}', {
    attribution: 'Google Satellite'
}).addTo(map);


const grupoLotes = new L.FeatureGroup().addTo(map);

function cargarLote(archivo, color, nombreTipo) {
    fetch(archivo)
        .then(res => {
            if (!res.ok) throw new Error("Error al leer: " + archivo);
            return res.json();
        })
        .then(data => {
            L.geoJSON(data, {
                // Elimina puntos/marcadores azules
                filter: (f) => f.geometry.type.includes('Polygon'),
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
        .catch(err => console.warn(err.message));
}

// Carga de archivos
cargarLote('lotes_tambo.geojson', '#3498db', 'Tambo');
cargarLote('lotes_cria.geojson', '#e67e22', 'Cría');
cargarLote('lote_agricultura.geojson', '#f1c40f', 'Agricultura');
