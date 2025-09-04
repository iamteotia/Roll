document.addEventListener('DOMContentLoaded', () => {
    const dice = document.getElementById('dice');
    const rollButton = document.getElementById('roll-button');
    const diceSound = document.getElementById('dice-sound');
    let hasAskedForPermission = false;
    let isRolling = false; // To prevent multiple rolls during animation

    // This function asks for permission to use motion sensors (for iOS)
    function requestMotionPermission() {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleShake);
                        console.log('Device motion permission granted.');
                    } else {
                        console.warn('Permission for DeviceMotionEvent was not granted.');
                    }
                })
                .catch(console.error);
        } else {
            // For devices that don't need explicit permission (like most Androids)
            window.addEventListener('devicemotion', handleShake);
            console.log('Device motion listener added (no explicit permission needed).');
        }
    }
    
    // The main function to roll the dice
    function rollDice() {
        if (isRolling) return; // Prevent new rolls while already rolling
        isRolling = true;

        // Play the sound
        diceSound.currentTime = 0;
        diceSound.play();
        
        // Add transition for rolling animation
        dice.style.transition = 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

        // Generate a random number between 1 and 6
        const randomNum = Math.floor(Math.random() * 6) + 1;

        // Apply random rotations for a dynamic roll effect (multiple spins)
        const randomX = (Math.floor(Math.random() * 5) + 3) * 90 + (randomNum * 90); // Spin 3-7 times + target for result
        const randomY = (Math.floor(Math.random() * 5) + 3) * 90 + (randomNum * 90);
        const randomZ = (Math.floor(Math.random() * 5) + 3) * 90 + (randomNum * 90);


        // Initial wild tumble
        dice.style.transform = `translateZ(-75px) rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;

        // After the main animation, settle into the correct face
        setTimeout(() => {
            dice.style.transition = 'transform 0.5s ease-out'; // Settle more gently
            setFinalFace(randomNum);
            diceSound.pause(); // Stop sound when dice settles
            diceSound.currentTime = 0; // Reset sound for next roll
            isRolling = false;
        }, 1500); // This timeout should match the animation duration
    }
    
    // Helper function to set the final position of the dice to show the correct face
    function setFinalFace(num) {
        let transform;
        // These rotations orient the dice so the correct face points up
        switch (num) {
            case 1: transform = 'rotateX(0deg) rotateY(0deg)'; break;   // Front (1)
            case 2: transform = 'rotateY(-90deg)'; break;               // Left (2)
            case 3: transform = 'rotateX(-90deg)'; break;               // Top (3)
            case 4: transform = 'rotateX(90deg)'; break;                // Bottom (4)
            case 5: transform = 'rotateY(90deg)'; break;                // Right (5)
            case 6: transform = 'rotateY(180deg)'; break;               // Back (6)
            default: transform = 'rotateX(0deg) rotateY(0deg)'; break;
        }
        dice.style.transform = `translateZ(-75px) ${transform}`;
    }

    // Roll dice on button click and ask for permission on the first click
    rollButton.addEventListener('click', () => {
        if (!hasAskedForPermission) {
            requestMotionPermission();
            hasAskedForPermission = true;
        }
        rollDice();
    });

    // --- Shake to Roll Logic ---
    let shakeSensitivity = 20; // Adjust this value to make it more or less sensitive
    let lastShakeTime = 0;

    function handleShake(event) {
        const currentTime = new Date().getTime();
        if ((currentTime - lastShakeTime) > 1500 && !isRolling) { // 1.5-second cooldown + not rolling check
            const { x, y, z } = event.accelerationIncludingGravity;
            // Calculate total acceleration magnitude
            const acceleration = Math.sqrt(x * x + y * y + z * z);
            
            if (acceleration > shakeSensitivity) {
                lastShakeTime = currentTime;
                rollDice();
            }
        }
    }
});
