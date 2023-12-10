此專案為 [R3F Chibi Shootgame](<#R3F Chibi Shootgame>) 的子專案，或前導專案，為了搭建 2D 骨架動畫的函式庫基礎。

## 背景

DragonBonesJS 是一種 2D 骨架動畫的 Javascript Runtime，其他類似的產品還有 [Spine](http://esotericsoftware.com/) （業界最為普及）、 [Creature Animation](https://creature.kestrelmoon.com/)、[Rive](https://rive.app/) ...等。但是 DragonBonesJS 之中編輯器可以免費下載且 Runtime 有開源的選項，因此被 [FlyPie](#FlyPie) 選中，但是其函式庫無法輕易被的被現代 Toolchain 所使用，包含：支援 Three.js 的版本過於老舊、不支援 ESM (ES6 Modules or JavaScript Modules) 載入...等問題。

## 重構結果

- Runtime Demo
  - [https://flyskypie.github.io/dragonbones-pixi/demo/](https://flyskypie.github.io/dragonbones-pixi/demo/)
- Github Repo
  - [https://github.com/FlySkyPie/dragonbones-js](https://github.com/FlySkyPie/dragonbones-js)
  - [https://github.com/FlySkyPie/dragonbones-pixi](https://github.com/FlySkyPie/dragonbones-pixi)
  - [https://github.com/FlySkyPie/dragonbones-threejs](https://github.com/FlySkyPie/dragonbones-threejs)
- NPM Package
  - [https://www.npmjs.com/package/@flyskypie/dragonbones-js](https://www.npmjs.com/package/@flyskypie/dragonbones-js)
  - [https://www.npmjs.com/package/@flyskypie/dragonbones-pixi](https://www.npmjs.com/package/@flyskypie/dragonbones-pixi)
  - [https://www.npmjs.com/package/@flyskypie/dragonbones-threejs](https://www.npmjs.com/package/@flyskypie/dragonbones-threejs)

## 相關發文

- 2023-01-17 Blog [一場關於 2D Skeletal animation 動畫的 Web Runtime 的旅程](https://flyskypie.github.io/blog/2023-01-17_a-journey-about-2D-skeletal-animation-of-runtime/)