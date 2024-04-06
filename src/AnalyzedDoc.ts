import { HTMLElement } from "node-html-parser";

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
}

export class PostDoc {
  date?: Date;
  title: string;
  description: string;

  constructor(title: string, description: string, date: Date) {
    this.title = title;
    this.description = description;
    this.date = date;
  }
}

export class ArticleDoc extends PostDoc {
  constructor(title: string, description: string, date: Date) {
    super(title, description, date);
  }
}
