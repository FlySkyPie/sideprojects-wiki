- 一種去中心化叢集運算架構，用以建構運算 Hakoniwa 的網路。
- Polis 是「古希臘城邦」的意思。

## 基本概念 Concept

### 技術痛點

具我所知 Minecraft 在軟體層面有兩個瓶頸：
- 複雜的 OOP 結構
- 伺服器端使用單執行緒

以前我試著寫 Minecraft [插件](https://youtu.be/vH0KOeijNeQ)的時候，因為有使用到 NMS (net.minecraft.server) 的 API，因此大概知道 Minecraft 的程式碼大量使用了多層繼承 (Multilevel Inheritance)，然而這種 OOP 模式不只增加了開發者的負擔（本人認為多層繼承是一種反模式），更會造成在處理 Minecraft 這樣複雜的遊戲內容時，狀態的管理不容易控制而造成 bug 並且難以排除。

於是我打算使用 ECS (Entity Component System) 架構來解決，其概念就是單純化資料容器 (Entity 與 Component)，由 System 執行邏輯運算，透過分離資料和邏輯達到更清晰的程式碼，並且複數 System 有序執行的方式讓狀態管理單純化。然而這個架構有個問題，就是 System 有序執行的特性讓我不知道如何搭配多執行緒來提高軟體對硬體資源的利用率。

### 遊戲運算平行化

其中一個合理的解方是以地圖的 Chunk 為單位切割最小的運算區塊 (Game Block)，一個 Game Block 由一個執行緒處理運算，Game Block 之間（也就是執行緒之間）的通訊則由事件驅動。

舉例來說，有一支箭矢飛越運算區塊的邊界：

![](#01_chunk-roaming.webp)

來源 Game Block 會把箭矢的資訊包裝成一個事件，發送給目標 Game Block，並且從資料集中移除。目標 Game Block 則是根據事件創建一個箭矢實體並繼續運算。兩個 Game Block 使用獨立的執行緒，並且運算週期並不同步，因此不會凍結彼此。

### 何不乾脆 P2P?

不知道為什麼，我直覺覺得比起寫成一個 APP 管理一堆 Game Block，不如乾脆全部做成微服務，讓它們自己構成一個叢集比較好。於是一個新的坑 (Polis) 就產生了。

---

[![創用 CC 授權條款](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)  
Wei Ji 以[創用CC 姓名標示-相同方式分享 4.0 國際 授權條款](http://creativecommons.org/licenses/by-sa/4.0/)釋出。