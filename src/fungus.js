const { close, pointer, border, playlistEven, playlistOdd, padside } = require('./styles');

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
            const even = i % 2 !== 0;
            list.appendChild(l('li', [even ? playlistEven : playlistOdd], [
                bg, l('span', [close, pointer, border, padside], ['X'], {
                    click: function () {
                        bgm.splice(i, 1);
                        refreshMusic(props);
                    }
                })
            ]));
            const audio = document.createElement('audio');
            audio.src = 'http://localhost:9696/' + path + '/' + bg;
            audio.loop = true;
            if (path === 'playing') {
                audio.volume = 0.3;
            }
            music.appendChild(audio);
            props.bgms.push(audio);
        });
    }
}

module.exports = {
    addEvent, l, muse, setStyle, rando, refreshMusic
}