# ChatFuel endpoint to Hearken
This is a Cloud Function that exposes a HTTP endpoint. It takes input from ChatFuel and sends it to Hearken.

This is for internal use only.

## Setup
Set up your chatfuel bot and then add a "JSON API" card.

Set `TYPE` to `POST`.

Set the `URL` to `https://<get this part from josh byrd>.cloudfunctions.net/hearken?sourceId=361` (replace the 361 with the number of your hearken submission embed ID.)

Please include the following Chatfuel attributes:
{{ first name }}, {{ last name }}, {{ email }}, {{ formResponse }}, {{ messenger user id }}, {{ PreferAnonymous }}



## Author
Send all bug reports to Joshua Byrd <phocks@gmail.com>

---
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)