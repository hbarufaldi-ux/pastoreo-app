map.on('load', () => {
    // CAPA: TAMBO
    map.addSource('tambo-data', { 'type': 'geojson', 'data': './lotes de tambo.geojson' });
    map.addLayer({
        'id': 'lotes-tambo',
        'type': 'fill',
        'source': 'tambo-data',
        'paint': { 'fill-color': '#3498db', 'fill-opacity': 0.5 } // Azul
    });

    // CAPA: CRÍA
    map.addSource('cria-data', { 'type': 'geojson', 'data': './lotes de cría.geojson' });
    map.addLayer({
        'id': 'lotes-cria',
        'type': 'fill',
        'source': 'cria-data',
        'paint': { 'fill-color': '#e67e22', 'fill-opacity': 0.5 } // Naranja
    });

    // BORDES BLANCOS (Para que resalten los lotes)
    map.addLayer({
        'id': 'bordes',
        'type': 'line',
        'source': 'tambo-data', // Podés repetir para cada source
        'paint': { 'line-color': '#ffffff', 'line-width': 2 }
    });
});

