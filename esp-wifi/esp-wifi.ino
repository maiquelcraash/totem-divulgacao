/**
 * BasicHTTPClient.ino
 *
 *  Created on: 24.05.2015
 *
 */

#include <Arduino.h>
#include <strings.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;

const char *totemID = "Totem 2 - Shopping Lajeado";
const char *ssid = "iPhone-ml";
const char *password = "12345678";
const char *serverURL = "http://172.20.10.2:8082/contatos";

char postBuffer[1024];
boolean situation = 1;

boolean getSituation() {
  int pinoSensor = A0;
  int valorSensor = 0;
 
  valorSensor = analogRead(pinoSensor);
  //int valorCorrigido = (valorSensor * 5) / 1024;
  if( valorSensor > 100) {
      return true;
  }
  else {
      return false;   
  }
}


void setup() {

    USE_SERIAL.begin(115200);
    // USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for (uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    WiFiMulti.addAP(ssid, password);

}

void loop() {

    //getSituation title=foo&body=bar&userId=1

    bzero(postBuffer, sizeof postBuffer);
    strcat(postBuffer, "totemID=");
    strcat(postBuffer, totemID);
    strcat(postBuffer, "&situation=");

    if (getSituation()) {
        strcat(postBuffer, "1");
    }
    else {
        strcat(postBuffer, "0");
    }

    // wait for WiFi connection
    if ((WiFiMulti.run() == WL_CONNECTED)) {

        HTTPClient http;

        USE_SERIAL.print("[HTTP] begin...\n");

        // configure headers, server and url
        http.addHeader("Content-Type", "application/json");
        http.begin(serverURL); //HTTP

        USE_SERIAL.print("[HTTP] GET...\n");

        // start connection and send HTTP header
        int httpCode = http.GET();

        // httpCode will be negative on error
        if (httpCode > 0) {
            // HTTP header has been send and Server response header has been handled
            USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);


            // file found at server
            if (httpCode == HTTP_CODE_OK) {
                String payload = http.getString();
                USE_SERIAL.println(payload);

                http.addHeader("Content-Type", "application/x-www-form-urlencoded");
                int httpPostCode = http.POST(postBuffer);
                USE_SERIAL.printf("[HTTP] POST... code: %d\n", httpPostCode);
            }
        }
        else {
            USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }

        http.end();
    }

    else {
        USE_SERIAL.print("WI-FI ERROR! Check the ssid and pass parameters\n");
    }

    delay(5000);
}

