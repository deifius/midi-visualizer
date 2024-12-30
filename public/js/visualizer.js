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
  const beatPosition = calculateBeatPosition(timestamp, startTime, tempo);

  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  noteElement.setAttribute('data-pitch', pitch);
  noteElement.style.gridRowStart = pitch;
  noteElement.style.gridColumnStart = `span ${Math.round(beatPosition * 24)}`;

  document.getElementById('music-staff').appendChild(noteElement);
}
