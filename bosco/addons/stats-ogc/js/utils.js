export const getOptions = (id) => {
  const mviewerId = configuration.getConfiguration().application.id;
  const options = mviewer.customComponents?.[id]?.config.options;
  return options[mviewerId];
};

export const getSelectedFeaturesByLayer = (mviewerid = "selectoverlay") => {
  const selectLayer = mviewer.getMap().getLayers().getArray().filter(x => x.get("mviewerid") === mviewerid)[0];
  if(!selectLayer) return;
  return selectLayer.getSource().getFeatures();
}

export const getSelectedFeaturesByLayerAsJson = (mviewerid) => {
  let writer = new ol.format.GeoJSON();
  const f = getSelectedFeaturesByLayer(mviewerid);
  if(!f || _.isEmpty(f)) return;
  console.log(f);
  return JSON.parse(writer.writeFeatures(f));
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}