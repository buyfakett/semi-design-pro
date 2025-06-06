在本地开发的时候需要增加文件

`url.config.ts`
```ts
const ENV: number = 2
let ENV_url: string = ''
if (ENV === 1) {
  ENV_url = 'http://127.0.0.1:8888'
}else if (ENV === 2) {
  ENV_url = 'https://xxx.top'
}
module.exports = {
  ENV_url
};
```