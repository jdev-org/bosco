import {getKeyByValue} from "./utils.js";
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