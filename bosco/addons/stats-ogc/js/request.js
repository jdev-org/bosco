class Request {
  constructor(name, geometry, url, params) {
    this.name = name;
    this.geometry = geometry;
    this.url = url;
    this.params = params || {};
    this.resultHTML = "";
    this.resultJSON = {};
    this.process = null;
  }

  setGeometry = (geometry) => {
    this.geometry = geometry;
  };

  getName = () => this.name;

  getUrl = () => this.url;
  getChart = () => this.resultHTML;
  getJson = () => this.resultJSON;

  setProcess = (process) => {
    this.process = process;
  };

  request = (params) => {
    return fetch(this.url, {
      method: "POST",
      ...params,
    });
  };

  requestHtml = async () => {
    const bodyParams = {
      body: JSON.stringify({
        inputs: this.params,
      }),
    };
    const result = await this.request(bodyParams);
    this.resultHTML = await result.html();

    if (this.process) {
      this.process();
    }
  };

  requestJson = async () => {
    if (!this.geometry) {
      alert("Geometry missing !");
      return;
    }
    const bodyParams = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          ...this.params,
          geometry: this.geometry,
        },
      }),
    };
    const request = await this.request(bodyParams);
    const result = await request.json();
    this.resultJSON = result;
    console.log(result);
    if (this.process) {
      console.log(this.process);
      this.process(result);
    }
  };
}

export default Request;
