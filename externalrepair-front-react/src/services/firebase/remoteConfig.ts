import {
  fetchAndActivate,
  getBoolean,
  getRemoteConfig,
  getValue,
} from 'firebase/remote-config';

const remoteConfig = getRemoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 0;

const setup = async (params: DefaultParamsRemoteConfig): Promise<void> => {
  remoteConfig.defaultConfig = params;
  await fetchAndActivate(remoteConfig);
};

const fetch = async (): Promise<boolean> => {
  return fetchAndActivate(remoteConfig);
};

const getValueString = (key: string): string => {
  return getValue(remoteConfig, key).asString();
};

const getValueJson = (key: string): string => {
  return JSON.parse(getValue(remoteConfig, key).asString());
};

const getValueBoolean = (key: string): boolean => {
  return getBoolean(remoteConfig, key);
};

export const RemoteConfigService = {
  setup,
  fetch,
  getValueJson,
  getValueString,
  getValueBoolean,
};
