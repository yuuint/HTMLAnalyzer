import { HTMLAnalyzer } from "./HTMLAnalyzer";
import { AnalyzedDoc } from "./AnalyzedDoc";
export { HTMLAnalyzer, AnalyzedDoc };

const analyzedDoc = HTMLAnalyzer.getAnalyzedDocByUrl(
  "https://otaru-aq.jp/choineta/news_taxonomy/oshirase",
  ".news_list dt, .news_list dd"
);
console.log(
  analyzedDoc.then((doc) => {
    console.log(JSON.stringify(doc.toTitleTextArray()));
  })
);
