declare namespace JsBarcode {
  interface BaseOptions {
    width?: number;
    height?: number;
    format?: string;
    displayValue?: boolean;
    fontOptions?: string;
    font?: string;
    text?: string;
    textAlign?: string;
    textPosition?: string;
    textMargin?: number;
    fontSize?: number;
    background?: string;
    lineColor?: string;
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    valid?: (valid: boolean) => void;
  }

  interface Code128Options extends BaseOptions {
    ean128?: boolean;
  }

  interface Ean8Options extends BaseOptions {
    flat?: boolean;
  }

  interface Ean13Options extends BaseOptions {
    flat?: boolean;
    lastChar?: string;
  }

  type Options = BaseOptions | Code128Options | Ean13Options;

  interface api {
    options(options: Options): api;
    blank(size: number): api;
    init(options?: Options): void;
    render(): void;
    CODE39(value: string, options?: BaseOptions): api;
    CODE128(value: string, options?: Code128Options): api;
    CODE128A(value: string, options?: Code128Options): api;
    CODE128B(value: string, options?: Code128Options): api;
    CODE128C(value: string, options?: Code128Options): api;
    EAN13(value: string, options?: Ean13Options): api;
    EAN8(value: string, options?: Ean8Options): api;
    EAN5(value: string, options?: BaseOptions): api;
    EAN2(value: string, options?: BaseOptions): api;
    UPC(value: string, options?: BaseOptions): api;
    ITF14(value: string, options?: BaseOptions): api;
    ITF(value: string, options?: BaseOptions): api;
    MSI(value: string, options?: BaseOptions): api;
    MSI10(value: string, options?: BaseOptions): api;
    MSI11(value: string, options?: BaseOptions): api;
    MSI1010(value: string, options?: BaseOptions): api;
    MSI1110(value: string, options?: BaseOptions): api;
    pharmacode(value: string, options?: BaseOptions): api;
    codabar(value: string, options?: BaseOptions): api;
  }
}

declare function JsBarcode(element: any): JsBarcode.api;
declare function JsBarcode(element: any, data: string, options?: JsBarcode.Options): void;

export = JsBarcode;
export as namespace JsBarcode;
