if (!$tw.FSP) {
  $tw.FSP = {};
}

$tw.FSP.loadTiddlersBrowser = async () => {
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
