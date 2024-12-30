// app.js (ES module)

// Directly import named functions or the entire file, depending on your setup:
import { initMidi } from './midi-handler.js';
import { initControlPanel } from './control-panel.js';
import { updateStaffPositions, addNoteToStaff, createStaffForDevice } from './visualizer.js';
import { playNote } from './audio-synthesis.js';

// Initialize your app on DOM load
window.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized');

  // Example usage
  initMidi();
  initControlPanel();

  // Initialize visualization with multiple staves for MIDI devices
  const connectedDevices = []; // This should be populated by `setupMidi`

  connectedDevices.forEach((device) => {
    const staffElement = createStaffForDevice(device);
    document.body.appendChild(staffElement);
  });

  // Hook up MIDI events to the visualizer
  document.addEventListener('midi-note-on', (event) => {
    const { noteNumber, timestamp, velocity, startTime, tempo, allNotes, device } = event.detail;
    addNoteToStaff(noteNumber, timestamp, startTime, tempo, allNotes, device);
  });
});

