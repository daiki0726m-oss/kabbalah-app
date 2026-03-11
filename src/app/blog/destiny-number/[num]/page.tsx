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
    num: 1, title: "開拓者", subtitle: "リーダーシップと独立心の数字", element: "火", color: "#E74C3C",
    overview: "運命数1を持つ人は、生まれながらのリーダーです。「最初」「始まり」「独立」を象徴するこの数字は、自らの道を切り拓く開拓者としての使命を示しています。周囲に流されることなく、自分の信念を貫く強さを持っています。チームの中では自然とリーダーシップを発揮し、新しいプロジェクトやアイデアを推進する力に溢れています。",
    lightTraits: ["圧倒的なリーダーシップと決断力", "新しいことに挑戦する勇気", "独立心と自立精神", "困難に立ち向かう精神力", "オリジナリティのある発想力"],
    shadowTraits: ["頑固で他人の意見を聞かない傾向", "孤立しやすい", "支配的になりすぎることがある", "せっかちで結果を急ぐ"],
    loveIntro: "運命数1の人は恋愛においても主導権を握りたいタイプです。自分と対等に渡り合えるパートナーを求め、依存的な関係を嫌います。",
    loveTraits: ["自分からアプローチするタイプ", "束縛を極端に嫌う", "対等なパートナーシップを重視", "恋愛でもリーダーシップを発揮"],
    bestMatch: [3, 5, 7], challengeMatch: [1, 8],
    careerIntro: "独立心が強く、指示されるより自分で考えて動くことを好みます。起業家精神に溢れ、新規事業の立ち上げに向いています。",
    careers: ["起業家・経営者", "フリーランス", "プロジェクトマネージャー", "発明家・イノベーター", "営業のトップセールス"],
    healthIntro: "エネルギッシュな反面、休むことが苦手です。燃え尽き症候群や頭痛に注意が必要。",
    healthTips: ["意識的に休息時間を設ける", "瞑想やヨガで心を落ち着ける", "頭部のケア（マッサージ等）を習慣に"],
    famousPeople: [{ name: "スティーブ・ジョブズ", desc: "2月24日生まれ。Appleを創業し世界を変えた究極の開拓者" }, { name: "マーティン・ルーサー・キング", desc: "1月15日生まれ。公民権運動を先導したリーダー" }],
    advice: "あなたの最大の武器は「自分を信じる力」です。周囲の声に惑わされず、内なる声に従ってください。ただし、時には他人の意見に耳を傾ける柔軟さも、真のリーダーには必要です。"
  },
  "2": {
    num: 2, title: "調和者", subtitle: "協調性と繊細さの数字", element: "水", color: "#3498DB",
    overview: "運命数2を持つ人は、場の空気を読み取る天性の外交官です。「調和」「協力」「繊細さ」を象徴し、人と人との橋渡しをする使命を持っています。相手の感情を察する能力に長け、チームワークの中で最も力を発揮します。目立つことよりも、全体の調和を保つことに喜びを感じる人です。",
    lightTraits: ["繊細な感受性と共感力", "優れた外交手腕と調整力", "忍耐強さと献身的なサポート力", "芸術的感性", "パートナーシップの才能"],
    shadowTraits: ["優柔不断になりやすい", "自己主張が苦手", "他人に依存しがち", "傷つきやすく引きずりやすい"],
    loveIntro: "深い精神的なつながりを何よりも重視します。ロマンチストで、相手に尽くすことで愛を表現するタイプです。",
    loveTraits: ["精神的なつながりを最重視", "相手に尽くす献身的な愛情", "安定した長期的関係を好む", "言葉よりも態度で愛を示す"],
    bestMatch: [4, 6, 8], challengeMatch: [5, 1],
    careerIntro: "チームの中で調整役として力を発揮します。人の話を聴く力と共感力を活かせる職業が向いています。",
    careers: ["カウンセラー・セラピスト", "人事・HR担当", "外交官・交渉人", "音楽家・作曲家", "看護師・介護士"],
    healthIntro: "ストレスを溜め込みやすく、感情が体調に直結するタイプです。メンタルケアが最優先。",
    healthTips: ["自分の感情を日記に書き出す", "信頼できる人に定期的に話を聴いてもらう", "水辺でのリラクゼーションが効果的"],
    famousPeople: [{ name: "バラク・オバマ", desc: "8月4日生まれ。対話と調和を重視した外交型リーダー" }, { name: "ジェニファー・アニストン", desc: "2月11日生まれ。共感力の高い演技で世界を魅了" }],
    advice: "あなたの「感じる力」は最大の才能です。ただし、他人の感情に振り回されすぎないよう、自分の境界線をしっかり持つことが、あなたが本来の力を発揮する鍵になります。"
  },
  "3": {
    num: 3, title: "表現者", subtitle: "創造性とコミュニケーションの数字", element: "風", color: "#F39C12",
    overview: "運命数3を持つ人は、言葉や芸術を通じて自分を表現する天才です。「創造」「喜び」「コミュニケーション」を象徴し、周囲を明るく照らすムードメーカーです。生まれながらのエンターテイナーとしての才能を持ち、話す・書く・描くなど何らかの表現手段を通じて世界に影響を与えます。",
    lightTraits: ["卓越した表現力とコミュニケーション力", "創造性と芸術的才能", "楽観的でポジティブなエネルギー", "ユーモアのセンス", "人を惹きつける魅力"],
    shadowTraits: ["集中力が続かず飽きっぽい", "感情の起伏が激しい", "自己表現への過度なこだわり", "表面的な関係に留まりがち"],
    loveIntro: "恋愛には楽しさと刺激を求めるロマンチスト。言葉巧みに相手を魅了しますが、深い関係を築くには努力が必要です。",
    loveTraits: ["ユーモアと楽しさで相手を魅了", "言葉で愛を表現するタイプ", "刺激と新鮮さを求める", "嫉妬や束縛には敏感"],
    bestMatch: [1, 5, 7], challengeMatch: [4, 8],
    careerIntro: "自己表現できる環境で最もパフォーマンスが上がります。ルーティンワークは苦手。",
    careers: ["作家・コピーライター", "俳優・声優", "デザイナー・アーティスト", "マーケター・広報", "YouTuber・インフルエンサー"],
    healthIntro: "喉や甲状腺に関連するトラブルに注意。自己表現を抑圧するとメンタルに影響が出やすい。",
    healthTips: ["歌う・声を出すことを習慣に", "創作活動でストレスを発散", "喉のケア（ハーブティー等）を意識"],
    famousPeople: [{ name: "ジョン・レノン", desc: "10月9日生まれ。音楽で世界の調和を訴えた表現者" }, { name: "ウィル・スミス", desc: "9月25日生まれ。エンターテインメントの頂点を極めた表現者" }],
    advice: "あなたの言葉には人を動かす力があります。その才能を自覚し、責任を持って使ってください。「楽しい」だけでなく「意味のある」表現を追求することで、あなたの才能は何倍にも輝きます。"
  },
  "4": {
    num: 4, title: "建設者", subtitle: "安定と堅実さの数字", element: "地", color: "#27AE60",
    overview: "運命数4を持つ人は、確実に物事を積み上げていく堅実な建設者です。「安定」「秩序」「実直さ」を象徴し、長期的な視野で計画を立て、着実に実行する力を持っています。派手さはなくとも、最も信頼される存在として社会を支える柱のような人です。",
    lightTraits: ["圧倒的な計画力と実行力", "忍耐力と持続力", "誠実で信頼される人格", "細部への注意力", "論理的な思考力"],
    shadowTraits: ["融通が利かず頑固", "変化を極端に嫌う", "仕事に没頭しすぎる", "感情表現が苦手"],
    loveIntro: "信頼と安定を何よりも大切にするタイプ。派手なロマンスよりも、じっくり積み上げる関係を好みます。",
    loveTraits: ["安定と信頼を最優先", "行動で愛情を示す", "結婚・家庭を重視", "浮気や不誠実を許さない"],
    bestMatch: [2, 6, 8], challengeMatch: [3, 5],
    careerIntro: "体系的な仕組みを作ることが得意。安定した環境で長期的に取り組む仕事が向いています。",
    careers: ["エンジニア・プログラマー", "建築家・都市計画家", "会計士・ファイナンシャルプランナー", "プロジェクトマネージャー", "品質管理・製造業"],
    healthIntro: "骨や関節、歯の健康に注意。ストレスを体に溜め込みやすいタイプ。",
    healthTips: ["定期的な運動習慣を作る", "柔軟性を高めるストレッチ", "カルシウムやビタミンDの摂取を意識"],
    famousPeople: [{ name: "ビル・ゲイツ", desc: "10月28日生まれ。Microsoftを堅実に育てた建設者" }, { name: "オプラ・ウィンフリー", desc: "1月29日生まれ。一歩ずつメディア帝国を築き上げた" }],
    advice: "あなたの真面目さと忍耐力は最大の武器ですが、時には計画を手放してみる勇気も必要です。「完璧」を求めすぎず、「十分に良い」で前に進むことを覚えると、人生はより豊かになります。"
  },
  "5": {
    num: 5, title: "冒険者", subtitle: "自由と変化の数字", element: "風", color: "#E67E22",
    overview: "運命数5を持つ人は、自由を愛し変化を恐れない冒険者です。「変化」「自由」「多様性」を象徴し、一箇所に留まることを嫌い、常に新しい経験を求めます。好奇心旺盛で適応力が高く、どんな環境にも素早く馴染む能力を持っています。",
    lightTraits: ["圧倒的な好奇心と冒険心", "高い適応力と柔軟性", "コミュニケーション能力", "多才で器用", "自由な発想力"],
    shadowTraits: ["責任から逃げる傾向", "飽きっぽく持続力に欠ける", "無計画で衝動的", "安定した関係を築きにくい"],
    loveIntro: "刺激的で自由な関係を好みます。束縛されると逃げ出したくなるタイプですが、真の理解者に出会えば深い愛を注ぎます。",
    loveTraits: ["自由と個人の時間を尊重してくれる相手を求める", "マンネリを嫌い新鮮さを追求", "冒険やサプライズが大好き", "遠距離恋愛でも柔軟に対応"],
    bestMatch: [1, 3, 7], challengeMatch: [2, 4],
    careerIntro: "ルーティンワークは大敵。変化に富んだ環境で多様な経験ができる仕事が最適です。",
    careers: ["旅行家・トラベルライター", "ジャーナリスト", "営業職・コンサルタント", "イベントプランナー", "翻訳家・通訳"],
    healthIntro: "神経系のトラブルやアドレナリン依存に注意。じっとしていられない性質がケガの原因になることも。",
    healthTips: ["アドレナリン系のスポーツでストレス発散", "旅行や自然体験で心をリフレッシュ", "規則的な睡眠リズムを意識する"],
    famousPeople: [{ name: "アンジェリーナ・ジョリー", desc: "6月4日生まれ。女優業と国際貢献を両立する冒険者" }, { name: "マーク・ザッカーバーグ", desc: "5月14日生まれ。常に変化を追い求めるイノベーター" }],
    advice: "あなたの自由を愛する精神は素晴らしい才能です。ただし「自由」と「逃避」は違います。本当に大切なものには腰を据えて向き合うことで、自由の中に深い充実感を見つけられるでしょう。"
  },
  "6": {
    num: 6, title: "守護者", subtitle: "愛と責任の数字", element: "地", color: "#2ECC71",
    overview: "運命数6を持つ人は、深い愛情と責任感で周囲を守る守護者です。「愛」「家庭」「奉仕」を象徴し、家族やコミュニティに対する強い責任感を持っています。美的感覚にも優れ、調和のとれた環境を作り出す力があります。",
    lightTraits: ["深い愛情と包容力", "責任感と奉仕の精神", "美的感覚と調和の力", "面倒見の良さ", "癒しのオーラ"],
    shadowTraits: ["過干渉になりやすい", "自己犠牲が過ぎる", "他人をコントロールしたがる", "完璧主義な面がある"],
    loveIntro: "献身的で家庭的な恋愛を好みます。パートナーと子どもに深い愛情を注ぎ、温かい家庭を築くことに幸せを感じます。",
    loveTraits: ["包容力のある献身的な愛情", "家庭・結婚を重視", "パートナーの世話を焼きたがる", "裏切りには深く傷つく"],
    bestMatch: [2, 4, 9], challengeMatch: [5, 7],
    careerIntro: "人を助け、育てる仕事に向いています。美的感覚を活かせる仕事も適性あり。",
    careers: ["医師・看護師", "教育者・保育士", "インテリアデザイナー", "ソーシャルワーカー", "シェフ・料理家"],
    healthIntro: "他人のストレスを吸収しやすい体質。胸部や心臓に関連するトラブルに注意。",
    healthTips: ["自分の時間を必ず確保する", "「NO」と言う練習をする", "花やアロマで自宅環境を整える"],
    famousPeople: [{ name: "ジョン・レノン", desc: "10月9日生まれ。愛と平和を歌い続けた守護者" }, { name: "メリル・ストリープ", desc: "6月22日生まれ。人間の深い感情を演じる愛の表現者" }],
    advice: "あなたの愛は世界を変える力を持っています。ただし、まず自分自身を大切にしてください。自分のカップが空では、誰にも注ぐことはできません。「自分を愛すること」が他者を愛する第一歩です。"
  },
  "7": {
    num: 7, title: "探究者", subtitle: "知性と神秘の数字", element: "水", color: "#8E44AD",
    overview: "運命数7を持つ人は、物事の本質を深く探究する知性の持ち主です。「分析」「内省」「真理の追求」を象徴し、表面的なことでは満足できない、真実を求め続ける孤高の探究者です。直感力と分析力を兼ね備え、科学と神秘の両方に惹かれる傾向があります。",
    lightTraits: ["卓越した分析力と洞察力", "深い内省力と知性", "鋭い直感力", "独学で深く学ぶ力", "精神世界への探究心"],
    shadowTraits: ["孤立しやすい", "他人を信頼しにくい", "感情表現が極端に苦手", "批判的になりすぎる"],
    loveIntro: "精神的なつながりを最も重視するタイプ。表面的な関係には興味がなく、魂レベルで共鳴するパートナーを求めます。",
    loveTraits: ["精神的・知的なつながりを最重視", "一人の時間が絶対に必要", "信頼関係を築くのに時間がかかる", "深い関係を築くと揺るがない"],
    bestMatch: [1, 3, 5], challengeMatch: [2, 6],
    careerIntro: "一人で集中して深く考える仕事が最適。チームワークより個人の専門性を発揮できる環境を好みます。",
    careers: ["研究者・科学者", "哲学者・思想家", "プログラマー・データサイエンティスト", "心理学者", "作家・ジャーナリスト"],
    healthIntro: "神経系や消化器系のトラブルに注意。ストレスを内に溜め込みやすい。",
    healthTips: ["定期的な一人の時間で内省する", "自然の中での散歩や瞑想", "読書や知的活動でリフレッシュ"],
    famousPeople: [{ name: "ニコラ・テスラ", desc: "7月10日生まれ。科学と神秘を探究した稀代の天才" }, { name: "レオナルド・ディカプリオ", desc: "11月11日生まれ。役の本質を深く追求する探究者" }],
    advice: "あなたの知性は計り知れない宝物です。ただし、頭の中だけで完結させず、得た叡智を世界に還元してください。「知る」ことと「生きる」ことを統合した時、運命数7の人は最高の力を発揮します。"
  },
  "8": {
    num: 8, title: "実現者", subtitle: "実行力と豊かさの数字", element: "地", color: "#C0392B",
    overview: "運命数8を持つ人は、ビジョンを現実に変換する圧倒的な実行力の持ち主です。「権力」「豊かさ」「達成」を象徴し、物質的な成功と精神的な成長の両方を追い求めます。ビジネスとの相性が抜群で、リーダーとして組織を率いる才能があります。",
    lightTraits: ["圧倒的な実行力と決断力", "ビジネスセンスと経営能力", "目標達成への強い意志", "組織を率いるカリスマ性", "物質的豊かさを引き寄せる力"],
    shadowTraits: ["権力に執着する傾向", "物質主義に偏りがち", "仕事中毒になりやすい", "他人をコントロールしたがる"],
    loveIntro: "恋愛においても「成功」を目指すタイプ。権力のあるパートナーとのパワーカップルを理想としますが、感情表現は苦手な面も。",
    loveTraits: ["同じ志を持つパートナーを求める", "物質的な豊かさで愛情を示す", "社会的ステータスを重視", "深い感情の共有には時間が必要"],
    bestMatch: [2, 4, 6], challengeMatch: [1, 3],
    careerIntro: "権限を持って大きな決断ができるポジションが最適。起業や経営に向いています。",
    careers: ["経営者・CEO", "投資家・ファンドマネージャー", "弁護士", "不動産デベロッパー", "政治家"],
    healthIntro: "循環器系やストレス関連の疾患に注意。仕事のしすぎによる過労が最大のリスク。",
    healthTips: ["仕事とプライベートの時間を明確に分ける", "定期的な健康診断を習慣に", "パワー系のスポーツで発散"],
    famousPeople: [{ name: "ネルソン・マンデラ", desc: "7月18日生まれ。不屈の意志で国家を変えた実現者" }, { name: "サンドラ・ブロック", desc: "7月26日生まれ。ハリウッドの頂点を極めた実力者" }],
    advice: "あなたには世界を動かす力があります。ただし、物質的な成功だけでは魂は満たされません。「何のために」成功するのかを常に問い続けてください。精神と物質のバランスが取れた時、運命数8の真の力が解放されます。"
  },
  "9": {
    num: 9, title: "博愛者", subtitle: "人道主義と理想の数字", element: "火", color: "#9B59B6",
    overview: "運命数9を持つ人は、広い視野で世界を見つめ、人類への深い愛を持つ博愛主義者です。「完成」「叡智」「奉仕」を象徴し、個人的な利益よりも社会全体の幸福を追い求めます。カバラ数秘術において最も高い一桁の数字であり、すべての数字のエッセンスを内包する特別な存在です。",
    lightTraits: ["深い慈愛と共感力", "広い視野とグローバルな視点", "芸術的才能と創造性", "人を許す寛大さ", "精神的な成熟度の高さ"],
    shadowTraits: ["理想主義すぎて現実とのギャップに苦しむ", "自己犠牲が過ぎる", "過去を手放せない", "感情的になりすぎることがある"],
    loveIntro: "精神的な成長を共にできる相手を求めます。世俗的な恋愛よりも、魂の成長を促し合える深い関係を理想としています。",
    loveTraits: ["無条件の愛を与えられる", "精神的な成長を共有できる関係を求める", "過去の恋愛を引きずりやすい", "理想が高く妥協が難しい"],
    bestMatch: [3, 6, 9], challengeMatch: [4, 8],
    careerIntro: "社会貢献や人道的な活動に強い適性があります。芸術的才能を社会のために活かす道も。",
    careers: ["NPO・NGO活動家", "社会起業家", "芸術家・ミュージシャン", "国際機関職員", "ヒーラー・スピリチュアルカウンセラー"],
    healthIntro: "免疫系や循環器系に注意。他人のエネルギーを吸収しやすい体質。",
    healthTips: ["定期的なデトックスを行う", "自然環境での瞑想やリトリート", "ボランティア活動で心を満たす"],
    famousPeople: [{ name: "マハトマ・ガンジー", desc: "10月2日生まれ。非暴力で世界を変えた究極の博愛者" }, { name: "マザー・テレサ", desc: "8月26日生まれ。無償の愛を体現した聖人" }],
    advice: "あなたの使命は、この世界をより良い場所にすることです。ただし、世界を救う前にまず自分を救ってください。自分の傷を癒してこそ、他者の傷を癒す力が生まれます。「手放す」ことを学ぶ時、運命数9の真の叡智が開花します。"
  }
};

export function generateStaticParams() {
  return Object.keys(destinyData).map((num) => ({ num }));
}

export function generateMetadata({ params }: { params: { num: string } }): Metadata {
  const d = destinyData[params.num];
  if (!d) return {};
  return {
    title: `運命数${d.num}「${d.title}」の性格・恋愛・適職を徹底解説 | カバラ数秘術`,
    description: `カバラ数秘術の運命数${d.num}を持つ人の本質的な性格、隠された才能、恋愛傾向、適職、健康アドバイスをプロが徹底解説。${d.overview.slice(0, 60)}`,
  };
}

export default function DestinyNumberDetailPage({ params }: { params: { num: string } }) {
  const d = destinyData[params.num];
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
            {Object.keys(destinyData).filter(n => n !== params.num).map(n => (
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
