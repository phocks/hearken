// This is a Cloud Function that exposes a HTTP endpoint
// It takes input from Chatfuel and sends it to Hearken

const axios = require("axios"); // A small REST client

// Set the Hearken endpoint. This is exposed through the Hearken embeds
// https://modules.wearehearken.com/abc/embed/361/share
const hearkenUrl = "https://modules.wearehearken.com/abc/api/questions.js";

// Some initial variables
let isAnon = true, // Default to anonymous
  sourceId = 361; // use ?sourceId=361 in Chatfuel to change this

function handlePOST(req, res) {
  // We need query strings to set some parameters
  const query = req.query;
  const body = req.body;

  sourceId = +query.sourceId || 361; // Make sourceId query string a number and provide fallback

  // Let's get user input here from the ChatFuel request
  const firstName = body["first name"] || "Firstname",
    lastName = body["last name"] || "Lastname",
    email = body.email || "no@email.com",
    formResponse = body.formResponse || "No response",
    messengerUserId = body["messenger user id"] || "0000000",
    preferAnonymous = body.PreferAnonymous || "Yes",
    location = body.location || "0000";

  // console.log(query);

  const fullName = firstName + " " + lastName;

  // Find out if they want to remain anon or not
  // TODO: Do some actual language processing here perhaps
  if (
    preferAnonymous.toLowerCase().includes("no") ||
    preferAnonymous.toLowerCase().includes("nup") ||
    preferAnonymous.toLowerCase().includes("negative")
  ) {
    isAnon = false;
  } else {
    isAnon = true;
  }

  // Create our payload onject that we will send to Hearken
  const payload = {
    name: fullName,
    email: email,
    display_text: formResponse,
    custom_fields: [
      { name: "Location", value: location, required: false },
      { name: "MessengerUserID", value: messengerUserId, required: true }
    ],
    opt_in_response: false,
    anonymous: isAnon,
    source: "prompt_embed",
    source_id: sourceId
  };

  // Post to Hearken endpoint
  // axios
  //   .post(hearkenUrl, payload)
  //   .then(function(response) {
  //     console.log("Hearken API call successful...");
  //     console.log(response);
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });

  res.status(200).json(
    payload
    //   {
    //   messages: [
    //     { text: "Your question has been received!" },
    //     { text: firstName + " " + lastName },
    //     { text: email },
    //     { text: formResponse },
    //     { text: messengerUserId },
    //     { text: isAnon },
    //     { text: sourceId }
    //   ],
    //   redirect_to_blocks: ["Hearken success"]
    // }
  );
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
  res
    .status(403)
    .send(
      "This is a PUT request. Please use POST if you want to actually do somethign..."
    );
}

/**
 * Responds to a GET request with "Hello World!". Forbids a PUT request.
 *
 * @example
 * gcloud alpha functions call hearken
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */

// Handle the request and send to appropriate function
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
