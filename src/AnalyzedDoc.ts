import { AxiosResponse } from "axios";
import { parse, HTMLElement } from "node-html-parser";

/**
 * AnalyzedDoc
 * @export
 * @class AnalyzedDoc
 */
export class AnalyzedDoc {
  /**
   * url
   * @type {string}
   * @memberof Member
   */
  targetUrl: string;
  statusCode: number;
  siteData: any;
  parsedHtml?: HTMLElement;
  selectedElements?: Array<HTMLElement>;
  documentDate?: Date;

  constructor(targetUrl: string) {
    this.targetUrl = targetUrl;
    this.statusCode = -1;
    this.siteData = undefined;
    this.documentDate = undefined;
    this.parsedHtml = undefined;
    this.selectedElements = new Array<HTMLElement>();
  }

  toTitleTextArray(): Array<TitleText> {
    let results: Array<TitleText> = new Array<TitleText>();
    let isKey: boolean = true;

    let result: TitleText;
    this.selectedElements?.forEach((el) => {
      if (isKey) {
        result = new TitleText(el.innerText.trim(), "");
        isKey = false;
      } else {
        result.text = el.innerText.trim();
        isKey = true;
        results.push(result);
      }
    });
    return results;
  }
}

export class TitleText {
  title: string;
  text: string;

  constructor(title: string, text: string) {
    this.title = title;
    this.text = text;
  }
}
