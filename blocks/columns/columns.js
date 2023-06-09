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
          // if (block.classList.contains('spray')) {
          //   picWrapper.append(createOptimizedPicture('/images/mister.png', 'Flumist Spray', false, [{ width: '750' }]));
          // }
        }
      }
      [...col.querySelectorAll('picture')].forEach((picture) => {
        picture.parentElement.classList.add('picture');
      });
      [...col.querySelectorAll('p.picture + h4 + p')].forEach((imgH4P) => {
        const imgH4PContainer = document.createElement('div');
        imgH4PContainer.classList.add('imgH4P');
        imgH4P.after(imgH4PContainer);
        imgH4PContainer.append(imgH4P.previousSibling.previousSibling.previousSibling.previousSibling, imgH4P.previousSibling.previousSibling, imgH4P);
      });
    });
  });
  if (block.classList.contains('spray')) {
    const sprayPicture = block.querySelector(':scope > div > div:last-of-type picture');
    if (sprayPicture) sprayPicture.parentElement.append(createOptimizedPicture('/images/mister.png', 'Flumist Spray', false, [{ width: '750' }]));
  }
}
