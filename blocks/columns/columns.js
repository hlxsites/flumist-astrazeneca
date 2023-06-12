import { createOptimizedPicture, decorateIcons } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
      [...col.querySelectorAll('picture')].forEach((picture) => {
        picture.parentElement.classList.add('picture');
      });
      [...col.querySelectorAll('p.picture + h4 + p')].forEach((imgH4P) => {
        const imgH4PContainer = document.createElement('div');
        imgH4PContainer.classList.add('img-h4-p');
        imgH4P.after(imgH4PContainer);
        const oneUp = imgH4P.previousSibling.previousSibling;
        const towUp = oneUp.previousSibling.previousSibling;
        imgH4PContainer.append(towUp, oneUp, imgH4P);
      });
      [...col.querySelectorAll('.accordion h4 + ul')].forEach((h4Ul) => {
        const h4UlContainer = document.createElement('div');
        h4UlContainer.classList.add('h4-ul');
        h4Ul.after(h4UlContainer);
        h4UlContainer.append(h4Ul.previousSibling.previousSibling, h4Ul);
        const minus = document.createElement('span');
        minus.classList.add('icon', 'icon-minus');
        const plus = document.createElement('span');
        plus.classList.add('icon', 'icon-plus');
        h4UlContainer.append(minus, plus);
        plus.addEventListener('click', () => {
          h4UlContainer.classList.add('open');
        });
        minus.addEventListener('click', () => {
          h4UlContainer.classList.remove('open');
        });
      })
    });
  });
  if (block.classList.contains('spray')) {
    const sprayPicture = block.querySelector(':scope > div > div:last-of-type picture');
    if (sprayPicture) {
      sprayPicture.parentElement.append(createOptimizedPicture('/images/mister.png', 'Flumist Spray', false, [{ width: '750' }]));
    }
  }
  decorateIcons(block);
}
