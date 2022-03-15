(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { refreshMusic, rando } = require("./fungus");

function initiateBackgroundMusic(propsmatching, propsplaying) {
    refreshMusic(propsmatching);
    refreshMusic(propsplaying);
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
                    function whenended() {
                        audio.removeEventListener('ended', whenended);
                        audio = propsmatching.bgms[rando(len)];
                        audio.currentTime = 0;
                        audio.play();
                        audio.addEventListener('ended', whenended);                        
                    }
                    audio.addEventListener('ended', whenended);
                    b.removeEventListener('click', clickList);
                    const intern = setInterval(() => {
                        const chat = document.querySelector('.chat-scroll-area-component');
                        if (chat.lastElementChild.textContent.toLowerCase().match('new game')) {
                            clearInterval(intern);
                            audio.pause();
                            audio.removeEventListener('ended', whenended);
                            const lenp = propsplaying.bgms.length;
                            audio = propsplaying.bgms[rando(lenp)];
                            audio.currentTime = 0;
                            audio.play();
                            function whenplayingended() {
                                audio.removeEventListener('ended', whenplayingended);
                                audio = propsplaying.bgms[rando(lenp)];
                                audio.currentTime = 0;
                                audio.play();    
                                audio.addEventListener('ended', whenplayingended);
                            }
                            audio.addEventListener('ended', whenplayingended);
                            const lintern = setInterval(() => {
                                const chat = document.querySelector('.chat-scroll-area-component');
                                if (chat.lastElementChild.textContent.toLowerCase().match('good sport')) {
                                    clearInterval(lintern);
                                    audio.pause();
                                    audio.removeEventListener('ended', whenplayingended);
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
}

module.exports = { initiateBackgroundMusic };

},{"./fungus":2}],2:[function(require,module,exports){
const { playlistEven, playlistOdd, musicname } = require('./styles');

function setStyle(elem, ...styles) {
    for (const style of styles) {
        for (const prop in style) {
            elem.style[prop] = style[prop];
        }            
    }
}
function addEvent(elem, events) {
    for (const event in events) {
        elem.addEventListener(event, events[event]);
    }
}
function muse(onchange) {
    const elem = document.createElement('input');
    elem.type = 'file';
    elem.accept = '.mp3'
    elem.multiple = true;
    elem.style.display = 'none';
    if (onchange) {
        elem.addEventListener('change', onchange);
    }
    return elem;
}
function l(tag, styles, childs, events) {
    const elem = document.createElement(tag);
    setStyle(elem, ...styles);
    for (const child of childs) {
        if (typeof child === 'string') {
            elem.append(document.createTextNode(child));
        } else {
            elem.append(child);
        }
    }
    if (events) {
        addEvent(elem, events);
    }
    return elem;
}
function rando(max) {
    return Math.floor(Math.random() * max);
}
function refreshMusic(props) {
    const { id, bgm, bbm, list, music, path } = props;
    localStorage.setItem(id, JSON.stringify(bgm));
    props.bgms = [];
    while (list.lastChild) {
        list.removeChild(list.lastChild);
    }
    while (music.lastChild) {
        music.removeChild(music.lastChild);
    }
    if (bbm.length === 0) {
        list.appendChild(l('li', [], ['-']));
    } else {
        bgm.forEach(function (bg, i) {
            const even = i % 2 === 0;
            list.appendChild(l('li', [even ? playlistEven : playlistOdd], [
                l('div', [musicname], [bg]),
            ]));
            const audio = document.createElement('audio');
            audio.src = 'http://localhost:9696/' + path + '/' + bg;
            if (path === 'playing') {
                audio.volume = 0.3;
            }
            music.appendChild(audio);
            props.bgms.push(audio);
        });
    }
}
function addMuseh(props) {
    return function (ev) {
        for (const file of ev.target.files) {
            props.bgm.push(file.name);
        }
        refreshMusic(props);    
    }
}

module.exports = {
    addEvent, addMuseh, l, muse, setStyle, rando, refreshMusic
}
},{"./styles":4}],3:[function(require,module,exports){
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

},{"./chessfun":1,"./fungus":2,"./styles":4}],4:[function(require,module,exports){
const close = {
    float: 'right',
    fontFamily: 'consolas'
};
const pointer = {
    cursor: 'pointer',
};
const pad5 = {
    padding: '5px'
};
const padside = {
    padding: '0px 4px'
};
const center = {
    textAlign: 'center',
    fontWeight: 'bolder'
};
const navbar = {
    marginBottom: '5px'
};
const mainbox = {
    backgroundColor: 'white',
    zIndex: '99999',
    fontSize: '8px',
    width: '240px',
    height: '320px',
    position: 'fixed',
    bottom: '10px',
    right: '10px'
};
const border = {
    border: '1px solid black'
};
const fullheight = {
    height: '280px'
};
const musicname = {
    width: '90%',
    display: 'inline-block'
};
const playlist = {
    margin: '7px 0px',
    listStyle: 'none',
    paddingLeft: '0px',
    border: '1px solid black'
};
const playlistOdd = {
    backgroundColor: 'black',
    color: 'white',
    padding: '1px',
    fontSize: '10px'
};
const playlistEven = {
    backgroundColor: 'white',
    padding: '1px',
    fontSize: '10px'
};

module.exports = {
    border,
    center,
    close,
    fullheight,
    mainbox,
    musicname,
    navbar,
    pad5,
    padside,
    playlist,
    playlistEven,
    playlistEven,
    playlistOdd,
    pointer
};

},{}]},{},[3]);
