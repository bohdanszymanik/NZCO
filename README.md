<!--
This file is for you to explain your connector to anyone who might add it to their deployment of i2 Analyze.

Modify and complete the template below to provide documentation for the connector, including what services it provides, how to deploy it, and what further configuration it supports.
-->

# [TODO: Connector name]

This connector for the i2 Connect gateway was developed using the i2 Connect SDK.

## About

[TODO: Briefly describe the purpose of your connector, the data source that it connects to, and the services it offers.]

### Services

[TODO: Provide details of the services that your connector provides, using the table below as a guide. Replace the examples with your own services.]

| Name                   | Description                                 |
| ---------------------- | ------------------------------------------- |
| Example Service Name 1 | Add a brief description of the service here |
| Example Service Name 2 | Add a brief description of the service here |

## Deploying the connector

[TODO: Include instructions that explain how to deploy the connector to a physical or virtual server where i2 Analyze can access it.]

### Schema

[TODO: If necessary, describe how to deploy a schema that you provide as a connector or gateway schema. Include details of any specific requirements in order for the connector to function correctly.]

### Configuration

[TODO: Describe any configuration options that are relevant to a deployer, such as settings that they can use to customize the connector. The following paragraphs are a template for you to reword.]

The settings for this connector are in the `config/settings.json` file. The sample environment configuration file `.env.sample` contains instructions for configuring environment-specific settings.

**Note:** If you want to use values from the environment, the JSON settings file supports environment variable string substitution through syntax of the form `"foo": "${env.FOO}"`.

## Contributing to the connector

To make enhancements or additions to the behavior of this connector and its services, see the [Contribution guide](./CONTRIBUTING.md) that explains how to set up an environment for developing and testing connectors for the i2 Connect gateway.
