// aboutus.js
let audio = new Audio('./Be Kind.mp3');

// Play audio after the window fires a user interaction event
function setupAudio() {
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Automatic playback started!
        }).catch(error => {
            console.log("Auto-play was prevented by the browser.");
            // Auto-play was prevented, show a play button to the user.
            // You'd need to add a button in your HTML for this.
        });
    }
}

window.addEventListener('click', setupAudio, { once: true });

// Rest of your stopAudio function...
