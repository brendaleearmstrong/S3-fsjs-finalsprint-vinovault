const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { format, getYear } = require('date-fns');
const { v4: uuid } = require('uuid'); //guid
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', async (event, level, message) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;

  try {
    const currFolder = path.join(__dirname, '../logs', getYear(new Date()).toString());
    if (!fs.existsSync(currFolder)) {
      await fsPromises.mkdir(currFolder, { recursive: true });
    }
    const fileName = `${format(new Date(), 'yyyyMMdd')}_http_events.log`;
    await fsPromises.appendFile(path.join(currFolder, fileName), logItem + '\n');
    if (DEBUG) console.log(logItem);
  } catch (err) {
    console.error('Failed to write log:', err);
  }
});

module.exports = myEmitter;
