const request = require("request");
const PROXY = require("../../config.json").proxy;
console.log("PROXY: ", PROXY);
const proxyOptions = {
  proxy: PROXY,
};

class Request {
  get<T, R>(url, options): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      request.get(
        url,
        { ...proxyOptions, ...options, json: true },
        (err, resp, body: R) => {
          if (err) {
            reject(err);
          } else {
            if (resp && resp.statusCode !== 200) {
              console.log("resp", body, resp.headers, resp.statusCode);
            }
            resolve(body);
          }
        }
      );
    });
  }

  post<T, R>(url, body, options): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      request.post(
        url,
        {
          ...proxyOptions,
          ...options,
          qs: body,
          json: true,
        },
        (err, resp, data: R) => {
          if (err) {
            reject(err);
          } else {
            if (resp && resp.statusCode !== 200) {
              console.log("resp", body, resp.headers, resp.statusCode);
            }
          }
        }
      );
    });
  }

  delete<T, R>(url, body, options): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      request.delete(
        url,
        {
          ...proxyOptions,
          qs: body,
          json: true,
          ...options,
        },
        (err, resp, data: R) => {
          if (err) {
            reject(err);
          } else {
            if (resp && resp.statusCode !== 200) {
              console.log("resp", body, resp.headers, resp.statusCode);
            }
          }
        }
      );
    });
  }
}

export default new Request();
