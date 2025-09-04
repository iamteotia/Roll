/* General Setup */
body {
    margin: 0;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1a1a2e; /* Fallback background */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* New Animated Bubble Background */
.background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
}

.background-container::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, #9795ef, transparent 60%);
    border-radius: 50%;
    top: -100px;
    left: -100px;
    animation: moveBubble1 20s infinite alternate;
}

.background-container::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, #f9c5d1, transparent 60%);
    border-radius: 50%;
    bottom: -150px;
    right: -150px;
    animation: moveBubble2 25s infinite alternate;
}

@keyframes moveBubble1 {
    from { transform: translate(0, 0) scale(1); }
    to { transform: translate(200px, 300px) scale(1.2); }
}

@keyframes moveBubble2 {
    from { transform: translate(0, 0) scale(1.2); }
    to { transform: translate(-250px, -200px) scale(1); }
}

/* 3D Scene and Dice Container */
.scene {
    width: 150px;
    height: 150px;
    perspective: 800px;
}

.dice {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-d;
    transition: transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform: translateZ(-75px);
    box-shadow: 10px 15px 40px rgba(0, 0, 0, 0.4);
    border-radius: 20px;
}

/* Styling for each face of the die */
.face {
    position: absolute;
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid #ddd;
    border-radius: 20px;
    display: grid;
    padding: 15px;
    box-sizing: border-box;
}

/* Dot Styling */
.dot {
    width: 28px;
    height: 28px;
    background-color: #333;
    border-radius: 50%;
    align-self: center;
    justify-self: center;
}

/* CSS Dot Layouts */
.face.front { grid-template-areas: ". . ." ". a ." ". . ."; }
.front .dot:nth-child(1) { grid-area: a; }

.face.left { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
.left .dot:nth-child(1) { align-self: start; justify-self: start; }
.left .dot:nth-child(2) { align-self: end; justify-self: end; }

.face.top { grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); }
.top .dot:nth-child(1) { grid-area: 1 / 1; }
.top .dot:nth-child(2) { grid-area: 2 / 2; }
.top .dot:nth-child(3) { grid-area: 3 / 3; }

.face.bottom { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); gap: 20px;}

.face.right { grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); }
.right .dot:nth-child(1) { grid-area: 1 / 1; }
.right .dot:nth-child(2) { grid-area: 1 / 3; }
.right .dot:nth-child(3) { grid-area: 2 / 2; }
.right .dot:nth-child(4) { grid-area: 3 / 1; }
.right .dot:nth-child(5) { grid-area: 3 / 3; }

.face.back { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(3, 1fr); gap: 15px 20px;}

/* Positioning the faces to form a cube */
.front  { transform: rotateY(  0deg) translateZ(75px); }
.back   { transform: rotateY(180deg) translateZ(75px); }
.right  { transform: rotateY( 90deg) translateZ(75px); }
.left   { transform: rotateY(-90deg) translateZ(75px); }
.top    { transform: rotateX( 90deg) translateZ(75px); }
.bottom { transform: rotateX(-90deg) translateZ(75px); }

/* iOS Style 'Roll' Button */
.roll-button {
    position: fixed;
    bottom: 40px;
    padding: 15px 40px;
    border-radius: 30px;
    border: none;
    font-size: 20px;
    font-weight: 600;
    color: #000;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, background 0.2s ease;
    z-index: 10;
}

.roll-button:hover {
    transform: scale(1.05);
}

.roll-button:active {
    transform: scale(0.98);
}
