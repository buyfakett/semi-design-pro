import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';

const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  statesHook: ReactHook,
  responded: response => response.json()
});

export const request = alovaInstance;