$tw.loadTiddlersBrowser = async () => {
  // In the browser, we load tiddlers from certain elements
  var containerSelectors = [
    // IDs for old-style v5.1.x tiddler stores
    "#libraryModules",
    "#modules",
    "#bootKernelPrefix",
    "#bootKernel",
    "#styleArea",
    "#storeArea",
    "#systemArea",
    // Classes for new-style v5.2.x JSON tiddler stores
    "script.tiddlywiki-tiddler-store",
  ];
  for (var t = 0; t < containerSelectors.length; t++) {
    var nodes = document.querySelectorAll(containerSelectors[t]);
    for (var n = 0; n < nodes.length; n++) {
      $tw.wiki.addTiddlers($tw.wiki.deserializeTiddlers("(DOM)", nodes[n]));
    }
  }

  /**
   * @type string[]
   */
  const list = [];
  for (let index = 0; index < list.length; index++) {
    const path = list[index];
    const result = await fetch(path).then((response) => response.json());
    $tw.wiki.addTiddlers([result]);
  }
};
