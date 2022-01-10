import { App } from '@jovotech/framework';
import { ModeComponent } from './components/ModeComponent';

const app = new App({
  components: [ModeComponent],
  plugins: [],
  logging: true,
});

export { app };
