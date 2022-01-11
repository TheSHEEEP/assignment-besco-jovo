import { Component, BaseComponent, Intents, Global, Logger, Types } from '@jovotech/framework';
import { ModeSelectOutput } from '../output/ModeSelectOutput'
import * as Machine from '../mysewnetapi/Machine';

/*
  This component is responsible for handling machine mode-related intents.
 */
@Global()
@Component()
export class ModeComponent extends BaseComponent {
  machineIDRegExp :RegExp = /.*?(?<id>\d+).*/g;

  START() {
  }

  @Intents(['ChangeModeIntent'])
  changeMode() {
    // Get the ID of the machine to affect from session data
    let id :string = this.$session.data.machine_id;
    if (id == undefined) {
      this.$session.data.read_machine_id = true;
      return this.$send({ message : 'The ID of the machine is not set. Please respond with the machine ID.'});
    }
    Logger.info('Machine ID: ' + id);

    // Get the mode to change to from the request parameter
    if (this.$entities.mode == undefined) {
      return this.$send(ModeSelectOutput, { message : 'No "mode" intent entity specified for the target mode.\nPlease select which mode you\'d like to pick.'});
    }
    let mode :string = this.$entities.mode!.value;
    Logger.info('Requested mode: ' + mode);

    // We have the data, call the API
    let machineMode :Machine.MachineMode = Machine.MachineMode.INVALID;
    if (mode == "sewing") {
      machineMode = Machine.MachineMode.SEWING;
    }
    else if (mode == "embroidery") {
      machineMode = Machine.MachineMode.EMBROIDERY;
    }
    Machine.setMode(this.$user.accessToken ? this.$user.accessToken : 'No valid user token', id, machineMode);

    return this.$send({ message: 'Machine "' + id + '" changed to ' + mode + ' mode.' });
  }

  @Types(['TEXT'])
  parseText() {
    // We need to get the machine ID from user input
    if (this.$session.data.read_machine_id != undefined && this.$session.data.read_machine_id == true && this.$input.text != undefined) {
      // Make sure we can get an ID from the text
      let regExpMatch :RegExpMatchArray|null = this.machineIDRegExp.exec(this.$input.text);
      if (regExpMatch == null) {
        return this.$send({ message: 'Sorry. I was unable to find the machine ID in your reply: "' + this.$input.text + '"\n Please try again.'});
      }

      // Store the ID
      this.$session.data.machine_id = regExpMatch.groups!.id;
      this.$session.data.read_machine_id = false;
      return this.$send({ message: 'Machine ID set to ' + this.$session.data.machine_id });
    }
    else {
      // Default: Don't do anything
      return this.$send({});
    }
  }
}
