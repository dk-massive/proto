const {Command, flags, args} = require('@oclif/command')
const inquirer = require('inquirer')
const mkdirp = require('mkdirp');
const createFile = require('create-file');
const paramCase = require('param-case');
const YAML = require('yaml')
const find = require('find')

var read = require('read-file');


const fs = require('file-system');

// fs.mkdir('./derp', 777, function(err) {});
// fs.mkdirSync('1/2/3/4/5', 777);
// fs.writeFile('path/test.txt', 'aaa', function(err) {})

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

    this.log(`hello ${name} from /Users/devin/Repos/proto/src/commands/component.js`)
    // mkdirp('./derp').then( made => this.log(`made directories, starting with ${made}`)).catch(error => this.log(error))

    const machineName = paramCase.paramCase(name)
    const path = `./components/${machineName}`
    const scss = `${path}/${machineName}.txt`
    const twig = `${path}/${machineName}.twig`
    const jsFile = `${path}/${machineName}.js`
    const files = find.fileSync(/\.info\.yml$/, './')
    const themeFile = `./${files[0]}`;
    const file = read.sync(themeFile, 'utf8');
    const themeConfig = YAML.parse(file)

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

      });
    }
  };
})(jQuery, Drupal);`


    fs.mkdir(path, 0o777, error => {
      if (error) this.log(error)
    })

    fs.writeFile(scss, scssTemplate, {encoding: 'utf8', mode: 0o777}, error => {
      if (error) this.log(error)
    })

    fs.writeFile(twig, twigTemplate, {encoding: 'utf8', mode: 0o777}, error => {
      if (error) this.log(error)
    })

    fs.writeFile(jsFile, jsTemplate, {encoding: 'utf8', mode: 0o777}, error => {
      if (error) this.log(error)
    })

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
    hidden: true,               // hide this arg from help
  },
]

module.exports = ComponentCommand
