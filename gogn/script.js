/**
 * Niðurteljari!
 */
class Countdown {
  /**
   * Finnur container fyrir niðurteljara og form.
   * Bindur submit eventhandler við form.
   */
  constructor() {
    this.keyName = 'countdown';
    this.container = document.querySelector('.countdown');
    this.form = document.querySelector('form');

    this.form.addEventListener('submit', this.submit.bind(this));
  }

  /**
   * Sækir gögn úr localStorage eftir this.keyName
   * Ef gögn eru til, hleður þeim inn með því að kalla í this.create()
   */
  load() {
    const data = JSON.parse(window.localStorage.getItem('data'));
    if (JSON.parse(window.localStorage.getItem('data')) != null) {
      this.date = Date.parse(data.date);
      this.title = data.title;

      this.hideForm();
      this.create(this.title, this.date);
    }
  }

  /**
   * Tekur við title sem streng og date sem Date hlut
   * Vistar sem json gögn í localStorage undir this.keyName
   */
  save(titleX, dateX) {
    const data = JSON.stringify({ date: dateX, title: titleX });
    window.localStorage.setItem('data', data);
  }

  /**
   * Handler fyrir submit á formi.
   * Sækir gögn úr formi og kallar í this.parseDate()
   * Vistar gögn með this.save() og sýnir niðurteljara með this.create()
   */
  submit(e) {
    e.preventDefault();

    const title = this.form.querySelector('input[type=text]');
    const date = this.form.querySelector('input[type=date]');
    const time = this.form.querySelector('input[type=time]');

    const nyDagsetning = this.parseDate(date.value, time.value);
    this.save(title.value, nyDagsetning);
    this.create(title.value, nyDagsetning);
  }

  /**
   * Tekur við:
   *  - date sem streng á forminu "yyyy-mm-dd", t.d. "2017-11-06"
   *  - time sem streng á forminu "hh:mm", t.d. "09:00"
   * Skilar date hlut með gögnum úr date og time
   */
  parseDate(date, time) {
    const ar = date.substring(0, 4);
    const man = Number(date.substring(5, 7)) - 1;
    const dag = date.substring(8, 10);
    const klst = time.substring(0, 2);
    const min = time.substring(3, 5);

    const nyDagsetning = new Date(ar, man, dag, klst, min);
    return nyDagsetning;
  }

  /**
   * Býr til element fyrir niðurteljara og bætir við this.container
   * Setur this.date sem dagsetningu sem talið er niður að
   * Setur this.element sem element sem geymir niðurteljara
   * Bætir við "eyða" takka sem sér um að eyða niðurteljara með this.delete
   * Byrjar niðurteljara með this.startCounter() og
   * felur form með this.hideForm()
   */
  create(title, date) {
    this.date = date;
    this.title = title;

    // Finnum aðal div
    const container = document.querySelector('.countdown');

    // Gerum div fyrir heading os setjum á réttan stað
    const heading = document.createElement('div');
    container.appendChild(heading);
    heading.classList.add('countdown__heading');
    heading.appendChild(document.createTextNode(this.title));
    container.appendChild(heading);

    // Gerum div fyrir teljaran - this.element
    this.element = container.appendChild(document.createElement('div'));
    this.element.classList.add('countdown__container');

    // Gerum eyða takkann og setjum á réttan stað
    const cancel = document.createElement('button');
    cancel.appendChild(document.createTextNode('Eyða'));
    cancel.classList.add('button');
    container.appendChild(cancel);
    cancel.addEventListener('click', this.delete.bind(this));

    // Felum formið sjálft og störtum teljaranum
    this.hideForm();
    this.startCounter();
  }

  /**
   * Felur form með CSS
   */
  hideForm() {
    document.querySelector('.form').style.display = 'none';
  }

  /**
   * Sýnir form með CSS
   */
  showForm() {
    document.querySelector('.form').style.display = 'block';
  }

  /**
   * Byrjar niðurteljara með this.count() og keyrir á 1000ms fresti
   * með window.setInterval og setur id á teljara í this.interval
   */
  startCounter() {
    this.count(); // Set þessa línu fyrir setInterval til að teljarinn birtist líka fyrstu sekúnduna
    const that = this; // Til að geta vísað í conut inni í setInterval
    this.interval = window.setInterval(that.count(), 1000);
  }

  /**
   * Stöðvar teljara með window.clearInterval á this.interval
   */
  stopCounter() {
    window.clearInterval(this.interval);
  }

  /**
   * Býr til element sem heldur utan um teljara, á forminu:
   * <div class="countdown__box">
   *   <span class="countdown__num">num</span>
   *   <span class="countdown__title">title</span>
   * </div>
   * og skilar element
   */
  createElement(num, title) {
    const box = document.createElement('div');
    box.classList.add('countdown__box');
    const number = document.createElement('span');
    number.classList.add('countdown__num');
    const titleBox = document.createElement('span');
    titleBox.classList.add('countdown__title');
    number.appendChild(document.createTextNode(num));
    titleBox.appendChild(document.createTextNode(title));
    box.appendChild(number);
    box.appendChild(titleBox);
    return box;
  }

  delete() {
    // Hendir öllu úr this.element
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }

    // Hreinsar localStorage, stoppar counter loopu, hreinsar formið og birtir formið
    localStorage.clear();
    this.stopCounter();
    this.form.reset();
    this.showForm();
  }

  /**
   * Tekur við remaining sem eru millisekúndur í dagsetningu sem talið er
   * niður í.
   * Útbýr og skilar element sem inniheldur element fyrir daga, klukkustundir,
   * mínútur og sekúndur þar til remaining gerist. Hver „partur“ er búinn til
   * með kalli í this.createElement
   */
  countdown(remaining) {
    const totalSecs = remaining / 1000;

    const days = Math.floor(totalSecs / (60 * 60 * 24));
    const daysElement = this.createElement(days, 'Dagar');
    const hours = Math.floor(totalSecs / (60 * 60)) - (days * 24);
    const hoursElement = this.createElement(hours, 'Klst.');
    const mins = Math.floor(totalSecs / 60) - (days * 24 * 60) - (hours * 60);
    const minsElement = this.createElement(mins, 'Mín.');
    const secs = Math.floor(totalSecs) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (mins * 60);
    const secsElement = this.createElement(secs, 'Sek.');

    const container = document.createElement('div');
    container.classList.add('countdown__container');
    container.appendChild(daysElement);
    container.appendChild(hoursElement);
    container.appendChild(minsElement);
    container.appendChild(secsElement);
    return container;
  }

  /**
   * Telur niður.
   * Fjarlægir allt úr this.element (ef eitthvað er þar) og athugar síðan hvort
   * this.date (dagsetning sem talið er niður að) sé liðin og ef svo er birtir
   * textann "Komið!" og stoppa teljara með this.stopCounter()
   * Ef ekki liðið uppfærir teljara með því að bæta element úr this.countdown()
   * við this.element
   */
  count() {
    // Tæmi this.element
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    const nuna = new Date();
    const remaining = this.date - nuna;
    if (remaining > 0) {
      const teljarinn = this.countdown(remaining);
      this.element.appendChild(teljarinn);
    } else {
      this.element.appendChild(document.createTextNode('Komið!'));
      this.stopCounter();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const countdown = new Countdown();
  countdown.load();
});
