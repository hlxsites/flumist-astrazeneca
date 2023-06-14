export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const form = document.createElement('form');
  form.className = 'find-flumist-form';
  form.innerHTML = `<div class="form-group">
      <label class="finder-label">ZIP Code</label>
      <input class="form-control finder-zipcode" placeholder="Ex. 10001" type="text">
    </div>
    <div class="form-group">
      <label class="finder-label">Radius</label>
      <select class="form-control finder-radius" name="finder-radius">
        <option>10 Miles</option>
        <option>15 Miles</option>
        <option>20 Miles</option>
      </select>
    </div>
    <div class="form-group">
      <a class="button primary" href="#"><span>Find FluMist</span></a>
    </div>`;
  block.append(form);
}
