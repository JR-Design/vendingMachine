export const handleSound = (soundName) => {
  if (typeof Audio === 'undefined') {
    console.warn('Audio is not supported in this environment');
    return;
  }

  const soundCollections = {
    coinInsert: [
      '../../public/sounds/coin-insert/coin1.wav',
      '../../public/sounds/coin-insert/coin2.wav',
      '../../public/sounds/coin-insert/coin3.wav',
      '../../public/sounds/coin-insert/coin4.wav',
      '../../public/sounds/coin-insert/coin5.wav'
    ],
    productDispense: ['../../public/sounds/product-dispense.wav'],
    buttonPress: ['../../public/sounds/button-press.wav'],
    changeReturn: ['../../public/sounds/change-return.mp3'],
    error: ['../../public/sounds/error.wav']
  };

  // checks if sound collection exists
  if (!soundCollections[soundName]) {
    console.warn(`Sound collection "${soundName}" not found`);
    return;
  }

  try {
    const collection = soundCollections[soundName];
    
    // Randomly select a sound from the collection
    const randomIndex = Math.floor(Math.random() * collection.length);
    const selectedSound = collection[randomIndex];
    
    const audio = new Audio(selectedSound);
    
    // Randomize volume variation
    const volumeVariation = 0.75 + (Math.random() * 0.25);
    audio.volume = volumeVariation;
    
    // Randomize playback variation 
    const rateVariation = 0.90 + (Math.random() * 0.15);
    audio.playbackRate = rateVariation;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Sound playback was prevented:', error.message);
      });
    }
  } catch (error) {
    console.warn('Error playing sound:', error.message);
  }
};