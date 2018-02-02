1 (function () { 
2     'use strict'; 
3     const userNameInput = document.getElementById('user-name'); 
4     const assessmentButton = document.getElementById('assessment'); 
5     const resultDivided = document.getElementById('result-area'); 
6     const tweetDivided = document.getElementById('tweet-area'); 
7 
 
8     /** 
9     * 指定した要素の子どもを全て除去する 
10     * @param {HTMLElement} element HTMLの要素 
11     */ 
12     function removeAllChildren(element) { 
13         while (element.firstChild) { // 子どもの要素があるかぎり除去 
14             element.removeChild(element.firstChild); 
15         } 
16     } 
17 
 
18     assessmentButton.onclick = () => { 
19         const userName = userNameInput.value; 
20         if (userName.length === 0) { // 名前が空の時は処理を終了する 
21             return; 
22         } 
23 
 
24         // 診断結果表示エリアの作成 
25         removeAllChildren(resultDivided); 
26         const header = document.createElement('h3'); 
27         header.innerText = '診断結果'; 
28         resultDivided.appendChild(header); 
29 
 
30         const paragraph = document.createElement('p'); 
31         const result = assessment(userName); 
32         paragraph.innerText = result; 
33         resultDivided.appendChild(paragraph); 
34 
 
35         // ツイートエリアの作成 
36         removeAllChildren(tweetDivided); 
37         const anchor = document.createElement('a'); 
38         const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D&text=' 
39             + encodeURIComponent(result); 
40         anchor.setAttribute('href', hrefValue); 
41         anchor.className = 'twitter-hashtag-button'; 
42         anchor.innerText = 'Tweet #%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE%E3%81%84%E3%81%84%E3%81%A8%E3%81%93%E3%82%8D'; 
43         tweetDivided.appendChild(anchor); 
44 
 
45         twttr.widgets.load(); 
46     }; 
47 
 
48     userNameInput.onkeydown = (event) => { 
49         if (event.keyCode === 13) { 
50             assessmentButton.onclick(); 
51         } 
52     }; 
53 
 
54     const answers = [ 
55         '{userName}のいいところは声です。{userName}の特徴的な声はみなを惹きつけ、心に残ります。', 
56         '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。', 
57         '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。', 
58         '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。', 
59         '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。', 
60         '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。', 
61         '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。', 
62         '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。', 
63         '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。', 
64         '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。', 
65         '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。', 
66         '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。', 
67         '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。', 
68         '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。', 
69         '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。', 
70         '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を押さえられる{userName}が皆から評価されています。' 
71     ]; 
72 
 
73     /** 
74     * 名前の文字列を渡すと診断結果を返す関数 
75     * @param {string} userName ユーザーの名前 
76     * @return {string} 診断結果 
77     */ 
78     function assessment(userName) { 
79         // 全文字のコード番号を取得してそれを足し合わせる 
80         let sumOfcharCode = 0; 
81         for (let i = 0; i < userName.length; i++) { 
82             sumOfcharCode = sumOfcharCode + userName.charCodeAt(i); 
83         } 
84 
 
85         // 文字のコード番号の合計を回答の数で割って添字の数値を求める 
86         const index = sumOfcharCode % answers.length; 
87         let result = answers[index]; 
88 
 
89         result = result.replace(/{userName}/g, userName); 
90         return result; 
91     } 
92 
 
93     // テストコード 
94     console.assert( 
95         assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。', 
96         '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。' 
97     ); 
98     console.assert( 
99         assessment('太郎') === assessment('太郎'), 
100         '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。' 
101     ); 
102 })(); 
