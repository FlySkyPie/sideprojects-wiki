import { JSDOM, VirtualConsole } from "jsdom";
import fs from "fs-extra";
import path from "path";
import cliProgress from "cli-progress";

import tiddlyHtmlStr from "../output/index.html?raw";
import customFunctionStr from "./custom-functions.js?raw";
import originScriptStr from "./origin-loadTiddlersBrowser.js?raw";
import updatedScriptStr from "./updated-loadTiddlersBrowser.js?raw";

type ITiddler = {
  tags: string;
  title: string;
  type: string;
  text: string;
  [key: string]: unknown;
};

console.log("Extracting Tiddlers...");
const virtualConsole = new VirtualConsole();
virtualConsole.on("error", () => {
  // Ignore `Error: Could not parse CSS stylesheet` error.
});

const document = new JSDOM(tiddlyHtmlStr, { virtualConsole }).window.document;

/**
 * Extract tidders from embedded json.
 */
const list: string[] = [];
const nodes = document.querySelectorAll("script.tiddlywiki-tiddler-store");

for (var n = 0; n < nodes.length; n++) {
  const node = nodes[n];
  if (!node.textContent) {
    continue;
  }

  const tiddlers: ITiddler[] = JSON.parse(node.textContent);

  const bar1 = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  bar1.start(tiddlers.length, 0);

  for (let index = 0; index < tiddlers.length; index++) {
    const tiddler = tiddlers[index];
    const { title } = tiddler;

    list.push("./tiddlers/" + `${title}.json`);

    const filePath = path.resolve(
      __dirname,
      "../output/tiddlers/",
      `${title}.json`
    );
    await fs.ensureFile(filePath);
    await fs.writeFile(filePath, JSON.stringify(tiddler));
    bar1.update(index + 1);
  }
  bar1.stop();
  node.remove();
}

console.log("Injecting custom loader...");

// Inject list to post boot
const updatedScript = customFunctionStr.replace(
  "const list = [];",
  `const list = ${JSON.stringify(list)};`
);

const bootNode = document.querySelector(
  'script[data-tiddler-title="$:/boot/boot.js"]'
);

if (bootNode && bootNode.parentElement) {
  const newScript = document.createElement("script");
  newScript.type = "application/javascript";
  newScript.textContent = updatedScript;

  bootNode.parentElement.insertBefore(newScript, bootNode);
}

const htmlFilePath = path.resolve(__dirname, "../output/index.html/");
const updatedHtml = ("<!doctype html>\n" + document.documentElement.outerHTML)
  .replace(originScriptStr, updatedScriptStr)
  .replace(
    "$tw.boot.loadStartup = function(options){",
    "$tw.boot.loadStartup = async (options) => {"
  )
  .replace("$tw.loadTiddlersBrowser();", "await $tw.loadTiddlersBrowser();")
  .replace(
    "$tw.boot.startup = function(options) {",
    "$tw.boot.startup = async (options) => {"
  )
  .replace(
    "$tw.boot.loadStartup(options);",
    "await $tw.boot.loadStartup(options);"
  );

await fs.writeFile(htmlFilePath, updatedHtml);
