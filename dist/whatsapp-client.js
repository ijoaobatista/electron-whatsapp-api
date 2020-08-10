const { clipboard, ipcRenderer, nativeImage } = require('electron');

var isSending = false;
var messagesToSend = [];

var index_message = 0;

var loginSelector = '#app > div > div > div.landing-window > div.landing-main > div > div._2nIZM > div';
var reloadCodeSelector = '#app > div > div > div.landing-window > div.landing-main > div > div._2nIZM > div > span > div';
var sidebarSelector = '#side > header > div._3euVJ > div > span > div:nth-child(2) > div';
var itemListUserSelector = '#app > div > div > div.YD4Yw > div._1-iDe._1xXdX > span > div > span > div > div._1qDvT._2wPpw > div:nth-child(1) > div > div > div:nth-child(2) > div > div';
var sendTextButtonSelector = '#main > footer > div._3ee1T._1LkpH.copyable-area > div:nth-child(3) > button';
var sendImageButtonSelector = '#app > div > div > div.YD4Yw > div._1-iDe.Wu52Z > span > div > span > div > div > div._2wPpw._1E3Yq > span > div > div';
var inputAreaSelector = '#app > div > div > div.YD4Yw > div._1-iDe.Wu52Z > span > div > span > div > div';

var whatsapp = {
    getLogin: function (callback) {

        focusElement(loginSelector, function (element) {

            let code = element.getAttribute('data-ref');

            if (typeof callback == 'function' && code) {
                callback(code);
            }
        });

        focusElement(reloadCodeSelector, function (element) {
            element.click();
        });
    },
    isLogged: function () {

        let wid = JSON.parse(sessionStorage.getItem('last-wid')) || JSON.parse(localStorage.getItem('last-wid'));

        if (wid) {
            return true;
        }
        return false;
    },
    send: function (messages) {

        send(messages);
    }
}

function send(messages) {

    if (isSending == false) {

        isSending = true;

        send_message(messages);

    } else {
        console.log('[FILA] Adicionado na fila');
        messagesToSend.push(messages);
    }
}

// Nova função de enviar mensagens de modo procedural

function send_message(messages) {

    let local_wid = JSON.parse(sessionStorage.getItem('last-wid')) || JSON.parse(localStorage.getItem('last-wid'));
    let local_bid = JSON.parse(sessionStorage.getItem('WABrowserId')) || JSON.parse(localStorage.getItem('WABrowserId'));

    setTimeout(function() {
        
        if (index_message >= messages.length) {
            
            console.log('[MENSAGENS] Finalizou todos os envios');

            index_message = 0;
            isSending = false;

            if (messagesToSend.length > 0) {

                console.log('[FILA] Existe itens na fila de espera');

                setTimeout(function() {
                    console.log('[FILA] Iniciando envios da fila');
                    whatsapp.send(messagesToSend[0]);
                    messagesToSend.shift();
                }, 3000);
            }else {
                isSending = false;
            }

        }else if (messages[index_message].image) {

            console.log('[TIPO] Mensagem com imagem');

            clipboard.writeText(messages[index_message].wid);
            fireMouseEvents(sidebarSelector);

            setTimeout(function () {
                ipcRenderer.send('paste', { wid: local_wid, bid: local_bid, content: messages[index_message].wid, action: 'find' });
            }, 1000);

            setTimeout(function () {
                fireMouseEvents(itemListUserSelector);
            }, 2000);

            setTimeout(function () {
                clipboard.writeImage(nativeImage.createFromDataURL(messages[index_message].image));
            }, 3000);

            setTimeout(function () {
                ipcRenderer.send('paste', { wid: local_wid, bid: local_bid, content: messages[index_message].image, action: 'input' });
            }, 4000);

            focusElement(inputAreaSelector, function () {

                setTimeout(function () {
                    clipboard.writeText(messages[index_message].message);
                }, 1000);

                setTimeout(function () {
                    ipcRenderer.send('paste', { wid: local_wid, bid: local_bid, content: messages[index_message].message, action: 'label' });
                }, 2000);

                setTimeout(function () {
                    fireMouseEvents(sendImageButtonSelector);
                    send_message(messages);
                    index_message++;
                }, 3000);
                
            }, false);
        }else if (!messages[index_message].image) {

            console.log('[TIPO] Mensagem de texto');

            clipboard.writeText(messages[index_message].wid);
            fireMouseEvents(sidebarSelector);

            setTimeout(function () {
                ipcRenderer.send('paste', { wid: local_wid, bid: local_bid, content: messages[index_message].wid, action: 'find' });
            }, 1000);

            setTimeout(function () {
                fireMouseEvents(itemListUserSelector);
            }, 2000);

            setTimeout(function () {
                clipboard.writeText(messages[index_message].message);
            }, 3000);

            setTimeout(function () {
                ipcRenderer.send('paste', { wid: local_wid, bid: local_bid, content: messages[index_message].message, action: 'label' });
            }, 4000);

            setTimeout(function () {
                fireMouseEvents(sendTextButtonSelector);
                send_message(messages);
                index_message++;
            }, 5000);
        }
    }, 3000);
}

function fireMouseEvents(selector) {
    let element = document.querySelector(selector);
    let eventNames = ['mouseover', 'mousedown', 'mouseup', 'click'];
    if (element && eventNames && eventNames.length) {
        for (let index in eventNames) {
            let eventName = eventNames[index];
            if (element.fireEvent) {
                element.fireEvent('on' + eventName);
            } else {
                let eventObject = document.createEvent('MouseEvents');
                eventObject.initEvent(eventName, true, false);
                element.dispatchEvent(eventObject);
            }
        }
    }
}

function focusElement(selector, callback, infinite = true) {
    let time = null;
    time = setInterval(function () {
        let element = document.querySelector(selector);
        if (element) {
            if (!infinite) {
                clearInterval(time);
            }
            if (typeof callback == 'function') {
                callback(element);
            }
        }
    }, 1000);
}

module.exports = whatsapp;
