import { ProgramItem, Subscription } from "../models";
import sendPush from "../utils/push";

const { run } = require("graphile-worker");



export const runner = async function main(): Promise<Promise<any>> {
  // Run a worker to execute jobs:
  const runner = await run({
    connectionString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    concurrency: 5,
    // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
    noHandleSignals: false,
    pollInterval: 1000,
    taskList: {
      sendCuratedContent: async (payload: any, helpers: any) => {
        helpers.logger.info(payload);
        // update the subscription last sent item order and time 
        const subscription = await Subscription.findOne(payload.subscriptionId)
        const programItem = await ProgramItem.findOne(payload.programItemId)

        // only update lastProgramItem for `Program Content`
        if (programItem && subscription && programItem.contentType == 'Program Content') {
          subscription.lastProgramItem = programItem
        }

        // send notifications where enabled
        if (programItem && subscription) {
          await sendPush(programItem, subscription)
        }

      }
    }
  });


  runner.events.on("job:success", ({ job }: any) => {
    console.log(`Hooray! Worker completed job ${job.id}`);
  });

  // If the worker exits (whether through fatal error or otherwise), this
  // promise will resolve/reject:
  await runner.promise;
}