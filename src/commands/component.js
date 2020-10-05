const {Command, flags, args} = require('@oclif/command')
const inquirer = require('inquirer')
const mkdirp = require('mkdirp');
const createFile = require('create-file');
const paramCase = require('param-case');
const YAML = require('yaml')
const find = require('find')

var read = require('read-file');


const fs = require('file-system');

class ComponentCommand extends Command {
  async run() {
    const {args} = this.parse(ComponentCommand)

    let name = args.name

    if (!name) {
      let responses = await inquirer.prompt([{
        name: 'name',
        message: 'Enter component name',
        type: 'text',
        default: 'component',
      }])
      name = responses.name
    }

    let useJs = args.js

    if (!useJs) {
      let responses = await inquirer.prompt([{
        name: 'js',
        message: 'Create JS file with component?',
        type: 'confirm',
        default: false,
      }])
      useJs = responses.js
    }

    const machineName = paramCase.paramCase(name)
    const path = `./components/${machineName}`
    const scss = `${path}/${machineName}.scss`
    const twig = `${path}/${machineName}.twig`
    const jsFile = `${path}/${machineName}.js`
    const libraryFiles = find.fileSync(/\.libraries\.yml$/, './')
    const themeFiles = find.fileSync(/\.info\.yml$/, './')
    const themeFile = read.sync(`./${themeFiles[0]}`, 'utf8');
    const themeConfig = YAML.parse(themeFile)

    const scssTemplate = `@import "_partials";

.c-${machineName} {


}`
    const twigTemplate = `
{% import '@${themeConfig.package}-components/component.twig' as component %}
{% do attach_library('${themeConfig.package}/${machineName}') %}

<div {{ component.attributes('c-${machineName}', modifiers, attr) }}>
  {{ content }}
</div>


{#Include this snippet in the drupal twig template.#}
{#{%#}
{#  include '@${themeConfig.package}-components/${machineName}/${machineName}.twig' with {#}
{#    attr: attributes.addClass(classes),#}
{#    content: content,#}
{#  } only#}
{#%}#}`

    const jsTemplate = `(function ($, Drupal) {
  const self = Drupal.behaviors.${machineName}ComponentBehavior = {
    attach: function (context, settings) {
      $('.js-${machineName}', context).once('${machineName}ComponentBehavior').each(function () {

      })
    },
  }
})(jQuery, Drupal);`

    const libraryEntry = `
# ${name}
${machineName}:
  css:
    component:
      build/components/${machineName}/${machineName}.css: {}`

    const libraryEntryJs = `
  js:
    build/components/${machineName}/${machineName}.js: {}`


    fs.mkdirSync(path, 0o777)

    fs.writeFileSync(scss, scssTemplate, {encoding: 'utf8', mode: 0o777})

    fs.writeFileSync(twig, twigTemplate, {encoding: 'utf8', mode: 0o777})

    fs.appendFileSync(`./${libraryFiles[0]}`, libraryEntry)

    if (useJs) {
      fs.writeFileSync(jsFile, jsTemplate, {encoding: 'utf8', mode: 0o777})
      fs.appendFileSync(`./${libraryFiles[0]}`, libraryEntryJs);
    }

  }
}

ComponentCommand.description = `Generate theme component with libraries.
...
Extra documentation goes here
`

ComponentCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

ComponentCommand.args = [
  {
    name: 'name',               // name of arg to show in help and reference with args[name]
    description: 'Component human readable name', // help description
    hidden: false,               // hide this arg from help
  },
  {
    name: 'js',               // name of arg to show in help and reference with args[name]
    description: 'Create JS file with component', // help description
    hidden: false,               // hide this arg from help
  },
]

module.exports = ComponentCommand
