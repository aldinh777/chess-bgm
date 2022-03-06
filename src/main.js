const {
    border, center, close, fullheight, mainbox, navbar, pad5, padside, playlist, pointer
} = require('./styles');
const { l, muse, addMuseh } = require('./fungus');
const { initiateBackgroundMusic } = require('./chessfun');

const localmatchbgm = localStorage.getItem('matchbgm') || '[]';
const localplaybgm = localStorage.getItem('playbgm') || '[]';
const matchbgm = JSON.parse(localmatchbgm);
const playbgm = JSON.parse(localplaybgm);
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

const inputMatch = muse(addMuseh(propsmatching));
const inputBgm = muse(addMuseh(propsplaying));
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
            l('div', [center], [
                inputMatch,
                l('span', [border, padside, pointer], ['+'], {
                    click: function () {
                        inputMatch.click();
                    }
                })
            ]),
        ]),
        l('div', [], [
            l('span', [], ['Background']),
            listBgm,
            musicBgm,
            l('div', [center], [
                inputBgm,
                l('span', [border, padside, pointer], ['+'], {
                    click: function () {
                        inputBgm.click();
                    }
                })
            ])
        ])
    ])
]);

document.body.appendChild(app);

initiateBackgroundMusic(propsmatching, propsplaying);
