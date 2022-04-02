# Volley's Standard `.lint` :: 🪄✨

A standard way to ensure robust and strict linting in Typescript projects.

## Motivation

Across hundreds of projects, keeping track of updates to a standard .eslintrc.json configuration (composed of multiple sub-configuration packages) can be error prone.

As well, ESLint does not directly support configurations or plugins from composing dependency plugins.

## Design

We specify the common linting configuration via an open-ended npm package to allow for greater flexibility in sub-configuration dependencies.

Fundamentally, this project exists as a higher-level collection and configuration of larger ESLint rulesets.

## Installation

Install this package and its dependedencies as a development dependency:

```sh
> npx install-peerdeps @volley/eslint-config-volley --dev
```

Then, you'll need to add some files to the root of your project. You can either:

1. Do it the quick and dirty way, by copying the files provided from this package into the root of your project:

```sh
> cp node_modules/@volley/eslint-config-volley/templates/* .
```

2. Or, you can manually copy the parts that you need. We highly recommend referencing the files contained in this package's `templates` directory.

#TODO 

To see a minimal working configuration, check out github template.

## Configuration

A meta-configuration file according to the below schema can be provided in the root directory as `.lint.jsonc`:

| Attribute | Description |
| --- | --- |
| `suffer` | Require JSDoc for most language declarations. |
