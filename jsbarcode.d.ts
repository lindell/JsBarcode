declare namespace JsBarcode {
  interface Options {
    width?: number,
    height?: number,
    format?: string,
    displayValue?: boolean,
    fontOptions?: string,
    font?: string,
    text?: string,
    textAlign?: string,
    textPosition?: string,
    textMargin?: number,
    fontSize?: number,
    background?: string,
    lineColor?: string,
    margin?: number,
    marginTop?: number,
    marginBottom?: number,
    marginLeft?: number,
    marginRight?: number,
    valid?: Function
  }

  interface api {
    options(options: Options): api;
    blank(size: number): api;
    init(options?: Options): void;
    render(): void;
    CODE39(value: string, options?: Options): api;
    CODE128(value: string, options?: Options): api;
    CODE128A(value: string, options?: Options): api;
    CODE128B(value: string, options?: Options): api;
    CODE128C(value: string, options?: Options): api;
    EAN13(value: string, options?: Options): api;
    EAN8(value: string, options?: Options): api;
    EAN5(value: string, options?: Options): api;
    EAN2(value: string, options?: Options): api;
    UPC(value: string, options?: Options): api;
    ITF14(value: string, options?: Options): api;
    ITF(value: string, options?: Options): api;
    MSI(value: string, options?: Options): api;
    MSI10(value: string, options?: Options): api;
    MSI11(value: string, options?: Options): api;
    MSI1010(value: string, options?: Options): api;
    MSI1110(value: string, options?: Options): api;
    pharmacode(value: string, options?: Options): api;
    codabar(value: string, options?: Options): api;
  }
}

declare function JsBarcode(element: any): JsBarcode.api;
declare function JsBarcode(element: any, data: string, options?: JsBarcode.Options): void;

export = JsBarcode;
export as namespace JsBarcode;
