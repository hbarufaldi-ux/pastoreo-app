const map = L.map('map', {
    center: [-32.41, -63.24],
    zoom: 14,
    zoomSnap: 0.5
});

// CAPA BASE: Usamos una URL de alta disponibilidad
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const grupoLotes = new L.FeatureGroup().addTo(map);

// Función para cargar los GeoJSON
function cargarLote(archivo, color, nombreTipo) {
    fetch(archivo)
        .then(res => {
            if (!res.ok) throw new Error("Error cargando " + archivo);
            return res.json();
        })
        .then(data => {
            L.geoJSON(data, {
                // Filtramos para que NO dibuje puntos, solo polígonos
                filter: (f) => f.geometry.type.includes('Polygon'),
                style: { 
                    color: "white", 
                    weight: 1.5, 
                    fillColor: color, 
                    fillOpacity: 0.5 
                },
                onEachFeature: (feature, layer) => {
                    const nombre = (feature.properties && feature.properties.name) ? feature.properties.name : nombreTipo;
                    layer.bindPopup(`<b>Categoría:</b> ${nombreTipo}<br><b>Lote:</b> ${nombre}`);
                }
            }).addTo(grupoLotes);
            
            // Ajustar el zoom automáticamente
            if (grupoLotes.getLayers().length > 0) {
                map.fitBounds(grupoLotes.getBounds(), { padding: [20, 20] });
            }
        })
        .catch(err => console.warn(err.message));
}

// Carga de archivos (Asegúrate de que existan en tu GitHub con estos nombres exactos)
cargarLote('lotes_tambo.geojson', '#3498db', 'Tambo');
cargarLote('lotes_cria.geojson', '#e67e22', 'Cría');
cargarLote('lote_agricultura.geojson', '#f1c40f', 'Agricultura');

// AGREGAR LEYENDA AL MAPA
const legend = L.control({ position: 'bottomright' });
legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b>Referencia</b><br>';
    div.innerHTML += '<i style="background: #3498db"></i> Tambo<br>';
    div.innerHTML += '<i style="background: #e67e22"></i> Cría<br>';
    div.innerHTML += '<i style="background: #f1c40f"></i> Agricultura<br>';
    return div;
};
legend.addTo(map);

// Forzar re-renderizado
setTimeout(() => { map.invalidateSize(); }, 500);
