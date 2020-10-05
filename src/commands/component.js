const {Command, flags, args} = require('@oclif/command')
const inquirer = require('inquirer')
const mkdirp = require('mkdirp');
const createFile = require('create-file');
const paramCase = require('param-case');

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

    this.log(scss);

    fs.mkdir(path, 755, error => {
      if (error) this.log(error)
    })

    fs.writeFile(scss, 'aaa', { encoding: 'utf8', mode: 755 },error => {
      if (error) this.log(error)
    })

    fs.writeFile(twig, 'aaa', { encoding: 'utf8', mode: 755 }, error => {
      if (error) this.log(error)
    })

    // createFile('./derp/to/file/to-create', 'my content\n',  () => {
    //   // file either already exists or is now created (including non existing directories)
    // });
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
