// const { makeWorkerUtils } = require("graphile-worker");
import {makeWorkerUtils} from 'graphile-worker'

export const workScheduler = async function main() {
  const workerUtils =  await makeWorkerUtils({
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  });

  await workerUtils.migrate();
  return workerUtils
}
