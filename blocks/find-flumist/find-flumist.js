export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  const form = document.createElement('form');
  form.className = 'find-flumist-form';

  const zipGroup = document.createElement('div');
  zipGroup.className = 'form-group';
  const zipLabel = document.createElement('label');
  zipLabel.textContent = 'ZIP Code';
  zipLabel.className = 'finder-label';
  const zipInput = document.createElement('input');
  zipInput.className = 'form-control finder-zipcode';
  zipInput.placeholder = 'Ex. 10001';
  zipInput.type = 'text';

  zipGroup.append(zipLabel);
  zipGroup.append(zipInput);

  const radiusGroup = document.createElement('div');
  radiusGroup.className = 'form-group';
  const radiusLabel = document.createElement('label');
  radiusLabel.textContent = 'Radius';
  radiusLabel.className = 'finder-label';
  const radiusInput = document.createElement('select');
  radiusInput.className = 'form-control finder-radius';
  radiusInput.name = 'finder-radius';

  const option1 = document.createElement('option');
  option1.text = '10 Miles';
  const option2 = document.createElement('option');
  option2.text = '15 Miles';
  const option3 = document.createElement('option');
  option3.text = '20 Miles';

  radiusInput.append(option1);
  radiusInput.append(option2);
  radiusInput.append(option3);

  radiusGroup.append(radiusLabel);
  radiusGroup.append(radiusInput);

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'form-group';

  const button = document.createElement('a');
  // const button = document.createElement('button');
  button.className = 'button primary';
  button.href = '#';
  const btnSpan = document.createElement('span');
  btnSpan.textContent = 'Find FluMist';
  button.append(btnSpan);

  buttonGroup.append(button);

  form.append(zipGroup);
  form.append(radiusGroup);
  form.append(buttonGroup);
  block.append(form);
}
