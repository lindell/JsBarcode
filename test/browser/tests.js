function createTests(newTest){
  newTest("This has a \nnewline", {width: 1});
  newTest("\tHi\nHI", {width: 1});
  newTest("Hello", {width: 1, text: "Hi!"});
  newTest("A little test!", {format: "CODE128", width: 1});
  newTest("ABCDEFG", {format: "CODE39", width: 1, mod43: true});
  newTest("A little test", {format: "CODE39", width: 1});
  newTest("12345", {format: "EAN5", width: 1});
  newTest("52", {format: "EAN2", width: 1});
  newTest("423514346455", {format: "UPC", width: 2, textMargin: 0});
  newTest("423514346455", {format: "UPC", width: 2, textMargin: 0, flat: true});
  newTest("01245714", {format: "UPCE", width: 2, textMargin: 0});
  newTest("5901234123457", {format: "EAN13", fontSize: 40, textMargin: 0, lastChar: ">"});
  newTest("590123412345", {format: "EAN13", width: 2, fontSize: 16});
  newTest("590123412345", {format: "EAN13", width: 3});
  newTest("590123412345", {format: "EAN13", flat: true});
  newTest("96385074", {format: "EAN8", width: 1});
  newTest("9638507", {format: "EAN8", width: 1});
  newTest("98765432109213", {format: "ITF14", width: 1});
  newTest("12345", {format: "pharmacode", width: 1});
  newTest("133742", {format: "CODE128C", width: 1});
  newTest("12345674", {format: "MSI", width: 1});
  newTest("1234567890", {format: "codabar", width: 1});
  newTest("A1234567890A", {format: "codabar", width: 1});
  newTest("C1234567890D", {format: "codabar", width: 1});
  newTest("12345674", {format: "GenericBarcode", width: 1});
  newTest("Such customize!", {
    width: 1,
    height:	50,
    format:	"CODE128",
    displayValue: true,
    fontOptions: "bold",
    font: "cursive",
    textAlign: "right",
    textMargin: 20,
    fontSize: 28,
    background: "#f00",
    lineColor: "#0ff",
    margin: 10,
    marginTop: 60,
    marginBottom: 5,
    marginLeft: 60,
    marginRight: 30
  });
}
