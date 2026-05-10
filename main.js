const map = L.map('map').setView([-32.41, -63.24], 13);

// CAPA SATELITAL (Asegúrate de que esta URL sea la correcta para que no se vea blanco)
L.tileLayer('https://arcgisonline.com{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
}).addTo(map);

const grupoLotes = new L.FeatureGroup().addTo(map);

function cargarLote(archivo, color, nombreTipo) {
    fetch(archivo)
        .then(res => res.json())
        .then(data => {
            L.geoJSON(data, {
                // Esto quita los marcadores azules y deja solo el polígono
                pointToLayer: (feature, latlng) => { return null; }, 
                style: { 
                    color: "white", 
                    weight: 2, 
                    fillColor: color, 
                    fillOpacity: 0.6 
                },
                onEachFeature: (feature, layer) => {
                    const nombre = (feature.properties && feature.properties.name) ? feature.properties.name : nombreTipo;
                    layer.bindPopup(`<b>${nombre}</b>`);
                }
            }).addTo(grupoLotes);
            map.fitBounds(grupoLotes.getBounds());
        })
        .catch(err => console.error("Error:", err));
}

cargarLote('lotes_tambo.geojson', '#3498db', 'Tambo');
cargarLote('lotes_cria.geojson', '#e67e22', 'Cría');
cargarLote('lote_agricultura.geojson', '#f1c40f', 'Agricultura');
