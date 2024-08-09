const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { format, getYear } = require('date-fns');
const { v4: uuid } = require('uuid'); //guid
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', async (event, level, message, details = {}) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  let logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;

  // Specifically log search keywords
  if (event.includes('/search') && details.keyword) {
    logItem += `\tSearch Keyword: "${details.keyword}"`;
  }

  // Add other details for search-related events
  if (event.includes('/search')) {
    if (details.database) logItem += `\tDatabase: ${details.database}`;
    if (details.resultCount !== undefined) logItem += `\tResults: ${details.resultCount}`;
    if (details.filterType) logItem += `\tFilter Type: ${details.filterType}`;
    if (details.filterValue) logItem += `\tFilter Value: ${details.filterValue}`;
  }

  try {
    const currFolder = path.join(__dirname, '../logs', getYear(new Date()).toString());
    if (!fs.existsSync(currFolder)) {
      await fsPromises.mkdir(currFolder, { recursive: true });
    }
    const fileName = `${format(new Date(), 'yyyyMMdd')}_http_events.log`;
    await fsPromises.appendFile(path.join(currFolder, fileName), logItem + '\n');
    if (typeof DEBUG !== 'undefined' && DEBUG) console.log(logItem);
  } catch (err) {
    console.error('Failed to write log:', err);
  }
});

module.exports = myEmitter;