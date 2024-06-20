import {getKeyByValue} from "./utils.js";
import {getSelectedFeaturesByLayerAsJson} from "./utils.js";
import Request from "./request.js";

export const parseResponse = ({response}) => {
    const years = _.get(response, "domain.axes.t.values");
    const cultureCodes = _.get(response, "ranges.code_groupe.values");
    const culturesIdByCode = _.get(response, "parameters.code_groupe.categoryEncoding");
    const culturesNames = _.get(response, "parameters.code_groupe.observedProperty.categories");
    return years.map((y,i) => {
        const code = cultureCodes[i];
        const year = y;
        const cultureId = getKeyByValue(culturesIdByCode, code);
        const cultureInfos = culturesNames.filter(culture => culture.id === cultureId)[0];
        return {...cultureInfos, year, code};
    });
}

export const requestCulture = (year, params, featureOlUid) => {
    const nameRequestCulture = `${featureOlUid}-culture`;
    const serviceCulture = "https://api.geosas.fr/stats-ogc/processes/edr-aggregate/execution";
    const paramsCultureByYear = {
        "aggregation": "mode",
        "datetime": "2017-01-01/2022-01-01",
        "url_edr": "https://api.geosas.fr/edr/collections/RPG-Raster",
        ...params
    };
    const featuresCollection = getSelectedFeaturesByLayerAsJson();
    if(featuresCollection) {
        featuresCollection.crs = {
            properties: {
                name: `urn:ogc:def:crs:${mviewer.getMap().getView().getProjection().getCode()}`
            },
            type: "name"
        };
    }
    const req = new Request(nameRequestCulture, featuresCollection, serviceCulture, paramsCultureByYear);
    const onReq = (r) => {
        // years
        const cultureByYear = parseResponse(r);
        if(!year) return;
        let infos = cultureByYear.filter(f => {
            const y = moment(f.year, "YYYY-MM-DD-T00-00-00Z").format("YYYY");
            return y == year;
        })[0];
        if(infos) {
            document.querySelector(`#cn-${featureOlUid}`).innerHTML = infos.label.fr;
            document.querySelector(`#year-${featureOlUid}`).innerHTML = year;
            document.querySelector(`#titleYear-${featureOlUid}`).innerHTML = year;  
            document.querySelector(`#tabYear-${featureOlUid}`).innerHTML = year;      
        }
    }
    req.setProcess(onReq);
    req.requestJson();
}