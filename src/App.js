// App.js
import { setupMidi } from '../public/js/midi-handler.js';
import { initControlPanel } from '../public/js/control-panel.js';

function initApp() {
  setupMidi();
  initControlPanel();
}

export default initApp;

