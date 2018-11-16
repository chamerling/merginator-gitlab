const debug = require('debug')('merginator:cli');
const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .alias('u', 'upvotes')
  .describe('u', 'Number of required upvotes')
  .default('u', 2)
  .alias('t', 'token')
  .describe('token', 'Gitlab Token')
  .alias('g', 'gitlab')
  .describe('g', 'Gitlab URL')
  .default('g', 'https://gitlab.com')
  .alias('i', 'interval')
  .describe('i', 'Polling interval')
  .default('i', 5000)
  .help('h')
  .alias('h', 'help')
  .version()
  .epilogue('for more information, go to https://github.com/chamerling/merginator-gitlab')
  .argv;

const token = argv.token || process.env.GITLAB_TOKEN;
const url = process.env.GITLAB_URL || argv.gitlab;

if (!token) {
  console.error('You must define Gitlab token, take a look at https://github.com/chamerling/merginator-gitlab/README.md')
  return process.exit(-1);
}

console.log(`Starting merginator on ${url}...`);

require('./merginator')({url, token, upvotes_limit: argv.upvotes, interval: argv.interval});

(function wait() {
  setTimeout(wait, 10000);
  debug('.')
})();
