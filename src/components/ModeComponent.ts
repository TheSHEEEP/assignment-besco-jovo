import { Component, BaseComponent, Intents, Global, Logger } from '@jovotech/framework';

/*
  This component is responsible for handling machine mode-related intents.
 */
@Global()
@Component()
export class ModeComponent extends BaseComponent {
  START() {

  }

  @Intents(['ChangeModeIntent'])
  changeMode() {
    // Get the ID of the machine to affect from session data
    let id :number = this.$session.data.machine_id;
    if (id == undefined) {
      id = 12345;
    }
    Logger.info('Session data2: ' + JSON.stringify(this.$session.data));
    Logger.info('Machine ID: ' + id);

    // Get the mode to change to from the request parameter
    let mode :String = this.$entities.mode!.value;
    Logger.info('Entities data: ' + JSON.stringify(this.$entities));
    Logger.info('Requested mode: ' + mode);

    return this.$send({ message: 'Change request received' });
  }
}
