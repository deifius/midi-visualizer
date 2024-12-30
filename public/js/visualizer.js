// visualizer.js

export function updateVisualization(noteData) {
  // noteData could be { note, velocity, channel } etc.
  console.log('Visualizing note:', noteData);
  // Implement your real-time scrolling or sheet music updates here.
}

// Convert MIDI note number to pitch
function midiNoteToPitch(noteNumber) {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(noteNumber / 12) - 1;
  const note = noteNames[noteNumber % 12];
  return `${note}${octave}`;
}

// Calculate the beat position based on timestamp
function calculateBeatPosition(timestamp, startTime, tempo) {
  const timeElapsed = timestamp - startTime;
  const beatsElapsed = (timeElapsed / 1000) / (60 / tempo);
  return beatsElapsed;
}

// Add a note to the staff
export function addNoteToStaff(noteNumber, timestamp, startTime, tempo) {
  const pitch = midiNoteToPitch(noteNumber);
  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  noteElement.setAttribute('data-pitch', pitch);

  // Store note's timestamp as a data attribute
  noteElement.setAttribute('data-timestamp', timestamp);

  // Initially position the note (will be adjusted later)
  noteElement.style.top = `${100 - (noteNumber - 20) * 3}px`; // Simplified for vertical positioning

  document.getElementById('music-staff').appendChild(noteElement);
}

// Update horizontal positions of all notes
export function updateStaffPositions(events, tempo) {
  const staff = document.getElementById('music-staff');
  const notes = staff.querySelectorAll('.note');

  if (events.length === 0) return;

  const startTime = events[0].timestamp;
  const endTime = events[events.length - 1].timestamp;
  const duration = endTime - startTime;
  const staffWidth = staff.clientWidth;

  notes.forEach((note) => {
    const timestamp = parseFloat(note.getAttribute('data-timestamp'));
    const relativePosition = (timestamp - startTime) / duration;
    note.style.left = `${relativePosition * staffWidth}px`;
  });
}

