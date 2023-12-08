Hakoniwa，出自日語「箱庭」的拼音。目的在於開發一個系統用於運行 Minecraft-like (Voxel) 世界。

## 技術棧

目前有兩條技術棧在同時發展：
- Minecraft
    - 使用 Minecraft 作為機器學習的環境。
- [Voxel](#ASMCBNFH)
    - 額外開發一個 Voxel 環境作為機器學習的環境。

## Minecraft Stack

曾經考慮使用 Malmo 或是 MineRL 框架，但是 Malmo 設計上是透過建立"關卡"來進行訓練，並不適用環驅的精神，而 MineRL 則是環境架設困難（使用 Python 封裝 Java 環境）且 reward 由其大賽主辦方設定，無法自行變更。

目前發展方向為採用 Mineflayer 作為 client 端並搭配第三方伺服器 Cuberite，並透過一層 headless three.js 實現 server side render 提供人物視角影像給 AI。

```
AI <-IPC-> Headless render <-> Mineflayer <-> Cuberite。
```