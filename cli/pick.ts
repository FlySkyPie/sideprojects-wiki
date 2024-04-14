import { JSDOM } from "jsdom";
import fs from "fs-extra";
import path from "path";

import tiddlyHtmlStr from "../output/index.html?raw";

type ITiddler = {
  tags: string;
  title: string;
  type: string;
  text: string;
  [key: string]: unknown;
};

const document = new JSDOM(tiddlyHtmlStr).window.document;

const lazyLoadTiddlers: ITiddler[] = [];

const nodes = document.querySelectorAll("script.tiddlywiki-tiddler-store");
for (var n = 0; n < nodes.length; n++) {
  const node = nodes[n];
  if (!node.textContent) {
    continue;
  }
  const tiddlers: ITiddler[] = JSON.parse(node.textContent);
  const keepTiddlers: ITiddler[] = [];

  for (let index = 0; index < tiddlers.length; index++) {
    const tiddler = tiddlers[index];
    if (!tiddler.tags) {
      keepTiddlers.push(tiddler);
      continue;
    }
    const tags = tiddler.tags.split(" ");
    if (!tags.includes("FSP::lazy-load-tiddler")) {
      keepTiddlers.push(tiddler);
      continue;
    }

    lazyLoadTiddlers.push(tiddler);
  }

  node.textContent = JSON.stringify(keepTiddlers);
}

// Export files
for (let index = 0; index < lazyLoadTiddlers.length; index++) {
  const tiddler = lazyLoadTiddlers[index];
  const { title } = tiddler;

  const filePath = path.resolve(
    __dirname,
    "../output/tiddlers/",
    `${title}.json`
  );
  await fs.ensureFile(filePath);
  await fs.writeFile(filePath, JSON.stringify(tiddler));
}

const filePath = path.resolve(__dirname, "../output/index.html/");
await fs.writeFile(filePath, document.documentElement.outerHTML);
