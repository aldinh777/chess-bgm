const {
    border, close, fullheight, mainbox, navbar, pad5, padside, playlist, pointer
} = require('./styles');
const { l } = require('./fungus');
const { initiateBackgroundMusic } = require('./chessfun');

Promise.all([fetch('http://localhost:9696/matching'), fetch('http://localhost:9696/playing')])
.then(res => Promise.all(res.map(r => r.json())))
.then(res => {
    const [matchbgm, playbgm] = res;
    const listMatch = l('ul', [playlist], []);
    const listBgm = l('ul', [playlist], []);
    const musicMatch = document.createElement('div');
    const musicBgm = document.createElement('div');
            
    const propsmatching = {
        id: 'matchbgm',
        bgm: matchbgm,
        bgms: [],
        list: listMatch,
        music: musicMatch,
        bbm: matchbgm,
        path: 'matching',
    };
    const propsplaying = {
        id: 'playbgm',
        bgm: playbgm,
        bgms: [],
        list: listBgm,
        music: musicBgm,
        bbm: playbgm,
        path: 'playing',
    };
    
    const app = l('div', [mainbox, border, pad5], [
        l('div', [navbar], [
            l('span', [], ['Chess BGM']),
            l('span', [border, close, padside, pointer], ['X'], {
                click: function () {
                    app.style.display = 'none';
                }
            })
        ]),
        l('div', [border, pad5, fullheight, { overflow: 'scroll' }], [
            l('div', [], [
                l('span', [], ['Matching']),
                listMatch,
                musicMatch,
            ]),
            l('div', [], [
                l('span', [], ['Background']),
                listBgm,
                musicBgm,
            ])
        ])
    ]);

    document.body.appendChild(app);
    
    initiateBackgroundMusic(propsmatching, propsplaying);
});
