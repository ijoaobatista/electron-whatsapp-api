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

## Métodos Main
## Métodos Client