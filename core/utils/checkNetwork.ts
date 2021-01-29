const request = require("request");
const PROXY = require("../../config.json").proxy;
export function checkNetwork() {
  return new Promise((resolve, reject) => {
    request.get(
      "https://www.google.com",
      { proxy: PROXY },
      function (err, res, body) {
        if (err) resolve(false);
        else {
          resolve(true);
        }
      }
    );
  });
}

export {};
