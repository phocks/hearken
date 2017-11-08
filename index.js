var axios = require("axios");

function handlePOST(req, res) {
  // Do something with POST requests

  // Let's get user input here from ChatFuel
  // var input = req.body.input;

  var hearkenUrl = "https://modules.wearehearken.com/abc/api/questions.js";

  axios
  .post(hearkenUrl, {
    name: "Joshua Byrd",
    email: "byrd.joshua@abc.net.au",
    display_text:
      "Test cloud function from Josh to the JSON endpoint please disregard and delete?",
    custom_field_value: "4060",
    custom_field_name: "Postal code (optional)",
    opt_in_response: false,
    anonymous: false,
    source: "prompt_embed",
    source_id: 361
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

  var randomNumber = Math.floor(Math.random() * input + 1);
  res.status(200).json({
    messages: [{ text: "Your random number is: " + String(randomNumber) }]
  });
}

function handleGET(req, res) {
  // Do something with the GET request
  var input = req.query.input;

  var hearkenUrl = "https://modules.wearehearken.com/abc/api/questions.js";

  axios
  .post(hearkenUrl, {
    name: "Joshua Byrd",
    email: "byrd.joshua@abc.net.au",
    display_text:
      "Test cloud function from Josh to the JSON endpoint please disregard and delete?",
    custom_field_value: "4060",
    custom_field_name: "Postal code (optional)",
    opt_in_response: false,
    anonymous: false,
    source: "prompt_embed",
    source_id: 361
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

  // var randomNumber = Math.floor(Math.random() * input + 1);
  res.status(200).json({
    messages: [{ text: "Hearken question received loud and clear (hopefully)" }]
  });
}

function handlePUT(req, res) {
  // Do something with the PUT request
  res.status(403).send("Forbidden!");
}



/**
 * Responds to a GET request with "Hello World!". Forbids a PUT request.
 *
 * @example
 * gcloud alpha functions call helloHttp
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.hearken = (req, res) => {
  switch (req.method) {
    case "GET":
      handleGET(req, res);
      break;
    case "PUT":
      handlePUT(req, res);
      break;
    case "POST":
      handlePOST(req, res);
      break;
    default:
      res.status(500).send({ error: "Something blew up!" });
      break;
  }
};
