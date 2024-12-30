# MIDI Visualizer

A browser-based MIDI visualization tool.

## Getting Started

1. **Clone** this repository.
2. **Install dependencies** (if using npm or yarn):
   ```bash
   npm install

Run the dev server (with Vite, for example):
bash
Copy code
npm run start
Open http://localhost:5173 (or similar) in your browser.
Features
Real-time MIDI input using the Web MIDI API
Dynamic control panel (channels, volume, instrument switching)
Basic audio playback (optional, powered by Tone.js)
Sheet music rendering (optional, powered by VexFlow)
yaml
Copy code
# MIDI Visualizer Project - Canvas Implementation Steps

## High-Level Steps
1. **Set Up the Canvas Environment**
   - Create a drawing area using HTML5 Canvas.
   - Define the dimensions and ensure the canvas resizes dynamically based on the viewport.

2. **Integrate MIDI Input**
   - Use the Web MIDI API to capture real-time MIDI events.
   - Process MIDI messages to extract note-on, note-off, and velocity data.
   - Log events and verify correct data handling.

3. **Render Notes on the Canvas**
   - Map MIDI note numbers to positions on a musical staff (e.g., G4, A4).
   - Draw notes dynamically on the canvas.
   - Implement a scrolling effect to simulate a moving sheet of music.

4. **Add a Control Panel**
   - Display active channels and their instruments.
   - Show dynamic, pulsing emojis synced with MIDI data.
   - Include toggle boxes to show/hide specific channels or streams.
   - Use a minimal icon style for emojis to represent the range and function of instruments:
     - Monophonic instruments are displayed with a single color, reflecting synesthetic tone/color relationships.
     - Chordal instruments are displayed with stacked colors to represent harmonies.
     - Low register instruments have color concentrated in the bottom left, while high register instruments concentrate in the top right.

5. **Implement Real-Time Scrolling**
   - Smoothly move notes from right to left.
   - Adjust scrolling speed based on tempo.
   - Ensure proper cleanup of notes that leave the canvas.

6. **Sync Visualization with Dynamics**
   - Use velocity data to vary note size or intensity.
   - Highlight notes based on channel or other parameters.

7. **Implement Scripted Amendments to Prior Measures**
   - Begin recording all MIDI channels and maintain a model of MIDI events in browser memory upon page load.
   - Allow for scripted amendments to prior measures using tools such as PD patches, JavaScript, or Python scripts.
   - Update the visualization dynamically in real time when amendments are applied.

8. **Optimize Performance**
   - Ensure low latency for real-time rendering.
   - Optimize canvas rendering for smooth playback on various devices.
   - Handle a large number of simultaneous notes efficiently.

9. **Test and Debug**
   - Verify MIDI input and rendering accuracy.
   - Ensure compatibility with different MIDI devices.
   - Debug any graphical or performance issues.

---

## Breaking Down Each Step

### Step 1: Set Up the Canvas Environment
- Subtasks:
  - Create an `HTML` file with a `<canvas>` element.
  - Use JavaScript to initialize the canvas context (`2D` or `WebGL`).
  - Implement dynamic resizing for responsiveness.

### Step 2: Integrate MIDI Input
- Subtasks:
  - Request MIDI access using the Web MIDI API.
  - Identify connected MIDI devices and their properties.
  - Log incoming MIDI messages for debugging.

### Step 3: Render Notes on the Canvas
- Subtasks:
  - Define a mapping function to convert MIDI note numbers to canvas positions.
  - Draw notes as circles, rectangles, or notation symbols.
  - Create a buffer for incoming notes to render them in sequence.

### Step 4: Add a Control Panel
- Subtasks:
  - Use HTML/CSS for the control panel layout.
  - Dynamically list active channels and their instrument names.
  - Implement emoji animations and checkboxes for toggling streams.
  - Design emojis to represent instrument range and function:
    - Use single colors for monophonic instruments.
    - Stack colors for chordal instruments to reflect harmony.
    - Map low register instruments to bottom-left concentrated colors and high registers to top-right concentrated colors.

### Step 5: Implement Real-Time Scrolling
- Subtasks:
  - Calculate the scroll speed based on tempo or user input.
  - Use `requestAnimationFrame` for smooth animation.
  - Remove notes that move out of view to free memory.

### Step 6: Sync Visualization with Dynamics
- Subtasks:
  - Scale note size or brightness based on velocity.
  - Use different colors or styles for each channel.
  - Highlight active notes to improve user experience.

### Step 7: Implement Scripted Amendments to Prior Measures
- Subtasks:
  - Set up a data model to store MIDI events for all channels in browser memory.
  - Allow scripts or patches to apply retrospective changes to past measures.
  - Update the canvas in real time to reflect these changes.
  - Define hooks or APIs for integrating external scripts or patches.

### Step 8: Optimize Performance
- Subtasks:
  - Batch render notes to reduce draw calls.
  - Use efficient data structures for managing notes.
  - Test rendering performance on various devices and browsers.

### Step 9: Test and Debug
- Subtasks:
  - Verify that note positions match expected musical pitches.
  - Test with multiple MIDI devices for compatibility.
  - Fix any graphical glitches or timing issues.

Approach to Beat Detection and Meter Inference:

MIDI Data Parsing:

Use libraries like JZZ.js or MIDI.js to capture and parse MIDI messages.
Extract note-on events, timestamps, and velocities for analysis.
Inter-Onset Interval (IOI) Analysis:

Calculate the time intervals between successive note-on events.
Analyze these intervals to identify repeating patterns indicative of beats.
Tempo Estimation:

Determine the most common IOI to estimate the tempo (beats per minute).
This involves statistical analysis to find the predominant time interval.
Meter and Downbeat Detection:

Analyze the distribution and grouping of beats to infer the meter (e.g., 4/4, 3/4).
Identify stronger beats (downbeats) that typically signify the beginning of a measure.
Bar Line Placement:

Once the meter and downbeats are identified, place bar lines accordingly in your visualization.
Considerations:

Complexity of MIDI Performances:

Live MIDI performances may have tempo fluctuations and expressive timing, making analysis more challenging.
Pre-processed MIDI files with strict timing are easier to analyze.
Polyphonic Textures:

Chordal passages and polyphony add complexity to beat detection.
Isolate individual voices or focus on a specific channel if possible.
Real-Time Processing:

Real-time beat detection requires efficient algorithms to minimize latency.
Batch processing of MIDI files can afford more computationally intensive analysis.
Implementation Steps:

Set Up MIDI Input:

Use JZZ.js to access MIDI devices and receive MIDI messages.
Set up event listeners for MIDI input.
Extract and Store Note Events:

Capture note-on events with their timestamps.
Store these events in a structured format for analysis.
Analyze Timing Patterns:

Compute IOIs between successive notes.
Use statistical methods to identify the predominant IOI corresponding to the beat.
Infer Meter and Place Bar Lines:

Analyze the pattern of beats to determine the meter.
Identify downbeats and place bar lines in your visualization accordingly.
