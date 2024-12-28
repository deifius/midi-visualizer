// pd-engine.js

// If loading via a <script> tag, WebPd is usually available as a global object named Pd.
// If installing via npm, you'd: import Pd from 'webpd';

let patch = null;

export async function initPd() {
  try {
    // Load the .pd patch as text
    const pdPatchUrl = 'pd/main.pd';
    const response = await fetch(pdPatchUrl);
    const patchText = await response.text();

    // Load the patch into WebPd
    patch = Pd.loadPatch(patchText);
    console.log('Pd patch loaded:', patch);

    // Attach event listeners for messages coming from Pd
    Pd.on('chord-name', (chord) => {
      console.log('Detected chord from Pd:', chord);
      // Update your UI or send to visualizer
      // e.g. document.querySelector('#chord-display').textContent = chord;
    });

    Pd.on('key-signature', (key) => {
      console.log('Detected key signature from Pd:', key);
      // Update your UI or send to visualizer
    });

    Pd.on('beat', () => {
      console.log('Got a beat pulse from Pd');
      // Could animate a metronome light, for example
    });

  } catch (error) {
    console.error('Error loading Pd patch:', error);
  }
}

/**
 * Send raw MIDI messages to the patch.
 * Typically called by your handleMidiMessage in midi-handler.js
 */
export function sendMidiMessage(status, note, velocity) {
  // Our main patch might be listening for "midi-in" (like in main.pd)
  Pd.send('midi-in', [status, note, velocity]);
}

