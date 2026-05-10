// Inicializamos el mapa en una posición general
const map = L.map('map').setView([-32.41, -63.24], 14);

// Mapa base: OpenStreetMap (El más confiable)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const grupoLotes = new L.FeatureGroup().addTo(map);

// Función para cargar los lotes
function cargarLote(archivo, color, nombreTipo) {
    fetch(archivo)
        .then(res => {
            if (!res.ok) throw new Error("No encontrado");
            return res.json();
        })
        .then(data => {
            L.geoJSON(data, {
                filter: (f) => f.geometry.type.includes('Polygon'),
                style: { 
                    color: "white", 
                    weight: 1.5, 
                    fillColor: color, 
                    fillOpacity: 0.5 
                },
                onEachFeature: (feature, layer) => {
                    layer.bindPopup(`<b>${nombreTipo}</b>`);
                }
            }).addTo(grupoLotes);
            
            // Ajustar el mapa para que se vean todos los lotes
            if (grupoLotes.getLayers().length > 0) {
                map.fitBounds(grupoLotes.getBounds());
            }
        })
        .catch(err => console.log("Error cargando " + archivo));
}

// CARGA DE ARCHIVOS - Verifica que los nombres sean idénticos en GitHub
cargarLote('./lotes_tambo.geojson', '#3498db', 'Tambo');
cargarLote('./lotes_cria.geojson', '#e67e22', 'Cría');
cargarLote('./lote_agricultura.geojson', '#f1c40f', 'Agricultura');

// Agregar Leyenda
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
