import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';

let ENV_url: string;

try {
  const { ENV_url: importedUrl } = require('../../url.config');
  ENV_url = importedUrl;
} catch (error) {
  // 如果导入文件失败，将 ENV_url 设置为空字符串
  console.error('没有url.config.js文件:', error);
  ENV_url = '';
}

const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  statesHook: ReactHook,
  baseURL: ENV_url,
  responded: response => response.json()
});

export const request = alovaInstance;