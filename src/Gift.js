import { useEffect } from 'react';
import './App.scss';
import './assets/images';
import images from './assets/images';
import JSConfetti from 'js-confetti';

const Gift = ({ labelText }) => {
    useEffect(() => {
        const present = document.querySelector('.present');
        const image = document.querySelector('.image');
        const container = document.querySelector('.container');
        const jsConfetti = new JSConfetti({ container });
        const particles = ['🌈', '⚡️', '💥', '✨', '💫', '🌸'];

        const colors = ['#D8589F', '#EE4523', '#FBE75D', '#4FC5DF'];
        const bubbles = 80;

        const explode = (x, y) => {
            let particles = [];
            let ratio = window.devicePixelRatio;
            let c = document.createElement('canvas');
            let ctx = c.getContext('2d');

            c.style.position = 'absolute';
            c.style.left = x - 300 + 'px';
            c.style.top = y - 100 + 'px';
            c.style.pointerEvents = 'none';
            c.style.width = 500 + 'px';
            c.style.height = 500 + 'px';
            c.style.zIndex = 9999;
            c.width = 500 * ratio;
            c.height = 500 * ratio;
            document.body.appendChild(c);

            for (var i = 0; i < bubbles; i++) {
                particles.push({
                    x: c.width / 2,
                    y: c.height / r(2, 4),
                    radius: r(3, 8),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: r(230, 310, true),
                    speed: r(3, 7),
                    friction: 0.99,
                    fade: 0.03,
                    opacity: r(150, 150, true),
                    yVel: 0,
                    gravity: 0.06,
                });
            }

            render(particles, ctx, c.width, c.height);
            setTimeout(() => document.body.removeChild(c), 5000);
        };

        const render = (particles, ctx, width, height) => {
            requestAnimationFrame(() => render(particles, ctx, width, height));
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                p.x += p.speed * Math.cos((p.rotation * Math.PI) / 180);
                p.y += p.speed * Math.sin((p.rotation * Math.PI) / 180);

                p.opacity -= 0.005;
                p.speed *= p.friction;
                p.radius -= p.fade;
                p.yVel += p.gravity;
                p.y += p.yVel;

                if (p.opacity < 0 || p.radius < 0) return;

                ctx.beginPath();
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
                ctx.fill();
            });

            return ctx;
        };

        const r = (a, b, c) =>
            parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0));

        image.addEventListener('mouseover', (e) => {
            const x = image.offsetLeft + 800;
            const y = image.offsetTop - 120;
            explode(x, y);
        });

        const onClickExplode = () => {
            jsConfetti.addConfetti({
                emojis: particles,
                emojiSize: 100,
                confettiNumber: 50,
            });
            const x = image.offsetLeft + 800;
            const y = image.offsetTop - 120;
            explode(x, y);
        };

        container.onclick = () => {
            container.classList.toggle('image-zoomed');
        };

        present.onclick = () => {
            present.classList.toggle('open');
            container.classList.toggle('container-open');
            onClickExplode();
        };

        return () => {
            jsConfetti.clearCanvas();
            image.removeEventListener('mouseover', (e) => {
                const x = image.offsetLeft + 800;
                const y = image.offsetTop - 120;
                explode(x, y);
            });
        };
    }, []);

    let ImageConvertComponent;
    if (labelText === '1st') ImageConvertComponent = images.first;
    else if (labelText === '2nd') ImageConvertComponent = images.second;
    else if (labelText === 'other') ImageConvertComponent = images.other;
    else ImageConvertComponent = images.noimg;

    return (
        <div className="gift">
            <div className="container">
                <div className="image">
                    <img src={ImageConvertComponent} alt={labelText} width={200} />
                </div>
            </div>
            <div className="present">
                <div className="rotate-container">
                    <div className="bottom"></div>
                    <div className="front"></div>
                    <div className="left"></div>
                    <div className="back"></div>
                    <div className="right"></div>

                    <div className="lid">
                        <div className="lid-top"></div>
                        <div className="lid-front"></div>
                        <div className="lid-left"></div>
                        <div className="lid-back"></div>
                        <div className="lid-right"></div>
                    </div>
                </div>

                <div className="instruction">Click to open!</div>
            </div>
        </div>
    );
};

export default Gift;
