document.onreadystatechange = function() {
    if (document.readyState == 'complete') {
        
        const whatsapp = require('../../dist/whatsapp-client');
        const fs = require('fs');
        const path = require('path');

        console.log(whatsapp.isLogged());

        whatsapp.getLogin(function(data) {
            console.log(data);
        });

        var samples = JSON.parse(fs.readFileSync(path.join(__dirname, '../', 'sample', 'images.json')).toString());

        var messages = [
            {wid: 'número', message: 'Mensagem 1', image: samples.image1},
            {wid: 'número', message: 'Mensagem 2', image: samples.image2},
            {wid: 'número', message: 'Mensagem 3', image: samples.image3},
            {wid: 'número', message: 'Mensagem 4', image: samples.image4},
            {wid: 'número', message: 'Mensagem 5', image: samples.image5}
        ];

        setTimeout(function() {
            if (whatsapp.isLogged()) {
                whatsapp.send(messages);
            }
        }, 20000);

    }
}
