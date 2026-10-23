import AlgorithmBuilder from "./AlgorithmBuilder";
import ComputerExplorer from "./ComputerExplorer";
import DataConverter from "./DataConverter";
import HtmlPlayground from "./HtmlPlayground";
import JsPlayground from "./JsPlayground";
import LogicLab from "./LogicLab";
import NumberConverter from "./NumberConverter";

export const labComponents = {
  "sanoq-sistemalari": NumberConverter,
  "axborot-hajmi": DataConverter,
  "mantiqiy-eshiklar": LogicLab,
  "algoritm-qurish": AlgorithmBuilder,
  "html-css": HtmlPlayground,
  javascript: JsPlayground,
  qurilmalar: ComputerExplorer,
};

export {
  AlgorithmBuilder,
  ComputerExplorer,
  DataConverter,
  HtmlPlayground,
  JsPlayground,
  LogicLab,
  NumberConverter,
};
