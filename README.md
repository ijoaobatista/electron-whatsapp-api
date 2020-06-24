<p align="center">
<img src="src/logo.svg" alt="">
</p>
<h3 align="center">Electron WhatsApp Web API</h3>
<p align="center">
Electron WhatsApp API é um módulo para o framework <a href="https://www.electronjs.org/">Electron</a> que implemeta métodos automatizados para o serviço do <a href="https://web.whatsapp.com/">WhatsApp</a> para Web.
</p>
<br>

## Electron WhtasApp Web API
Este módulo foi desenvolvido com a finalidade de oferecer métodos automatizados sob a interface UI. Os métodos disponibilizados neste módulo trabalha totalmente com recursos abstratos de usuário, ou seja, simula ações básicas de envio comum de um usuário humano.

## Começo rápido
Os módulos estão disponíveis no diretório ``/dist``. Está disponível um exemplo de implementação no diretório ``/example``. Siga esses comandos:
* [Baixe este repositório](https://github.com/ijoaobatista/electron-whatsapp-api/archive/master.zip)
* Extraia os arquivos do repositório
* Dentro do repositório, acesse a pasta ``/example``
* Execute o comando: ``> npm install``
* Após instalado as dependências, execute: ``> npm start``

Se for a primeira vez, você deverá realizar o login. Para mostrar a janela e efetuar o login, você deverá definir a opção ``show`` para ``true`` nas opções do ``BrowserWindow``. Veja mais sobre as opções do ``BrowserWindow`` [aqui](https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions).

## Módulos
* **whatsapp-client.js**: Este módulo possui métodos que são executados no ``Rederer Process``
* **whatsapp-main.js**: Este módulo possui métodos que são executados no ``Main Process``

Veja mais sobre ``Main Process`` e ``Renderer Process`` [aqui](https://www.electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes).

### whatsapp-main.js

Métodos|Parâmetros|Callback|Retorno
-|-|-|-
Instance|``Electron instance``|``function``|``object``
middleware|``BrowserWindow instance``|``function``|``object``

### whatsapp-client.js

Métodos|Parâmetros|Callback|Retorno
-|-|-|-
isLogged|||``boolean``
getLogin||``function``|``string``
send|``messages array``|``function``|``object``

### Criando uma instância
Para criar uma instância você deverá utilizar o módulo ``whatsapp-main.js`` na camada ``Main Process``. Por exemplo:

``` javascript
const electron = require('electron');
const whatsapp = require('Path para whatsapp-main.js')(electron);
const { app, BrowserWindow } = electron;
...
app.on('ready', function() {
    let window = new BrowserWindow({
        ...
    });
    ...
    whatsapp.middleware(window, function(data) {
        ...
    });
});
...
```
### Agente de usuário
Por padrão, o ``User-Agent`` não é compatível com o WhatsApp Web. Para corrigir isso devemos informar qual vamos utilizar. Exemplo:

``` javascript
app.on('ready', function() {
    app.userAgentFallback = 'User-Agent compatível';
    ...
});
```
Saiba mais sobre ``User-Agent`` [aqui](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent);

### Preload Script
É possível configurar a execução de scripts assim que uma nova instância do ``BrowserWindow`` é inicializada. Exemplo:

**main.js**
``` javascript
...
let window = new BrowserWindow({
    ...
    webPreferences: {
        preload: 'Path para os script preload'
    }
});
...
```

Veja mais sobre as opções do ``BrowserWindow`` [aqui](https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions).

**preload.js**

``` javascript
document.onReadStateChange = function() {
    if(document.readState == 'complete') {
        // Código aqui
        ...
    }
}
```

### Enviando mensagens
Para utilizar os métodos de envios você deverá utilizar o módulo ``whatsapp-client.js`` na camada ``Renderer Process``. Exemplo:

``` javascript
```