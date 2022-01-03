// https://github.com/maplibre/maplibre-gl-js/blob/ddf69421c6ae34c808afefec309a5beecdb7500e/src/index.ts#L151

window.osmTiles = (params, callback) => {
    const [z,x,y] = params.url.split('://')[1].split('/');
    const subdomains = 'abc';
    const prefix =  subdomains.split('')[(parseInt(x,10) + parseInt(y,10)) % subdomains.length];

    const newUrl = `https://${prefix}.tile.openstreetmap.org/${z}/${x}/${y}.png`;

   console.log(params, callback, z,x,y,subdomains, prefix);

    fetch(newUrl)
        .then(response => {
            if (response.status == 200) {
                console.log('params.type', params.type);
                const fnType = params.type === 'arrayBuffer' ? 'arrayBuffer' : 'blob';
                response[fnType]().then(data => {
                    callback(null, data, null, null);
                });
            } else {
                callback(new Error(`Tile fetch error: ${response.statusText}`));
            }
        })
        .catch(e => {
            callback(new Error(e));
        });
    return { cancel: () => { } };
};