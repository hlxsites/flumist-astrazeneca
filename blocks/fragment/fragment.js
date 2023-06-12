/*
 * Fragment Block
 * Include content from one Helix page in another.
 * https://www.hlx.live/developer/block-collection/fragment
 */

import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadBlocks,
} from '../../scripts/lib-franklin.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();
      decorateMain(main);
      await loadBlocks(main);
      return main;
    }
  }
  return null;
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      if (fragmentSection.classList.contains('isi-fragment')) {
        const div = document.createElement('div');
        div.classList.add('isi-arrow');
        div.onclick = function () {
          const element = document.querySelector('.isi-fragment');
          if (element.classList.contains('open')) {
            element.classList.remove('open');
            const blur = document.querySelector('.isi-blur');
            blur.classList.remove('open');
          } else {
            element.classList.add('open');
            const blur = document.querySelector('.isi-blur');
            blur.classList.add('open');
          }
        };
        fragmentSection.prepend(div);
        fragmentSection.classList.add('isi-overlay');
        // Add the blur element to the parent
        const blur = document.createElement('div');
        block.closest('.fragment-wrapper').parentNode.parentNode.prepend(blur);
        blur.classList.add('isi-blur');
      }
      block.closest('.section').classList.add(...fragmentSection.classList);
      block.closest('.fragment-wrapper').replaceWith(...fragmentSection.childNodes);
    }
  }
}
