import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // fetch nav content
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.id = 'nav';
    nav.innerHTML = html;

    const classes = ['brand', 'extra', 'sections', 'tools'];
    classes.forEach((c, i) => {
      const section = nav.children[i];
      if (section) section.classList.add(`nav-${c}`);
    });

    const brandImg = nav.querySelector('picture');
    const brandImgLink = document.createElement('a');
    brandImgLink.href = '/';
    brandImgLink.title = 'Home';
    brandImg.after(brandImgLink);
    brandImgLink.appendChild(brandImg);

    decorateIcons(nav);
    const navWrapper = document.createElement('div');
    navWrapper.className = 'nav-wrapper';
    navWrapper.append(nav);
    block.append(navWrapper);

    const bars = block.querySelector('.icon-bars');
    bars.addEventListener('click', () => {
      nav.setAttribute('aria-expanded', 'true');
    });
    const x = block.querySelector('.icon-x');
    x.addEventListener('click', () => {
      nav.removeAttribute('aria-expanded');
    });
  }
}
