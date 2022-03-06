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
