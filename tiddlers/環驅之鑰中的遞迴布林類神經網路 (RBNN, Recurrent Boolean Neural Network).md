人工智慧 (AI, Artificial Intelligence)與深度學習 (Deep Learning) 算是近幾年被用到爛大街的詞彙了，起因來自於一個被稱作類神經網路 (Neural Network) 的不新鮮的數學模型在晶片性能提昇以及算法改善的現代而終於獲得實用化，又因為 AlphaGo 在 2016 擊敗人類棋手等事件而形成話題才終於進入大眾的視野。

而布林類神經網路 (BNN)[^bnn] 則是參考了類神經網路的設計，但是不使用實數而是使用布林代數的一種算法，這個選擇並不是基於性能或實用性考量，老實說因為不是使用實數體系的代數，因此不能用微積分作弊（倒傳遞算法 Backpropagation），也不能直接以類神經模型主流的方式用顯示卡加速運算。

而是一種基於哲學上的選擇，私以為「因為類神經網路是對人類神經元的數學建模，因此類神經網路是通往『通用型人工**智慧**』的道路」是一種身為人類的傲慢。如果基於二進制的電腦能夠產生「通用智慧」，那它應該回歸二進制運算的本質，即布林代數本身，而不是透過浮點數 (IEEE 754) 運算去模仿神經元，這種模仿終究只能得到偽物。

根據奧卡姆剃刀 (Occam's razor)，簡單的解釋通常比較接近真理，因此我想嘗試這條用布林代數去探索的道路。

RBNN 單純是參考了遞迴類神經網路 (RNN) 加入了遞迴的要素使該演算法具備記憶性。

[^bnn]: Boolean Neural Network. (R. Kohut, B. Steinbach). Retrieved 2023-10-08, from https://www.semanticscholar.org/paper/Boolean-Neural-Networks-Kohut-Steinbach/1c472945ab2970a709efe97f81d9a5e7bf37baae