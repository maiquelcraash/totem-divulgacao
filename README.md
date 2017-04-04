# Resumo:
Projeto Totem de Divulgação Integrantes: Maiquel Ludwig e Rodrigo Pritsch

Resumo: O projeto resume-se em promover o controle de Totems remotamente via interface Web. Os totems servirão para distribuir panfletos em pontos específicos (com acesso wi-fi) para a população em geral. Utilizaremos a IoT para:

1. Avaliar se há ou não panfletos disponíveis em determinado totem e protótipo inicial.
2. Gerar aviso no browser (push popup) quando acabarem os panfletos de
determinado totem
3. Permitir o cadastro de novos totems (via MAC) e criar protótipo completo totem
4. Permitir geração de análise por meio de gráficos.


Cronograma:

24/03/2017 -> Entrega do item 1

12/05/2017 -> Entrega do item 2

02/06/2017 -> Entrega do item 3

30/06/2017 -> Entrega do item 4




# Instruções para rodar o projeto:
1. Precisa ter o Node instalado (instalar a versão mais recente, pelo menos 7.0).
2. Pelo terminal/cmd, na pasta do projeto, rodar o comando:

    $ npm install

    Isso irá instalar todas as dependências listadas no package.json
3. Rodar subir o servidor com o node:

    $ node server/server.js

# OBS:

1. Configurar no arquivo properties.js as informações de conexão ao banco de dados.
2. Configurar no arquivo esp-wifi.ino a URL do Servidor e os dados da rede Wifi. Após, compilar e rodar no NodeMCU (ESP8266)



# Documentação Complementar:

ESP8266: HTTP GET Requests -> https://techtutorialsx.wordpress.com/2016/07/17/esp8266-http-get-requests/

ESP8266: HTTP POST Requests -> https://techtutorialsx.wordpress.com/2016/07/21/esp8266-post-requests/

Node + PostGrees -> https://github.com/brianc/node-postgres
                    & https://medium.com/@tarkus/postgresql-in-node-js-with-es7-async-await-d8a29cfa644f

Node REST Design Pattern -> https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09#.3e92h0mt2
