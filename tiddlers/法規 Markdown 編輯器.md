## 創作動機

[FlyPie](#FlyPie) 大學參與社團活動的經歷，讓他注意到法規（自製章規）可以說是行政實體的 Source Code，人們撰寫規則主要是為了傳達規則本身，格式反而不是重點，但是大部分學生社團的規則都被封印在 Microsoft Word 的資料格式之中，反而造成學生需要維護不少多餘的資訊。

Markdown 應該是一種理想儲存法規的格式，但是如果要說服學生遷移檔案格式，與校方互動時難免還是需要提供 Microsoft Word 檔案或是列印成紙本格式。因此「Markdown→Word/列印」的機制是必須存在的。

## PHP 實作

原本屬於[社團行政管理系統](#社團行政管理系統)的一部分，拆分成兩個部份實作：

- Markdown to Array
  - [https://github.com/FlySkyPie/markdown-regulation-parser](https://github.com/FlySkyPie/markdown-regulation-parser)
- Array to ODT ([OpenDocument](https://en.wikipedia.org/wiki/OpenDocument))
  - [https://github.com/FlySkyPie/regulation-odt](https://github.com/FlySkyPie/regulation-odt)

## Web 實作

因為 PHP 實作受限於需要伺服器執行，資料轉換邏輯本身並沒有非得在後端執行的問題，想說以 Javascript 實作便能輕易以網頁應用程式的形式被人使用，另外順便練習一下 [Vue.js](https://en.wikipedia.org/wiki/Vue.js)。

### 程式碼

[https://github.com/FlySkyPie/markdown-regulation-editor](https://github.com/FlySkyPie/markdown-regulation-editor)

### Live Demo

[https://flyskypie.github.io/markdown-regulation-editor/](https://flyskypie.github.io/markdown-regulation-editor/)