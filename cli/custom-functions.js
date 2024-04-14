class RadianMask {
  constructor({ r, x, y }) {
    this.points = [
      { x: -r, y: -r },
      { x: r, y: -r },
      { x: r, y: r },
      { x: -r, y: r },
    ].map(({ x, y }) => {
      const _rad = Math.atan2(y, x);

      return {
        x,
        y,
        tag: 0,
        rad: _rad < 0 ? _rad + 2 * Math.PI : _rad,
      };
    });

    this.origin = { x, y };
    this.r = r;
  }

  getPath(startAngle, endAngle) {
    const from = ((Math.round(startAngle) % 360) / 180) * Math.PI;
    const to = ((Math.round(endAngle) % 360) / 180) * Math.PI;

    const points = [
      ...this.points,
      {
        ...RadianMask.createPoint(this.r, from),
        tag: 1,
      },
      {
        ...RadianMask.createPoint(this.r, to),
        tag: 2,
      },
    ];

    points.sort((a, b) => a.rad - b.rad);

    const i1 = points.findIndex((p) => p.tag === 1);
    const i2 = points.findIndex((p) => p.tag === 2);
    const result =
      i1 < i2
        ? points.slice(i1, i2 + 1)
        : [...points.slice(i1), ...points.slice(0, i2 + 1)];

    const { x, y } = this.origin;
    const data =
      `M ${x},${y}` +
      result.map((p) => `L ${x + p.x},${y + p.y}`).join(" ") +
      " Z";
    return data;
  }

  /**
   * @link https://www.quora.com/What-is-the-polar-equation-for-a-square-if-any
   */
  static getSquareRadius = (rad) => {
    return Math.min(1 / Math.abs(Math.cos(rad)), 1 / Math.abs(Math.sin(rad)));
  };

  static createPoint = (radius, rad) => ({
    x: radius * RadianMask.getSquareRadius(rad) * Math.cos(rad),
    y: radius * RadianMask.getSquareRadius(rad) * Math.sin(rad),
    rad: rad < 0 ? rad + 2 * Math.PI : rad,
  });
}

class ProgressCircle {
  static endAngle = 210;

  constructor() {
    const targetElement = document.querySelector("#progress-bar");
    if (targetElement === null) {
      throw new Error("The element is not found.");
    }
    if (targetElement.tagName !== "circle") {
      throw new Error("The element is not support by this library.");
    }

    const r = targetElement.getAttribute("r");

    if (r === null) {
      throw new Error("The radius is missing.");
    }
    const svgElement = targetElement.ownerSVGElement;

    this.clipInfo = ProgressCircle.createClipPath(svgElement);
    this.mask = new RadianMask({ r: 56, x: 57, y: 89 });

    targetElement.setAttribute("clip-path", `url(#${this.clipInfo.id})`);

    this.updateProgress(0);
  }

  updateProgress(value) {
    if (value < 0 || value > 1) {
      throw new Error("Invalid value");
    }

    // 0% = 15
    // 100% = 210
    const diff = 15 - 210;
    const newAngle = 210 + diff * value;

    this.clipInfo.pathElement.setAttribute(
      "d",
      this.mask.getPath(newAngle, ProgressCircle.endAngle)
    );
  }

  static createClipPath(svgElement) {
    const id = "s5Yi_w7JiM-DgwFdtQRGk";
    const clipElement = document.querySelector(`clipPath#${id}`);
    const pathElement = clipElement.querySelector("path");

    return {
      id,
      clipElement,
      pathElement,
    };
  }
}

if (!$tw.FSP) {
  $tw.FSP = {};
}

$tw.FSP.loadTiddlersBrowser = async () => {
  const textElement = document.querySelector(
    ".tc-remove-when-wiki-loaded .loading-text"
  );
  const fileElement = document.querySelector(
    ".tc-remove-when-wiki-loaded .load-file"
  );
  const progressCircle = new ProgressCircle();

  /**
   * @type string[]
   */
  const list = [];
  for (let index = 0; index < list.length; index++) {
    const path = list[index];

    fileElement.innerHTML = path;

    const result = await fetch(path).then((response) => response.json());
    $tw.wiki.addTiddlers([result]);

    const progress = (100 * (index + 1)) / list.length;
    textElement.innerHTML = "Loading..." + parseInt(progress) + "%";
    progressCircle.updateProgress(progress / 100);
  }
};
