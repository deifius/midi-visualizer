// visualizer.js

export function updateVisualization(noteData) {
  // noteData could be { note, velocity, channel } etc.
  console.log('Visualizing note:', noteData);
  // Implement your real-time scrolling or sheet music updates here.
}

// Convert MIDI note number to pitch
export function midiNoteToPitch(noteNumber) {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(noteNumber / 12) - 1;
  const note = noteNames[noteNumber % 12];
  return `${note}${octave}`;
}

// Add a note to the staff
export function addNoteToStaff(noteNumber, timestamp, startTime, tempo, events, deviceName) {
  const pitch = midiNoteToPitch(noteNumber);
  const beatPosition = calculateBeatPosition(timestamp, startTime, tempo);

  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  noteElement.setAttribute('data-pitch', noteNumber);
  noteElement.setAttribute('data-device', deviceName);

  // Calculate vertical position dynamically based on global min/max pitch for this staff
  const staffElement = document.querySelector(`#staff-${deviceName}`);
  if (!staffElement) {
    console.error(`Staff for device ${deviceName} not found.`);
    return;
  }

  // Add the note to the staff
  staffElement.appendChild(noteElement);

  // Update the vertical range and reposition all notes
  updateVerticalRange(noteNumber, deviceName);
}

// Update the vertical range for a specific device
export function updateVerticalRange(noteNumber, deviceName) {
  const staffElement = document.querySelector(`#staff-${deviceName}`);
  if (!staffElement) {
    console.error(`Staff for device ${deviceName} not found.`);
    return;
  }

  // Dynamically update vertical ranges based on new note
  const notes = Array.from(staffElement.querySelectorAll('.note'));
  const pitches = notes.map(note => parseInt(note.getAttribute('data-pitch'), 10));
  const minPitch = Math.min(...pitches, noteNumber);
  const maxPitch = Math.max(...pitches, noteNumber);

  staffElement.dataset.minPitch = minPitch;
  staffElement.dataset.maxPitch = maxPitch;

  // Recalculate positions for all notes
  updateNotePositions(staffElement, minPitch, maxPitch);
}

// Recalculate vertical positions for all notes in a staff
function updateNotePositions(staffElement, minPitch, maxPitch) {
  const notes = Array.from(staffElement.querySelectorAll('.note'));
  const pitchRange = maxPitch - minPitch || 1; // Avoid division by zero

  notes.forEach(note => {
    const pitch = parseInt(note.getAttribute('data-pitch'), 10);
    const normalizedPitch = ((pitch - minPitch) / pitchRange) * 100;
    note.style.top = `${100 - normalizedPitch}%`;
  });
}

// Create a staff element for a specific device
export function createStaffForDevice(deviceName) {
  const staffContainer = document.createElement('div');
  staffContainer.classList.add('staff-container');
  staffContainer.id = `staff-${deviceName}`;

  // Add a label for the device name
  const deviceLabel = document.createElement('div');
  deviceLabel.classList.add('staff-label');
  deviceLabel.textContent = deviceName;
  staffContainer.appendChild(deviceLabel);

  // Add the staff element
  const staffElement = document.createElement('div');
  staffElement.classList.add('staff');
  staffContainer.appendChild(staffElement);

  return staffContainer;
}

// Calculate the beat position based on timestamp
function calculateBeatPosition(timestamp, startTime, tempo) {
  const timeElapsed = timestamp - startTime;
  const beatsElapsed = (timeElapsed / 1000) / (60 / tempo);

  // Log the calculation details
  console.log(`calculateBeatPosition - timestamp: ${timestamp}, startTime: ${startTime}, tempo: ${tempo}, timeElapsed: ${timeElapsed}, beatsElapsed: ${beatsElapsed}`);

  return Math.max(0, beatsElapsed); // Ensure beat position is non-negative
}

// Update horizontal positions for all notes in a staff
export function updateStaffPositions(events, tempo) {
  const staffs = document.querySelectorAll('.staff-container .staff');
  staffs.forEach(staff => {
    const deviceName = staff.id.replace('staff-', '');
    const notes = Array.from(staff.querySelectorAll('.note'));

    // Get staff width for adaptive scaling
    const staffWidth = staff.offsetWidth || 800; // Default to 800 if no width is defined
    const scalingFactor = staffWidth / 16; // Assuming 16 beats per bar or customizable

    console.log(`Staff width: ${staffWidth}, Scaling factor: ${scalingFactor}`);

    notes.forEach(note => {
      const timestamp = parseFloat(note.getAttribute('data-timestamp'));
      const startTime = events[0]?.timestamp || performance.now();

      // Calculate the beat position for this note
      const beatPosition = calculateBeatPosition(timestamp, startTime, tempo);

      console.log(`Note beat position: ${beatPosition}, Calculated left position: ${beatPosition * scalingFactor}px`);

      // Position note horizontally based on beat
      note.style.left = `${beatPosition * scalingFactor}px`; // Scale dynamically
    });
  });
}


