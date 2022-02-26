# Volley's Standard `.lint` :: 🪄✨

A standard way to ensure robust and strict linting in Typescript projects.

## Motivation

Across hundreds of projects, keeping track of updates to a standard .eslintrc.json configuration (composed of multiple sub-configuration packages) can be error prone.

As well, ESLint does not directly support configurations or plugins from composing dependency plugins.

## Design

We specify the common linting configuration via an open-ended npm package to allow for greater flexibility in sub-configuration dependencies.

Fundamentally, this project exists as a higher-level collection and configuration of larger ESLint rulesets.

## Installation

First install this package as a development dependency:

```sh
> npm i @volley/.lint
```

Then configure your local .eslintrc.json to extend our emitted code:

```json
{
  "extends": "./node_modules/@volley/.lint/.eslintrc.js"
}
```

## Configuration

A meta-configuration file according to the below schema can be provided in the root directory as `.lint.jsonc`:

| Attribute | Description |
| --- | --- |
| `suffer` | Require JSDoc for most language declarations. |
