import { JSDOM } from "jsdom";

import tiddlyHtmlStr from "../output/index.html?raw";

const document = new JSDOM(tiddlyHtmlStr).window.document;

const nodes = document.querySelectorAll("script.tiddlywiki-tiddler-store");
for (var n = 0; n < nodes.length; n++) {
  const node = nodes[n];
  if (!node.textContent) {
    continue;
  }
  const data: any[] = JSON.parse(node.textContent);

  // console.log(data);
}

console.log(document.documentElement.outerHTML);
