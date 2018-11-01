const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

// show files (non directories)
let showFiles = false;
// show hidden files and directories
let showHidden = false;

// exit process gracefully when receiving a SIGINT event
process.on('SIGINT', function() {
  process.exit();
});

// exit process gracefully when pressing the ESC key
process.stdin.on('keypress', function (chunk, key) {
  if (key.name === 'escape') {
    process.exit();
  }
});

// update the cwd file, holding the absolute path of the current working directory
function updateCurrentWorkingDirectory() {
  fs.writeFileSync(path.join(__dirname, 'cwd'), process.cwd());
}

// prefix the choice with an icon, depending of its type (file or directory)
function iconize(choice) {
  const isDirectory = fs.lstatSync(path.join(process.cwd(), choice)).isDirectory();
  return `${isDirectory ? '📂' : '📄'} ${choice}`;
}

// remove the icon prefix from the choice
function deiconize(choice) {
  return choice.substr(3);
}

// gets the choices for the supported commands, given the current configuration
function getCommandChoices(input) {
  return [
    showFiles ? '/hideFiles' : '/showFiles',
    showHidden ? '/hideHidden' : '/showHidden',
  ].filter(choice => choice.includes(input));
}

// gets the choices for the available navigation options, given the current working directory
function getNavigationChoices(input) {
  // the available choices include the parent directory (..) and the children of the current working directory
  let choices = ['..'].concat(fs.readdirSync(process.cwd()));
  if (!showFiles) {
    // filter choices to have only directories
    choices = choices.filter(choice => fs.lstatSync(path.join(process.cwd(), choice)).isDirectory());
  }
  if (!showHidden) {
    // filter choices to have only non hidden files and directories
    choices = choices.filter(choice => choice === '..' || !choice.startsWith('.'));
  }
  return choices.filter(choice => choice.includes(input)).map(choice => iconize(choice));
}

// provides the choice list that should be shown to the user, depending on the current input
function getPromptSource(answers, input) {
  input = input || '';
  return Promise.resolve(input.startsWith('/') ? getCommandChoices(input) : getNavigationChoices(input));
}

// handle the provided answer
function handleAnswer(value) {
  // switch through the supported commands
  switch (value) {
    case '/hideFiles':
      showFiles = false;
      break;
    case '/showFiles':
      showFiles = true;
      break;
    case '/hideHidden':
      showHidden = false;
      break;
    case '/showHidden':
      showHidden = true;
      break;
    default:
      // the answer is not a command, trigger the directory change
      process.chdir(deiconize(value));
  }
}

// trigger a prompt that allows the user to change the current working directory or issue a command
function prompt() {
  // persist the current working directory
  updateCurrentWorkingDirectory();
  inquirer.prompt([{
    type: 'autocomplete',
    name: 'value',
    message: process.cwd(),
    pageSize: 20,
    source: getPromptSource,
  }]).then((answer) => {
    // handle the answer appropriately
    handleAnswer(answer.value);
    // relaunch the prompt
    prompt();
  });
}

// launch the prompt
prompt();
