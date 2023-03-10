
/**
 * This module defines an 'ajaxUtils' namespace that provides a utility for making Ajax GET requests to a specified URL. 

 * The main function in this module is 'sendGetRequest', which takes in the URL to make the request to, a function to handle the response, 
 * and a boolean flag indicating whether the response is in JSON format. 

 * Usage:
 * import ajaxUtils
 * ajaxUtils.sendGetRequest(url, responseHandler, isJsonResponse)

 * Where:
 * - url: a string representing the URL to make the GET request to
 * - responseHandler: a function to handle the response when it is received
 * - isJsonResponse: a boolean flag indicating whether the response is in JSON format (default is True)

 * The responseHandler function should take a single argument, which will be either a parsed JSON object or 
 * raw response text depending on the value of the isJsonResponse flag.

 * Note:
 * - This module requires XMLHttpRequest, which is available in most modern browsers.
 * - Ajax (using the XMLHttpRequest object is gradually being replaced by functions within JavaScript frameworks and the official Fetch API Standard.) 
 *   20230310: For future development, update this by using frameworks and the Official fetch api.
 * - This module assumes that the server returns a response with a status code of 200 if the request is successful. 
 */


// Set up a namespace for our utility
let ajaxUtils = {};


// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest =
  function (requestUrl, responseHandler, isJsonResponse) {
    // HTTP request object
    const request = new XMLHttpRequest();
    request.onreadystatechange =
      // Whenever state changes, this function will run.
      function () {
        handleResponse(request,
          responseHandler,
          isJsonResponse);
      };
    // initialize the request and prepare it to be sent, `true` indicates that the request should be asynchronous
    request.open("GET", requestUrl, true);
    // If the request is a GET request, the send method is passed null as the argument. If it were a POST request, data would be passed as the argument to the send method.
    request.send(null); // for POST only
  };

// Only calls user provided 'responseHandler' function if response is ready and not an error
function handleResponse(request,
  responseHandler,
  isJsonResponse) {
  //  4 means that the entire response has been received and the request has completed
  if ((request.readyState == 4) &&
    (request.status == 200)) {

    // Default to isJsonResponse = true
    if (isJsonResponse == undefined) {
      isJsonResponse = true;
    }

    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseText);
    }
  }
}

