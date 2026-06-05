class MockContext2D {
  constructor(canvas) {
    this.canvas = canvas;
    this.drawings = [];
    this.font = '';
    this.fillStyle = '';
    this.textAlign = '';
    this.lastFillRectColor = null;
  }

  save() {
    this.drawings.push({ type: 'save' });
  }

  restore() {
    this.drawings.push({ type: 'restore' });
  }

  translate(x, y) {
    this.drawings.push({ type: 'translate', x, y });
  }

  fillRect(x, y, w, h) {
    this.drawings.push({ type: 'fillRect', x, y, w, h, fillStyle: this.fillStyle });
    if (x === 0 && y === 0) {
      this.lastFillRectColor = this.fillStyle;
    }
  }

  fillText(text, x, y) {
    this.drawings.push({ type: 'fillText', text, x, y, font: this.font, textAlign: this.textAlign });
  }

  clearRect(x, y, w, h) {
    this.drawings.push({ type: 'clearRect', x, y, w, h });
  }

  measureText(text) {
    // Return a dummy width proportional to string length
    return { width: (text || '').length * 8 };
  }

  getImageData(x, y, w, h) {
    let r = 0, g = 0, b = 0;
    const color = this.lastFillRectColor || '';
    if (color.toLowerCase() === '#f00' || color.toLowerCase() === 'red') {
      r = 255;
    }
    return {
      data: [r, g, b, 255]
    };
  }
}

class MockCanvas {
  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
    this.ctx = new MockContext2D(this);
  }

  getContext(type) {
    if (type === '2d') {
      return this.ctx;
    }
    return null;
  }

  toDataURL() {
    const trace = {
      width: this.width,
      height: this.height,
      drawings: this.ctx.drawings
    };
    return 'data:image/png;base64,' + Buffer.from(JSON.stringify(trace)).toString('base64');
  }
}

function createCanvas(width, height) {
  return new MockCanvas(width, height);
}

module.exports = {
  createCanvas,
  Canvas: MockCanvas
};
