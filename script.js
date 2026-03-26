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
