import * as Sentry from "@sentry/browser";

function init() {
  //copy your own url here
  Sentry.init({
    dsn: "https://9babdfb9bb78478292b6d36dd4c4245a@sentry.io/1483914"
  });
}

function error(error) {
  Sentry.captureException(error);
}

export default {
  init,
  error
};
