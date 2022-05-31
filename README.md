
## How new program items / curated content is scheuled

- when user signs up / registers to a program, we populate users sending schedule based on the number of content items in the program. 
- when a new content item is added to a program, we run a sync to schedule new items again into a queue for all existing subscribers. 
  - query for last sent time along with send frequency and determine when the item should be scheduled.

## How npm Graphile is used as a queue and task runner here
api populates (adds jobs to)  queue -> queue sends notification -> client receives push, downloads content.

To show queue logs, set GRAPHILE_LOGGER_DEBUG=1 in environment variables.

## Env vars for OneSignal
ONESIGNAL_APPID=xxxxx
ONESIGNAL_APIKEY=xxxx