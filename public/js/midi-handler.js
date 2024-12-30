import { midiHistory, storeMidiEvent } from './midi-history.js';
import { addNoteToStaff } from './visualizer.js';

// Track last control change to throttle high-frequency events
let lastControlChange = {};
function handleControlChange(channel, controller, value) {
  const key = `${channel}-${controller}`;
  const now = performance.now();
  if (!lastControlChange[key] || now - lastControlChange[key].time > 10 || Math.abs(value - lastControlChange[key].value) > 5) {
    lastControlChange[key] = { time: now, value };
    console.log(`Control Change: Controller ${controller}, Value ${value}`);
  }
}

//
export function handleMidiMessage(event) {
  const [status, data1, data2] = event.data;
  const channel = status & 0x0f;
  const messageType = status & 0xf0;

  let type;

  if (messageType === 0x90 && data2 > 0) { // Note On
    type = 'noteOn';
    console.log(`Note ON: ${data1} with velocity ${data2}`);
    addNoteToStaff(data1, performance.now(), midiHistory.events[0]?.timestamp || performance.now(), midiHistory.config.tempo);
  } else if (messageType === 0x80 || (messageType === 0x90 && data2 === 0)) { // Note Off
    type = 'noteOff';
    console.log(`Note OFF: ${data1}`);
  } else if (messageType === 0xc0) { // Program Change
    type = 'programChange';
    console.log(`Program Change: Program ${data1} on channel ${channel}`);
  } else if (messageType === 0xb0) { // Control Change
    type = 'controlChange';
    handleControlChange(channel, data1, data2);
  } else if (messageType === 0xe0) { // Pitch Bend
    type = 'pitchBend';
    const bendValue = (data2 << 7) | data1;
    console.log(`Pitch Bend: Value ${bendValue} on channel ${channel}`);
  } else {
    type = 'unknown';
    console.log(`Unknown MIDI message: Status ${status}, Data1 ${data1}, Data2 ${data2}`);
  }

  // Create MIDI event object
  const midiEvent = {
    timestamp: performance.now(),
    channel,
    type,
    data1, // Note, Program, or Controller number
    data2, // Velocity, Controller value, or Bend amount
  };

  // Store the event in history if significant
  if (type !== 'controlChange' && type !== 'pitchBend') {
    storeMidiEvent(midiEvent);
  }
}

// Initialize MIDI input
export function initMidi() {
  navigator.requestMIDIAccess().then((midiAccess) => {
    midiAccess.inputs.forEach((input) => {
      input.onmidimessage = handleMidiMessage;
    });
  });
}
