# Developing a connector for the i2 Connect gateway

This connector project was bootstrapped using the `@i2analyze/create-connector` package. It contains a connector server and a basic service.

This document provides some information about using the project as starting point for developing and distributing your own connector. For more detailed documentation about connector development, see the [i2 Connect SDK](https://github.com/i2group/analyze-connect-node-sdk).

## Running the server during development

After bootstrapping, the connector server and its service are ready to run with no modifications. To run the server in development mode:

1. Install the packages that the server requires.

   ```shell
   npm install
   ```

1. Build the service and start the connector server:

   ```shell
   npm start
   ```

In this mode, the server monitors the project source files for changes, and rebuilds the service if necessary.

## Debugging the connector

During development, you can debug the connector with Visual Studio Code's built-in debugger. There are two commands to choose from:

- **Start connector server and debug**

  This command starts the connector server and its services, and launches the debugger at the same time. You don't need to run "`npm start`" before you start debugging.

- **Attach to connector server**

  This command requires you to run "`npm start`" first, and then attach the debugger afterward.

### Changing the debug port

By default, debugging take place on port 9229. To override this setting:

1. Add a command-line option to the `start` script in `package.json`. For example:

   ```json
   "scripts": {
     "start": "i2connect-scripts start --inspect=5858"
   }
   ```

   (For more details, see [https://nodejs.org/en/docs/guides/debugging-getting-started/#command-line-options](https://nodejs.org/en/docs/guides/debugging-getting-started/#command-line-options).)

1. In `.vscode/launch.json`, update the `"port"` field to match the number you specified in the script.

## Building and running the server manually

As well as the automated development mode described above, the connector server enables you to:

- Build the service code without starting the server (to prepare for distribution, for example)

- Start the server and use the services as they were last built or deployed

To build the services and do nothing else:

```shell
npm run build
```

To run a server whose services have already been built:

```shell
npm run serve
```

## Running `lint` on connector code

The connector project includes the facility to run `lint` over your source files with the following command:

```shell
npm run i2connect lint
```
