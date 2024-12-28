let connectedDevices = [];

// Initialize the control panel
export function initControlPanel() {
  const deviceList = document.getElementById('device-list');
  const channelInfo = document.getElementById('channel-info');

  console.log('Initializing control panel...');
  deviceList.innerHTML = ''; // Ensure the list starts empty
  channelInfo.innerHTML = '';

  navigator.requestMIDIAccess().then((midiAccess) => {
    console.log('MIDI access obtained:', midiAccess);

    // Iterate over all connected MIDI inputs
    midiAccess.inputs.forEach((input) => {
      console.log('Found MIDI device:', input.name);

      // Create a list item for the device
      const deviceItem = document.createElement('li');
      deviceItem.textContent = input.name;
      console.log('Device item created:', deviceItem);

      // Append to the device list
      deviceList.appendChild(deviceItem);
      console.log('Device appended to #device-list:', input.name);
    });
  }).catch((error) => {
    console.error('Failed to get MIDI access:', error);
  });
}

// Handle MIDI messages
function handleMidiMessage(event, channelInfo) {
  const [status, data1, data2] = event.data;
  const messageType = status & 0xf0;
  const channel = status & 0x0f;

  // Update channel information
  if (messageType === 0xc0) { // Program Change (Instrument Change)
    const instrument = data1; // MIDI Program number
    updateChannelInfo(channelInfo, channel, `Instrument: ${instrument}`);
  } else if (messageType === 0xb0) { // Control Change
    updateChannelInfo(channelInfo, channel, `Control Change: ${data1} (${data2})`);
  } else if (messageType === 0xe0) { // Pitch Bend
    updateChannelInfo(channelInfo, channel, `Pitch Bend: ${data1 + (data2 << 7)}`);
  }
}

// Update Channel Info Display
function updateChannelInfo(channelInfo, channel, message) {
  let channelItem = document.querySelector(`#channel-${channel}`);
  if (!channelItem) {
    channelItem = document.createElement('li');
    channelItem.id = `channel-${channel}`;
    channelItem.innerHTML = `
      <span>Channel ${channel + 1}</span>
      <span class="synesthesia-icon"></span>
    `;
    channelInfo.appendChild(channelItem);
  }
  channelItem.querySelector('span').textContent = `Channel ${channel + 1}: ${message}`;

  // Dynamically update the synesthesia icon (placeholder logic)
  const icon = channelItem.querySelector('.synesthesia-icon');
  icon.style.backgroundColor = getSynesthesiaColor(channel);
}

// Generate Synesthesia Color (Example Logic)
function getSynesthesiaColor(channel) {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  return colors[channel % colors.length];
}

