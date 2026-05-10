const map = L.map('map').setView([-32.41, -63.24], 14);

// CAPA SATELITAL CORREGIDA (URL oficial y estable)
L.tileLayer('https://arcgisonline.com{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
}).addTo(map);

const grupoLotes = new L.FeatureGroup().addTo(map);

function cargarLote(archivo, color, nombreTipo) {
    fetch(archivo)
        .then(res => {
            if (!res.ok) throw new Error("Error en " + archivo);
            return res.json();
        })
        .then(data => {
            L.geoJSON(data, {
                // 1. ESTO ELIMINA LOS MARCADORES AZULES/PUNTOS
                filter: function(feature) {
                    return feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon";
                },
                // 2. ESTILO DE LOS LOTES
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
            
            // Ajustar el mapa para ver todos los lotes
            if (grupoLotes.getLayers().length > 0) {
                map.fitBounds(grupoLotes.getBounds());
            }
        })
        .catch(err => console.warn("Archivo omitido o con error:", err.message));
}

// Carga de tus archivos
cargarLote('lotes_tambo.geojson', '#3498db', 'Tambo');
cargarLote('lotes_cria.geojson', '#e67e22', 'Cría');
cargarLote('lote_agricultura.geojson', '#f1c40f', 'Agricultura');

// Refrescar tamaño al cargar
setTimeout(() => { map.invalidateSize(); }, 500);
