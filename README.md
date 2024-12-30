# MIDI Visualizer

Welcome to the MIDI Visualizer Project! This is an exciting tool for visualizing MIDI data in real time. The project aims to provide a fun and educational experience for developers, musicians, and MIDI enthusiasts. Whether you're here to contribute, learn, or just explore, we hope you'll find this project engaging and inspiring.

## Getting Started

1. **Clone** this repository.
2. **Install dependencies** (if using npm or yarn):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run start
   ```
4. Open `http://localhost:5173` (or similar) in your browser.

## Features

- ~~Real-time MIDI input using the Web MIDI API~~
- ~~Dynamic control panel (channels, volume, instrument switching)~~
- Sheet music rendering
- Beat and meter detection
- Bar line placement based on inferred downbeats

---

## Project Outline

### High-Level Steps

1. **Set Up the Canvas Environment**

   - Create a drawing area using HTML5 Canvas.
   - Define the dimensions and ensure the canvas resizes dynamically based on the viewport.

2. **Process MIDI Input**

   - ~~Use the Web MIDI API to detect connected devices.~~
   - ~~Set up a listener for incoming MIDI events (e.g., note on, note off).~~
   - Store MIDI events in a history object for later analysis and rendering.

3. **Render Notes to the Staff**

   - ~~Convert MIDI note numbers to pitches.~~
   - Calculate the horizontal position of notes based on their timestamps.
   - Dynamically adjust vertical positions to fit within the staff.
   - Draw note heads on the staff using the calculated positions.

4. **Integrate Meter and Beat Detection**

   - Implement a beat-detection algorithm to infer downbeats.
   - Use the detected beats to define meter (e.g., 4/4, 3/4).
   - Dynamically place bar lines on the staff based on the detected meter.

5. **Enhance the Control Panel**

   - Add toggles for hiding/showing instruments in the visualization.
   - Include a placeholder for dynamic synesthesia-style icons for each channel/instrument.

6. **Add Interactivity**

   - Allow users to zoom in/out and scroll through the rendered music.
   - Enable playback controls to replay the visualization in sync with MIDI data.

7. **Optimize Performance**

   - Use efficient rendering techniques to handle a large volume of MIDI events.
   - Implement throttling or debouncing for high-frequency MIDI messages.

8. **Testing and Documentation**

   - Write unit tests for critical components.
   - Provide clear documentation on how to use and contribute to the project.

---

## Contributions

We welcome contributions from developers, musicians, and enthusiasts of all skill levels! Please feel free to fork the repository, make changes, and submit a pull request. If you encounter any issues or have feature suggestions, don't hesitate to open an issue.

---

Thank you for exploring the MIDI Visualizer Project. Happy coding and music-making!

