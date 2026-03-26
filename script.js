// Emotion Burst Effect for "opens"
const opensElement = document.querySelector('.interactive-opens');

if (opensElement) {
  opensElement.addEventListener('mouseenter', function() {
    // Check if animation already triggered
    if (this.getAttribute('data-hover-active') === 'true') {
      return;
    }

    // Mark as active to prevent retriggering
    this.setAttribute('data-hover-active', 'true');

    // Emoji set for emotional overload
    const emojis = ['💥', '❤️', '✨', '🌟', '💫', '🔥'];
    const emojiCount = 6;

    // Get the position of the word
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create emoji elements
    for (let i = 0; i < emojiCount; i++) {
      const emojiEl = document.createElement('div');
      emojiEl.className = 'emoji-burst';
      emojiEl.textContent = emojis[i % emojis.length];

      // Calculate orbit position
      const angle = (i / emojiCount) * Math.PI * 2;
      const orbitRadius = 60;

      // Initial position (at the center)
      emojiEl.style.left = centerX + 'px';
      emojiEl.style.top = centerY + 'px';

      // Store the target position
      const targetX = centerX + Math.cos(angle) * orbitRadius;
      const targetY = centerY + Math.sin(angle) * orbitRadius;

      emojiEl.style.setProperty('--target-x', targetX + 'px');
      emojiEl.style.setProperty('--target-y', targetY + 'px');

      document.body.appendChild(emojiEl);

      // Trigger animation
      requestAnimationFrame(() => {
        emojiEl.classList.add('animate');
      });

      // Remove after animation completes
      setTimeout(() => {
        emojiEl.remove();
      }, 1500);
    }

    // Reset after animation completes so it can trigger again on next hover
    setTimeout(() => {
      this.setAttribute('data-hover-active', 'false');
    }, 1500);
  });
}

// Water Drowning Effect
const drowningElement = document.querySelector('.interactive-drowning');
const waterContainer = document.getElementById('water-container');

function createWaveSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 1200 120');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.classList.add('wave');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z');
  path.setAttribute('fill', 'currentColor');

  svg.appendChild(path);
  return svg;
}

// Canvas Wave Animation (from CodePen nKKwQe)
const canvasWave = document.getElementById('canvas-wave');
let waveCtx, waveAnimationId, wavePoints = [], waveTick = 0;

function initWaveCanvas() {
  if (!canvasWave) return;
  waveCtx = canvasWave.getContext('2d');
  resizeWaveCanvas();
  window.addEventListener('resize', resizeWaveCanvas);
}

function resizeWaveCanvas() {
  if (!canvasWave) return;
  canvasWave.width = window.innerWidth;
  canvasWave.height = window.innerHeight;
}

function createWavePoints() {
  const pointCount = 12;
  const spacing = canvasWave.width / pointCount;
  wavePoints = [];
  
  for (let i = 0; i < pointCount + 2; i++) {
    const alt = (i % 2 === 0);
    const offset = alt ? 60 : -60;
    wavePoints.push({
      x: i * spacing - spacing,
      y: canvasWave.height / 2,
      yStart: canvasWave.height / 2,
      alt: alt,
      offset: offset
    });
  }
}

function animateWave() {
  if (!waveCtx || !canvasWave) return;
  
  waveCtx.clearRect(0, 0, canvasWave.width, canvasWave.height);
  waveCtx.beginPath();
  waveCtx.moveTo(wavePoints[0].x, wavePoints[0].y);
  
  const spacing = canvasWave.width / 12;
  
  for (let i = 1; i < wavePoints.length; i++) {
    wavePoints[i].x += 4;
    wavePoints[i].y = wavePoints[i].yStart + Math.sin(waveTick / 14) * -wavePoints[i].offset;
    
    if (wavePoints[i].x > canvasWave.width + spacing) {
      wavePoints[i].x = -spacing;
    }
    
    waveCtx.lineTo(wavePoints[i].x, wavePoints[i].y);
  }
  
  waveCtx.strokeStyle = 'rgba(47, 120, 255, 0.6)';
  waveCtx.lineWidth = 2;
  waveCtx.stroke();
  
  waveTick++;
  waveAnimationId = requestAnimationFrame(animateWave);
}

function startWaveAnimation() {
  if (!canvasWave) return;
  createWavePoints();
  canvasWave.classList.add('active');
  animateWave();
}

function stopWaveAnimation() {
  if (waveAnimationId) {
    cancelAnimationFrame(waveAnimationId);
  }
  if (canvasWave) {
    canvasWave.classList.remove('active');
    setTimeout(() => {
      if (waveCtx && canvasWave) {
        waveCtx.clearRect(0, 0, canvasWave.width, canvasWave.height);
      }
    }, 500);
  }
  waveTick = 0;
}

if (drowningElement) {
  drowningElement.addEventListener('mouseenter', function() {
    if (waterContainer.getAttribute('data-active') === 'true') {
      return;
    }

    waterContainer.setAttribute('data-active', 'true');
    waterContainer.classList.add('water-rising');
    startWaveAnimation();

    for (let i = 0; i < 3; i++) {
      const wave = createWaveSVG();
      wave.classList.add(`wave-${i + 1}`);
      const opacity = 0.9 - i * 0.15;
      wave.style.opacity = opacity;
      wave.style.color = `rgba(47, 120, 255, ${opacity})`;
      waterContainer.appendChild(wave);
    }

    document.querySelector('.page').classList.add('submerged');
  });

  drowningElement.addEventListener('mouseleave', function() {
    waterContainer.classList.remove('water-rising');
    waterContainer.classList.add('water-receding');
    document.querySelector('.page').classList.remove('submerged');
    stopWaveAnimation();

    setTimeout(() => {
      waterContainer.innerHTML = '';
      waterContainer.setAttribute('data-active', 'false');
      waterContainer.classList.remove('water-receding');
    }, 1000);
  });
}

initWaveCanvas();
