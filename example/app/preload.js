document.onreadystatechange = function() {
    if (document.readyState == 'complete') {
        
        const whatsapp = require('../../dist/whatsapp-client');
        const fs = require('fs'); 

        console.log(whatsapp.isLogged());

        whatsapp.getLogin(function(data) {
            console.log(data);
        });

        var samples = JSON.parse(fs.readFileSync('./example/sample/images.json').toString());

        var messages = [
            {wid: '99865099', message: 'WhatsApp API', image: samples.image1},
            {wid: '99865099', message: 'WhatsApp API', image: samples.image2},
            {wid: '99865099', message: 'WhatsApp API', image: samples.image3},
            {wid: '99865099', message: 'WhatsApp API', image: samples.image4},
            {wid: '99865099', message: 'WhatsApp API', image: samples.image5}
        ];

        setTimeout(function() {
            if (whatsapp.isLogged()) {
                whatsapp.send(messages);
            }
        }, 20000);

    }
}
