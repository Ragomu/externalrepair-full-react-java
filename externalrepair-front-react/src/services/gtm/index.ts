import TagManager, { TagManagerArgs } from 'react-gtm-module';
import { ENV } from '~/utils';

const tagManagerArgs: TagManagerArgs = {
  gtmId: process.env.VITE_GMT_ID ?? '',
};

const getGmtId = (): TagManagerArgs => tagManagerArgs;

const init = (): void => {
  if (ENV === 'PRD') {
    TagManager.initialize(tagManagerArgs);
  }
};

export const GoogleTagManager = {
  getGmtId,
  init,
};
