import { HTMLAnalyzer } from "./HTMLAnalyzer";
import { AnalyzedDoc, ArticleDoc } from "./AnalyzedDoc";
export { HTMLAnalyzer, AnalyzedDoc, ArticleDoc };

// const otaru = HTMLAnalyzer.getAnalyzedDocByUrl(
//   "https://otaru-aq.jp/choineta/news_taxonomy/oshirase",
//   { selectQuery: ".news_list" },
//   HTMLAnalyzer.DlTagAdapter
// );
// console.log(
//   otaru.then((doc) => {
//     doc.forEach((result) => {
//       console.log(JSON.stringify(result));
//     });
//   })
// );

// const marine = HTMLAnalyzer.getAnalyzedDocByUrl(
//   "https://marine-world.jp/news/",
//   {
//     selectQuery: ".item",
//     titleSelector: ".label",
//     descriptionSelector: "h3",
//     dateSelector: ".date",
//   },
//   HTMLAnalyzer.CustomBlockAdapter
// );
// console.log(
//   marine.then((doc) => {
//     console.log(JSON.stringify(doc));
//   })
// );

// const kyoto = HTMLAnalyzer.getAnalyzedDocByUrl(
//   "https://www.kyoto-aquarium.com/news/",
//   {
//     selectQuery: ".archiveBlock li",
//     titleSelector: ".title",
//     descriptionSelector: ".title span:not(.date)",
//     dateSelector: ".date",
//   },
//   HTMLAnalyzer.CustomBlockAdapter
// );
// console.log(
//   kyoto.then((doc) => {
//     console.log(JSON.stringify(doc));
//   })
// );

// const marine = HTMLAnalyzer.getAnalyzedDocByUrl(
//   "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/index.html",
//   {
//     selectQuery: ".block-news .content li",
//     titleSelector: ".headline",
//     descriptionSelector: ".headline",
//     dateSelector: ".headline",
//   },
//   HTMLAnalyzer.CustomBlockAdapter
// );
// console.log(
//   marine.then((doc) => {
//     console.log(JSON.stringify(doc));
//   })
// );
