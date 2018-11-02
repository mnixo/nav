# nav

A command for simpler terminal navigation. 

### Features

- Easy to install and use.
- Searchable results.
- Dedicated commands.

### Commands

- `/showFiles` & `/hideFiles`: Whether files (non directories) should be shown in the listing. By default, files are hidden.  
- `/showHidden` & `/hideHidden`: Whether hidden files and directories should be shown in the listing. By default, hidden files and directories are hidden.

### Compatibility

Working on Unix based systems (macOS and linux). Not compatible with Windows.

### Requirements

- `node` to execute the scripts.
- `yarn` to install the dependencies.

### Installing nav 

- `git clone` this repository and `cd` into it.
- Run `yarn` to install its dependencies.
- Run `node alias.js` to get instructions on how to setup the command.

### Using nav

Changing the current working directory:

![nav-01-cwd](./img/nav-01-cwd.gif)

Text search:

![nav-02-search](./img/nav-02-search.gif)

Show files in the listing:

![nav-03-files](./img/nav-03-files.gif)

Show hidden files and directories in the listing:

![nav-04-hidden](./img/nav-04-hidden.gif)
