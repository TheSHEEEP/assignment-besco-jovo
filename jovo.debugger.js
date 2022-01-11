const { DebuggerConfig } = require('@jovotech/plugin-debugger');

const debuggerConfig = new DebuggerConfig({
  locales: ['en'],
  buttons: [
    {
      label: 'Change Mode',
      input: {
        intent: 'ChangeModeIntent'
      }
    }
  ]
});

module.exports = debuggerConfig;
