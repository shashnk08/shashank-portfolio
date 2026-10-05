/**
 * Security Protection Utilities to prevent source inspection, console logging,
 * HTML DOM inspection, and unauthorized code/design copying.
 */

export function initializeSecurityProtection() {
  if (typeof window === 'undefined') return;

  // 1. Disable Right Click Context Menu
  document.addEventListener('contextmenu', (e: MouseEvent) => {
    e.preventDefault();
    return false;
  });

  // 2. Disable DevTools Shortcut Keys & View Source
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const metaOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    // Ctrl/Cmd + Shift + I (Inspect)
    // Ctrl/Cmd + Shift + J (Console)
    // Ctrl/Cmd + Shift + C (Element selector)
    if (metaOrCtrl && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      return false;
    }

    // Mac Cmd + Option + I / J / U / C
    if (isMac && e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'U' || e.key === 'u' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      return false;
    }

    // Ctrl/Cmd + U (View Source)
    if (metaOrCtrl && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      return false;
    }

    // Ctrl/Cmd + S (Save Page)
    if (metaOrCtrl && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      return false;
    }
  });

  // 3. Prevent Dragging elements / images
  document.addEventListener('dragstart', (e: DragEvent) => {
    e.preventDefault();
    return false;
  });

  // 4. Console Protection: Silence console logging & clear console
  const noop = () => {};
  const warningMsg = '%cWarning! Console access and HTML code inspection is restricted on this portfolio.';
  const warningStyle = 'color: #ff3333; font-size: 16px; font-weight: bold; background: #000; padding: 10px; border-radius: 4px;';

  const wipeConsole = () => {
    try {
      console.clear();
      console.log(warningMsg, warningStyle);
    } catch {
      // ignore
    }
  };

  // Clear initial console
  wipeConsole();

  // Override standard console methods
  console.log = noop;
  console.info = noop;
  console.warn = noop;
  console.error = noop;
  console.debug = noop;
  console.trace = noop;
  console.dir = noop;
  console.table = noop;

  // Continuous console wipe interval
  setInterval(wipeConsole, 1500);

  // 5. DevTools Open Detector & HTML Shield
  let devtoolsOpen = false;
  const threshold = 160;

  const checkDevTools = () => {
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;

    if (widthDiff || heightDiff) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        wipeConsole();
        const rootEl = document.getElementById('root');
        if (rootEl) {
          rootEl.style.filter = 'blur(20px)';
          rootEl.style.pointerEvents = 'none';
        }
      }
    } else {
      if (devtoolsOpen) {
        devtoolsOpen = false;
        const rootEl = document.getElementById('root');
        if (rootEl) {
          rootEl.style.filter = 'none';
          rootEl.style.pointerEvents = 'auto';
        }
      }
    }
  };

  window.addEventListener('resize', checkDevTools);
  setInterval(checkDevTools, 1000);
}

