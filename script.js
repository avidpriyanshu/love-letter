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

if (drowningElement) {
  drowningElement.addEventListener('mouseenter', function() {
    if (waterContainer.getAttribute('data-active') === 'true') {
      return;
    }

    waterContainer.setAttribute('data-active', 'true');
    waterContainer.classList.add('water-rising');

    // Create water layers
    for (let i = 0; i < 3; i++) {
      const wave = createWaveSVG();
      wave.classList.add(`wave-${i + 1}`);
      const opacity = 0.9 - i * 0.15;
      wave.style.opacity = opacity;
      wave.style.color = `rgba(47, 120, 255, ${opacity})`;
      waterContainer.appendChild(wave);
    }

    // Reduce page opacity and add blur
    document.querySelector('.page').classList.add('submerged');
  });

  drowningElement.addEventListener('mouseleave', function() {
    waterContainer.classList.remove('water-rising');
    waterContainer.classList.add('water-receding');
    document.querySelector('.page').classList.remove('submerged');

    setTimeout(() => {
      waterContainer.innerHTML = '';
      waterContainer.setAttribute('data-active', 'false');
      waterContainer.classList.remove('water-receding');
    }, 1000);
  });
}
