import axios from "axios";
import { AnalyzedDoc, TitleText } from "./AnalyzedDoc";
import { parse, HTMLElement } from "node-html-parser";
import { ArrayTypeNode } from "typescript";

export class HTMLAnalyzer {
  static async getAnalyzedDocByUrl(
    targetUrl: string,
    selectQuery: string
  ): Promise<AnalyzedDoc> {
    let analyzedDoc = await this.getHtmlDocByUrl(targetUrl);
    analyzedDoc.parsedHtml = this.getParsedHtml(analyzedDoc.siteData);
    analyzedDoc.selectedElements =
      analyzedDoc.parsedHtml.querySelectorAll(selectQuery);
    return analyzedDoc;
  }

  private static async getHtmlDocByUrl(
    targetUrl: string
  ): Promise<AnalyzedDoc> {
    let res = new AnalyzedDoc(targetUrl);
    let result = await axios.get(targetUrl);
    res.statusCode = result.status ?? -1;
    res.siteData = result.data;
    try {
      res.documentDate = new Date(result.headers.date);
    } catch (e) {}
    return res;
  }

  private static getParsedHtml(doc: string): HTMLElement {
    let parsedHtml = parse(doc, {
      lowerCaseTagName: false, // convert tag name to lower case (hurts performance heavily)
      comment: false, // retrieve comments (hurts performance slightly)
      voidTag: {
        tags: [
          "area",
          "base",
          "br",
          "col",
          "embed",
          "hr",
          "img",
          "input",
          "link",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
        ], // optional and case insensitive, default value is ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
        closingSlash: true, // optional, default false. void tag serialisation, add a final slash <br/>
      },
      blockTextElements: {
        script: false, // keep text content when parsing
        noscript: true, // keep text content when parsing
        style: false, // keep text content when parsing
        pre: true, // keep text content when parsing
      },
    });

    return parsedHtml;
  }
}
