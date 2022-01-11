# assignment-besco-jovo
Jovo coding assignment for Besco Software.

This assignment was written for use with the default Jovo debugger.  
It is based on the default Jovo v4 template.
Node.js version used for development: v16.13.1

Some assumptions had to be made, but can of course be rather easily changed:  
- Machine ID is a string of numbers, e.g. 26737 or 07846
- User token to use is stored in this.$user.accessToken
- The mode to set the machine to is delivered as an entity as part of the intent

## Building & Running
0. Make sure that Jovo is installed: `npm install -g @jovotech/cli`
1. Install all dependencies: `npm install`
2. Run the project: `jovo run`
