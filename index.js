const axios = require("axios"); // A small REST client

const hearkenUrl = "https://modules.wearehearken.com/abc/api/questions.js";

let isAnon = true; // Default to anonymous

function handlePOST(req, res) {
  // Do something with POST requests

  // Let's get user input here from ChatFuel
  const firstName = req.body["first name"],
    lastName = req.body["last name"],
    email = req.body.email,
    formResponse = req.body.formResponse,
    messengerUserId = req.body["messenger user id"],
    preferAnonymous = req.body.PreferAnonymous;

  const fullName = firstName + " " + lastName;

  // Find out if they want to remain anon or not
  // TODO: Do some actual language processing here perhaps
  if (preferAnonymous.includes("No") || preferAnonymous.includes("no")) {
    isAnon = false;
  } else {
    isAnon = true;
  }

  const payload = {
    name: fullName,
    email: email,
    display_text: formResponse,
    // custom_field_value: "4060",
    // custom_field_1_name: "Postal code (optional)",
    opt_in_response: false,
    anonymous: isAnon,
    source: "prompt_embed",
    source_id: 361
  };

  axios
    .post(hearkenUrl, payload)
    .then(function(response) {
      console.log("Hearken API call successful...");
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });

  // var randomNumber = Math.floor(Math.random() * input + 1);

  res.status(200).json({
    messages: [
      { text: "Your question has been received!" }
      // { text: firstName + " " + lastName },
      // { text: email },
      // { text: formResponse },
      // { text: messengerUserId },
      // { text: preferAnonymous }
    ]
  });
}

function handleGET(req, res) {
  // Do something with the GET request
  // var input = req.query.input;

  res.status(200).json({
    messages: [
      {
        text:
          "This is a GET request. Please use POST if you want to actually do something..."
      }
    ]
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
      res.status(500).send({ error: "Something didn't work. I'm sorry..." });
      break;
  }
};
