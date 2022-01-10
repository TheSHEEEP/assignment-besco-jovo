const { DebuggerConfig } = require('@jovotech/plugin-debugger');

const debuggerConfig = new DebuggerConfig({
  locales: ['en'],
  buttons: [
    {
      label: 'Change Mode',
      input: {
        intent: 'ChangeModeIntent',
        entities: {
    			mode: {
    				value: 'bubenhofen'
    			}
    		}
      }
    }
  ],
});

module.exports = debuggerConfig;
