# Volley's Standard `eslint-config-volley` :: 🪄✨

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
> cp -R node_modules/@volley/eslint-config-volley/templates/. .
```

2. Or, you can manually copy the parts that you need. Again, if you need help, reference the setup provided in this module's `templates` directory.

You're almost done. Run the following in your terminal. It just means "lint everything in the `/src` directory".

```sh
> npx eslint src/*
```

It should spit up a message about missing dependencies. At the end, it'll say:

```"To install the missing packages, please run the following command:"```

...and an `npm install` command including a bunch of dependencies.

Copy it, then run it in your terminal.

Phew.

Okay, if you've made it this far, try another one of these:

```sh
> npx eslint src/*
```

If everything is working, you should see a single error concerning `thisBreaksRules.ts`:

```sh
.../eslint-host-test/src/index.ts
  1:1  error  Delete `···`  prettier/prettier

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

Congrats, it's working. Also, if you pop open `/src/thisBreaksRules.ts`, you should see a warning overlayed in VSCode.


#TODO 

To see a minimal working configuration, check out github template.

## Configuration

A meta-configuration file according to the below schema can be provided in the root directory as `.lint.jsonc`:

| Attribute | Description |
| --- | --- |
| `suffer` | Require JSDoc for most language declarations. |
