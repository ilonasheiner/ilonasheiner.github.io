class SliderService {
  constructor(slider) {
    this.slider = slider;
    this.sliderContent = this.slider.firstElementChild;
    this.items = Array.from(this.sliderContent.children);
  }
  sliderData = {
    lI: 0,
    cI: 1,
    rI: 2
  };
  disabled = true;
  addClass = (elem, className) => {
    elem.className = `${elem.className} ${className}`;
  };

  remClass = (elem, ...classNames) => {
    classNames.forEach(className => {
      elem.className = elem.className.replace(` ${className}`, "");
    });
  };

  nextIndex = (array, index, dir = 1) => {
    const length = array.length;
    const res = index + dir;
    if (res >= length) return 0;
    else if (res < 0) return length - 1;
    else return res;
  };

  addButtons = () => {
    const back = document.createElement("DIV");
    back.className = "sl-btn-back";
    back.onclick = () => {
      this.offsetItems(-1);
    };

    const forward = document.createElement("DIV");
    forward.className = "sl-btn-forward";
    forward.onclick = () => {
      this.offsetItems();
    };

    this.slider.appendChild(back);
    this.slider.appendChild(forward);
  };
  offsetItems = (dir = 1) => {
    if (!this.disabled) {
      this.sliderData.lI = this.nextIndex(this.items, this.sliderData.lI, dir);
      this.sliderData.cI = this.nextIndex(this.items, this.sliderData.cI, dir);
      this.sliderData.rI = this.nextIndex(this.items, this.sliderData.rI, dir);

      this.fixItems(dir);
    }
  };

  fixItems = dir => {
    this.disabled = true;
    const isForw = dir === 1;
    const { lI, cI, rI } = this.sliderData;

    const backI = this.nextIndex(this.items, lI, -1);
    const forwI = this.nextIndex(this.items, rI, 1);

    if (isForw) {
      this.remClass(this.items[rI], "sl-hidden");

      this.addClass(this.items[rI], "sl-forward");
      this.addClass(this.items[backI], "sl-to-back");
    } else {
      this.remClass(this.items[lI], "sl-hidden");

      this.addClass(this.items[lI], "sl-back");
      this.addClass(this.items[forwI], "sl-to-forward");
    }

    this.addClass(this.items[lI], "sl-to-left");
    this.addClass(this.items[cI], "sl-to-center");
    this.addClass(this.items[rI], "sl-to-right");

    setTimeout(() => {
      this.remClass(
        this.items[backI],
        "sl-right",
        "sl-center",
        "sl-left",
        "sl-forward"
      );
      this.remClass(
        this.items[forwI],
        "sl-right",
        "sl-left",
        "sl-back",
        "sl-center"
      );

      if (isForw) this.addClass(this.items[backI], "sl-hidden");
      else this.addClass(this.items[forwI], "sl-hidden");

      this.remClass(this.items[backI], "sl-to-back");
      this.remClass(this.items[forwI], "sl-to-forward");

      this.remClass(
        this.items[lI],
        "sl-right",
        "sl-center",
        "sl-back",
        "sl-forward"
      );
      this.remClass(
        this.items[cI],
        "sl-right",
        "sl-left",
        "sl-back",
        "sl-forward"
      );
      this.remClass(
        this.items[rI],
        "sl-center",
        "sl-left",
        "sl-back",
        "sl-forward"
      );

      this.addClass(this.items[lI], "sl-left");
      this.addClass(this.items[cI], "sl-center");
      this.addClass(this.items[rI], "sl-right");

      this.remClass(this.items[lI], "sl-to-left");
      this.remClass(this.items[cI], "sl-to-center");
      this.remClass(this.items[rI], "sl-to-right");

      this.disabled = false;
    }, 1000);
  };
  checkItems = () => {
    const q = 5 - this.items.length;
    if (q > 0) {
      for (
        let i = 0;
        i < Math.ceil(q / this.items.length) * this.items.length;
        i++
      ) {
        this.sliderContent.appendChild(
          this.items[i % this.items.length].cloneNode(true)
        );
      }
      this.items = Array.from(this.sliderContent.children);
    }
    this.addButtons();
    this.startPos();
  };
  startPos = () => {
    const { lI, cI, rI } = this.sliderData;

    this.addClass(this.items[lI], "sl-left");
    this.addClass(this.items[cI], "sl-center");
    this.addClass(this.items[rI], "sl-right");

    this.items.forEach((item, index) => {
      if ([lI, cI, rI].indexOf(index) === -1) {
        this.addClass(this.items[index], "sl-hidden");
      }
    });
    this.disabled = false;
  };
}
/*
const slider = new SliderService("slider");
slider.checkItems();
*/
const sliders = Array.from(document.getElementsByClassName('slider'))
sliders.forEach(slider=> {
    const sliderServ = new SliderService(slider);
    sliderServ.checkItems();
})

