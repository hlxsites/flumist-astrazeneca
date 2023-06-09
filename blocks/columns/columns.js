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
          if (block.classList.contains('spray')) {
            picWrapper.append(createOptimizedPicture('/images/mister.png', 'Flumist Spray', false, [{ width: '750' }]));
          }
        }
      }
    });
  });
}
