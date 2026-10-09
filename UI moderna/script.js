document.addEventListener('DOMContentLoaded', () => {
  const features = [
    {
      id: 'display',
      title: 'Display',
      subtitle: '6.5" Mini-Drop Fullscreen',
      pills: ['120Hz LTPO', '3000 nits Peak', 'OLED Pro'],
      screenViewId: 'screenDisplay',
      iconSvg: `
        <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="12" y="5" width="20" height="34" rx="4"></rect>
          <line x1="19" y1="8" x2="25" y2="8"></line>
          <line x1="14" y1="11" x2="29" y2="33" stroke-dasharray="2 2" stroke-opacity="0.8"></line>
          <text x="21" y="24" fill="currentColor" stroke="none" font-size="5.5" font-weight="600" text-anchor="middle" font-family="sans-serif">6.5"</text>
          <line x1="18" y1="35" x2="26" y2="35"></line>
        </svg>
      `
    },
    {
      id: 'battery',
      title: 'Battery Life',
      subtitle: '5,000 mAh Dual-Cell HyperCharge',
      pills: ['100W HyperCharge', '48h Autonomy', 'All-Day Power'],
      screenViewId: 'screenBattery',
      iconSvg: `
        <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="8" y="12" width="24" height="20" rx="3.5"></rect>
          <path d="M32 17h2.5a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H32" fill="currentColor" fill-opacity="0.3"></path>
          <path d="M21 16l-4.5 6.5h4.5l-2 6.5 6.5-7.5h-4.5l2-5.5z" fill="currentColor" stroke="none"></path>
          <line x1="12" y1="28" x2="15" y2="28" stroke-width="2"></line>
        </svg>
      `
    }
  ];

  const featureItem = document.getElementById('featureItem');
  const featureIconWrapper = document.getElementById('featureIconWrapper');
  const featureTitle = document.getElementById('featureTitle');
  const featureSubtitle = document.getElementById('featureSubtitle');
  const featurePills = document.getElementById('featurePills');
  const featureIndex = document.getElementById('featureIndex');

  const btnArrowUp = document.getElementById('btnArrowUp');
  const btnArrowDown = document.getElementById('btnArrowDown');
  const dotBtns = document.querySelectorAll('.dot-btn');

  const screenDisplay = document.getElementById('screenDisplay');
  const screenBattery = document.getElementById('screenBattery');
  const showcaseStage = document.querySelector('.showcase-stage');

  let currentIndex = 0;
  let isAnimating = false;
  const ANIMATION_DURATION = 480;

  function renderFeature(index) {
    const data = features[index];

    featureIconWrapper.innerHTML = data.iconSvg;
    featureTitle.textContent = data.title;
    featureSubtitle.textContent = data.subtitle;

    featurePills.innerHTML = data.pills
      .map(pill => `<span class="spec-pill">${pill}</span>`)
      .join('');

    featureIndex.textContent = `0${index + 1} / 0${features.length}`;

    dotBtns.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    if (data.id === 'display') {
      screenDisplay.classList.add('active');
      screenBattery.classList.remove('active');
    } else {
      screenDisplay.classList.remove('active');
      screenBattery.classList.add('active');
    }
  }

  function navigateTo(targetIndex, direction = 'up') {
    if (isAnimating) return;
    if (targetIndex === currentIndex) return;

    isAnimating = true;
    clearAnimationClasses();

    const exitClass = direction === 'up' ? 'anim-exit-down' : 'anim-exit-up';
    const enterClass = direction === 'up' ? 'anim-enter-from-top' : 'anim-enter-from-bottom';

    featureItem.classList.add(exitClass);

    setTimeout(() => {
      currentIndex = targetIndex;
      renderFeature(currentIndex);

      featureItem.classList.remove(exitClass);
      featureItem.classList.add(enterClass);

      setTimeout(() => {
        featureItem.classList.remove(enterClass);
        isAnimating = false;
      }, ANIMATION_DURATION);
    }, ANIMATION_DURATION * 0.7);
  }

  function clearAnimationClasses() {
    featureItem.classList.remove(
      'anim-exit-down',
      'anim-enter-from-top',
      'anim-exit-up',
      'anim-enter-from-bottom'
    );
  }

  btnArrowUp.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % features.length;
    navigateTo(nextIndex, 'up');
  });

  btnArrowDown.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + features.length) % features.length;
    navigateTo(prevIndex, 'down');
  });

  dotBtns.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      if (idx !== currentIndex) {
        const direction = idx > currentIndex ? 'up' : 'down';
        navigateTo(idx, direction);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      btnArrowUp.click();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      btnArrowDown.click();
    }
  });

  let wheelTimeout = null;
  if (showcaseStage) {
    showcaseStage.addEventListener('wheel', (e) => {
      if (isAnimating || wheelTimeout) return;

      if (e.deltaY < -20) {
        btnArrowUp.click();
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 600);
      } else if (e.deltaY > 20) {
        btnArrowDown.click();
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 600);
      }
    }, { passive: true });
  }

  const phoneWrapper = document.querySelector('.phone-wrapper');
  if (phoneWrapper && window.matchMedia('(min-width: 900px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * 8;
      const yOffset = (e.clientY / innerHeight - 0.5) * -8;
      
      phoneWrapper.style.transform = `rotateY(${xOffset}deg) rotateX(${yOffset}deg)`;
    });
  }

  renderFeature(0);
});
