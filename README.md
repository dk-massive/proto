proto
=====

Command line tool for theming with the Drupal Protoype starter theme.

Prototype Starter Theme: https://www.drupal.org/project/prototype

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/proto.svg)](https://npmjs.org/package/proto)
[![Downloads/week](https://img.shields.io/npm/dw/proto.svg)](https://npmjs.org/package/proto)
[![License](https://img.shields.io/npm/l/proto.svg)](https://github.com/dk-massive/proto/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @dkmassive/proto
$ proto COMMAND
running command...
$ proto (-v|--version|version)
@dkmassive/proto/0.1.5 darwin-x64 node-v12.16.1
$ proto --help [COMMAND]
USAGE
  $ proto COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`proto component [NAME] [JS]`](#proto-component-name-js)
* [`proto hello`](#proto-hello)
* [`proto help [COMMAND]`](#proto-help-command)

## `proto component [NAME] [JS]`

Generate theme component with libraries.

```
USAGE
  $ proto component [NAME] [JS]

ARGUMENTS
  NAME  Component human readable name
  JS    Create JS file with component

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/component.js](https://github.com/dk-massive/proto/blob/v0.1.5/src/commands/component.js)_

## `proto hello`

Describe the command here

```
USAGE
  $ proto hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/dk-massive/proto/blob/v0.1.5/src/commands/hello.js)_

## `proto help [COMMAND]`

display help for proto

```
USAGE
  $ proto help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
