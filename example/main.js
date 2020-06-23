const electron = require('electron');
const {app, BrowserWindow} = electron;
const whatsapp = require('../dist/whatsapp-main')(electron);
const path = require('path');

const site = 'https://web.whatsapp.com';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36';

app.on('ready', function() {
    app.userAgentFallback = userAgent;
    let window = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'app', 'preload.js')
        }
    });
    window.loadURL(site);
    whatsapp.middleware(window, function(data) {
        console.log(data);
    });
});

app.on('window-all-closed', function() {
    app.quit();
});
