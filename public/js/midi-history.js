// MIDI History module for storing and managing MIDI events

const midiHistory = {
  events: [], // Flat list of all MIDI events
  byChannel: new Map(), // Map of channel number to event lists
  byMeasure: new Map(), // Map of measure number to event lists
  annotations: new Map(), // Map of measure or timestamp to annotations
  config: {
    tempo: 120, // Default tempo in BPM
    beatsPerMeasure: 4, // Default time signature
  },
};

// Helper: Calculate measure number based on timestamp
function getMeasureNumber(timestamp) {
  const millisPerBeat = (60 / midiHistory.config.tempo) * 1000;
  const millisPerMeasure = millisPerBeat * midiHistory.config.beatsPerMeasure;
  return Math.floor(timestamp / millisPerMeasure);
}

// Store a MIDI event in the history
export function storeMidiEvent(event) {
  midiHistory.events.push(event);

  // Store by channel
  if (!midiHistory.byChannel.has(event.channel)) {
    midiHistory.byChannel.set(event.channel, []);
  }
  midiHistory.byChannel.get(event.channel).push(event);

  // Store by measure
  const measureNumber = getMeasureNumber(event.timestamp);
  if (!midiHistory.byMeasure.has(measureNumber)) {
    midiHistory.byMeasure.set(measureNumber, []);
  }
  midiHistory.byMeasure.get(measureNumber).push(event);

  console.log(`Stored MIDI Event:`, event);
}

// Annotate measures or timestamps
export function annotateMeasure(measureNumber, annotation) {
  if (!midiHistory.annotations.has(measureNumber)) {
    midiHistory.annotations.set(measureNumber, []);
  }
  midiHistory.annotations.get(measureNumber).push(annotation);
  console.log(`Annotated Measure ${measureNumber}:`, annotation);
}

export function annotateTimestamp(timestamp, annotation) {
  midiHistory.annotations.set(timestamp, annotation);
  console.log(`Annotated Timestamp ${timestamp}:`, annotation);
}

// Retrieve annotations
export function getAnnotationsByMeasure(measureNumber) {
  return midiHistory.annotations.get(measureNumber) || [];
}

export function getAnnotationByTimestamp(timestamp) {
  return midiHistory.annotations.get(timestamp) || null;
}

// Retrieve events by channel
export function getEventsByChannel(channel) {
  return midiHistory.byChannel.get(channel) || [];
}

// Retrieve events by measure
export function getEventsByMeasure(measureNumber) {
  return midiHistory.byMeasure.get(measureNumber) || [];
}

// Retrieve all events
export function getAllEvents() {
  return midiHistory.events;
}

// Clear the history
export function clearHistory() {
  midiHistory.events = [];
  midiHistory.byChannel.clear();
  midiHistory.byMeasure.clear();
  midiHistory.annotations.clear();
  console.log('MIDI history cleared.');
}

// Set configuration (e.g., tempo or beats per measure)
export function setConfig(newConfig) {
  Object.assign(midiHistory.config, newConfig);
  console.log('MIDI configuration updated:', midiHistory.config);
}
```


