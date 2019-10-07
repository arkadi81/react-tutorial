// import { Raven } from "raven-js";

function init() {
  // Raven.config("add your own api key", {
  //     release: "1-0-0",
  //     environment: "development-test"
  // }).install();
}

function log(error) {
  // Raven.captureException(error); // if we ever want to go back to raven
  console.log(error);
}

export default {
  init,
  log
};
