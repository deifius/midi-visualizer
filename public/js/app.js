// app.js (ES module)

// Directly import named functions or the entire file, depending on your setup:
// import { setupMidi } from './midi-handler.js';
import { initControlPanel } from './control-panel.js';
import { updateVisualization } from './visualizer.js';
import { playNote } from './audio-synthesis.js';
// If you need them, also import './utils.js' or './pd-engine.js'

import { initMidi } from './midi-handler.js';

document.addEventListener('DOMContentLoaded', () => {
  initMidi();
});

// Initialize your app on DOM load
window.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized');

  // Example usage
  // setupMidi();
  initControlPanel();
  updateVisualization({ note: 60, velocity: 80 });  // test
  playNote(60, 100, 1);  // test
});
