document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const colorsArray = ['#FF69B4', '#FF1493', '#DB7093', '#C71585'];

    class Particle {
        constructor(x, y, size, color, velocityX, velocityY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            if (this.size > 0.2) this.size -= 0.1;
        }
    }

    function addParticle(e) {
        const x = e.clientX;
        const y = e.clientY;
        const size = Math.random() * 2 + 1;
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        const velocityX = (Math.random() - 0.5) * 2;
        const velocityY = (Math.random() - 0.5) * 2;
        particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particlesArray.length - 1; i >= 0; i--) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (particlesArray[i].size <= 0.3) {
                particlesArray.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    }

    canvas.addEventListener('click', addParticle);
    animate();

    const message = document.getElementById('message');

    function getSpecialMessage() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // 月份从0开始，所以需要加1
        if (month === 5 && day === 20) {
            message.textContent = '在这个特别的日子里，520 爱你！';
        } else {
            message.textContent = '520 爱你';
        }
    }

    window.onload = function () {
        getSpecialMessage();
    };

    function toggleRose() {
        const rose = document.querySelector('.rose');
        rose.classList.toggle('open');
    }
});
