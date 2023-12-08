ECS 是種軟體架構，鬥陣特攻 (Overwatch) 的團隊在遊戲上使用並且在 GDC 2017 中介紹而遊戲開發圈廣為人知，Unity3D 更在 2018 將 ECS 框架引入遊戲引擎中。它的核心概念是不使用原本流行的物件導向 (OOP, Object-oriented programming) 的軟體抽象化方式轉而使用資料導向 (Data Oriented)。

OOP 的邏輯是：把程式邏輯抽象化成一個一個的「物件」，然後透過「方法」去操作物件，隨著專案越來越複雜，這些物件通常會一層包一層。而 ECS 的邏輯是：把資料跟運算邏輯分離，Component 只有資料、Entity 是 Component 的索引、System 則不儲存狀態專注於運算邏輯。

關於 ECS 的介紹我就點到這裡為止，至於我想在專案中使用這種架構的原因源自 2018 年我試著寫一個 Minecraft [插件](https://youtu.be/vH0KOeijNeQ?si=NnObrN-XhnVk9zFc)的時候經歷了非常痛苦的開發體驗，以我當時想修改的殭屍實體為例：

![](#01_minecraft-npc.webp)

Minecraft 裡充滿了多層繼承 (Multilevel Inheritance)，這使得釐清物件之間如何交互作用的認知負荷變得非常高，雪上加霜的是 Minecraft 插件源自逆向工程的產物，並不是所有變數和方法都是人類可讀的。

雖然當時體驗的困難並不是所有都是軟體架構造成的，然而後來我才知道這種開發風格在遊戲開發圈也算是很有爭議的主題之一，在知道 Minecraft 的程式碼有多難除錯，看著它那滿坑滿谷的 [Bug 清單](https://bugs.mojang.com/projects/MC/issues)，當中不少還直接被標記「這個不會被修復」似乎也不奇怪了。

作為一個想開發類似於 Minecraft 這等高度複雜的沙盒開放世界遊戲的後進者，自然會想避免步上 Minecraft 的後塵，而 ECS 便是我目前優先考慮的架構。