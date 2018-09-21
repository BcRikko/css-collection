class DotGen {
  /**
   * DotGen
   * @param {HTMLElement} grid
   */
  constructor(grid) {
    this.mode = "paint";
    this.color = "#da2400";
    this.size = 8;
    this.pixel = 10;
    this.grid = grid;

    this.resetEventListner();
  }

  /**
   * 描画モードを変更する
   * @param {string} mode paint | eraser
   */
  changeMode(mode) {
    this.mode = mode || "paint";
  }

  /**
   * 描画色を変更する
   * @param {string} color #xxxxxx
   */
  changeColor(color) {
    this.color = color || "#da2400";
  }

  /**
   * 1ドットあたりのピクセル数を変更する
   * @param {number} pixel
   */
  changePixel(pixel) {
    this.pixel = pixel || 10;
  }

  /**
   * グリッドサイズを変更する
   * @param {number} size
   */
  changeSize(size) {
    this.size = size || 8;

    Array.from(this.grid.querySelectorAll("div")).forEach(el => {
      this.removeChild(el);
    });

    [...Array(size ** 2)].forEach(i => {
      const div = document.createElement("div");
      this.grid.appendChild(div);
    });

    this.resetEventListner();
    this.grid.style.gridTemplateColumns = this.grid.style.gridTemplateRows = "1fr ".repeat(
      size
    );
  }

  /**
   * 子要素とそのイベントリスナを削除する
   * @param {HTMLElement} el
   */
  removeChild(el) {
    el.removeEventListener("click", this.draw.bind(this, el));
    el.parentElement.removeChild(el);
  }

  /**
   * イベントリスナを再設定する
   */
  resetEventListner() {
    Array.from(this.grid.querySelectorAll("div")).forEach(el => {
      el.addEventListener("click", this.draw.bind(this, el));
    });
  }

  /**
   * 描画する
   * @param {HTMLElement} el
   */
  draw(el) {
    el.style.backgroundColor =
      this.mode === "paint" ? this.color : "transparent";

    console.log(this.output());
  }

  /**
   * 結果を出力する
   */
  output() {
    const boxShadows = Array.from(this.grid.querySelectorAll("div")).map(
      (el, i) => {
        return [
          `${this.pixel * (i % this.size) + this.pixel}px`, // col
          `${this.pixel * Math.ceil((i + 1) / this.size)}px`, // row
          0,
          el.style.backgroundColor || "transparent"
        ].join(" ");
      }
    );

    const result = `<div class="dot"></div>
<style>
.dot::before {
  content: "";
  position: absolute;
  top: ${this.pixel * -1}px;
  left: ${this.pixel * -1}px;

  width: ${this.pixel}px;
  height: ${this.pixel}px;
  background: transparent;

  box-shadow:${boxShadows.join(",\n")};
}
</style>`;

    document.getElementById("output").value = result;
  }
}

const main = () => {
  const grid = document.querySelector(".dot-grid");
  const dotGen = new DotGen(grid);

  dotGen.changeSize(8);
  dotGen.changePixel(4);

  document.getElementById("size").addEventListener("change", e => {
    dotGen.changeSize(parseInt(e.target.value, 10));
  });

  document.getElementById("pixel").addEventListener("change", e => {
    dotGen.changePixel(parseInt(e.target.value, 10));
  });

  document.getElementById("color").addEventListener("change", e => {
    const color = e.target.value;
    dotGen.changeColor(color);

    document.getElementById("current-color").innerText = color;
  });

  document.getElementById("control-paint").addEventListener("click", () => {
    dotGen.changeMode("paint");
  });
  document.getElementById("control-eraser").addEventListener("click", () => {
    dotGen.changeMode("eraser");
  });
};

main();
