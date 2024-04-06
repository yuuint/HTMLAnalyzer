import axios from "axios";
import { AnalyzedDoc, ArticleDoc, PostDoc } from "./AnalyzedDoc";
import { DateTime, DateTimeMaybeValid } from "luxon";
import { parse, HTMLElement } from "node-html-parser";

export class AnalyzerOptions {
  selectQuery: string;
  titleSelector?: string;
  descriptionSelector?: string;
  dateSelector?: string;
  constructor(selectQuery: string) {
    this.selectQuery = selectQuery;
  }
}
export class HTMLAnalyzer {
  static async getAnalyzedDocByUrl(
    targetUrl: string,
    options: AnalyzerOptions,
    postDocAdapter: Function
  ): Promise<Array<PostDoc>> {
    let analyzedDoc = await this.getHtmlDocByUrl(targetUrl);
    analyzedDoc.parsedHtml = this.getParsedHtml(analyzedDoc.siteData);
    analyzedDoc.selectedElements = analyzedDoc.parsedHtml.querySelectorAll(
      options.selectQuery
    );

    return postDocAdapter(analyzedDoc.selectedElements, options);
  }

  static DlTagAdapter(elements: Array<HTMLElement>): Array<ArticleDoc> {
    let resDocs: Array<ArticleDoc> = new Array<ArticleDoc>();
    elements.forEach((elDl) => {
      let resDoc: ArticleDoc;
      elDl.childNodes.forEach((definition) => {
        if (definition.rawTagName == "dt") {
          resDoc = new ArticleDoc(
            definition.innerText.trim(),
            "",
            HTMLAnalyzer.guessDate(definition.innerText)
          );
        } else if (definition.rawTagName == "dd") {
          resDoc.description = definition.innerText.trim();
          resDocs.push(resDoc);
        }
      });
    });
    return resDocs;
  }

  static CustomBlockAdapter(
    elements: Array<HTMLElement>,
    options: AnalyzerOptions
  ): Array<ArticleDoc> {
    let resDocs: Array<ArticleDoc> = new Array<ArticleDoc>();
    elements.forEach((el) => {
      let title =
        el.querySelector(options.titleSelector ?? "")?.innerText.trim() ?? "";
      let description =
        el.querySelector(options.descriptionSelector ?? "")?.innerText.trim() ??
        "";
      let date = HTMLAnalyzer.guessDate(
        el.querySelector(options.dateSelector ?? "")?.innerText ?? ""
      );
      resDocs.push(new ArticleDoc(title, description, date));
    });

    return resDocs;
  }

  private static guessDate(sentence: string): Date {
    const dateRegexFormats: Array<DateRegexFormat> = [
      new DateRegexFormat("[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}", "yyyy/M/d"),
      new DateRegexFormat("[0-9]{4}.[0-9]{1,2}.[0-9]{1,2}", "yyyy.M.d"),
      new DateRegexFormat("[0-9]{4}年[0-9]{1,2}月[0-9]{1,2}日", "yyyy年M月d日"),
      new DateRegexFormat("[0-9]{1,2}月[0-9]{1,2}日", "M月d日"),
    ];

    // let matchStr: string = "";
    let res: DateTimeMaybeValid = DateTime.fromISO("2020-01-01");
    for (const dateRegexFormat of dateRegexFormats) {
      let regex = new RegExp(dateRegexFormat.regex);
      let finds: Array<string> = regex.exec(sentence) ?? [];
      for (const find of finds) {
        res = DateTime.fromFormat(find, dateRegexFormat.dateFormat);
        if (res.isValid) {
          return res.toJSDate();
        }
      }
    }
    return DateTime.fromISO("2020-01-01").toJSDate();
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
    });

    return parsedHtml;
  }
}

export class DateRegexFormat {
  regex: string;
  dateFormat: string;

  constructor(regex: string, dateFormat: string) {
    this.regex = regex;
    this.dateFormat = dateFormat;
  }
}
