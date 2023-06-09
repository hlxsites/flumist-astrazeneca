import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

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
    });
  });
  if (block.classList.contains('spray')) {
    const sprayPicture = block.querySelector(':scope > div > div:last-of-type picture');
    if (sprayPicture) {
      sprayPicture.parentElement.append(createOptimizedPicture('/images/mister.png', 'Flumist Spray', false, [{ width: '750' }]));
    }
  }
}
