export class Slide {
  constructor(option) {
    this.main = document.querySelector(option.el);
    this.imgArr = option.arr;
    this.speed = option.speed >= 2000 ? option.speed : 2;
    this._speed = this.speed;
    this.arr = [];
    this.index = 1;
    document.styleSheets[0].insertRule(
      `
        ${option.el} img{
            width: 100%;
            height: 100%;
            position: absolute;
            transition: all 1s;
            opacity: 0;
        }            
      `,
      document.styleSheets[0].cssRules.length
    );
    document.styleSheets[0].insertRule(
      `
        ${option.el} .block{
            opacity: 1;
        }            
      `,
      document.styleSheets[0].cssRules.length
    );
    document.styleSheets[0].insertRule(
      `
        ${option.el} .boom {
            transition: all 1s;
            position: absolute;
        }
      `,
      document.styleSheets[0].cssRules.length
    );
    document.styleSheets[0].insertRule(
      `
        ${option.el} .ctrl {
            position: absolute;
            z-index: 10;
            bottom: 30px;
            left: 50%;    
            list-style: none;        
        }
      `,
      document.styleSheets[0].cssRules.length
    );
    document.styleSheets[0].insertRule(
      `
        ${option.el} .ctrl li {
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, .5);
            border-radius: 50%;
            margin: 10px;
            float: left;
        }
      `,
      document.styleSheets[0].cssRules.length
    );
    document.styleSheets[0].insertRule(
      `
        ${option.el} .ctrl .color{
            background: white;
        }
      `,
      document.styleSheets[0].cssRules.length
    );
    this.init();
  }
  init() {
    this.create();
    this.move();
  }
  create() {
    this.ctrl = document.createElement("ul");
    this.ctrl.className = "ctrl";
    this.imgArr.forEach(item => {
      let img = document.createElement("img");
      let li = document.createElement("li");
      img.src = item;
      this.main.append(img);
      this.ctrl.append(li);
      this.arr.push(img);
    });
    this.main.append(this.ctrl);
    let marginLeft = -(
      (this.ctrl.children[0].offsetWidth * this.ctrl.children.length) / 2 +
      parseInt(getComputedStyle(this.ctrl.children[0]).marginLeft)
    );
    this.ctrl.style.marginLeft = marginLeft + "px";
    this.arr[0].classList.add("block");
    this.ctrl.children[0].classList.add("color");
  }
  random(y, x) {
    return Math.floor(Math.random() * (x - y)) + y;
  }
  move(callback) {
    let width = this.main.offsetWidth / 10;
    let height = this.main.offsetHeight / 10;
    this.lis = this.ctrl.children;
    this.timer = setInterval(() => {
      (index => {
        index = index == -1 ? this.arr.length - 1 : index;
        let itemArr = [];
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            let div = document.createElement("div");
            div.className = "boom";
            div.style.cssText = `
                        width: ${width}px;
                        height: ${height}px;
                        left: ${width * j}px;
                        top: ${height * i}px;
                        background-image: url(${this.imgArr[index]});
                        background-size: 1000%;
                        background-position: ${width * -j}px ${height * -i}px;
                    `;
            this.main.append(div);
            itemArr.push(div);
            setTimeout(() => {
              div.style.cssText += `
                            transform: rotateX(${this.random(120, 270)}deg)
                            rotateY(${this.random(120, 270)}deg)
                            translateZ(${this.random(120, 270)}px);
                            opacity: 0;
                        `;
            });
          }
        }
        setTimeout(() => {
          itemArr.forEach(ele => {
            this.main.removeChild(ele);
          });
        }, 1000);
      })(this.index - 1);
      this.arr.forEach((ele, index) => {
        ele.classList.remove("block");
        this.lis[index].classList.remove("color");
      });
      this.arr[this.index].classList.add("block");
      this.lis[this.index].classList.add("color");
      this.index++;
      this.index = this.index == this.arr.length ? 0 : this.index;
      callback && callback();
    }, this.speed);
  }
}
