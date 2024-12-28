// NoteDisplay.js

export function NoteDisplay({ note, velocity }) {
  // Minimal representation of a note
  return `
    <div class="note-display">
      Note: ${note}, Velocity: ${velocity}
    </div>
  `;
}

