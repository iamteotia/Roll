document.addEventListener('DOMContentLoaded', () => {
    const dice = document.getElementById('dice');
    const rollButton = document.getElementById('roll-button');
    const diceSound = document.getElementById('dice-sound');

    // Function to generate a random number and roll the dice
    function rollDice() {
        // Play the sound
        diceSound.currentTime = 0;
        diceSound.play();
        
        // Add a class to trigger the animation
        dice.style.transition = 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

        // Generate a random number between 1 and 6
        const randomNum = Math.floor(Math.random() * 6) + 1;

        // Apply a random rotation for a dynamic roll effect
        const randomX = (Math.floor(Math.random() * 4) + 4) * 90; // Spin at least 1 time
        const randomY = (Math.floor(Math.random() * 4) + 4) * 90;
        const randomZ = (Math.floor(Math.random() * 4) + 4) * 90;

        dice.style.transform = `translateZ(-100px) rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;

        // Set the final rotation to show the correct face after the roll animation
        setTimeout(() => {
            dice.style.transition = 'transform 0.5s ease-out'; // Settle into place
            switch (randomNum) {
                case 1:
                    dice.style.transform = 'translateZ(-100px) rotateY(0deg)';
                    break;
                case 2:
                    dice.style.transform = 'translateZ(-100px) rotateY(-90deg)';
                    break;
                case 3:
                    dice.style.transform = 'translateZ(-100px) rotateX(-90deg)';
                    break;
                case 4:
                    dice.style.transform = 'translateZ(-100px) rotateX(90deg)';
                    break;
                case 5:
                    dice.style.transform = 'translateZ(-100px) rotateY(90deg)';
                    break;
                case 6:
                    dice.style.transform = 'translateZ(-100px) rotateY(180deg)';
                    break;
            }
        }, 1500); // This timeout should match the animation duration
    }

    // Roll dice on button click
    rollButton.addEventListener('click', rollDice);

    // --- Shake to Roll Logic ---
    let shakeSensitivity = 15;
    let lastShakeTime = 0;

    // Check if DeviceMotionEvent is supported
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', (event) => {
            const currentTime = new Date().getTime();
            // Cooldown to prevent multiple rolls from one shake
            if ((currentTime - lastShakeTime) > 1000) { 
                const { x, y, z } = event.accelerationIncludingGravity;
                const acceleration = Math.sqrt(x*x + y*y + z*z);
                
                if (acceleration > shakeSensitivity) {
                    lastShakeTime = currentTime;
                    rollDice();
                }
            }
        });
    } else {
        console.log("Device motion is not supported on this device.");
    }
});
