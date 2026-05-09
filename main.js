map.on('load', () => {
    // 1. CARGAMOS LOS LOTES DE TAMBO (Color Azul)
    map.addSource('tambo', { 'type': 'geojson', 'data': './lotes_tambo.geojson' });
    map.addLayer({
        'id': 'capa-tambo',
        'type': 'fill',
        'source': 'tambo',
        'paint': { 'fill-color': '#3498db', 'fill-opacity': 0.5 }
    });

    // 2. CARGAMOS LOS LOTES DE CRÍA (Color Naranja)
    map.addSource('cria', { 'type': 'geojson', 'data': './lotes_cria.geojson' });
    map.addLayer({
        'id': 'capa-cria',
        'type': 'fill',
        'source': 'cria',
        'paint': { 'fill-color': '#e67e22', 'fill-opacity': 0.5 }
    });

    // 3. CARGAMOS AGRICULTURA (Color Amarillo)
    map.addSource('agricultura', { 'type': 'geojson', 'data': './lote_agricultura.geojson' });
    map.addLayer({
        'id': 'capa-agricultura',
        'type': 'fill',
        'source': 'agricultura',
        'paint': { 'fill-color': '#f1c40f', 'fill-opacity': 0.4 }
    });

    // BORDES BLANCOS PARA TODOS
    map.addLayer({
        'id': 'bordes',
        'type': 'line',
        'source': 'tambo', // Usamos uno como referencia para el estilo de línea
        'paint': { 'line-color': '#ffffff', 'line-width': 2 }
    });
});
