# ChatFuel endpoint to Hearken

This is a Cloud Function that exposes a HTTP endpoint.

It takes input from ChatFuel and sends it to Hearken. It is for internal and educational use only.

## Setup

Set up your chatfuel bot and then add a "JSON API" card.

Set `TYPE` to `POST` and set the `URL` to `https://<get this part from josh byrd>.cloudfunctions.net/hearken?sourceId=361` (replace the 361 with the number of your hearken submission embed ID.)