NMS 是 net.minecraft.server 的 Java 包的縮寫，所有 Minecraft 伺服器的原生程序都放在這裡，

然而目前 Minecraft 插件圈流通的 NMS 並不是 Minecraft 官方自己釋出的 API，

是玩家自己反編譯並整理而成的，下面這段描述可以在[這裡](https://github.com/Bukkit/mc-dev)看到。

> "This repository contains automatically generated decompiled sources of a (internally renamed) minecraft_server.jar."

這也是為什麼 NMS 內會有大量以 a, b, aa...方式命名且難以閱讀的變數和函式，

從 Github 找 [commit](https://github.com/Bukkit/mc-dev/commit/babbc439a6a90d635bb63369fd2fd9353e35a940) 來看，就可以看到前人耕耘的足跡呢...
