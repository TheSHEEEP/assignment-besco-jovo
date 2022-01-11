import axios, { AxiosResponse, AxiosError } from 'axios';
import { Logger } from '@jovotech/framework';

// Available machine modes
export enum MachineMode {
  INVALID,
  SEWING,
  EMBROIDERY
}

const MACHINE_URL :string = 'https://service.mysewnet.com/server/rest/messages/--machineID--';

/**
 * Sets the passed mode on the machine with the passed ID.
 * @param  machine_id               The ID of the machine.
 * @param  mode                     The mode to set to. Has to be "sewing" or
 * @return            [description]
 */
export function setMode(user_token :string, machine_id :string, mode :MachineMode) {
  axios.post(
    // URL
    MACHINE_URL.replace('--machineID--', machine_id),
    // Body
    {
      Id: 'enter-mode',
        parameters: [
          {
            key: 'mode',
            value: modeToString(mode)
          }
        ]
    },
    // Headers
    {
      headers : {
        'Session-Token' : user_token
      }
    }
  ).then((response :AxiosResponse) => {
    Logger.info('SetMode API response: ' + response);
  })
  .catch((error :Error|AxiosError) => {
    if (axios.isAxiosError(error)) {
      Logger.error('SetMode API Axios error...');
      let axiosError :AxiosError = error as AxiosError;
      // Request was made and the server responded
      if (axiosError.response) {
        Logger.error('Data: ' + axiosError.response.data);
        Logger.error('Status: ' + axiosError.response.status);
        Logger.error('Headers: ' + axiosError.response.headers);
      }
      // The request was made but no response was received
      else if (axiosError.request) {
        Logger.error('Request: ' + axiosError.request);
      }
      Logger.error('Message: ' + axiosError.message);
    }
    else {
      Logger.error('SetMode API error: ' + error);
    }
  });
}

// Converts the mode enum to an API-compatible string
export function modeToString(mode :MachineMode) :string {
  switch (mode) {
    case MachineMode.INVALID:
      return "Invalid";

    case MachineMode.SEWING:
      return "sew-mode";

    case MachineMode.EMBROIDERY:
      return "embroidery-mode";
  }
}
