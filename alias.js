console.log(`
Add the following lines to your .rc file (.bashrc, .zshrc, etc.).

# nav
export NAV_HOME=${__dirname}
alias nav='node $NAV_HOME/nav.js; cd $(cat $NAV_HOME/cwd)'

Then, source your .rc file (or restart your terminal) to start using nav.
`);
