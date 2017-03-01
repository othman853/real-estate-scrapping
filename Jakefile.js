const DOCKER_COMPOSE_COMMANDS = { up: 'up -d', ps: 'ps', logs: 'logs', down: 'down' };
const DOCKER_COMPOSE_SERVICES = { web: 'restates_web', db: 'restates_db' };

const { up, ps, logs, down } = DOCKER_COMPOSE_COMMANDS;
const { web, db } = DOCKER_COMPOSE_SERVICES;

const compose =
  (command, service='') => `docker-compose -f infrastructure/docker/compose/dev.yml ${command} ${service}`;

const run = cmd => () => jake.exec(cmd, { printStdout: true });

task('start', run(compose(up, web)));
task('status', run(compose(ps)));
task('stop', run(compose(down)));

namespace('compose', () => {
  task('ps', run(compose(ps)));
  task('down', run(compose(down)));
});

namespace('up', () => {
  task('web', run(compose(up, web)));
  task('db', run(compose(up, db)));
});

namespace('logs', () => {
  task('web', run(compose(logs, web)));
  task('db', run(compose(logs, db)));
});
