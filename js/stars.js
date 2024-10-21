const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = [];
const numStars = 300; // Increase the number of stars to cover the larger area

function generateStars() {
    stars.length = 0; // Clear existing stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * document.body.scrollHeight, // Generate stars across the entire scrollable height
            radius: Math.random() * 2,
            dx: (Math.random() - 0.5) * 0.3, // Reduce the speed by decreasing the range
            dy: (Math.random() - 0.5) * 0.3  // Reduce the speed by decreasing the range
        });
    }
}

generateStars();

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scrollY = window.scrollY;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    
    stars.forEach(star => {
        const x = star.x;
        const y = star.y - scrollY;
        const length = star.radius * 3;

        ctx.beginPath();
        // Draw 8-point star
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI / 4) * i;
            const xEnd = x + length * Math.cos(angle);
            const yEnd = y + length * Math.sin(angle);
            ctx.moveTo(x, y);
            ctx.lineTo(xEnd, yEnd);
        }
        ctx.stroke();
    });

    // Reset shadow settings to avoid affecting other drawings
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
}

function updateStars() {
    stars.forEach(star => {
        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if (star.y < 0 || star.y > document.body.scrollHeight) star.dy *= -1; // Adjust bounds to scrollable height
    });
}

function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

animate();

// Regenerate stars on resize to ensure they cover the new dimensions
window.addEventListener('resize', generateStars);