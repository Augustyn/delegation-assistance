import { RequestActionCreator } from "../../middleware";

class RequestServiceCreator {
  baseURL = null;
  apiVersion = null;

  constructor(args = {}) {
    this.baseURL = args.baseURL;
    this.apiVersion = args.apiVersion;
  }

  makeCall(type, { url, method, needAuth, data, headers = {}, ...rest }, meta) {
    return RequestActionCreator(
      type,
      {
        url: url,
        method,
        needAuth,
        data,
        headers,
        baseURL: this.baseURL,
        ...rest
      },
      meta
    );
  }

  get(type, { url, needAuth, headers, ...rest }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "get",
        needAuth,
        headers,
        ...rest
      },
      meta
    );
  }

  post(type, { url, needAuth, headers, data, ...rest }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "post",
        needAuth,
        headers,
        data,
        ...rest
      },
      meta
    );
  }

  put(type, { url, needAuth, headers, data, ...rest }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "put",
        needAuth,
        headers,
        data,
        ...rest
      },
      meta
    );
  }

  patch(type, { url, needAuth, headers, data, ...rest }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "patch",
        needAuth,
        headers,
        data,
        ...rest
      },
      meta
    );
  }

  delete(type, { url, needAuth, headers, data, ...rest }, meta) {
    return this.makeCall.call(
      this,
      type,
      {
        url,
        method: "delete",
        needAuth,
        headers,
        data,
        ...rest
      },
      meta
    );
  }

  static create(args) {
    return new RequestServiceCreator(args);
  }
}

export default RequestServiceCreator;
