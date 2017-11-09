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

    // til þess að submit hafi þennan klasa sem "this" verðum við
    // að nota bind hér (og í öðrum föllum sem við bindum!)
    this.form.addEventListener('submit', this.submit.bind(this));
  }

  /**
   * Sækir gögn úr localStorage eftir this.keyName
   * Ef gögn eru til, hleður þeim inn með því að kalla í this.create()
   */
  load() {
  }

  /**
   * Tekur við title sem streng og date sem Date hlut
   * Vistar sem json gögn í localStorage undir this.keyName
   */
  save(title, date) {
  }

  /**
   * Handler fyrir submit á formi.
   * Sækir gögn úr formi og kallar í this.parseDate()
   * Vistar gögn með this.save() og sýnir niðurteljara með this.create()
   */
  submit(e) {
    e.preventDefault();

    const title = this.form.querySelector('input[type=text]');

    console.log('titill er', title.value)
  }

  /**
   * Tekur við:
   *  - date sem streng á forminu "yyyy-mm-dd", t.d. "2017-11-06"
   *  - time sem streng á forminu "hh:mm", t.d. "09:00"
   * Skilar date hlut með gögnum úr date og time
   */
  parseDate(date, time) {
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
  }

  /**
   * Felur form með CSS
   */
  hideForm() {
  }

  /**
   * Sýnir form með CSS
   */
  showForm() {
  }

  /**
   * Byrjar niðurteljara með this.count() og keyrir á 1000ms fresti
   * með window.setInterval og setur id á teljara í this.interval
   */
  startCounter() {
  }

  /**
   * Stöðvar teljara með window.clearInterval á this.interval
   */
  stopCounter() {
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
  }

  /**
   * Eyðir niðurteljara með því að fjarlægja úr localStorage og
   * fjarlægja allt úr this.container.
   * Kallar líka í this.stopCounter() og this.showForm()
   */
  delete() {
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
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const countdown = new Countdown();
  countdown.load();
});
