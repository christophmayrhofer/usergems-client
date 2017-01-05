export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-api', (config) => {
      config
        .registerEndpoint('api', 'http://localhost:3000/')
        .setDefaultEndpoint('api');
    });

  await aurelia.start();
  aurelia.setRoot('app');
}
