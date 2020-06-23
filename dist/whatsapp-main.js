function whatsappMain(electron) {
    if (electron) {
        let main = {
            middleware: function(window, callback) {
                if (window.webContents.paste) {
                    electron.ipcMain.on('paste', function(err, data) {
                        window.webContents.paste();
                        if (typeof callback == 'function') {
                            callback(data);
                        }
                    });
                }
            }
        };
        return main;
    }
}

module.exports = whatsappMain;
