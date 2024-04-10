import Request from "./request.js";

import * as utils from "./utils.js";
import * as rpgUtils from "./rpgUtils.js";
import * as statsUtils from "./statsUtils.js";

const ID = "stats-ogc";
const init = async () => {
  mviewer.customComponents["stats-ogc"].utils = {
    ...utils,
    ...rpgUtils,
    ...statsUtils
  };
  mviewer.customComponents["stats-ogc"].requests = [];
  mviewer.customComponents["stats-ogc"].createRequests = (
    name,
    geometry,
    url,
    params
  ) => {
    const r = new Request(name, geometry, url, params);
    mviewer.customComponents["stats-ogc"].requests.push(r);
  };
  mviewer.customComponents["stats-ogc"].getRequests = (name) => {
    return mviewer.customComponents["stats-ogc"].requests.filter(
      (r) => r.getName() == name
    )[0];
  };
};
new CustomComponent(ID, init);
