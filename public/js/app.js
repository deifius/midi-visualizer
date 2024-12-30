// app.js (ES module)

// Directly import named functions or the entire file, depending on your setup:
import { setupMidi } from './midi-handler.js';
import { initControlPanel } from './control-panel.js';
import { updateVisualization, addNoteToStaff } from './visualizer.js';
import { playNote } from './audio-synthesis.js';

// Initialize your app on DOM load
window.addEventListener('DOMContentLoaded', () => {
  console.log('App initialized');

  // Example usage
  setupMidi();
  initControlPanel();

  // Initialize the visualization with a placeholder staff
  const musicStaff = document.getElementById('music-staff');
  if (!musicStaff) {
    const staffElement = document.createElement('div');
    staffElement.id = 'music-staff';
    staffElement.style.position = 'relative';
    staffElement.style.width = '100%';
    staffElement.style.height = '200px';
    staffElement.style.border = '1px solid black';
    document.body.appendChild(staffElement);
  }

  // Hook up MIDI events to the visualizer
  document.addEventListener('midi-note-on', (event) => {
    const { noteNumber, timestamp, velocity, startTime, tempo, allNotes } = event.detail;
    addNoteToStaff(noteNumber, timestamp, startTime, tempo, allNotes);
  });
});

