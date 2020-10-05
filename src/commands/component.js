const {Command, flags, args} = require('@oclif/command')
const inquirer = require('inquirer')
var mkdirp = require('mkdirp');

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
    mkdirp('/derp', function(err) {
      if(err) {
        console.log(err)
      }
    });
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
