export const getOptions = (id) => {
  const mviewerId = configuration.getConfiguration().application.id;
  const options = mviewer.customComponents?.[id]?.config.options;
  return options[mviewerId];
};
