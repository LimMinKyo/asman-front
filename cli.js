/* eslint-disable @typescript-eslint/no-var-requires */
const { realpathSync, writeFileSync, copyFileSync } = require('fs');
const dotenv = require('dotenv');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/**
 * dotenv 파싱
 */
async function parseDotenv(appEnv) {
  const { findUp } = await import('find-up');
  const envFilePath = await findUp(`.env.${appEnv}`);

  const parsedEnv = dotenv.config({ path: envFilePath }).parsed || {};

  return parsedEnv;
}

/**
 * 파싱 된 내용을 /public/__ENV.js에 출력
 */
function writeEnv(parsedEnv) {
  const scriptFilePath = `${realpathSync(process.cwd())}/public/__ENV.js`;

  writeFileSync(scriptFilePath, `window.__ENV = ${JSON.stringify(parsedEnv)}`);
}

/**
 * 파싱 대상 파일은 '.env'파일로 복사
 */
async function copyEnv(appEnv) {
  const { findUp } = await import('find-up');
  const envFilePath = await findUp(`.env.${appEnv}`);
  const dotenvFilePath = `${realpathSync(process.cwd())}/.env`;

  copyFileSync(envFilePath, dotenvFilePath);
}

/**
 * 스크립트
 */
yargs(hideBin(process.argv))
  .command(
    'next-env',
    'Create Next.js runtime environment js',
    function builder(y) {
      return y.option('env', {
        alias: 'e',
        type: 'string',
        description: 'Environment name(ex: alpha, dev, staging, real)',
      });
    },
    async function handler(args) {
      const appEnv = args.e || args.env || 'dev';

      const parsedEnv = await parseDotenv(appEnv); // dotenv 파싱
      writeEnv(parsedEnv); // 환경 변수 스크립트 파일 생성
      await copyEnv(appEnv); // .env 파일 복사

      return parsedEnv;
    },
  )
  .parse();
