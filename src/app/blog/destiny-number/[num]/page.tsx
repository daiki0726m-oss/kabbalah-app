import { Sparkles, ArrowRight, Clock, ChevronLeft, Heart, Briefcase, Activity, Users, Star } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const destinyData: Record<string, {
  num: number; title: string; subtitle: string; element: string; color: string;
  overview: string; lightTraits: string[]; shadowTraits: string[];
  loveIntro: string; loveTraits: string[]; bestMatch: number[]; challengeMatch: number[];
  careerIntro: string; careers: string[];
  healthIntro: string; healthTips: string[];
  famousPeople: { name: string; desc: string }[];
  advice: string;
}> = {
  "1": {
    num: 1, title: "王冠（ケテル）", subtitle: "セフィラ: ケテル ─ ヘブライ文字: アレフ（א）─ 支配星: 太陽", element: "火", color: "#E74C3C",
    overview: "カバラの生命の樹において、1は最高位「ケテル（王冠）」に対応します。万物の源、最初の閃きを意味し、「無から有を生み出す」原初のエネルギーが宿っています。太陽の支配を受け、自我の輝きと独立心の象徴です。会議で最初に発言する人、新しい企画を持ち込む人、前例のない道を選ぶ人——それがあなたの自然な姿です。",
    lightTraits: ["原初の意志力とリーダーシップ", "ゼロから価値を創造する力", "迷いなき決断力と行動力", "困難を恐れない開拓者精神", "他者を自然と惹きつけるカリスマ性"],
    shadowTraits: ["人の意見を最後まで聞かず結論を出す", "助けを求めることを「負け」だと感じる", "自分のやり方を正解だと信じて譲らない", "孤立し壁を作りやすい"],
    loveIntro: "恋愛でも主導権を握りたいタイプ。対等に渡り合えるパートナーを求め、依存的な関係を嫌います。太陽と太陽がぶつかるような激しい恋も。",
    loveTraits: ["自分からアプローチする積極型", "束縛を極端に嫌う", "対等なパートナーシップを重視", "弱さを見せるのに時間がかかる"],
    bestMatch: [3, 5, 7], challengeMatch: [1, 8],
    careerIntro: "指示されるより自分で道を切り拓くことを好みます。ケテルのエネルギーは「始まり」を司り、新規事業の立ち上げに最適。",
    careers: ["起業家・経営者", "フリーランス", "新規事業開発", "発明家・イノベーター", "クリエイティブディレクター"],
    healthIntro: "太陽のエネルギーが強すぎると燃え尽きます。頭部（頭痛・目の疲れ）に注意。",
    healthTips: ["意識的に「何もしない時間」を作る", "瞑想で内なる声を聴く習慣を", "頭部・首のマッサージを定期的に"],
    famousPeople: [{ name: "スティーブ・ジョブズ", desc: "2月24日生まれ。「ゼロイチ」を生み続けた究極の開拓者" }, { name: "マーティン・ルーサー・キング", desc: "1月15日生まれ。信念で世界を変えたリーダー" }],
    advice: "カバラの教えでは、ケテルのエネルギーは「流さなければ淀む」とされています。あなたの力を独り占めせず、他者と分かち合うことで初めて、その力は何倍にもなって返ってきます。弱さを見せることは敗北ではなく、最も強い人間だけができる行為です。"
  },
  "2": {
    num: 2, title: "知恵（コクマー）", subtitle: "セフィラ: コクマー ─ ヘブライ文字: ベト（ב）─ 支配星: 月", element: "水", color: "#3498DB",
    overview: "生命の樹の「コクマー（知恵）」に対応する運命数2は、月の支配を受けます。月が太陽の光を映し出すように、他者の感情や場の空気を鏡のように映し取る天性の感受性を持っています。友人の声のトーンのわずかな変化、同僚のメールに潜む不安、家族の沈黙が語る本音——あなたはそれらを自然と読み取り、適切な距離感で寄り添います。",
    lightTraits: ["相手が言葉にする前に気持ちを察する直感", "対立する二者を仲裁する外交力", "忍耐強さと献身的なサポート力", "芸術的感性と美意識", "心理的安全性を作り出す力"],
    shadowTraits: ["レストランでメニューを選ぶのに時間がかかる", "誘いを断れず自分の時間が消える", "相手の顔色を常に伺ってしまう", "「自分が何を本当に望んでいるか」が分からなくなる"],
    loveIntro: "深い精神的つながりを何よりも重視。ロマンチストで尽くすタイプですが、「自分軸」を持つことが最大の課題です。",
    loveTraits: ["精神的なつながりを最重視", "相手に尽くす献身的な愛情", "安定した長期的関係を好む", "言葉よりも態度で愛を示す"],
    bestMatch: [4, 6, 8], challengeMatch: [5, 1],
    careerIntro: "ヘブライ文字「ベト」は「家」を意味し、人と人の間に安全な空間を作る力の象徴。チームの生産性を見えない形で高めます。",
    careers: ["カウンセラー・セラピスト", "人事・HR担当", "外交官・交渉人", "音楽家・作曲家", "看護師・医療従事者"],
    healthIntro: "月の影響で感情と体調が連動しやすい体質。特に胃腸の不調に注意。",
    healthTips: ["感情を日記に書き出す習慣を", "「No」と言う練習を意識的に", "水辺でのリラクゼーションが効果的"],
    famousPeople: [{ name: "バラク・オバマ", desc: "8月4日生まれ。対話と調和を重視した外交型リーダー" }, { name: "ジェニファー・アニストン", desc: "2月11日生まれ。共感力の高い演技で世界を魅了" }],
    advice: "カバラでは、コクマーは「受け取る器」です。しかし器自体に強度がなければ中身の重さに耐えられません。他人の感情に振り回されすぎないよう、自分の境界線をしっかり持つことが、あなたが本来の力を発揮する鍵です。"
  },
  "3": {
    num: 3, title: "理解（ビナー）", subtitle: "セフィラ: ビナー ─ ヘブライ文字: ギメル（ג）─ 支配星: 木星", element: "風", color: "#F39C12",
    overview: "生命の樹の「ビナー（理解）」に対応する運命数3は、木星の拡大のエネルギーを受けています。ビナーは「理解する母」——受け取った種を育て、形にする創造の源。あなたが話すと人は耳を傾け、書くと言葉は心に残り、笑うとその場が明るくなります。何気なく言った一言を、相手が何年も覚えていた——そんな経験はないでしょうか。",
    lightTraits: ["他者の無意識に直接働きかける表現力", "木星的な拡大と楽観のエネルギー", "言葉で現実を変える「言霊」の力", "ユーモアと場を和ませる才能", "人を自然と惹きつける魅力"],
    shadowTraits: ["複数のプロジェクトを始めてどれも中途半端", "楽しいことを優先し面倒な作業を先延ばし", "SNSの反応に一喜一憂する", "表面的な関係に留まりがち"],
    loveIntro: "恋愛には楽しさと刺激を求めるロマンチスト。ギメル（駱駝）のように遠くまでメッセージを運ぶ力で、言葉巧みに相手を魅了します。",
    loveTraits: ["ユーモアと楽しさで相手を魅了", "言葉で愛を表現するタイプ", "刺激と新鮮さを求める", "嫉妬や束縛には敏感"],
    bestMatch: [1, 5, 7], challengeMatch: [4, 8],
    careerIntro: "ヘブライ文字「ギメル」は「駱駝」——遠くへ運ぶ力の象徴。メッセージを広く届ける才能があります。",
    careers: ["作家・コピーライター", "俳優・声優・MC", "デザイナー・アーティスト", "マーケター・広報", "YouTuber・インフルエンサー"],
    healthIntro: "喉や声帯に関連するトラブルに注意。自己表現を抑圧するとメンタルに影響が出やすい。",
    healthTips: ["歌う・声を出す表現活動を習慣に", "創作活動でストレスを発散", "喉のケア（ハーブティー等）を意識"],
    famousPeople: [{ name: "ジョン・レノン", desc: "10月9日生まれ。音楽という表現で世界の意識を変えた" }, { name: "ウィル・スミス", desc: "9月25日生まれ。エンターテインメントの頂点を極めた表現者" }],
    advice: "カバラの教えでは、ビナーは「制限する力」でもあります。才能を一点に集中させた時、あなたの創造力は爆発的な成果を生みます。「全部やりたい」の誘惑に負けず、「意味のある」表現を追求することで、あなたの言霊は何倍にも輝きます。"
  },
  "4": {
    num: 4, title: "慈悲（ケセド）", subtitle: "セフィラ: ケセド ─ ヘブライ文字: ダレット（ד）─ 支配星: 土星", element: "地", color: "#27AE60",
    overview: "生命の樹の「ケセド（慈悲）」に対応する運命数4は、土星の「制限と構造」のエネルギーを受けています。計画を立て、リスクを洗い出し、着実にステップを踏んで目標に到達する——この愚直なまでの誠実さが最大の武器です。友人はあなたに重要な相談を持ちかけ、上司は最も責任の重い仕事を任せます。「あの人なら絶対にやり遂げる」という揺るぎない信頼の持ち主です。",
    lightTraits: ["土星的な構造力と計画性", "揺るぎない忍耐力と持続力", "誰からも信頼される誠実さ", "混沌に秩序をもたらす整理力", "長期的視野で物事を捉える力"],
    shadowTraits: ["「今までのやり方でうまくいってきた」が口癖", "新しいものを受け入れられない硬直性", "完璧を追求しすぎて自分を追い詰める", "感情表現が苦手で距離を感じさせる"],
    loveIntro: "信頼と安定を何よりも大切にします。ケセドは「慈悲」の意味ですが、自分自身への慈悲が最も足りないのが4の恋愛の課題。",
    loveTraits: ["安定と信頼を最優先", "行動で愛情を示すタイプ", "結婚・家庭を重視", "浮気や不誠実を絶対に許さない"],
    bestMatch: [2, 6, 8], challengeMatch: [3, 5],
    careerIntro: "ヘブライ文字「ダレット」は「扉」。混沌の中に秩序をもたらし、誰もが通れる道を作る才能があります。",
    careers: ["エンジニア・プログラマー", "建築家・都市計画家", "会計士・ファイナンシャルプランナー", "プロジェクトマネージャー", "品質管理・製造業"],
    healthIntro: "土星は骨と関節を支配。姿勢の悪化やストレスの蓄積に注意。",
    healthTips: ["柔軟性を高めるストレッチを毎日", "整体やカイロプラクティックで定期ケア", "「完璧でなくても良い」と自分に許可を出す"],
    famousPeople: [{ name: "ビル・ゲイツ", desc: "10月28日生まれ。Microsoftを堅実に構築した建設者" }, { name: "オプラ・ウィンフリー", desc: "1月29日生まれ。一歩ずつメディア帝国を築いた" }],
    advice: "カバラでは、ケセドは「慈悲」を意味しますが、自分自身に対して最も慈悲が足りないのが4の人です。完璧でなくても良い、失敗しても良いと自分に許可を出すことが、次のステージへの扉（ダレット）を開く鍵です。"
  },
  "5": {
    num: 5, title: "峻厳（ゲブラー）", subtitle: "セフィラ: ゲブラー ─ ヘブライ文字: ヘー（ה）─ 支配星: 水星", element: "風", color: "#E67E22",
    overview: "生命の樹の「ゲブラー（峻厳）」に対応する運命数5は、水星のスピードと多才さを宿しています。水星は最も速く動く星であり、あなたにも同じ速度感が備わっています。新しいスキルの習得が異常に速い、初対面の人ともすぐに打ち解ける、海外旅行や転職を恐れるどころか楽しみにしている——これらは5の人に共通する特徴。退屈は文字通りあなたの敵です。",
    lightTraits: ["水星的な俊敏さと適応力", "五感すべてが鋭い感性の持ち主", "どんな環境にも馴染む柔軟性", "言語や文化の壁を超える力", "変化をエネルギーに変える冒険心"],
    shadowTraits: ["3ヶ月ごとに興味の対象が変わる", "関係が深まると距離を置きたくなる", "「この仕事はつまらない」と環境のせいにする", "安定した関係を築く前に次へ向かう"],
    loveIntro: "束縛されると逃げ出すタイプ。ヘブライ文字「ヘー（窓）」のように、常に外の世界を見ていたい自由人です。",
    loveTraits: ["自由と個人の時間を絶対に守る", "マンネリを嫌い新鮮さを追求", "冒険やサプライズが大好き", "遠距離でも柔軟に対応できる"],
    bestMatch: [1, 3, 7], challengeMatch: [2, 4],
    careerIntro: "ヘブライ文字「ヘー」は「窓」——世界を多角的に見る力の象徴。変化の激しい時代に最も価値のある適応力を持っています。",
    careers: ["旅行家・トラベルライター", "ジャーナリスト・レポーター", "海外営業・貿易", "イベントプランナー", "翻訳家・通訳"],
    healthIntro: "水星は神経系を支配。アドレナリン依存やじっとしていられない衝動に注意。",
    healthTips: ["アウトドアスポーツでエネルギーを発散", "旅行や自然体験で心をリフレッシュ", "規則的な睡眠リズムを意識する"],
    famousPeople: [{ name: "アンジェリーナ・ジョリー", desc: "6月4日生まれ。女優業と国際貢献を両立する冒険者" }, { name: "マーク・ザッカーバーグ", desc: "5月14日生まれ。常に変化を追い求めるイノベーター" }],
    advice: "カバラの教えでは、ゲブラーは「厳しさ・裁き」を意味します。その厳しさを外側ではなく自分に向けた時——つまり「留まること」もまた一つの冒険だと気づいた時、あなたの人生に真の自由が訪れます。"
  },
  "6": {
    num: 6, title: "美（ティファレト）", subtitle: "セフィラ: ティファレト ─ ヘブライ文字: ヴァヴ（ו）─ 支配星: 金星", element: "地", color: "#2ECC71",
    overview: "生命の樹の中心に位置する「ティファレト（美）」に対応する運命数6は、金星の愛と美のエネルギーを受けています。ティファレトは生命の樹の「心臓」であり、上位と下位を結ぶ調和点。家族の中で意見が対立した時に自然と仲裁役になる、職場で孤立している人に真っ先に声をかける、美しいものを見ると胸が高鳴る——これらは金星の影響そのものです。",
    lightTraits: ["生命の樹の中心に位置する調和の力", "金星的な愛と美の感覚", "分断されたものを一つに結ぶ力", "空間を整え居心地を良くする才能", "人の心を解きほぐす癒しのオーラ"],
    shadowTraits: ["「あなたのため」が口癖のおせっかい", "子供の宿題をつい手伝ってしまう過干渉", "同僚の仕事を断れず引き受けてしまう", "自分を犠牲にする「殉教者」意識"],
    loveIntro: "金星の守護を受けた6は、愛することに生きがいを感じます。ただし「自分を含めた調和」がティファレトの真の姿です。",
    loveTraits: ["包容力のある献身的な愛情", "家庭・結婚を重視する", "パートナーの世話を焼くのが好き", "裏切りには深く傷つく"],
    bestMatch: [2, 4, 9], challengeMatch: [5, 7],
    careerIntro: "ヘブライ文字「ヴァヴ」は「釘」——分断されたものをつなぐ力の象徴。美的センスは生まれ持ったものです。",
    careers: ["医師・看護師", "教育者・保育士", "インテリアデザイナー", "セラピスト・ヒーラー", "シェフ・料理家"],
    healthIntro: "金星は肌・喉・腎臓を支配。他者のストレスを吸収しやすい体質で心臓にも注意。",
    healthTips: ["「自分の時間」を必ず確保する", "花やアロマで自宅環境を整える", "スキンケアが心の安定にも直結"],
    famousPeople: [{ name: "マザー・テレサ", desc: "8月26日生まれ。無償の愛を体現した究極の守護者" }, { name: "メリル・ストリープ", desc: "6月22日生まれ。人間の深い感情を演じる愛の表現者" }],
    advice: "カバラの教えでは、ティファレトの調和は「自分を含めた全体の調和」です。自分を犠牲にした調和は偽りです。「まず自分を満たす」ことが、結果的に愛の総量を増やす唯一の方法です。"
  },
  "7": {
    num: 7, title: "勝利（ネツァク）", subtitle: "セフィラ: ネツァク ─ ヘブライ文字: ザイン（ז）─ 支配星: 海王星", element: "水", color: "#8E44AD",
    overview: "生命の樹の「ネツァク（勝利）」に対応する運命数7は、海王星の神秘的で深遠なエネルギーを受けています。7はカバラにおいて最も霊的な数字であり、神が世界を7日間で創造したことに由来する聖なる完全数です。表面的な会話や浅い人間関係に退屈を感じるのは、魂が常に「なぜ？」「本当にそうなのか？」という問いを発し続けているからです。",
    lightTraits: ["聖なる完全数が持つ深い叡智", "海王星的な深遠な直感力", "情報の海から本質を切り出す鋭い知性", "独学で専門家レベルに達する集中力", "科学と神秘の両方を理解する稀有な知性"],
    shadowTraits: ["「この人は何か裏がある」と疑いやすい", "あらゆる情報を分析しないと行動できない", "感情表現が極端に苦手で冷たく見える", "人混みや騒がしい場所でエネルギーが消耗する"],
    loveIntro: "精神的なつながりを最も重視。ネツァクは「持続する感情の力」——頭だけでなく心で感じる力を取り戻すことが恋愛のテーマ。",
    loveTraits: ["精神的・知的なつながりを最重視", "一人の時間が絶対に必要", "信頼関係を築くのに時間がかかる", "一度深い関係を築くと揺るがない"],
    bestMatch: [1, 3, 5], challengeMatch: [2, 6],
    careerIntro: "ヘブライ文字「ザイン」は「剣」——情報の海から本質を切り出す鋭利な知性の象徴です。",
    careers: ["研究者・科学者", "哲学者・思想家", "プログラマー・データサイエンティスト", "心理学者・精神科医", "作家・ジャーナリスト"],
    healthIntro: "海王星は神経系を支配。考えすぎによる頭痛や不眠に注意。",
    healthTips: ["自然の中での散歩や瞑想を日課に", "デジタルデトックスの時間を確保", "読書や知的活動でリフレッシュ"],
    famousPeople: [{ name: "ニコラ・テスラ", desc: "7月10日生まれ。科学と神秘を探究した稀代の天才" }, { name: "レオナルド・ディカプリオ", desc: "11月11日生まれ。役の本質を深く追求する探究者" }],
    advice: "カバラの教えでは、ネツァクは「持続する感情の力」を意味します。頭だけでなく心で感じる力を取り戻すことが、あなたの人生を劇的に変えます。「知る」ことと「生きる」ことを統合した時、運命数7は最高の力を発揮します。"
  },
  "8": {
    num: 8, title: "栄光（ホド）", subtitle: "セフィラ: ホド ─ ヘブライ文字: ケット（ח）─ 支配星: 土星", element: "地", color: "#C0392B",
    overview: "生命の樹の「ホド（栄光）」に対応する運命数8は、土星の構造力に加え、無限大（∞）の宇宙的エネルギーを象徴します。8を横にすれば無限のシンボルです。この数字は「カルマの数字」とも呼ばれ、過去に蒔いた種が何倍にもなって返ってくるエネルギーを持っています。ビジネスの場で「嗅覚が鋭い」と評されるのは偶然ではありません。",
    lightTraits: ["無限大の可能性を秘めたパワー", "物質世界の法則を直感的に理解する力", "組織を率いるカリスマ性と決断力", "お金・権力・影響力を引き寄せる磁場", "蒔いた種が何倍にもなる因果の力"],
    shadowTraits: ["仕事の成功＝人生の成功と信じ込みがち", "家族や健康を犠牲にしてしまう", "手段を選ばず成果を追う傾向", "相手を利用する行為がカルマとして返る"],
    loveIntro: "恋愛でも「成功」を目指すタイプ。ホドの「栄光」は物質だけでなく、精神的な豊かさとのバランスの中にあります。",
    loveTraits: ["同じ志を持つパートナーを求める", "物質的な豊かさで愛情を示す", "社会的ステータスを重視する傾向", "深い感情の共有には時間が必要"],
    bestMatch: [2, 4, 6], challengeMatch: [1, 3],
    careerIntro: "ヘブライ文字「ケット」は「囲い・柵」——資源を守り、増やす才能の象徴。富が動く領域で突出します。",
    careers: ["経営者・CEO", "投資家・ファンドマネージャー", "弁護士", "不動産デベロッパー", "金融・フィンテック"],
    healthIntro: "土星はストレスの蓄積を支配。循環器系や過労に注意。身体が資本です。",
    healthTips: ["仕事とプライベートの境界を明確に", "定期的な健康診断を習慣に", "パワー系のスポーツでストレスを発散"],
    famousPeople: [{ name: "ネルソン・マンデラ", desc: "7月18日生まれ。不屈の意志で国家を変えた実現者" }, { name: "サンドラ・ブロック", desc: "7月26日生まれ。ハリウッドの頂点を極めた実力者" }],
    advice: "カバラの教えでは、ホドは「栄光」を意味しますが、その栄光は物質的な富だけではありません。あなたが豊かになることで周囲も豊かになる構造を作れた時、その繁栄は永続します。精神と物質のバランスが鍵です。"
  },
  "9": {
    num: 9, title: "基盤（イェソド）", subtitle: "セフィラ: イェソド ─ ヘブライ文字: テト（ט）─ 支配星: 火星", element: "火", color: "#9B59B6",
    overview: "生命の樹の「イェソド（基盤）」に対応する運命数9は、火星の情熱と浄化のエネルギーを持つ「完結の数字」です。1〜8の全ての数字を内包する9は、全ての人間的経験を理解できる広い器です。人の話を聞く時、肩書や立場ではなく「その人の魂がどう感じているか」に注目する——この根本的な平等意識は、9の人だけが持つ稀有な資質です。",
    lightTraits: ["全ての数字を内包する博愛の器", "肩書ではなく魂を見る平等意識", "火星的な情熱と浄化の力", "芸術的才能と精神的成熟", "人生の「終わりと始まり」を繰り返す深み"],
    shadowTraits: ["終わるべきものを終わらせられない", "もう合わない人間関係にしがみつく", "理想が高すぎて現実に「なんか違う」と感じる", "過去の失敗への後悔が消えない"],
    loveIntro: "イェソドは「月のセフィラ」——「映す力」を持っています。世界に不満を感じる時、それはあなた自身の内面の映し鏡です。",
    loveTraits: ["無条件の愛を与えられる", "精神的な成長を共有できる相手を求める", "過去の恋愛パターンを引きずりやすい", "理想が高く妥協が難しい"],
    bestMatch: [3, 6, 9], challengeMatch: [4, 8],
    careerIntro: "ヘブライ文字「テト」は内に秘めた「善」の象徴。個人の利益を超えた大きな善のために動く時、想像を超えた力を発揮します。",
    careers: ["NPO・NGO活動家", "社会起業家", "芸術家・ミュージシャン", "国際機関職員", "ヒーラー・スピリチュアルカウンセラー"],
    healthIntro: "火星はエネルギーの消耗を支配。感情を溜め込むと免疫系に影響。デトックスが重要。",
    healthTips: ["定期的なデトックス（断食・サウナ等）", "自然環境での瞑想やリトリート", "「手放す」習慣で心身をリセット"],
    famousPeople: [{ name: "マハトマ・ガンジー", desc: "10月2日生まれ。非暴力で世界を変えた究極の博愛者" }, { name: "ダライ・ラマ", desc: "7月6日生まれ。慈悲と叡智を体現する精神的指導者" }],
    advice: "カバラの教えでは、イェソドは「基盤」であり「映す力」を持っています。「手放す」ことを学ぶ時、運命数9の真の叡智が開花します。あなたの人生は「誰かのために動いた時期」の方が、結果的に自分も幸せだったはずです。"
  },
  "11": {
    num: 11, title: "マスター直感者（ダアト）", subtitle: "隠されたセフィラ: ダアト ─ マスターナンバー ─ 1×2の増幅", element: "光", color: "#9B59B6",
    overview: "マスターナンバー11は、生命の樹の隠されたセフィラ「ダアト（知識）」——上位と下位を結ぶ見えない門——に対応します。11は1が二つ重なった数字であり、個の力が二倍に増幅されると同時に、2の協調性も持つ矛盾した構造です。直感が鋭すぎて相手の嘘がすぐに分かる、夢が予知的な意味を持つことがある、初めて行く場所でデジャヴを感じる——こうした経験は11の人に頻繁に起こります。",
    lightTraits: ["通常では知覚できない情報を受け取る直感", "天と地を結ぶ「梯子」としてのカリスマ性", "1の独立心と2の共感力の両方を持つ", "言葉を超えたレベルで人を動かす力", "スピリチュアルな感性と現実的な判断力の共存"],
    shadowTraits: ["満員電車でエネルギーが消耗する過敏さ", "ニュースを見て体調を崩すほどの共鳴", "「大きな使命があるのに何もできていない」焦燥感", "感受性が高すぎて自己否定に陥りやすい"],
    loveIntro: "ダアトは「深淵」とも呼ばれます。11の恋愛は浅い関係では満足できません。魂レベルで共鳴するソウルメイトを求めます。",
    loveTraits: ["魂レベルでの深い共鳴を求める", "相手の嘘や不誠実を瞬時に見抜く", "精神的に対等な関係でないと疲弊する", "ソウルメイトとの運命的な出会いの暗示"],
    bestMatch: [2, 4, 6], challengeMatch: [5, 8],
    careerIntro: "11はカバラにおいて「天と地を結ぶ梯子」。直感的に受け取ったメッセージを他者に伝えた時、受け取った人の人生が変わります。",
    careers: ["スピリチュアルカウンセラー", "心理学者・セラピスト", "芸術家・音楽家", "革新的起業家", "ヒーラー・占い師"],
    healthIntro: "感受性が他者の10倍。神経系の過負荷に注意。「静」の時間が生存に不可欠。",
    healthTips: ["毎朝5分の瞑想を習慣に", "エネルギーの「バリア」を意識する", "自然の中での一人の時間を確保"],
    famousPeople: [{ name: "モーツァルト", desc: "1月27日生まれ。直感で天上の音楽を地上にもたらした" }, { name: "ミシェル・オバマ", desc: "1月17日生まれ。直感とカリスマで世界を鼓舞する存在" }],
    advice: "あなたの感受性は他者の10倍です。それは才能であると同時に重荷でもあります。「自分にはもっと大きな使命がある」と感じるなら、それは正しい直感です。ただしダアトの教えは「時が来れば門は開く」。焦る必要はありません。"
  },
  "22": {
    num: 22, title: "マスター建築家（マルクト）", subtitle: "セフィラ: マルクト ─ マスターナンバー ─ 22のヘブライ文字の完全性", element: "地", color: "#2C3E50",
    overview: "マスターナンバー22は、生命の樹の最下位「マルクト（王国）」——物質世界そのもの——に対応すると同時に、最上位ケテルと直結する最強の数字です。11が「見る人」なら、22は「見たものを地上に建設する人」。ヘブライ文字は全22文字で構成されており、22はその全てを内包する「完全な創造の力」の象徴です。周囲が「大きすぎる」と感じるビジョンが、あなたには当然のサイズ感です。",
    lightTraits: ["22文字のヘブライ文字全てを内包する完全性", "壮大なビジョンを物質世界に現実化する力", "2+2=4の堅実さとマスターの霊的洞察力", "社会的スケールの設計図を描ける視野", "時代を超えて残る「仕組み」を作る才能"],
    shadowTraits: ["「自分は何をすべきか」という根源的な問いに苦悩", "使命の重さから「普通の人生」に逃げたくなる", "能力を過小評価し、小さく生きてしまう", "プレッシャーによる慢性的な緊張と疲労"],
    loveIntro: "22の恋愛は、パートナーに自分のビジョンを共有できるかが鍵。理解されない孤独を超えた先に深い絆が待っています。",
    loveTraits: ["共にビジョンを追える相手を求める", "安定と冒険の両方を与えられる", "パートナーの成長を全力でサポート", "理解されない孤独感を抱えやすい"],
    bestMatch: [4, 6, 9], challengeMatch: [3, 5],
    careerIntro: "あなたが作るものは「個人の作品」ではなく「時代を超えて残る仕組み」。その真価は10年後にようやく評価されます。",
    careers: ["社会変革者・政策立案者", "大規模プロジェクトリーダー", "建築家・都市計画家", "テクノロジーCEO", "社会起業家"],
    healthIntro: "使命の重圧が首・肩・背中に蓄積。思考力への影響を防ぐため定期ケアが必要。",
    healthTips: ["首・肩のコリを放置しない", "壮大な計画を「紙に書く」ことでプレッシャーを軽減", "定期的に「何も考えない」時間を取る"],
    famousPeople: [{ name: "ポール・マッカートニー", desc: "6月18日生まれ。音楽で世界に残る遺産を築いた" }, { name: "デンゼル・ワシントン", desc: "12月28日生まれ。演技を通じて時代を超えるメッセージを残す" }],
    advice: "カバラの教えでは、22は「時が来れば必ず目覚める」数字です。あなたの魂はすでにその準備を始めています。焦る必要はありません。壮大なビジョンを紙に書き起こすという行為そのものが、現実化のプロセスを起動させます。"
  },
  "33": {
    num: 33, title: "マスターヒーラー（ツィムツーム）", subtitle: "カバラ最深の概念: ツィムツーム ─ マスターナンバー最高峰", element: "光", color: "#D4AF37",
    overview: "マスターナンバーの最高峰33は、カバラの最も深遠な概念「ツィムツーム（神の自己収縮）」——神が世界を創造するために自らの光を退いた行為——に共鳴します。3+3=6の美と調和に加え、11の直感力と22の構築力を合わせ持つ最も稀少な数字です。あなたの存在そのものが周囲に深い癒しをもたらします。言葉ではなく、ただそこにいるだけで人々の心が解放されます。",
    lightTraits: ["ツィムツーム（神の自己収縮）の愛を体現", "言葉なくして人を癒す特別な周波数", "11の直感力と22の構築力の統合", "触れた人の人生に消えない痕跡を残す", "人間の意識そのものを変容させる力"],
    shadowTraits: ["ニュースを見て涙が出るほどの共感力の暴走", "「全て救おうとして自分が壊れる」自己犠牲", "知人の不幸を自分の不幸のように感じる", "世界の不条理への深い怒りと悲しみ"],
    loveIntro: "33の愛は「無条件の愛」です。ツィムツームが教えるのは「全てを受け入れるのではなく、適切な空間を作ること」。",
    loveTraits: ["無条件の愛を体現する", "過去の恋愛の全てが学びだったと理解する", "パートナーの魂の成長を促す存在", "共感力のコントロールが恋愛の最大課題"],
    bestMatch: [6, 9, 11], challengeMatch: [1, 8],
    careerIntro: "33は「キリスト意識の数字」とも呼ばれ、教えを通じて人間の意識を変容させる力を持っています。",
    careers: ["ヒーラー・スピリチュアルティーチャー", "教育者・大学教授", "芸術家・音楽家", "慈善活動家", "宗教家・思想家"],
    healthIntro: "共感力の暴走によるエネルギーの消耗が最大のリスク。自然の中での回復が不可欠。",
    healthTips: ["森林浴や海辺の散歩を定期的に", "「影響力が届く範囲」に意識を集中する", "セルフケアを最優先する習慣を"],
    famousPeople: [{ name: "アルバート・シュバイツァー", desc: "1月14日生まれ。医療と哲学で人類に奉仕した聖なる教師" }, { name: "メリル・ストリープ", desc: "6月22日生まれ。演技を通じて人間の深い感情を癒す存在" }],
    advice: "カバラの「ツィムツーム」が教えているのは、「全てを受け入れるのではなく、適切な空間を作ること」です。全員を救うことは不可能です。あなたの影響力が届く範囲で最善を尽くすことが、長期的に最も多くの人を救う方法です。"
  }
};

export function generateStaticParams() {
  return Object.keys(destinyData).map((num) => ({ num }));
}

export async function generateMetadata({ params }: { params: Promise<{ num: string }> }): Promise<Metadata> {
  const { num } = await params;
  const d = destinyData[num];
  if (!d) return {};
  return {
    title: `運命数${d.num}「${d.title}」の性格・恋愛・適職を徹底解説 | カバラ数秘術`,
    description: `カバラ数秘術の運命数${d.num}を持つ人の本質的な性格、隠された才能、恋愛傾向、適職、健康アドバイスをプロが徹底解説。${d.overview.slice(0, 60)}`,
  };
}

export default async function DestinyNumberDetailPage({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const d = destinyData[num];
  if (!d) return notFound();

  return (
    <main className="min-h-screen bg-[#0C0A14] text-[#BEB5A5] selection:bg-[#D4AF37]/30 selection:text-white">
      <nav className="w-full bg-[#0C0A14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-xs font-light tracking-[0.25em] text-[#D4AF37]/80 uppercase flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Kabbalah</span>
          </Link>
        </div>
      </nav>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <article className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-1 text-[10px] text-[#7A7068] tracking-wider hover:text-[#D4AF37] transition-colors mb-8">
          <ChevronLeft className="w-3 h-3" /> コラム一覧に戻る
        </Link>

        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: `${d.color}40`, background: `${d.color}15` }}>
            <span className="text-3xl font-bold" style={{ color: d.color, fontFamily: 'Inter, sans-serif' }}>{d.num}</span>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Destiny Number {d.num}</p>
            <h1 className="text-xl font-light text-[#F5F0E8] tracking-widest" style={{ fontFamily: '"Noto Serif JP", serif' }}>
              運命数{d.num}「{d.title}」
            </h1>
            <p className="text-xs text-[#7A7068] tracking-wider mt-1">{d.subtitle} ─ 元素: {d.element}</p>
          </div>
        </div>

        <div className="space-y-10 text-sm leading-[2.2] tracking-wider">
          {/* Overview */}
          <p>{d.overview}</p>

          {/* Light & Shadow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-sm p-5">
              <p className="text-[9px] tracking-[0.15em] text-[#D4AF37] uppercase font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}><Star className="w-3 h-3" /> 光の側面</p>
              <ul className="space-y-2">{d.lightTraits.map((t,i) => <li key={i} className="text-xs pl-3 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[#D4AF37]/50 before:rounded-full">{t}</li>)}</ul>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-sm p-5">
              <p className="text-[9px] tracking-[0.15em] text-[#7A7068] uppercase font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}><Star className="w-3 h-3" /> 影の側面</p>
              <ul className="space-y-2">{d.shadowTraits.map((t,i) => <li key={i} className="text-xs pl-3 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-[#7A7068]/50 before:rounded-full">{t}</li>)}</ul>
            </div>
          </div>

          {/* Love */}
          <section className="border-t border-white/5 pt-8">
            <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: '"Noto Serif JP", serif' }}><Heart className="w-4 h-4 text-[#D4AF37]" /> 恋愛傾向</h2>
            <p className="mb-4">{d.loveIntro}</p>
            <ul className="space-y-2 mb-4">{d.loveTraits.map((t,i) => <li key={i} className="text-xs pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/30 before:rounded-full">{t}</li>)}</ul>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-3">
                <p className="text-[9px] text-[#D4AF37] tracking-[0.1em] uppercase font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>相性◎</p>
                <p className="text-xs text-[#F5F0E8]">運命数 {d.bestMatch.join(', ')}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-3">
                <p className="text-[9px] text-[#7A7068] tracking-[0.1em] uppercase font-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>課題あり</p>
                <p className="text-xs text-[#BEB5A5]">運命数 {d.challengeMatch.join(', ')}</p>
              </div>
            </div>
          </section>

          {/* Career */}
          <section className="border-t border-white/5 pt-8">
            <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: '"Noto Serif JP", serif' }}><Briefcase className="w-4 h-4 text-[#D4AF37]" /> 適職・キャリア</h2>
            <p className="mb-4">{d.careerIntro}</p>
            <div className="flex flex-wrap gap-2">{d.careers.map((c,i) => <span key={i} className="text-xs px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-sm">{c}</span>)}</div>
          </section>

          {/* Health */}
          <section className="border-t border-white/5 pt-8">
            <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: '"Noto Serif JP", serif' }}><Activity className="w-4 h-4 text-[#D4AF37]" /> 健康アドバイス</h2>
            <p className="mb-4">{d.healthIntro}</p>
            <ul className="space-y-2">{d.healthTips.map((t,i) => <li key={i} className="text-xs pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-[#D4AF37]/30 before:rounded-full">{t}</li>)}</ul>
          </section>

          {/* Famous People */}
          <section className="border-t border-white/5 pt-8">
            <h2 className="text-base font-medium text-[#F5F0E8] tracking-widest mb-4 flex items-center gap-2" style={{ fontFamily: '"Noto Serif JP", serif' }}><Users className="w-4 h-4 text-[#D4AF37]" /> 運命数{d.num}の有名人</h2>
            <div className="space-y-3">{d.famousPeople.map((p,i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-sm p-4">
                <p className="text-sm font-medium text-[#F5F0E8]">{p.name}</p>
                <p className="text-xs text-[#7A7068] mt-1">{p.desc}</p>
              </div>
            ))}</div>
          </section>

          {/* Advice */}
          <section className="border-t border-white/5 pt-8">
            <div className="bg-[#1B1530] border border-[#D4AF37]/20 rounded-sm p-6">
              <p className="text-[9px] text-[#D4AF37] tracking-[0.2em] uppercase font-bold mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>運命数{d.num}へのメッセージ</p>
              <p className="text-sm text-[#BEB5A5] leading-[2.2] tracking-wider">{d.advice}</p>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-white/[0.03] border border-[#D4AF37]/20 rounded-sm p-8 text-center">
          <p className="text-base text-[#F5F0E8] tracking-wider mb-2" style={{ fontFamily: '"Noto Serif JP", serif' }}>あなたの運命数をもっと深く読み解く</p>
          <p className="text-xs text-[#7A7068] tracking-wider mb-6">光・影・才能の3面鑑定＋今後12ヶ月の運勢バイオリズムを無料で</p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm tracking-widest font-bold text-[#0C0A14] rounded-sm" style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)', boxShadow: '0 0 20px rgba(212,175,55,0.15)' }}>
            ✦ 無料で鑑定する <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#7A7068] tracking-wider mb-3">他の運命数を見る</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(destinyData).filter(n => n !== num).map(n => (
              <Link key={n} href={`/blog/destiny-number/${n}`} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-xs text-[#BEB5A5] hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>{n}</Link>
            ))}
          </div>
        </div>
      </article>

      <footer className="py-8 text-center border-t border-white/5">
        <p className="text-[10px] text-[#7A7068] tracking-[0.2em] uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>&copy; 2026 Kabbalah</p>
      </footer>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500&family=Inter:wght@400;600;700&display=swap');` }} />
    </main>
  );
}
