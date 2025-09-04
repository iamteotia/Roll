document.addEventListener('DOMContentLoaded', () => {
    const dice = document.getElementById('dice');
    const rollButton = document.getElementById('roll-button');
    const diceSound = document.getElementById('dice-sound');
    let hasAskedForPermission = false;

    // This function asks for permission to use motion sensors
    function requestMotionPermission() {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('devicemotion', handleShake);
                    } else {
                        console.warn('Permission for DeviceMotionEvent was not granted.');
                    }
                })
                .catch(console.error);
        } else {
            // For devices that don't need explicit permission (like Android)
            window.addEventListener('devicemotion', handleShake);
        }
    }
    
    // The main function to roll the dice
    function rollDice() {
        diceSound.currentTime = 0;
        diceSound.play();
        
        dice.style.transition = 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        const randomNum = Math.floor(Math.random() * 6) + 1;

        const randomX = (Math.floor(Math.random() * 4) + 4) * 90;
        const randomY = (Math.floor(Math.random() * 4) + 4) * 90;

        // Apply a random tumbling animation
        dice.style.transform = `translateZ(-75px) rotateX(${randomX}deg) rotateY(${randomY}deg)`;

        setTimeout(() => {
            dice.style.transition = 'transform 0.5s ease-out';
            // Set final rotation based on the random number
            setFinalFace(randomNum);
        }, 1500);
    }
    
    // Helper function to set the final position of the dice
    function setFinalFace(num) {
        let transform;
        switch (num) {
            case 1: transform = 'rotateY(0deg)'; break;
            case 2: transform = 'rotateY(-90deg)'; break;
            case 3: transform = 'rotateX(90deg)'; break;
            case 4: transform = 'rotateX(-90deg)'; break;
            case 5: transform = 'rotateY(90deg)'; break;
            case 6: transform = 'rotateY(180deg)'; break;
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
    let shakeSensitivity = 20;
    let lastShakeTime = 0;

    function handleShake(event) {
        const currentTime = new Date().getTime();
        if ((currentTime - lastShakeTime) > 1000) { // 1-second cooldown
            const { x, y, z } = event.accelerationIncludingGravity;
            const acceleration = Math.sqrt(x * x + y * y + z * z);
            
            if (acceleration > shakeSensitivity) {
                lastShakeTime = currentTime;
                rollDice();
            }
        }
    }
});
