import { BaseOutput, Output, OutputTemplate } from '@jovotech/framework';

@Output()
export class ModeSelectOutput extends BaseOutput {

  // Build the template
  build(): OutputTemplate | OutputTemplate[] {
    return {
      quickReplies: [
        {
          text: 'Sewing',
          intent: 'ChangeModeIntent',
          entities: {
            mode: {
              value: 'sewing',
            },
          },
        },
        {
          text: 'Embroidery',
          intent: 'ChangeModeIntent',
          entities: {
            mode: {
              value: 'embroidery',
            },
          },
        }
      ]
    };
  }
}
