# DAP automated testing docs

The automated tests for the DAP code are implemented using [cucumber-js](https://github.com/cucumber/cucumber-js)
and [puppeteer](https://pptr.dev/).

By default the tests use the local version of the DAP javascript files. Loading
the code into a test HTML page, performing various user actions, and testing
the behavior of the code in response to the user actions.

Use the `DAP_ENV` environment variable to insert live versions of the code into
the test HTML page instead of the local version as described below.

## Running the tests

Start up the test site at http://localhost:8080/:

```bash
npm run test-site
```

Then run the tests against the test site:

```bash
npm run cucumber
```

## Running the tests with a debugger attached

```bash
npm run cucumber:debug
```

## Configuring with environment variables

### Verbose mode

Print debugging information to stdout while running the tests:

```bash
VERBOSE=true npm run cucumber
```

### Run tests against the live staging environment

```bash
DAP_ENV=staging npm run cucumber
```

### Run tests against the live production environment

```bash
DAP_ENV=production npm run cucumber
```
