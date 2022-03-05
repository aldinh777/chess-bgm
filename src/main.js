const {
    border, center, close, fullheight, mainbox, navbar, pad5, padside, playlist, pointer
} = require('./styles');
const { l, muse, refreshMusic, rando } = require('./fungus');

const localmatchbgm = localStorage.getItem('matchbgm') || '[]';
const localplaybgm = localStorage.getItem('playbgm') || '[]';
const matchbgm = JSON.parse(localmatchbgm);
const playbgm = JSON.parse(localplaybgm);

const inputMatch = muse(function (ev) {
    const file = ev.target.files[0].name;
    matchbgm.push(file);
    refreshMusic(propsmatching);
});
const inputBgm = muse(function (ev) {
    const file = ev.target.files[0].name;
    playbgm.push(file);
    refreshMusic(propsplaying);
});
const listMatch = l('ul', [playlist], []);
const listBgm = l('ul', [playlist], []);
const musicMatch = document.createElement('div');
const musicBgm = document.createElement('div');
const app = l('div', [mainbox, border, pad5], [
    l('div', [navbar], [
        l('span', [], ['Chess BGM']),
        l('span', [border, close, padside, pointer], ['X'], {
            click: function () {
                app.style.display = 'none';
            }
        })
    ]),
    l('div', [border, pad5, fullheight], [
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

refreshMusic(propsmatching);
refreshMusic(propsplaying);

document.body.appendChild(app);

let audio;
function theTimeHasCome() {
    document.querySelectorAll('button').forEach(b => {
        const text = b.textContent.toLowerCase();
        const len = propsmatching.bgms.length;
        if (text.match('play') || text.match('new')) {
            const clickList = () => {
                audio = propsmatching.bgms[rando(len)];
                audio.currentTime = 0;
                audio.play();
                b.removeEventListener('click', clickList);
                const intern = setInterval(() => {
                    const chat = document.querySelector('.chat-scroll-area-component');
                    if (chat.lastElementChild.textContent.toLowerCase().match('new game')) {
                        clearInterval(intern);
                        audio.pause();
                        const lenp = propsplaying.bgms.length;
                        audio = propsplaying.bgms[rando(lenp)];
                        audio.currentTime = 0;
                        audio.play();
                        const lintern = setInterval(() => {
                            const chat = document.querySelector('.chat-scroll-area-component');
                            if (chat.lastElementChild.textContent.toLowerCase().match('good sport')) {
                                clearInterval(lintern);
                                audio.pause();
                                theTimeHasCome();
                            }
                        });
                    }
                }, 100);
            };
            b.addEventListener('click', clickList);
        }
    });    
}
theTimeHasCome();
