import { useState, useEffect } from "react"

/* ══════════════════════════════════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════════════════════════════════ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap');

      *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
      html { scroll-behavior:smooth; }
      body {
        background:#080c14;
        color:#e8e4d8;
        font-family:'Cormorant Garamond', Georgia, serif;
        font-size:18px;
        line-height:1.6;
        min-height:100vh;
      }
      a { color:inherit; text-decoration:none; }
      button { cursor:pointer; border:none; outline:none; font-family:inherit; }
      input, select { font-family:inherit; outline:none; }

      @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
      @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:0.25} }
      @keyframes heroGlow { 0%,100%{box-shadow:0 0 40px rgba(212,168,83,0.07)} 50%{box-shadow:0 0 80px rgba(212,168,83,0.16)} }

      .fade-up    { animation: fadeUp 0.65s ease both; }
      .fade-up-d1 { animation: fadeUp 0.65s 0.10s ease both; }
      .fade-up-d2 { animation: fadeUp 0.65s 0.20s ease both; }
      .fade-up-d3 { animation: fadeUp 0.65s 0.32s ease both; }
      .live-pulse { animation: pulse 2s ease-in-out infinite; }
      .hero-glow  { animation: heroGlow 4s ease-in-out infinite; }

      input[type=range] {
        -webkit-appearance:none; width:100%; height:4px;
        background:linear-gradient(to right, #d4a853 var(--pct,50%), #1a2535 var(--pct,50%));
        border-radius:2px; cursor:pointer;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance:none; width:18px; height:18px;
        background:#d4a853; border-radius:50%; cursor:pointer;
        box-shadow:0 0 10px rgba(212,168,83,0.55);
        transition:transform 0.15s;
      }
      input[type=range]::-webkit-slider-thumb:hover { transform:scale(1.2); }

      input[type=number] {
        background:#0d1421; border:1.5px solid #1a2535; color:#e8e4d8;
        padding:12px 16px; border-radius:8px; width:100%;
        font-family:'JetBrains Mono', monospace; font-size:15px;
        transition:border-color 0.2s, box-shadow 0.2s;
        -moz-appearance:textfield;
      }
      input[type=number]:focus { border-color:#d4a853; box-shadow:0 0 0 3px rgba(212,168,83,0.11); }
      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; }

      select {
        background:#0d1421; border:1.5px solid #1a2535; color:#e8e4d8;
        padding:12px 36px 12px 16px; border-radius:8px; width:100%;
        font-family:'Cormorant Garamond', serif; font-size:17px;
        cursor:pointer; transition:border-color 0.2s;
        appearance:none; -webkit-appearance:none;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M0 0l6 7 6-7z' fill='%238a9bb5'/%3E%3C/svg%3E");
        background-repeat:no-repeat; background-position:right 14px center;
      }
      select:focus { border-color:#d4a853; }

      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-track { background:#080c14; }
      ::-webkit-scrollbar-thumb { background:#1a2535; border-radius:3px; }
      ::-webkit-scrollbar-thumb:hover { background:#d4a853; }

      .article-body h2 {
        font-family:'Cinzel',serif; font-size:1.35rem; font-weight:600;
        color:#e8e4d8; margin:2rem 0 0.8rem; letter-spacing:0.04em;
      }
      .article-body h3 {
        font-family:'Cinzel',serif; font-size:1rem; font-weight:600;
        color:#d4a853; margin:1.6rem 0 0.5rem; letter-spacing:0.05em;
      }
      .article-body p { margin-bottom:1.1rem; font-size:1.08rem; line-height:1.82; color:#b8b0a0; }
      .article-body ul, .article-body ol { margin:0.4rem 0 1.1rem 1.6rem; }
      .article-body li { margin-bottom:0.4rem; font-size:1.04rem; color:#b8b0a0; line-height:1.72; }
      .article-body strong { color:#e8e4d8; font-weight:600; }
      .article-body a { color:#d4a853; text-decoration:underline; text-decoration-color:rgba(212,168,83,0.3); }
      .article-body a:hover { text-decoration-color:#d4a853; }
      .article-body table { width:100%; border-collapse:collapse; margin:1rem 0 1.6rem; font-size:0.98rem; }
      .article-body th {
        background:#0d1421; color:#d4a853; font-family:'Cinzel',serif;
        font-size:0.72rem; letter-spacing:0.1em; padding:10px 14px;
        text-align:left; border-bottom:1px solid #1a2535;
      }
      .article-body td { padding:10px 14px; border-bottom:1px solid #121e2c; color:#b8b0a0; }
      .article-body tr:last-child td { border-bottom:none; }
      .article-body tr:nth-child(even) td { background:rgba(255,255,255,0.015); }
    `}</style>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
══════════════════════════════════════════════════════════════════════════ */
const C = {
  bg:       '#080c14',
  card:     '#0d1421',
  cardDeep: '#060a10',
  gold:     '#d4a853',
  goldDim:  '#7a5c18',
  blue:     '#5ba8c4',
  blueDim:  '#1e4a5a',
  text:     '#e8e4d8',
  textDim:  '#8a9bb5',
  textMuted:'#4a5a70',
  border:   '#1a2535',
  success:  '#4caf82',
  warning:  '#c97d3a',
  danger:   '#c94a4a',
}
const F = {
  display: "'Cinzel', serif",
  body:    "'Cormorant Garamond', Georgia, serif",
  mono:    "'JetBrains Mono', monospace",
}

/* ══════════════════════════════════════════════════════════════════════════
   UTILS
══════════════════════════════════════════════════════════════════════════ */
const fmt2   = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 })
const fmtRate = (n) => Number(n).toFixed(4)
const fmtK   = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(Math.round(n))
const addCommas = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/* ══════════════════════════════════════════════════════════════════════════
   ARTICLES DATA
══════════════════════════════════════════════════════════════════════════ */
const ARTICLES = [
  {
    id:'avoid-fees',
    title:'How to Avoid High Fees When Converting USD to Chinese Yuan',
    category:'Money Transfer', tag:'SAVE MONEY', tagColor:'#4caf82',
    summary:"Banks and airport kiosks can charge 4–7% above the real rate. Here's exactly how to avoid getting quietly ripped off.",
    readTime:'5 min',
  },
  {
    id:'foreign-transaction-fee',
    title:'How to Avoid the 3% Foreign Transaction Fee in China',
    category:'Travel Tips', tag:'TRAVEL', tagColor:'#5ba8c4',
    summary:'Most US credit cards quietly charge 3% on every overseas purchase. These cards and strategies eliminate it entirely.',
    readTime:'4 min',
  },
  {
    id:'cost-of-living',
    title:'Is It Cheaper to Live in China vs the USA? A Full 2026 Comparison',
    category:'Cost of Living', tag:'POPULAR', tagColor:'#d4a853',
    summary:'From groceries to rent to a can of Coke — a complete, data-driven comparison of everyday life costs in China versus the United States.',
    readTime:'7 min',
  },
  {
    id:'bring-cash',
    title:'How Much US Dollar Cash Can You Bring to China?',
    category:'Customs & Travel', tag:'MUST KNOW', tagColor:'#c97d3a',
    summary:"Chinese customs rules limit how much foreign currency you can carry across the border. Here's the exact limit and what happens if you exceed it.",
    readTime:'4 min',
  },
  {
    id:'visa-free',
    title:'Can US Citizens Travel to China Without a Visa in 2026?',
    category:'Travel', tag:'2026 UPDATE', tagColor:'#5ba8c4',
    summary:"China has dramatically expanded its visa-free policy. Here's the current status for US passport holders and what changed.",
    readTime:'5 min',
  },
  {
    id:'best-card',
    title:'What Is the Best Card to Use in China in 2026?',
    category:'Travel Tips', tag:'TOP PICK', tagColor:'#d4a853',
    summary:"Most US cards get quietly hit with 3% foreign transaction fees in China. These four cards eliminate the fees entirely — and one even reimburses all ATM costs.",
    readTime:'5 min',
  },
  {
    id:'wechat-pay',
    title:'How Does WeChat Pay Work for US Tourists in China?',
    category:'Travel Tips', tag:'ESSENTIAL', tagColor:'#4caf82',
    summary:"WeChat Pay is how nearly everyone in China pays for everything. US tourists can now link a Visa or Mastercard directly. Here's the step-by-step setup guide.",
    readTime:'6 min',
  },
  {
    id:'how-much-money',
    title:'How Much Money Should I Bring to China for 2 Weeks?',
    category:'Travel Planning', tag:'TRIP PREP', tagColor:'#c97d3a',
    summary:"A full budget breakdown for a 2-week China trip — how much cash vs card, daily spending by city and travel style, and what actually costs more than you'd expect.",
    readTime:'6 min',
  },
  {
    id:'us-debit-card',
    title:'Can I Use My US Debit Card in China?',
    category:'Travel Tips', tag:'COMMON Q', tagColor:'#5ba8c4',
    summary:"Yes — but with important caveats. Not all ATMs accept foreign cards, fees vary dramatically by bank, and UnionPay compatibility matters more than you think.",
    readTime:'4 min',
  },
  {
    id:'exchange-where',
    title:'Is It Better to Exchange Money in the US or in China?',
    category:'Money Transfer', tag:'STRATEGY', tagColor:'#4caf82',
    summary:"The answer surprises most travelers. Exchanging at home almost always costs more — here's exactly where to get the best USD to CNY rate and why timing matters.",
    readTime:'5 min',
  },
]

/* ══════════════════════════════════════════════════════════════════════════
   ARTICLE CONTENT
══════════════════════════════════════════════════════════════════════════ */
const ARTICLE_CONTENT = {
  'avoid-fees': {
    title:'How to Avoid High Fees When Converting USD to Chinese Yuan',
    faq:[
      { q:'What do banks charge to convert USD to CNY?', a:"Most US banks charge a 3–5% markup over the mid-market rate, plus a flat wire fee of $25–$50. On a $1,000 conversion, that's $30–$100 in hidden costs you'll never see itemized." },
      { q:'Does AAA exchange currency for free?', a:"AAA offers currency exchange for members, but it's not truly free — their rates include a built-in markup, and they may charge a service fee. They're cheaper than airport kiosks but more expensive than Wise or Remitly." },
      { q:'What banks offer free currency exchange?', a:"Charles Schwab reimburses all global ATM fees and uses a competitive rate. TD Bank offers same-day branch exchange. Neither is truly free (they still apply a spread), but they're among the best bank options available." },
    ],
    content:`
      <h2>The Hidden Cost of Converting Currency</h2>
      <p>When you convert US dollars to Chinese Yuan, you're almost never paying just the exchange rate you see quoted online. Banks and exchange services add a <strong>markup of 3–7%</strong> on top of the interbank (mid-market) rate — and because it's embedded in the rate itself rather than shown as a line-item fee, most people never notice it.</p>
      <p>On a $2,000 conversion, a 5% markup is $100 quietly gone. On $10,000, that's $500. For anyone sending money to China regularly, this adds up fast.</p>

      <h2>The Worst Places to Exchange Currency</h2>
      <ul>
        <li><strong>Airport exchange kiosks</strong> — markups of 8–15% are standard practice</li>
        <li><strong>Hotel front desks</strong> — similar to airports, convenient but expensive</li>
        <li><strong>Your home bank branch</strong> — 4–6% markup plus flat wire fees</li>
        <li><strong>Traveler's checks</strong> — rarely accepted in modern China, high conversion fees</li>
      </ul>

      <h2>The Best Ways to Convert USD to CNY</h2>
      <h3>1. Wise — Best Overall Rate</h3>
      <p>Wise uses the mid-market rate with a small, fully transparent fee (typically 0.4–0.7% for USD to CNY). A $1,000 transfer costs about $5–$7 total. Funds arrive in 1–2 business days to a Chinese bank account. For most people, this is the single best option.</p>

      <h3>2. Remitly — Best for Speed</h3>
      <p>Remitly offers competitive rates and an Express option that delivers within minutes. Their Economy tier (1–5 days) has even lower fees. They frequently run first-sender promotions worth $0 fees on your first transfer.</p>

      <h3>3. ATM Withdrawal in China — Best for Cash</h3>
      <p>If you need physical Yuan once you're in China, withdrawing from a local Bank of China or ICBC ATM with a Charles Schwab or Wise debit card gives you the interbank rate. Schwab reimburses all ATM fees at month-end. This is the cheapest way to get cash once you've landed.</p>

      <h3>4. WeChat Pay / Alipay with US Card</h3>
      <p>Both apps now accept US Visa and Mastercard as linked payment sources. The conversion rate is competitive, and it eliminates cash entirely in a country where locals almost never pay with physical bills.</p>

      <h2>Rate Comparison</h2>
      <table>
        <tr><th>Service</th><th>Rate Markup</th><th>Flat Fee</th><th>Best For</th></tr>
        <tr><td>Wise</td><td>0.4–0.7%</td><td>$4–$8</td><td>Bank transfers</td></tr>
        <tr><td>Remitly</td><td>0.5–1.5%</td><td>$0–$3.99</td><td>Speed + value</td></tr>
        <tr><td>Western Union</td><td>1.5–3%</td><td>$5–$15</td><td>Cash pickup</td></tr>
        <tr><td>Your bank wire</td><td>3–5%</td><td>$25–$50</td><td>Last resort</td></tr>
        <tr><td>Airport kiosk</td><td>8–15%</td><td>$0–$5</td><td>Emergency only</td></tr>
      </table>

      <h2>Bottom Line</h2>
      <p>Use Wise or Remitly for transfers to Chinese bank accounts. Use a Schwab or Wise debit card for ATM withdrawals in China. Avoid airport kiosks, hotel desks, and your home bank for exchange. The math is simple — the savings on even a single trip can be $50–$200.</p>
    `,
  },
  'foreign-transaction-fee': {
    title:'How to Avoid the 3% Foreign Transaction Fee in China',
    faq:[
      { q:'What is a foreign transaction fee?', a:"A foreign transaction fee is a surcharge your credit or debit card adds when you make a purchase in a foreign currency or processed through a non-US bank. It's typically 1–3% of each transaction, charged by your card issuer, not the merchant." },
      { q:'Is it better to use a credit card in China?', a:"In major hotels, large restaurants, and tourist sites — yes, a no-foreign-transaction-fee card works well. But most local restaurants, markets, taxis, and small businesses only accept WeChat Pay or Alipay. You need both a card and a mobile payment option." },
      { q:'How do I avoid the 3% foreign transaction fee?', a:"Use a card that charges zero foreign transaction fees. Top options include Chase Sapphire Preferred/Reserve, Capital One Venture, Charles Schwab debit card, and the Wise debit card. Always pay in CNY (not USD) when given the option at any terminal." },
    ],
    content:`
      <h2>What Is the Foreign Transaction Fee?</h2>
      <p>When you use most US credit or debit cards to buy something in China, your card issuer adds a <strong>foreign transaction fee</strong> — typically 1–3% per transaction, plus sometimes a 1–2% currency conversion markup on top. These show up as separate line items on your statement, or are sometimes buried in the exchange rate itself.</p>
      <p>On a 2-week trip spending $3,000, a 3% FTF costs $90 — spread across dozens of transactions you'd never notice individually.</p>

      <h2>Best Cards for China Travel (No FTF)</h2>
      <table>
        <tr><th>Card</th><th>FTF</th><th>Annual Fee</th><th>Key Perk</th></tr>
        <tr><td>Chase Sapphire Preferred</td><td>0%</td><td>$95</td><td>2x points on travel</td></tr>
        <tr><td>Chase Sapphire Reserve</td><td>0%</td><td>$550</td><td>$300 travel credit + Priority Pass</td></tr>
        <tr><td>Capital One Venture</td><td>0%</td><td>$95</td><td>2x miles on everything</td></tr>
        <tr><td>Schwab Investor Card</td><td>0%</td><td>$0</td><td>Reimburses all ATM fees</td></tr>
        <tr><td>Discover it Miles</td><td>0%</td><td>$0</td><td>1.5x miles flat</td></tr>
        <tr><td>Wise Debit Card</td><td>0%</td><td>$0</td><td>Mid-market rate, low withdrawal fees</td></tr>
      </table>

      <h2>The Layered Strategy: How to Carry Money in China</h2>
      <h3>Layer 1 — Mobile Payments (Primary)</h3>
      <p>Set up WeChat Pay or Alipay with your US Visa or Mastercard before leaving home. This lets you pay everywhere locals pay — street food, taxis, convenience stores, museums — at competitive conversion rates with no ATM needed.</p>

      <h3>Layer 2 — No-FTF Credit Card (Hotels & International)</h3>
      <p>Keep a no-foreign-transaction-fee card for international hotels, larger restaurants, and tourist purchases. Use it as your daily backup when mobile payment isn't accepted.</p>

      <h3>Layer 3 — CNY Cash (Markets, Rural, Small Vendors)</h3>
      <p>Withdraw Yuan from a Bank of China or ICBC ATM using a Schwab or Wise debit card. Keep ¥500–1,000 (about $70–$140) on hand at all times for places that don't take cards or apps.</p>

      <h2>Always Choose CNY at the Terminal</h2>
      <p>Many ATMs and point-of-sale devices in China will ask if you want to pay in USD instead of CNY — this is called <strong>Dynamic Currency Conversion (DCC)</strong>. It sounds convenient. It's not. The merchant locks in their own exchange rate, typically 5–8% worse than your card's rate. Always select CNY. Always.</p>
    `,
  },
  'cost-of-living': {
    title:'Is It Cheaper to Live in China vs the USA? A Full 2026 Comparison',
    faq:[
      { q:'Is it cheaper to live in China or the USA?', a:'For most everyday expenses — local food, transportation, utilities, and housing outside major city centers — China is 30–60% cheaper. The gap narrows significantly for imported goods, international schools, Western-brand groceries, and private healthcare.' },
      { q:'Is $3,000 USD a good salary in China?', a:"$3,000 USD per month (approximately ¥21,700 CNY) is an excellent salary in most Chinese cities and comfortable even in Shanghai and Beijing. Most local professionals earn ¥10,000–¥25,000 per month. Expats typically receive $3,000–$8,000 USD equivalent in total compensation." },
      { q:'How much is a Coke in China?', a:"A can of Coke costs approximately ¥3–4 (about $0.40–0.55 USD) at a convenience store. At a sit-down restaurant it ranges from ¥8–20 ($1.10–$2.80 USD). In tourist areas like the Bund in Shanghai, expect ¥20–35." },
    ],
    content:`
      <h2>The Quick Answer</h2>
      <p>China is generally <strong>30–60% cheaper</strong> than the United States for everyday living. The gap is widest for food, local transportation, and housing outside Shanghai and Beijing. It narrows considerably for luxury goods, imported Western products, and international schools.</p>

      <h2>Food & Dining</h2>
      <table>
        <tr><th>Item</th><th>China (USD)</th><th>USA (USD)</th><th>Savings</th></tr>
        <tr><td>Local restaurant meal</td><td>$3.50–$6</td><td>$13–$20</td><td>~75% cheaper</td></tr>
        <tr><td>Mid-range dinner (2 people)</td><td>$15–$25</td><td>$50–$80</td><td>~70% cheaper</td></tr>
        <tr><td>Big Mac</td><td>$3.10</td><td>$5.60</td><td>~45% cheaper</td></tr>
        <tr><td>Starbucks latte</td><td>$5.00</td><td>$6.50</td><td>~23% cheaper</td></tr>
        <tr><td>Can of Coke</td><td>$0.45</td><td>$1.50</td><td>~70% cheaper</td></tr>
        <tr><td>1 gallon of milk</td><td>$3.80</td><td>$4.50</td><td>~15% cheaper</td></tr>
        <tr><td>Monthly groceries (1 person)</td><td>$120–$200</td><td>$300–$500</td><td>~55% cheaper</td></tr>
      </table>

      <h2>Transportation</h2>
      <p>Transportation is China's biggest cost advantage. The public transit system is world-class, extensive, and extraordinarily affordable.</p>
      <table>
        <tr><th>Transport</th><th>China</th><th>USA</th></tr>
        <tr><td>Monthly metro pass (major city)</td><td>$20–$35</td><td>$90–$130</td></tr>
        <tr><td>DiDi ride (5km)</td><td>$2–$5</td><td>$12–$20</td></tr>
        <tr><td>Taxi starting fare</td><td>$0.70</td><td>$3.50</td></tr>
        <tr><td>High-speed rail (300km)</td><td>$25–$45</td><td>N/A</td></tr>
        <tr><td>Domestic flight (1 hour)</td><td>$40–$120</td><td>$100–$300</td></tr>
      </table>

      <h2>Housing</h2>
      <p>Rent varies enormously. Shanghai and Beijing's premium districts rival New York prices. Tier 2 and Tier 3 cities are dramatically cheaper.</p>
      <table>
        <tr><th>Housing</th><th>Beijing/Shanghai Center</th><th>Tier 2 City</th><th>US Average</th></tr>
        <tr><td>1BR apartment/month</td><td>$700–$1,500</td><td>$200–$500</td><td>$1,200–$2,200</td></tr>
        <tr><td>3BR apartment/month</td><td>$1,500–$4,000</td><td>$400–$1,000</td><td>$1,800–$3,500</td></tr>
        <tr><td>3BR house purchase</td><td>$400K–$2M+</td><td>$80K–$300K</td><td>$300K–$600K</td></tr>
      </table>

      <h2>Where China Is NOT Cheaper</h2>
      <ul>
        <li><strong>Imported Western goods</strong> — imported cheese, wine, and foreign brands carry a 30–100% markup due to tariffs</li>
        <li><strong>International schools</strong> — $15,000–$30,000/year, often exceeding US private school tuition</li>
        <li><strong>International-standard healthcare</strong> — hospitals catering to expats in Shanghai and Beijing charge US-equivalent rates</li>
        <li><strong>Electronics</strong> — iPhones and imported tech cost similar to or more than US prices</li>
        <li><strong>VPN services</strong> — required to access Google, Instagram, and most Western apps due to the Great Firewall</li>
      </ul>

      <h2>Monthly Budget Summary</h2>
      <table>
        <tr><th>Lifestyle</th><th>China (USD/month)</th><th>USA (USD/month)</th></tr>
        <tr><td>Budget / local lifestyle</td><td>$600–$1,000</td><td>$2,000–$3,000</td></tr>
        <tr><td>Comfortable mid-range</td><td>$1,500–$2,500</td><td>$3,500–$5,500</td></tr>
        <tr><td>Western expat lifestyle</td><td>$3,000–$6,000</td><td>$5,000–$9,000</td></tr>
      </table>
      <p>The cost advantage is real and substantial — especially for those willing to live more locally. For digital nomads, retirees, or people with USD-denominated income, China offers an exceptional standard of living at a fraction of American costs.</p>
    `,
  },
  'bring-cash': {
    title:'How Much US Dollar Cash Can You Bring to China?',
    faq:[
      { q:'How much US dollar is allowed to bring to China?', a:"You can bring up to $5,000 USD (or equivalent in foreign currency) into China without declaring it. Amounts above $5,000 must be declared on your customs form. There's no hard cap on how much you can bring — but undeclared amounts above $5,000 can be confiscated." },
      { q:'Can I bring $10,000 USD to China?', a:"Yes — you must declare it. Fill out the customs declaration form honestly when carrying more than $5,000 USD equivalent. There's no penalty for declaring. Problems arise specifically from failing to declare amounts that trigger the threshold." },
      { q:'What not to bring to China?', a:"GPS devices, large quantities of religious materials, and medications without a prescription can be questioned at the border. Politically sensitive content on devices can cause issues at some checkpoints. Customs rules change — always check the latest guidelines from the Chinese embassy before travel." },
    ],
    content:`
      <h2>The Rule: $5,000 USD Declaration Threshold</h2>
      <p>China Customs allows travelers to carry up to <strong>$5,000 USD</strong> (or the equivalent in other foreign currencies) without completing a declaration form. If you're carrying more than $5,000, you must declare it on the <strong>Customs Declaration Form (Form C)</strong> upon arrival.</p>
      <p>Failing to declare amounts above this threshold can result in the excess being confiscated and potential additional penalties. Declaring is routine — officers see it constantly and it creates no problems. Just be honest.</p>

      <h2>Chinese Yuan (CNY) Cash Rules</h2>
      <p>CNY has separate rules from foreign currency. You can bring up to <strong>¥20,000 CNY</strong> into China without restrictions. Amounts above ¥20,000 require declaration and may require documentation showing the legitimate source of funds.</p>

      <h2>Smarter Alternatives to Carrying Large Amounts of Cash</h2>
      <h3>Option 1: Withdraw CNY at Chinese ATMs</h3>
      <p>Use a Charles Schwab or Wise debit card to withdraw Yuan directly from Bank of China, ICBC, or China Construction Bank ATMs at near-interbank rates. This eliminates both the need to carry cash and airport exchange fees. Schwab reimburses all ATM fees at the end of each month.</p>

      <h3>Option 2: WeChat Pay or Alipay with US Card</h3>
      <p>Both apps accept US Visa and Mastercard. Setting these up before arrival lets you pay in the local way — scanning QR codes — with competitive conversion rates and zero cash needed for most daily spending in cities.</p>

      <h3>Option 3: Wise Transfer Before You Go</h3>
      <p>For longer stays or large amounts, transfer USD to a Chinese bank account via Wise before arriving. You'll get the mid-market rate with minimal fees, and the money is there waiting when you land.</p>

      <h2>The Declaration Process</h2>
      <p>If you're carrying more than $5,000 USD, fill out the customs form honestly. At Chinese customs, there's a Green Channel (nothing to declare) and a Red Channel (items to declare). Use the Red Channel, present your form, and officers will note the amount and typically let you proceed. Keep your bank receipt showing where the cash originated.</p>

      <h2>Leaving China With Cash</h2>
      <p>When departing, you can take up to <strong>$5,000 USD equivalent</strong> in foreign currency out without restriction. If you declared more upon entry, you can take out what you brought in — keep your entry declaration form as proof. Converting leftover CNY back to USD must be done at authorized bank exchange points before you leave.</p>
    `,
  },
  'best-card': {
    title:'What Is the Best Card to Use in China in 2026?',
    faq:[
      { q:'What is the best credit card to use in China?', a:"The Chase Sapphire Reserve and Chase Sapphire Preferred are top choices — both charge zero foreign transaction fees, offer strong travel rewards, and are widely accepted at international hotels and larger merchants. For everyday spending in China, pair either with a Wise or Schwab debit card for ATM withdrawals." },
      { q:'Does Visa or Mastercard work better in China?', a:"Both work at most international hotels, airports, and large retailers. However, many local restaurants, taxis, and small shops only accept UnionPay or mobile payments (WeChat Pay / Alipay). For day-to-day local spending, you need WeChat Pay or Alipay linked to your US card — Visa or Mastercard alone won't cover everything." },
      { q:'Can I use American Express in China?', a:"American Express has very limited acceptance in mainland China compared to Visa and Mastercard. Stick to Visa or Mastercard for your backup card, and rely on WeChat Pay or Alipay for local spending." },
    ],
    content:`
      <h2>The Short Answer</h2>
      <p>For most US travelers to China in 2026, the ideal setup is a <strong>two-card + one app</strong> strategy: a no-foreign-transaction-fee credit card for hotels and larger purchases, a Charles Schwab or Wise debit card for ATM withdrawals, and WeChat Pay or Alipay for everything else.</p>
      <p>No single card does it all in China — mobile payments dominate local commerce in a way that doesn't exist anywhere in the Western world. Planning for this layered approach before you leave saves significant money and prevents the panic of being cashless at a street food stall.</p>

      <h2>Best Credit Cards for China Travel</h2>
      <table>
        <tr><th>Card</th><th>FTF</th><th>Annual Fee</th><th>Best For</th></tr>
        <tr><td>Chase Sapphire Reserve</td><td>0%</td><td>$550</td><td>Hotels, flights, premium travel</td></tr>
        <tr><td>Chase Sapphire Preferred</td><td>0%</td><td>$95</td><td>Best value travel card</td></tr>
        <tr><td>Capital One Venture X</td><td>0%</td><td>$395</td><td>Simple 2x miles on everything</td></tr>
        <tr><td>Discover it Miles</td><td>0%</td><td>$0</td><td>No annual fee option</td></tr>
        <tr><td>Citi Premier</td><td>0%</td><td>$95</td><td>Strong points on dining</td></tr>
      </table>

      <h2>Best Debit Cards for ATM Withdrawals in China</h2>
      <h3>1. Charles Schwab Investor Checking — Best Overall</h3>
      <p>Schwab reimburses all ATM fees worldwide at the end of each month — including the fees charged by Chinese ATMs themselves. You get the interbank exchange rate with no markup. This is the single best card for withdrawing CNY in China. The account is free to open and requires no minimum balance.</p>

      <h3>2. Wise Debit Card — Best Rate</h3>
      <p>Wise uses the mid-market rate with a small, transparent conversion fee. You can hold CNY balance in your Wise account before traveling and spend directly from it. The card works at most Bank of China and ICBC ATMs. Two free withdrawals per month up to a limit.</p>

      <h2>Why You Also Need WeChat Pay or Alipay</h2>
      <p>In most Chinese cities, physical cards are rarely used for daily transactions. Street food, taxis, convenience stores, pharmacies, local restaurants, and even some tourist attractions only accept QR code payments. Both WeChat Pay and Alipay now accept US Visa and Mastercard as linked funding sources, making them accessible to tourists without a Chinese bank account.</p>
      <p>Set up at least one of these apps before you leave home — the setup process is significantly smoother on a US connection than trying to do it in China.</p>

      <h2>What to Avoid</h2>
      <ul>
        <li><strong>Any card with a foreign transaction fee</strong> — standard bank debit cards typically charge 1–3% per transaction and ATM fees on top</li>
        <li><strong>Airport currency exchange desks</strong> — markups of 8–15% are standard</li>
        <li><strong>Dynamic Currency Conversion</strong> — always pay in CNY, never USD, when given the choice at any terminal or ATM</li>
        <li><strong>Traveler's checks</strong> — nearly impossible to use in modern China</li>
      </ul>

      <h2>Recommended Setup Before You Leave</h2>
      <ol>
        <li>Apply for a Chase Sapphire Preferred or Capital One Venture if you don't have a no-FTF card</li>
        <li>Open a Charles Schwab checking account and order the debit card (allow 7–10 days for delivery)</li>
        <li>Download WeChat and set up WeChat Pay with your US Visa or Mastercard</li>
        <li>Notify all your banks of your China travel dates to prevent card blocks</li>
        <li>Keep ¥500–1,000 cash on hand at all times as a backup</li>
      </ol>
    `,
  },

  'wechat-pay': {
    title:'How Does WeChat Pay Work for US Tourists in China?',
    faq:[
      { q:'Can US tourists use WeChat Pay in China?', a:"Yes. As of 2023, WeChat Pay allows foreign visitors to link an international Visa, Mastercard, or American Express card directly to WeChat Pay without needing a Chinese bank account or phone number. This was a significant policy change that opened mobile payments to tourists for the first time." },
      { q:'Do you need a Chinese phone number for WeChat Pay?', a:"No longer — foreign tourists can now set up WeChat Pay with an international phone number. However, you do need to complete identity verification within the app, which requires a passport scan and sometimes a selfie video." },
      { q:'What is the WeChat Pay spending limit for tourists?', a:"Foreign card-linked WeChat Pay accounts have a spending limit of approximately ¥6,500 per day and ¥50,000 per year (roughly $900/day and $7,000/year). For most tourists, this is more than sufficient. The limit resets annually." },
    ],
    content:`
      <h2>Why WeChat Pay Is Non-Negotiable in China</h2>
      <p>China has become one of the most cashless societies on earth — but the cashless infrastructure runs almost entirely through two apps: WeChat Pay and Alipay. Physical credit cards are rarely accepted outside of international hotels and airports. Street food vendors, taxi drivers, supermarkets, pharmacies, and even some museums operate QR-code-only.</p>
      <p>Until 2023, this was a major problem for foreign tourists who couldn't link international cards. That changed with a policy update from both Tencent (WeChat) and Ant Group (Alipay) that now allows foreign Visa and Mastercard to fund a WeChat Pay or Alipay wallet.</p>

      <h2>How to Set Up WeChat Pay as a US Tourist</h2>
      <h3>Step 1 — Download WeChat</h3>
      <p>Download the WeChat app from the US App Store or Google Play. Create an account using your US phone number. Note: WeChat is blocked inside China without a VPN, so complete this setup <strong>before you leave the US</strong>.</p>

      <h3>Step 2 — Access WeChat Pay</h3>
      <p>Inside WeChat, tap the "Me" tab → Services → Wallet. You'll be prompted to set up WeChat Pay. Tap "Add a Card" and select "Overseas Bank Card."</p>

      <h3>Step 3 — Add Your US Card</h3>
      <p>Enter your Visa or Mastercard details. US-issued cards from major banks (Chase, Capital One, Bank of America, Citi) are accepted. American Express has limited compatibility — stick to Visa or Mastercard.</p>

      <h3>Step 4 — Complete Identity Verification</h3>
      <p>WeChat requires a passport scan and sometimes a short selfie video for foreign accounts. Have your passport ready. Verification typically takes a few minutes to a few hours.</p>

      <h3>Step 5 — Top Up Your Wallet (Optional)</h3>
      <p>You can load CNY directly into your WeChat Pay wallet from your linked card, or set it to charge the card directly per transaction. Loading a balance in advance can speed up payments.</p>

      <h2>How to Pay in China with WeChat Pay</h2>
      <p>In stores and restaurants, merchants display a QR code. Open WeChat → tap the "+" icon in the top right → "Scan" → scan the merchant's code → enter the amount → confirm. The payment goes through in under three seconds.</p>
      <p>Alternatively, merchants can scan your personal payment QR code from inside WeChat Pay. Open WeChat → Me → Services → Wallet → Money → show your QR code to the cashier.</p>

      <h2>WeChat Pay vs Alipay — Which Should You Use?</h2>
      <table>
        <tr><th>Feature</th><th>WeChat Pay</th><th>Alipay</th></tr>
        <tr><td>Acceptance</td><td>Ubiquitous</td><td>Ubiquitous</td></tr>
        <tr><td>Foreign card support</td><td>Yes (Visa/MC)</td><td>Yes (Visa/MC/Amex)</td></tr>
        <tr><td>Daily limit (foreign)</td><td>~¥6,500</td><td>~¥50,000</td></tr>
        <tr><td>Best for</td><td>Social + payments</td><td>Higher spending limits</td></tr>
        <tr><td>Setup difficulty</td><td>Moderate</td><td>Moderate</td></tr>
      </table>
      <p>Set up <strong>both</strong> if possible. Some merchants accept only one. The 5 minutes it takes to install both apps is worthwhile insurance.</p>

      <h2>Important: Install Before You Land</h2>
      <p>WeChat, Google Play, and the App Store are all accessible in China, but the Great Firewall slows or blocks many downloads without a VPN. Complete the entire setup process — download, account creation, card linking, verification — while you're still in the US on a normal internet connection.</p>
    `,
  },

  'how-much-money': {
    title:'How Much Money Should I Bring to China for 2 Weeks?',
    faq:[
      { q:'How much does a 2 week trip to China cost?', a:"A 2-week China trip costs roughly $1,500–$2,500 USD for budget travelers, $3,000–$5,000 for mid-range, and $7,000–$15,000+ for luxury travel. These figures include accommodation, food, transport, activities, and incidentals — but not international flights." },
      { q:'Is $100 a day enough for China?', a:"Yes — $100/day (about ¥720 CNY) is a comfortable mid-range daily budget in most Chinese cities outside of luxury experiences. It covers a nice hotel ($50–70), good meals ($15–20), local transport ($5–10), and activities ($10–15) with money to spare." },
      { q:'How much cash should I carry in China?', a:"For most travelers, ¥500–1,000 CNY (about $70–140 USD) in physical cash is sufficient as a backup for small vendors, rural areas, and places that don't accept WeChat Pay. The vast majority of daily spending in cities can be handled through WeChat Pay or Alipay linked to your US card." },
    ],
    content:`
      <h2>The 2-Week China Budget — By Travel Style</h2>
      <p>China has an enormous range of costs depending on where you go, how you get around, and how you eat. Local food is extraordinarily affordable; Western comforts (imported groceries, international hotel chains, Western restaurants) cost similar to or more than US prices. The biggest factor is how "local" your travel style is.</p>

      <table>
        <tr><th>Category</th><th>Budget ($70/day)</th><th>Mid-Range ($120/day)</th><th>Luxury ($300+/day)</th></tr>
        <tr><td>Accommodation</td><td>$20–35 (hostel/budget hotel)</td><td>$60–90 (3-star hotel)</td><td>$150–400 (5-star)</td></tr>
        <tr><td>Food</td><td>$10–15 (local restaurants)</td><td>$25–35 (mix)</td><td>$60–100 (fine dining)</td></tr>
        <tr><td>Transport</td><td>$8–12 (metro, bus)</td><td>$15–20 (metro + DiDi)</td><td>$30–50 (private car)</td></tr>
        <tr><td>Activities</td><td>$8–12 (free sites + one paid)</td><td>$20–30</td><td>$50–100 (private tours)</td></tr>
        <tr><td>Misc / snacks</td><td>$5–8</td><td>$10–15</td><td>$20–40</td></tr>
        <tr><td><strong>2-Week Total</strong></td><td><strong>$980–$1,540</strong></td><td><strong>$1,820–$2,660</strong></td><td><strong>$4,200–$9,800</strong></td></tr>
      </table>

      <h2>City-by-City Cost Variation</h2>
      <p>Where you go significantly affects your budget. Shanghai and Beijing are the most expensive, comparable to mid-tier European cities. Tier 2 cities like Chengdu, Xi'an, Guilin, and Hangzhou are 20–35% cheaper for accommodation and food.</p>
      <table>
        <tr><th>City</th><th>Daily Budget Est.</th><th>Known For</th></tr>
        <tr><td>Shanghai</td><td>+20% vs average</td><td>Modern skyline, international food scene</td></tr>
        <tr><td>Beijing</td><td>+15% vs average</td><td>Great Wall, Forbidden City, history</td></tr>
        <tr><td>Chengdu</td><td>−15% vs average</td><td>Pandas, spicy food, relaxed pace</td></tr>
        <tr><td>Xi'an</td><td>−20% vs average</td><td>Terracotta Warriors, Muslim Quarter</td></tr>
        <tr><td>Guilin / Yangshuo</td><td>−10% vs average</td><td>Li River, karst mountains</td></tr>
      </table>

      <h2>What Costs More Than Expected</h2>
      <ul>
        <li><strong>International tourist attractions</strong> — the Great Wall, Forbidden City, and major museums charge more for foreign visitors at some ticket tiers</li>
        <li><strong>Western food and imported goods</strong> — a bowl of pasta at a Western restaurant can cost as much as in New York</li>
        <li><strong>VPN service</strong> — required to access Google Maps, Instagram, Gmail, and most Western apps. Budget $10–15 for a month of a reliable VPN (ExpressVPN, NordVPN)</li>
        <li><strong>High-speed rail between cities</strong> — fast and comfortable, but 2nd class tickets for a 5-hour route run $40–$80 each way</li>
      </ul>

      <h2>How Much Cash to Carry</h2>
      <p>Most spending in major Chinese cities can be done via WeChat Pay or Alipay linked to your US Visa or Mastercard. Physical cash is mainly useful for:</p>
      <ul>
        <li>Rural areas and small towns</li>
        <li>Some older local restaurants and market stalls</li>
        <li>Tipping at hotels (not common but appreciated)</li>
        <li>Emergency backup if your phone dies or app fails</li>
      </ul>
      <p>A reasonable cash carry is <strong>¥1,000–2,000 CNY</strong> ($140–280 USD) at any given time — enough to cover 1–2 days of local spending without relying on apps or ATMs.</p>

      <h2>Recommended Money Setup for 2 Weeks</h2>
      <ol>
        <li>Set up WeChat Pay with your US Visa or Mastercard before departure (primary spending method)</li>
        <li>Bring a Charles Schwab debit card for fee-free ATM withdrawals to get CNY cash</li>
        <li>Bring a no-foreign-transaction-fee credit card for hotels and larger purchases</li>
        <li>Carry ¥1,000 CNY cash at all times as backup</li>
        <li>Budget a daily buffer of 10–15% above your estimates for surprises</li>
      </ol>
    `,
  },

  'us-debit-card': {
    title:'Can I Use My US Debit Card in China?',
    faq:[
      { q:'Can I use my US debit card in China?', a:"Yes, at most international ATMs — but not for point-of-sale purchases. Chinese merchants almost universally use WeChat Pay or Alipay for transactions. ATMs affiliated with Bank of China, ICBC, China Construction Bank, and HSBC reliably accept foreign Visa and Mastercard debit cards. Your bank will charge foreign transaction and ATM fees unless you use a fee-free card like Charles Schwab." },
      { q:'Does Bank of America debit card work in China?', a:"Bank of America debit cards work at most major Chinese ATM networks. However, Bank of America charges a $5 flat international ATM fee plus a 3% foreign transaction fee. On a ¥2,000 withdrawal (about $280), you'd pay roughly $13–$14 in fees. A Schwab debit card would cost zero for the same withdrawal." },
      { q:'What ATMs in China accept US cards?', a:"Bank of China (中国银行), ICBC (工商银行), China Construction Bank (建设银行), and HSBC China all reliably accept Visa and Mastercard debit cards. Look for ATMs that display the Visa, Mastercard, or Plus/Cirrus logos. Avoid small local bank ATMs — acceptance is inconsistent." },
    ],
    content:`
      <h2>Yes — With Important Caveats</h2>
      <p>US debit cards work in China, but the experience is very different from using a card at home. China's payment infrastructure runs primarily through WeChat Pay and Alipay — physical card terminals at the point of sale are rare outside of international hotels and some tourist-facing restaurants. Your debit card's main role in China is <strong>withdrawing CNY cash from ATMs</strong>, not swiping at shops.</p>

      <h2>Which ATMs Accept US Debit Cards</h2>
      <p>The following bank ATMs reliably process foreign Visa and Mastercard debit cards:</p>
      <ul>
        <li><strong>Bank of China (中国银行)</strong> — most reliable, widest network, specifically experienced with foreign cards</li>
        <li><strong>ICBC (工商银行)</strong> — largest bank in China, ATMs in every city</li>
        <li><strong>China Construction Bank (建设银行)</strong> — good acceptance rate</li>
        <li><strong>HSBC China</strong> — excellent for international cards, fewer locations</li>
        <li><strong>Citibank China</strong> — very reliable, limited branches</li>
      </ul>
      <p>Always look for the Visa, Mastercard, Plus, or Cirrus logo on the ATM before inserting your card. ATMs without these logos may reject foreign cards outright.</p>

      <h2>The Fee Problem</h2>
      <p>Standard US bank debit cards come with multiple layers of fees for international ATM use:</p>
      <table>
        <tr><th>Bank</th><th>ATM Fee</th><th>FX Markup</th><th>ATM Owner Fee</th><th>Total on $300 Withdrawal</th></tr>
        <tr><td>Bank of America</td><td>$5 flat</td><td>3%</td><td>¥15–25 (~$2–3)</td><td>~$16–17</td></tr>
        <tr><td>Wells Fargo</td><td>$5 flat</td><td>3%</td><td>¥15–25</td><td>~$16–17</td></tr>
        <tr><td>Chase</td><td>$5 flat</td><td>3%</td><td>¥15–25</td><td>~$16–17</td></tr>
        <tr><td>Charles Schwab</td><td>$0</td><td>0%</td><td>Reimbursed</td><td>$0</td></tr>
        <tr><td>Wise Debit</td><td>$0 (2 free/mo)</td><td>~0.5%</td><td>$0</td><td>~$1.50</td></tr>
      </table>

      <h2>The Solution: Open a Schwab Account Before You Go</h2>
      <p>The Charles Schwab Investor Checking account has no minimum balance, no monthly fees, and reimburses all ATM fees worldwide — including the fees charged by the ATM owner — at the end of each month. It's the universally recommended card for international travel, and China is no exception.</p>
      <p>Apply online at schwab.com. The debit card arrives in 7–10 business days. Open the account at least two weeks before your trip.</p>

      <h2>Daily Withdrawal Limits</h2>
      <p>Most Chinese ATMs have a per-transaction limit of ¥2,500–5,000 CNY (about $350–700 USD). If you need more, make multiple withdrawals or visit a bank teller during business hours, where limits are higher. Your US bank also has its own daily withdrawal limits — check and temporarily raise them before traveling if needed.</p>

      <h2>Always Select CNY at the ATM</h2>
      <p>Chinese ATMs frequently offer to charge you in USD instead of CNY — a practice called Dynamic Currency Conversion (DCC). The ATM's USD rate is typically 5–8% worse than your bank's rate. <strong>Always select CNY.</strong> Always.</p>
    `,
  },

  'exchange-where': {
    title:'Is It Better to Exchange Money in the US or in China?',
    faq:[
      { q:'Should I exchange money before going to China?', a:"For most travelers, exchanging a small amount ($100–200 USD worth of CNY) before departure makes sense as emergency cash. Beyond that, exchanging money in China — either via ATM withdrawal with a fee-free card or through Wise — consistently offers better rates than exchanging at US banks or airport kiosks before your trip." },
      { q:'Where is the best place to exchange USD to Chinese Yuan?', a:"The best rate for most people is withdrawing CNY directly from a Chinese ATM (Bank of China or ICBC) using a Charles Schwab debit card, which charges no fees and uses the interbank rate. For bank transfers, Wise consistently offers the closest to mid-market rate with the lowest fees." },
      { q:'Can I exchange USD for CNY at a Chinese bank?', a:"Yes. Bank of China and ICBC branches exchange foreign currency at the official PBOC daily rate — one of the best rates available. You'll need your passport. The process takes 10–20 minutes and is reliable, though branch hours are limited to business days." },
    ],
    content:`
      <h2>The Short Answer: Exchange in China (Usually)</h2>
      <p>For most travelers, the best strategy is to <strong>arrive with a small amount of CNY</strong> for immediate needs (taxi from the airport, first meal), then withdraw the rest from a Chinese ATM using a fee-free card. Exchanging large amounts at US banks or airport kiosks before you leave costs significantly more.</p>

      <h2>Why Exchanging in the US Usually Costs More</h2>
      <p>US banks and exchange services set their own rates, which include a markup over the interbank (mid-market) rate. The typical markups:</p>
      <table>
        <tr><th>Where You Exchange</th><th>Typical Markup</th><th>Cost on $1,000</th></tr>
        <tr><td>US airport kiosk</td><td>8–15%</td><td>$80–150 lost</td></tr>
        <tr><td>US bank branch (e.g. BofA)</td><td>4–6%</td><td>$40–60 lost</td></tr>
        <tr><td>AAA / exchange services</td><td>3–5%</td><td>$30–50 lost</td></tr>
        <tr><td>Chinese bank branch (PBOC rate)</td><td>0–0.5%</td><td>$0–5 lost</td></tr>
        <tr><td>Chinese ATM (Schwab card)</td><td>0%</td><td>$0 lost</td></tr>
        <tr><td>Wise transfer</td><td>0.4–0.7%</td><td>$4–7 lost</td></tr>
      </table>

      <h2>The Best Options — Ranked</h2>
      <h3>1. Chinese ATM with Charles Schwab Card — Best Rate</h3>
      <p>Withdraw CNY from a Bank of China or ICBC ATM using a Schwab debit card. You get the interbank rate, Schwab charges no fees, and reimburses any ATM owner fees monthly. This is the single best way to get CNY for most travelers.</p>

      <h3>2. Wise Bank Transfer — Best for Large Amounts</h3>
      <p>If you need to move significant USD to a Chinese bank account, Wise uses the mid-market rate with a transparent fee of 0.4–0.7%. On $5,000, that's $20–35 total versus $200–300 through a US bank wire.</p>

      <h3>3. Chinese Bank Branch — Good Backup</h3>
      <p>Bank of China and ICBC use the official PBOC fixing rate, which is very competitive. Bring your passport, be prepared for paperwork, and go during business hours on weekdays. Useful if you need large amounts of physical cash that ATM limits won't accommodate in one visit.</p>

      <h3>4. US Bank / Exchange Service — Last Resort</h3>
      <p>Only use US-based exchange services if you absolutely must arrive with CNY cash (e.g., flying into a very small regional airport with no reliable ATMs). Exchange the minimum needed — $100–200 — and get the rest in China.</p>

      <h2>When It Makes Sense to Exchange in the US</h2>
      <ul>
        <li>You need a small amount of CNY the moment you land (airport taxi, tip, first meal)</li>
        <li>Your destination in China has limited ATM access (very rural areas)</li>
        <li>You're traveling with elderly family members who prefer to have cash in hand from the start</li>
      </ul>
      <p>In these cases, exchange $100–200 maximum at a US credit union or AAA (better rates than banks), accept the small markup as a convenience fee, and get everything else in China.</p>

      <h2>What About Chinese Airports?</h2>
      <p>Chinese airport exchange counters use the official PBOC rate — significantly better than US airport kiosks. If you forget to withdraw cash before leaving a Chinese city, the airport exchange desk is a reasonable last option, not an emergency measure.</p>
    `,
  },

  'visa-free': {
    title:'Can US Citizens Travel to China Without a Visa in 2026?',
    faq:[
      { q:'Can US citizens go to China visa free?', a:"Yes — as of 2024, China's unilateral visa-free policy includes US passport holders for stays up to 15 days covering tourism, business, transit, and family visits. This policy remains in effect in 2026. Always verify with the Chinese embassy before booking as policies can change without much notice." },
      { q:'Do a lot of Americans live in China?', a:"Estimates suggest 50,000–100,000 US citizens reside in China, down significantly from pre-2020 levels due to pandemic disruptions, geopolitical tensions, and stricter residency policies. Shanghai and Beijing are the primary hubs, with smaller communities in Chengdu, Guangzhou, and Shenzhen." },
      { q:'What is the 6 year rule in China?', a:"The 6-year rule refers to China's regulation that foreign nationals who have resided in China for 6 consecutive years — spending no more than 90 cumulative days per year outside China — may be required to declare worldwide income for Chinese tax purposes. This affects long-term expats, not tourists." },
    ],
    content:`
      <h2>2026 Visa-Free Entry for US Citizens</h2>
      <p>China's unilateral visa-free policy, expanded significantly in late 2024, allows US passport holders to enter China visa-free for stays of up to <strong>15 days</strong> for tourism, business, transit, and family visits. This was a major policy shift from the previously complex and expensive visa process.</p>
      <p><strong>Critical note:</strong> Visa policies involving China and the US are subject to change due to geopolitical dynamics. Always verify the current policy at travel.state.gov or with the Chinese Embassy before booking flights.</p>

      <h2>What the 15-Day Policy Covers</h2>
      <ul>
        <li><strong>Tourism</strong> — sightseeing, personal travel throughout mainland China</li>
        <li><strong>Business</strong> — meetings, conferences, negotiations (not employment)</li>
        <li><strong>Transit</strong> — passing through China on the way to a third country</li>
        <li><strong>Family visits</strong> — visiting Chinese nationals or family members</li>
      </ul>
      <p>You cannot use visa-free entry to work, study, or receive payment for services in China. A visa is required for those purposes.</p>

      <h2>72/144-Hour Transit Visa-Free Policy</h2>
      <p>Separately from the 15-day policy, China offers a <strong>72 or 144-hour transit visa-free</strong> option at major airports including Beijing Capital, Shanghai Pudong/Hongqiao, Guangzhou Baiyun, and Chengdu Tianfu. If you're transiting to a third country, you can leave the airport and explore the city for up to 6 days — a popular option for adding a China stopover to an Asia itinerary.</p>

      <h2>Longer Stays: Visa Types</h2>
      <table>
        <tr><th>Visa Type</th><th>Purpose</th><th>Typical Duration</th></tr>
        <tr><td>L Visa (Tourist)</td><td>Tourism beyond 15 days</td><td>30–90 days, various entries</td></tr>
        <tr><td>M Visa (Business)</td><td>Commercial activities</td><td>30–90 days</td></tr>
        <tr><td>F Visa (Exchange)</td><td>Non-commercial visits</td><td>30–90 days</td></tr>
        <tr><td>Z Visa (Work)</td><td>Employment</td><td>30 days (convert to permit)</td></tr>
        <tr><td>X Visa (Study)</td><td>Education</td><td>30 days (convert to permit)</td></tr>
      </table>

      <h2>Practical Tips for Entry</h2>
      <ul>
        <li><strong>Passport validity</strong> — must be valid for at least 6 months beyond your planned departure from China</li>
        <li><strong>Return/onward ticket</strong> — airlines and immigration may require proof of onward travel</li>
        <li><strong>Accommodation registration</strong> — hotels register you automatically; locals hosting you must register at the local police station within 24 hours</li>
        <li><strong>Install a VPN before you go</strong> — Google, Instagram, WhatsApp, and most Western apps are blocked in China (the Great Firewall)</li>
        <li><strong>Set up WeChat Pay or Alipay</strong> — essential for payments everywhere; most locals don't carry cash</li>
      </ul>

      <h2>Plan Your Travel Budget</h2>
      <p>Before your trip, use our <a href="#tools">Travel Budget Calculator</a> to estimate your daily spending in CNY, and our <a href="#tools">Live Converter</a> to understand exactly what your dollars are worth right now.</p>
    `,
  },
}

/* ══════════════════════════════════════════════════════════════════════════
   LIVE RATE HOOK
══════════════════════════════════════════════════════════════════════════ */
function useLiveRate() {
  const [rate, setRate]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [updatedAt, setUpdated] = useState(null)

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?from=USD&to=CNY')
      .then(r => r.json())
      .then(d => { setRate(d.rates.CNY); setUpdated(new Date()); setLoading(false) })
      .catch(() => { setRate(7.2450); setLoading(false) })
  }, [])

  return { rate, loading, updatedAt }
}

/* ══════════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
══════════════════════════════════════════════════════════════════════════ */
function Label({ children, color }) {
  return (
    <span style={{ fontFamily:F.mono, fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.13em', textTransform:'uppercase', color:color||C.textMuted }}>
      {children}
    </span>
  )
}

function Mono({ children, size, color, weight }) {
  return (
    <span style={{ fontFamily:F.mono, fontSize:size||'1rem', color:color||C.text, fontWeight:weight||400 }}>
      {children}
    </span>
  )
}

function Card({ children, style }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:'28px', ...style }}>
      {children}
    </div>
  )
}

function GoldDivider() {
  return <div style={{ width:44, height:2, background:`linear-gradient(to right, ${C.gold}, transparent)`, margin:'12px 0' }} />
}

function SliderRow({ label, value, min, max, step, onChange, display }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ marginBottom:22 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:9 }}>
        <Label>{label}</Label>
        <Mono size="0.88rem" color={C.gold} weight={500}>{display !== undefined ? display : value}</Mono>
      </div>
      <input type="range" min={min} max={max} step={step||1} value={value}
        style={{ '--pct':`${pct}%` }} onChange={e => onChange(Number(e.target.value))} />
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
        <Label>{min}</Label><Label>{max}</Label>
      </div>
    </div>
  )
}

function SelectRow({ label, value, options, onChange }) {
  return (
    <div style={{ marginBottom:22 }}>
      <div style={{ marginBottom:9 }}><Label>{label}</Label></div>
      <select value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

function BigStat({ label, value, accent }) {
  return (
    <div style={{ textAlign:'center', padding:'16px 8px', background:C.cardDeep, border:`1px solid ${C.border}`, borderRadius:10 }}>
      <div style={{ marginBottom:6 }}><Label>{label}</Label></div>
      <div style={{ fontFamily:F.mono, fontSize:'1.8rem', fontWeight:600, color:accent?C.gold:C.text, lineHeight:1.1 }}>{value}</div>
    </div>
  )
}

function AffiliateCTA({ heading, text, links }) {
  return (
    <div style={{ background:`linear-gradient(135deg,#0d1421,#111929)`, border:`1px solid ${C.goldDim}`, borderRadius:12, padding:'24px 28px', marginTop:28 }}>
      <div style={{ marginBottom:4 }}><Label color={C.gold}>Recommended</Label></div>
      <div style={{ fontFamily:F.display, fontSize:'1.05rem', color:C.text, marginBottom:8, letterSpacing:'0.04em' }}>{heading}</div>
      <p style={{ fontSize:'0.98rem', color:C.textDim, marginBottom:16, lineHeight:1.65 }}>{text}</p>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        {links.map((l, i) => (
          <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" style={{
            display:'inline-flex', alignItems:'center', gap:5,
            padding:'8px 18px',
            background:i===0?C.gold:'transparent', color:i===0?'#080c14':C.gold,
            border:`1px solid ${i===0?C.gold:C.goldDim}`, borderRadius:6,
            fontFamily:F.mono, fontSize:'0.76rem', fontWeight:i===0?700:400,
            letterSpacing:'0.07em', textTransform:'uppercase', transition:'opacity 0.2s',
          }}>
            {l.label}{i===0&&' →'}
          </a>
        ))}
      </div>
      <p style={{ marginTop:10, fontSize:'0.72rem', color:C.textMuted, fontFamily:F.mono }}>
        * Affiliate links — we may earn a commission at no cost to you.
      </p>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom:`1px solid ${C.border}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width:'100%', textAlign:'left', padding:'15px 0', background:'none',
        color:C.text, fontFamily:F.body, fontSize:'1.05rem',
        display:'flex', justifyContent:'space-between', alignItems:'center', gap:12,
      }}>
        <span>{q}</span>
        <span style={{ color:C.gold, fontSize:'1.3rem', flexShrink:0, transform:open?'rotate(45deg)':'rotate(0)', transition:'transform 0.2s' }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom:16, color:C.textDim, fontSize:'1rem', lineHeight:1.72, animation:'fadeIn 0.2s ease' }}>
          {a}
        </div>
      )}
    </div>
  )
}

function ArticleCard({ article, setPage }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onClick={() => setPage(article.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? '#111929' : C.card,
        border:`1px solid ${hover ? article.tagColor : C.border}`,
        borderRadius:12, padding:'24px', cursor:'pointer',
        transition:'all 0.2s', transform:hover?'translateY(-3px)':'translateY(0)',
        display:'flex', flexDirection:'column',
      }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12, gap:8 }}>
        <span style={{
          fontFamily:F.mono, fontSize:'0.64rem', color:article.tagColor,
          background:`${article.tagColor}18`, border:`1px solid ${article.tagColor}40`,
          padding:'3px 9px', borderRadius:4, letterSpacing:'0.1em', textTransform:'uppercase',
        }}>{article.tag}</span>
        <span style={{ fontFamily:F.mono, fontSize:'0.65rem', color:C.textMuted, whiteSpace:'nowrap' }}>{article.readTime} read</span>
      </div>
      <h3 style={{ fontFamily:F.display, fontSize:'0.95rem', color:C.text, letterSpacing:'0.04em', lineHeight:1.45, marginBottom:10, flex:1 }}>
        {article.title}
      </h3>
      <p style={{ color:C.textDim, fontSize:'0.88rem', lineHeight:1.65, marginBottom:14 }}>{article.summary}</p>
      <div style={{ fontFamily:F.mono, fontSize:'0.72rem', color:article.tagColor, letterSpacing:'0.08em' }}>
        Read Article →
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════════════════ */
function NavBar({ page, setPage }) {
  const navBtn = (label, target) => (
    <button onClick={() => setPage(target)} style={{
      background:'none', color:page===target?C.gold:C.textDim,
      fontFamily:F.display, fontSize:'0.78rem', letterSpacing:'0.13em', textTransform:'uppercase',
      padding:'6px 2px',
      borderBottom:`1px solid ${page===target?C.gold:'transparent'}`,
      transition:'color 0.2s, border-color 0.2s',
    }}>{label}</button>
  )

  return (
    <nav style={{
      position:'sticky', top:0, zIndex:100,
      background:'rgba(8,12,20,0.93)', backdropFilter:'blur(14px)',
      borderBottom:`1px solid ${C.border}`,
    }}>
      <div style={{
        maxWidth:1100, margin:'0 auto', padding:'0 24px',
        height:58, display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        <button onClick={() => setPage('home')} style={{
          background:'none', fontFamily:F.display, fontSize:'1rem',
          letterSpacing:'0.08em', color:C.text,
          display:'flex', alignItems:'center', gap:8,
        }}>
          <span style={{ color:C.gold, fontSize:'1.3rem' }}>¥</span>
          <span>USDtoChinaYuan</span>
        </button>

        <div style={{ display:'flex', gap:26, alignItems:'center' }}>
          {navBtn('Live Rate', 'home')}
          {navBtn('Calculators', 'tools')}
          {navBtn('Guides', 'guides')}
          <button onClick={() => setPage('tools')} style={{
            background:C.gold, color:'#080c14',
            fontFamily:F.mono, fontSize:'0.72rem', fontWeight:700,
            letterSpacing:'0.1em', textTransform:'uppercase',
            padding:'7px 16px', borderRadius:6, transition:'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity='0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity='1'}>
            Convert Now
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════════════ */
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop:`1px solid ${C.border}`, background:'#060a10', padding:'52px 24px 32px', marginTop:80 }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:44, marginBottom:44 }}>
          <div>
            <div style={{ fontFamily:F.display, fontSize:'1rem', color:C.text, marginBottom:12, letterSpacing:'0.08em' }}>
              <span style={{color:C.gold}}>¥</span> USDtoChinaYuan
            </div>
            <p style={{ color:C.textDim, fontSize:'0.9rem', lineHeight:1.75 }}>
              Free USD to CNY currency tools, live exchange rates, and expert guides for travelers, expats, and businesses.
            </p>
          </div>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.textMuted, marginBottom:14 }}>Tools</div>
            {[['Live Converter','tools'],['Cost of Living','tools'],['Travel Budget','tools'],['Send Money Comparison','tools']].map(([l,p]) => (
              <div key={l} style={{ marginBottom:8 }}>
                <button onClick={() => setPage(p)} style={{ background:'none', color:C.textDim, fontFamily:F.body, fontSize:'1rem' }}>{l}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.textMuted, marginBottom:14 }}>Guides</div>
            {ARTICLES.slice(0,4).map(a => (
              <div key={a.id} style={{ marginBottom:8 }}>
                <button onClick={() => setPage(a.id)} style={{ background:'none', color:C.textDim, fontFamily:F.body, fontSize:'0.95rem', textAlign:'left', lineHeight:1.4 }}>{a.title}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'0.68rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.textMuted, marginBottom:14 }}>Disclaimer</div>
            <p style={{ color:C.textMuted, fontSize:'0.85rem', lineHeight:1.75 }}>
              Exchange rates are for informational purposes only. Not financial advice. Always verify rates with your bank or transfer service before transacting.
            </p>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:20, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
          <span style={{ fontFamily:F.mono, fontSize:'0.72rem', color:C.textMuted }}>© 2026 USDtoChinaYuan.com</span>
          <span style={{ fontFamily:F.mono, fontSize:'0.72rem', color:C.textMuted }}>Rate data via Frankfurter / ECB</span>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   CALCULATORS
══════════════════════════════════════════════════════════════════════════ */

// 1 — Live Converter
function LiveConverter({ rate, loading, updatedAt }) {
  const [usd, setUsd] = useState(100)
  const [cny, setCny] = useState('')
  const r = rate || 7.2450

  useEffect(() => { setCny((usd * r).toFixed(2)) }, [r])

  const handleUsd = v => { setUsd(v); setCny((v * r).toFixed(2)) }
  const handleCny = v => { setCny(v); setUsd((v / r).toFixed(2)) }

  return (
    <div>
      {/* Rate badge */}
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:12,
          background:'rgba(91,168,196,0.06)', border:`1px solid ${C.blueDim}`,
          borderRadius:20, padding:'6px 18px' }}>
          <span className="live-pulse" style={{ width:7,height:7,background:loading?C.textMuted:C.success,borderRadius:'50%',display:'inline-block' }} />
          <Label color={loading?C.textMuted:C.success}>{loading?'Fetching live rate…':'ECB Mid-Market Rate'}</Label>
        </div>
        {!loading && (
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'3rem', fontWeight:600, color:C.gold, lineHeight:1 }}>
              {fmtRate(r)}
            </div>
            <div style={{ marginTop:6 }}>
              <Label color={C.textMuted}>
                1 USD = {fmtRate(r)} CNY
                {updatedAt && ` · Updated ${updatedAt.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`}
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Inputs */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'end', gap:14, marginBottom:24 }}>
        <div>
          <div style={{ marginBottom:8, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ fontSize:'1.2rem' }}>🇺🇸</span><Label>US Dollar (USD)</Label>
          </div>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',fontFamily:F.mono,color:C.textDim }}>$</span>
            <input type="number" value={usd} onChange={e=>handleUsd(e.target.value)} style={{paddingLeft:27}} min="0" />
          </div>
        </div>
        <div style={{ paddingBottom:4, color:C.gold, fontSize:'1.5rem', userSelect:'none', textAlign:'center' }}>⇄</div>
        <div>
          <div style={{ marginBottom:8, display:'flex', alignItems:'center', gap:7 }}>
            <span style={{ fontSize:'1.2rem' }}>🇨🇳</span><Label>Chinese Yuan (CNY)</Label>
          </div>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',fontFamily:F.mono,color:C.textDim }}>¥</span>
            <input type="number" value={cny} onChange={e=>handleCny(e.target.value)} style={{paddingLeft:27}} min="0" />
          </div>
        </div>
      </div>

      {/* Quick amounts */}
      <div style={{ marginBottom:26 }}>
        <Label color={C.textMuted}>Quick amounts (USD)</Label>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:10 }}>
          {[50,100,500,1000,5000,10000].map(a => (
            <button key={a} onClick={()=>handleUsd(a)} style={{
              background: Number(usd)===a?C.gold:C.border, color:Number(usd)===a?'#080c14':C.textDim,
              fontFamily:F.mono, fontSize:'0.78rem', padding:'6px 14px', borderRadius:6,
              border:`1px solid ${Number(usd)===a?C.gold:'transparent'}`, transition:'all 0.15s',
            }}>${a.toLocaleString()}</button>
          ))}
        </div>
      </div>

      {/* Result box */}
      {!loading && (
        <div style={{
          background:C.cardDeep, border:`1px solid ${C.goldDim}`, borderRadius:10,
          padding:'18px 22px', display:'flex', alignItems:'center', justifyContent:'center',
          gap:18, flexWrap:'wrap', textAlign:'center', marginBottom:4,
        }}>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'1rem', color:C.textDim }}>${fmt2(usd)} USD</div>
            <div style={{ fontFamily:F.mono, fontSize:'0.72rem', color:C.textMuted }}>US Dollars</div>
          </div>
          <div style={{ color:C.gold, fontSize:'1.6rem' }}>→</div>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:'1.9rem', color:C.gold, fontWeight:600 }}>¥{fmt2(cny||usd*r)}</div>
            <div style={{ fontFamily:F.mono, fontSize:'0.72rem', color:C.textMuted }}>Chinese Yuan (CNY)</div>
          </div>
        </div>
      )}

      <AffiliateCTA
        heading="Get the Best Rate Sending Money to China"
        text="Banks add a 3–5% markup on the real exchange rate. Wise and Remitly use the mid-market rate with transparent low fees — often saving $30–$150 per transfer compared to your bank."
        links={[
          { label:'Send with Wise',   url:'https://wise.com' },        // ← replace with affiliate link
          { label:'Try Remitly',      url:'https://www.remitly.com' }, // ← replace with affiliate link
          { label:'Western Union',    url:'https://westernunion.com' },
        ]}
      />
    </div>
  )
}

// 2 — Cost of Living Comparison
function CostOfLivingCalc({ rate }) {
  const [budget, setBudget] = useState(1000)
  const r = rate || 7.2450

  const items = [
    { label:'Local Restaurant Meal',     china:3.50,  usa:16.00, icon:'🍜' },
    { label:'Coffee (Starbucks)',         china:5.00,  usa:6.50,  icon:'☕' },
    { label:'Can of Coke',               china:0.45,  usa:1.50,  icon:'🥤' },
    { label:'Beer at Bar',               china:1.20,  usa:7.00,  icon:'🍺' },
    { label:'5km DiDi / Taxi Ride',      china:4.50,  usa:18.00, icon:'🚖' },
    { label:'Budget Hotel (per night)',  china:30.00, usa:120.00,icon:'🏨' },
    { label:'Monthly Gym Membership',   china:35.00, usa:55.00, icon:'💪' },
    { label:'1 Gallon of Milk',          china:3.80,  usa:4.50,  icon:'🥛' },
    { label:'Monthly Groceries (1p)',    china:160,   usa:420,   icon:'🛒' },
  ]

  return (
    <div>
      <SliderRow label="Your USD Budget" value={budget} min={100} max={10000} step={100}
        display={`$${budget.toLocaleString()}`} onChange={setBudget} />

      <div style={{ marginBottom:16, textAlign:'center' }}>
        <Label color={C.textDim}>¥{addCommas(budget*r)} CNY — here's what it buys in China vs USA</Label>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
        {items.map(item => {
          const qChina = Math.floor(budget/item.china)
          const qUSA   = Math.floor(budget/item.usa)
          return (
            <div key={item.label} style={{
              background:C.cardDeep, border:`1px solid ${C.border}`, borderRadius:10,
              padding:'13px 18px',
              display:'grid', gridTemplateColumns:'auto 1fr 90px 90px',
              gap:12, alignItems:'center',
            }}>
              <span style={{ fontSize:'1.35rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily:F.body, fontSize:'1rem', color:C.text }}>{item.label}</div>
                <div style={{ fontFamily:F.mono, fontSize:'0.7rem', color:C.textMuted, marginTop:1 }}>
                  China ${item.china} · USA ${item.usa}
                </div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:F.mono, fontSize:'1.2rem', color:C.gold, fontWeight:600 }}>{addCommas(qChina)}×</div>
                <Label color={C.textMuted}>China</Label>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:F.mono, fontSize:'1.2rem', color:C.blue }}>{addCommas(qUSA)}×</div>
                <Label color={C.textMuted}>USA</Label>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop:18, background:C.cardDeep, border:`1px solid ${C.goldDim}`, borderRadius:10, padding:'16px 20px', textAlign:'center' }}>
        <Label color={C.gold}>Bottom Line</Label>
        <p style={{ marginTop:8, color:C.textDim, fontSize:'1rem', lineHeight:1.65 }}>
          Your ${budget.toLocaleString()} USD budget goes roughly <strong style={{color:C.gold}}>3–5× further</strong> in China for daily expenses.
          The biggest savings are in local dining, transport, and accommodation.
        </p>
      </div>
    </div>
  )
}

// 3 — Travel Budget Estimator
function TravelBudgetCalc({ rate }) {
  const [days, setDays]     = useState(14)
  const [style, setStyle]   = useState('mid')
  const [city, setCity]     = useState('beijing')
  const r = rate || 7.2450

  const BUDGETS = {
    budget: { hotel:25,  food:12, transport:8,  activities:10, misc:5,  label:'Budget Backpacker' },
    mid:    { hotel:70,  food:30, transport:15, activities:25, misc:15, label:'Mid-Range Traveler' },
    luxury: { hotel:200, food:80, transport:40, activities:60, misc:40, label:'Luxury Traveler' },
  }
  const CITY_MULT = {
    beijing:  { label:'Beijing',   mult:1.00 },
    shanghai: { label:'Shanghai',  mult:1.15 },
    chengdu:  { label:'Chengdu',   mult:0.85 },
    guangzhou:{ label:'Guangzhou', mult:0.95 },
    xian:     { label:"Xi'an",     mult:0.80 },
    shenzhen: { label:'Shenzhen',  mult:1.05 },
  }

  const b    = BUDGETS[style]
  const mult = CITY_MULT[city].mult
  const daily = (b.hotel+b.food+b.transport+b.activities+b.misc)*mult
  const total = daily*days

  const cats = [
    { label:'Accommodation', usd:b.hotel*mult,      color:C.gold },
    { label:'Food & Dining',  usd:b.food*mult,       color:C.blue },
    { label:'Transport',      usd:b.transport*mult,  color:C.success },
    { label:'Activities',     usd:b.activities*mult, color:C.warning },
    { label:'Misc',           usd:b.misc*mult,       color:'#9b7fd4' },
  ]

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <SelectRow label="Travel Style" value={style}
          options={Object.entries(BUDGETS).map(([k,v])=>({value:k,label:v.label}))} onChange={setStyle} />
        <SelectRow label="Primary City" value={city}
          options={Object.entries(CITY_MULT).map(([k,v])=>({value:k,label:v.label}))} onChange={setCity} />
      </div>
      <SliderRow label="Trip Length" value={days} min={3} max={60} step={1}
        display={`${days} days`} onChange={setDays} />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:26 }}>
        <BigStat label="Daily Budget" value={`$${daily.toFixed(0)}`} accent />
        <BigStat label={`${days}-Day Total`} value={`$${addCommas(total)}`} />
        <BigStat label="Total in CNY" value={`¥${fmtK(total*r)}`} />
      </div>

      <div style={{ marginBottom:8 }}><Label>Daily Breakdown</Label></div>
      {cats.map(cat => (
        <div key={cat.label} style={{ marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
            <span style={{ fontFamily:F.body, fontSize:'0.96rem', color:C.textDim }}>{cat.label}</span>
            <Mono size="0.84rem" color={cat.color}>${cat.usd.toFixed(0)}/day</Mono>
          </div>
          <div style={{ height:5, background:C.border, borderRadius:3, overflow:'hidden' }}>
            <div style={{ width:`${(cat.usd/daily)*100}%`, height:'100%', background:cat.color, borderRadius:3, transition:'width 0.4s ease' }} />
          </div>
        </div>
      ))}

      <AffiliateCTA
        heading="Get CNY Cash at the Best Rate"
        text="Avoid airport exchange desks (up to 7% markup). Withdraw Yuan from a Chinese ATM using a Wise or Schwab debit card — you'll get the interbank rate with little to no fees."
        links={[
          { label:'Get Wise Card', url:'https://wise.com' },
          { label:'Remitly', url:'https://remitly.com' },
        ]}
      />
    </div>
  )
}

// 4 — Send Money Comparison
function SendMoneyComp({ rate }) {
  const [amount, setAmount] = useState(500)
  const r = rate || 7.2450

  const services = [
    { name:'Wise',         fee:amount<1000?4.50+amount*0.0043:amount*0.007, markup:0.000, time:'1–2 days',    url:'https://wise.com',            best:true },
    { name:'Remitly',      fee:amount<=500?3.99:0,                           markup:0.005, time:'Minutes–3d',  url:'https://remitly.com',          best:false },
    { name:'Western Union',fee:amount*0.012+5,                               markup:0.015, time:'Minutes–5d',  url:'https://westernunion.com',     best:false },
    { name:'Bank Wire',    fee:35,                                            markup:0.035, time:'3–5 days',    url:'#',                            best:false },
  ]

  const received = svc => Math.max(0,(amount-svc.fee)*r*(1-svc.markup))
  const best = Math.max(...services.map(received))

  return (
    <div>
      <SliderRow label="Amount to Send (USD)" value={amount} min={50} max={5000} step={50}
        display={`$${amount.toLocaleString()}`} onChange={setAmount} />

      <div style={{ marginBottom:12 }}><Label>Recipient Gets (CNY) — Side by Side</Label></div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {services.map(svc => {
          const rcv     = received(svc)
          const isBest  = Math.abs(rcv-best)<1
          const loss    = best-rcv
          return (
            <div key={svc.name} style={{
              background:C.cardDeep, border:`1px solid ${isBest?C.gold:C.border}`,
              borderRadius:10, padding:'14px 18px',
              display:'flex', alignItems:'center', gap:14, flexWrap:'wrap',
              transition:'border-color 0.2s',
            }}>
              <div style={{ minWidth:110 }}>
                <div style={{ fontFamily:F.display, fontSize:'0.95rem', color:C.text, letterSpacing:'0.04em' }}>
                  {svc.name}
                  {isBest && <span style={{ marginLeft:8, fontFamily:F.mono, fontSize:'0.62rem', background:C.gold, color:'#080c14', padding:'2px 7px', borderRadius:4, fontWeight:700 }}>BEST</span>}
                </div>
                <div style={{ fontFamily:F.mono, fontSize:'0.68rem', color:C.textMuted, marginTop:2 }}>{svc.time}</div>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:F.mono, fontSize:'0.72rem', color:C.textMuted, marginBottom:5 }}>
                  Fee: ${svc.fee.toFixed(2)} · Markup: {(svc.markup*100).toFixed(1)}%
                </div>
                <div style={{ height:5, background:C.border, borderRadius:3, overflow:'hidden' }}>
                  <div style={{ width:`${(rcv/best)*100}%`, height:'100%', background:isBest?C.gold:C.blue, borderRadius:3, transition:'width 0.4s ease' }} />
                </div>
              </div>
              <div style={{ textAlign:'right', minWidth:110 }}>
                <div style={{ fontFamily:F.mono, fontSize:'1.25rem', color:isBest?C.gold:C.text, fontWeight:isBest?600:400 }}>
                  ¥{addCommas(rcv)}
                </div>
                {!isBest && loss>1 && (
                  <div style={{ fontFamily:F.mono, fontSize:'0.7rem', color:C.danger }}>−¥{addCommas(loss)} vs Wise</div>
                )}
              </div>
              {svc.url!=='#' && (
                <a href={svc.url} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:F.mono, fontSize:'0.7rem',
                  color:isBest?C.gold:C.textDim,
                  border:`1px solid ${isBest?C.gold:C.border}`,
                  padding:'5px 12px', borderRadius:5,
                  letterSpacing:'0.06em', textTransform:'uppercase', whiteSpace:'nowrap',
                }}>Send →</a>
              )}
            </div>
          )
        })}
      </div>
      <p style={{ marginTop:12, fontFamily:F.mono, fontSize:'0.7rem', color:C.textMuted }}>
        * Estimates based on standard consumer rates. Actual fees vary by payment method, promotion, and account history.
      </p>
    </div>
  )
}

// 5 — Historical Rate Lookup
function HistoricalRateCalc({ currentRate }) {
  const [year, setYear]       = useState(2020)
  const [histRate, setHistRate] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [amount, setAmount]     = useState(1000)

  const FALLBACKS = { 2015:6.49,2016:6.94,2017:6.51,2018:6.37,2019:6.88,2020:6.98,2021:6.47,2022:6.37,2023:6.72,2024:7.10 }

  const fetchHistorical = async (yr) => {
    setLoading(true); setHistRate(null)
    try {
      const res = await fetch(`https://api.frankfurter.app/${yr}-01-02?from=USD&to=CNY`)
      const d   = await res.json()
      setHistRate(d.rates.CNY)
    } catch { setHistRate(FALLBACKS[yr]||7.0) }
    setLoading(false)
  }

  useEffect(() => { fetchHistorical(year) }, [year])

  const curr      = currentRate || 7.2450
  const diff      = histRate ? ((curr-histRate)/histRate*100).toFixed(2) : null
  const currRcv   = amount * curr
  const histRcv   = histRate ? amount * histRate : null

  return (
    <div>
      <SelectRow label="Compare With Year" value={year}
        options={[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024].map(y=>({value:y,label:`January ${y}`}))}
        onChange={v=>setYear(Number(v))} />
      <SliderRow label="USD Amount" value={amount} min={100} max={10000} step={100}
        display={`$${amount.toLocaleString()}`} onChange={setAmount} />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:24 }}>
        <BigStat label={`Rate Jan ${year}`} value={loading?'…':histRate?fmtRate(histRate):'—'} />
        <BigStat label="Rate Today" value={fmtRate(curr)} accent />
        <BigStat label="Change" value={diff?`${Number(diff)>0?'+':''}${diff}%`:'—'} />
      </div>

      {histRate && !loading && (
        <div style={{ background:C.cardDeep, border:`1px solid ${C.border}`, borderRadius:10, padding:'20px 24px' }}>
          <div style={{ marginBottom:14 }}><Label>If You Had Converted ${amount.toLocaleString()} USD</Label></div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            <div>
              <Label color={C.textMuted}>January {year}</Label>
              <div style={{ fontFamily:F.mono, fontSize:'1.5rem', color:C.textDim, marginTop:5 }}>
                ¥{addCommas(histRcv)}
              </div>
            </div>
            <div>
              <Label color={C.gold}>Today</Label>
              <div style={{ fontFamily:F.mono, fontSize:'1.5rem', color:C.gold, marginTop:5 }}>
                ¥{addCommas(currRcv)}
              </div>
              <div style={{ fontFamily:F.mono, fontSize:'0.78rem', marginTop:4,
                color:currRcv>histRcv?C.success:C.danger }}>
                {currRcv>histRcv?'+':''}¥{addCommas(Math.abs(currRcv-histRcv))} {currRcv>histRcv?'more than':'less than'} {year}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 6 — Salary Converter
function SalaryConverter({ rate }) {
  const [usdSalary, setUsdSalary] = useState(60000)
  const [cnyInput,  setCnyInput]  = useState('')
  const [mode,      setMode]      = useState('usd') // 'usd' or 'cny'
  const r = rate || 7.2450

  const cnyEquiv  = usdSalary * r
  const usdEquiv  = cnyInput ? cnyInput / r : 0

  const CITIES = [
    { city:'Beijing',   avgCNY:25000, label:'Beijing' },
    { city:'Shanghai',  avgCNY:28000, label:'Shanghai' },
    { city:'Shenzhen',  avgCNY:24000, label:'Shenzhen' },
    { city:'Chengdu',   avgCNY:14000, label:'Chengdu' },
    { city:'Tier 3 City', avgCNY:8000, label:'Tier 3 City' },
  ]

  const activeSalaryUSD = mode==='usd' ? usdSalary : usdEquiv
  const activeSalaryCNY = mode==='usd' ? cnyEquiv : (cnyInput||0)

  return (
    <div>
      <div style={{ display:'flex', gap:8, marginBottom:24 }}>
        {[['usd','Enter USD Salary'],['cny','Enter CNY Salary']].map(([m,l])=>(
          <button key={m} onClick={()=>setMode(m)} style={{
            flex:1, padding:'10px', borderRadius:8,
            background:mode===m?C.gold:'transparent',
            color:mode===m?'#080c14':C.textDim,
            border:`1px solid ${mode===m?C.gold:C.border}`,
            fontFamily:F.mono, fontSize:'0.74rem', letterSpacing:'0.08em', textTransform:'uppercase',
            transition:'all 0.15s',
          }}>{l}</button>
        ))}
      </div>

      {mode==='usd' ? (
        <div style={{ marginBottom:24 }}>
          <SliderRow label="Annual USD Salary" value={usdSalary} min={20000} max={300000} step={1000}
            display={`$${usdSalary.toLocaleString()}`} onChange={setUsdSalary} />
        </div>
      ) : (
        <div style={{ marginBottom:24 }}>
          <div style={{ marginBottom:9 }}><Label>Annual CNY Salary</Label></div>
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute',left:13,top:'50%',transform:'translateY(-50%)',fontFamily:F.mono,color:C.textDim }}>¥</span>
            <input type="number" value={cnyInput} onChange={e=>setCnyInput(e.target.value)} style={{paddingLeft:27}} placeholder="e.g. 180000" />
          </div>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:28 }}>
        <BigStat label="USD / Year"    value={`$${addCommas(activeSalaryUSD)}`} accent />
        <BigStat label="CNY / Year"    value={`¥${addCommas(activeSalaryCNY)}`} />
        <BigStat label="USD / Month"   value={`$${addCommas(activeSalaryUSD/12)}`} />
        <BigStat label="CNY / Month"   value={`¥${addCommas(activeSalaryCNY/12)}`} />
      </div>

      <div style={{ marginBottom:12 }}><Label>How Does It Compare to Local Salaries?</Label></div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {CITIES.map(c => {
          const ratio    = activeSalaryCNY / 12 / c.avgCNY
          const pct      = Math.min(ratio, 2.5)
          const aboveBelow = ratio >= 1
          return (
            <div key={c.city} style={{
              background:C.cardDeep, border:`1px solid ${C.border}`, borderRadius:9, padding:'12px 16px',
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontFamily:F.body, color:C.text, fontSize:'0.98rem' }}>{c.label}</span>
                <Mono size="0.82rem" color={aboveBelow?C.success:C.warning}>
                  {ratio>=1?`${ratio.toFixed(1)}× avg`:`${(ratio*100).toFixed(0)}% of avg`}
                </Mono>
              </div>
              <div style={{ height:5, background:C.border, borderRadius:3, overflow:'hidden' }}>
                <div style={{
                  width:`${Math.min(pct/2.5*100,100)}%`, height:'100%',
                  background:aboveBelow?C.success:C.warning, borderRadius:3, transition:'width 0.4s ease',
                }} />
              </div>
              <div style={{ marginTop:4, fontFamily:F.mono, fontSize:'0.68rem', color:C.textMuted }}>
                Avg local salary: ¥{addCommas(c.avgCNY)}/mo (≈${addCommas(c.avgCNY/r)}/mo)
              </div>
            </div>
          )
        })}
      </div>

      <AffiliateCTA
        heading="Working or Living in China? Get Paid in USD, Spend in CNY"
        text="Wise lets expats and remote workers receive USD salary and convert to CNY at the mid-market rate — saving hundreds compared to bank wire transfers."
        links={[
          { label:'Open Wise Account', url:'https://wise.com' },
          { label:'Try Remitly', url:'https://remitly.com' },
        ]}
      />
    </div>
  )
}

// 7 — Import Cost Calculator
function ImportCostCalc({ rate }) {
  const [orderUSD,    setOrderUSD]    = useState(5000)
  const [units,       setUnits]       = useState(500)
  const [shippingUSD, setShippingUSD] = useState(400)
  const [dutyPct,     setDutyPct]     = useState(7)
  const r = rate || 7.2450

  const subtotal    = orderUSD
  const duty        = (orderUSD * dutyPct) / 100
  const totalUSD    = subtotal + shippingUSD + duty
  const totalCNY    = totalUSD * r
  const perUnitUSD  = totalUSD / units
  const perUnitCNY  = perUnitUSD * r

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div>
          <SliderRow label="Order Value (USD)" value={orderUSD} min={500} max={100000} step={500}
            display={`$${orderUSD.toLocaleString()}`} onChange={setOrderUSD} />
        </div>
        <div>
          <SliderRow label="Number of Units" value={units} min={1} max={10000} step={1}
            display={units.toLocaleString()} onChange={setUnits} />
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div>
          <SliderRow label="Shipping Cost (USD)" value={shippingUSD} min={0} max={10000} step={50}
            display={`$${shippingUSD.toLocaleString()}`} onChange={setShippingUSD} />
        </div>
        <div>
          <SliderRow label="Import Duty %" value={dutyPct} min={0} max={25} step={0.5}
            display={`${dutyPct}%`} onChange={setDutyPct} />
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        <BigStat label="Total Cost USD" value={`$${addCommas(totalUSD)}`} accent />
        <BigStat label="Total Cost CNY" value={`¥${addCommas(totalCNY)}`} />
        <BigStat label="Cost Per Unit"  value={`$${perUnitUSD.toFixed(2)}`} />
      </div>

      <div style={{ background:C.cardDeep, border:`1px solid ${C.border}`, borderRadius:10, padding:'20px 22px', marginBottom:18 }}>
        <div style={{ marginBottom:14 }}><Label>Cost Breakdown</Label></div>
        {[
          { label:'Product Cost',  usd:orderUSD,    pct:(orderUSD/totalUSD*100).toFixed(1),    color:C.gold },
          { label:'Shipping',      usd:shippingUSD, pct:(shippingUSD/totalUSD*100).toFixed(1), color:C.blue },
          { label:'Import Duty',   usd:duty,        pct:(duty/totalUSD*100).toFixed(1),        color:C.warning },
        ].map(row => (
          <div key={row.label} style={{ marginBottom:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
              <span style={{ fontFamily:F.body, color:C.textDim, fontSize:'0.96rem' }}>{row.label}</span>
              <div style={{ textAlign:'right' }}>
                <Mono size="0.82rem" color={row.color}>${addCommas(row.usd)} · {row.pct}%</Mono>
              </div>
            </div>
            <div style={{ height:5, background:C.border, borderRadius:3, overflow:'hidden' }}>
              <div style={{ width:`${row.pct}%`, height:'100%', background:row.color, borderRadius:3, transition:'width 0.4s ease' }} />
            </div>
          </div>
        ))}
        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:14, marginTop:6,
          display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:F.display, fontSize:'0.9rem', color:C.text, letterSpacing:'0.04em' }}>Per Unit (CNY)</span>
          <Mono size="1.1rem" color={C.gold} weight={600}>¥{perUnitCNY.toFixed(2)}</Mono>
        </div>
      </div>

      <AffiliateCTA
        heading="Paying Chinese Suppliers? Save on Each Transfer"
        text="Stop losing 3–5% on every supplier payment to bank wire fees. Wise Business lets you pay Chinese factories in CNY at the mid-market rate with transparent low fees."
        links={[
          { label:'Wise Business', url:'https://wise.com' },
          { label:'Western Union Business', url:'https://westernunion.com' },
        ]}
      />
    </div>
  )
}

// 8 — How Much to Bring Calculator
function HowMuchToBring({ rate }) {
  const [days,    setDays]    = useState(14)
  const [style,   setStyle]   = useState('mid')
  const [city,    setCity]    = useState('beijing')
  const r = rate || 7.2450

  const STYLES = {
    budget: { daily:70,  label:'Budget',    cardPct:0.60 },
    mid:    { daily:120, label:'Mid-Range', cardPct:0.75 },
    luxury: { daily:300, label:'Luxury',    cardPct:0.85 },
  }
  const CITY_MULT = {
    beijing:  1.00, shanghai:1.15, chengdu:0.85,
    guangzhou:0.95, xian:0.80, shenzhen:1.05,
  }

  const s         = STYLES[style]
  const mult      = CITY_MULT[city]
  const dailyUSD  = s.daily * mult
  const totalUSD  = dailyUSD * days
  const cardUSD   = totalUSD * s.cardPct
  const cashUSD   = totalUSD * (1 - s.cardPct)
  const cashCNY   = cashUSD * r
  const buffer    = totalUSD * 0.12
  const grandTotal = totalUSD + buffer

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <SelectRow label="Travel Style" value={style}
          options={Object.entries(STYLES).map(([k,v])=>({value:k,label:v.label}))} onChange={setStyle} />
        <SelectRow label="Primary City" value={city}
          options={[
            {value:'beijing',label:'Beijing'},{value:'shanghai',label:'Shanghai'},
            {value:'chengdu',label:'Chengdu'},{value:'guangzhou',label:'Guangzhou'},
            {value:'xian',label:"Xi'an"},{value:'shenzhen',label:'Shenzhen'},
          ]} onChange={setCity} />
      </div>
      <SliderRow label="Trip Length" value={days} min={3} max={60} step={1}
        display={`${days} days`} onChange={setDays} />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:26 }}>
        <BigStat label="Daily Budget"   value={`$${dailyUSD.toFixed(0)}`} />
        <BigStat label="Trip Total"     value={`$${addCommas(totalUSD)}`} accent />
        <BigStat label="+12% Buffer"    value={`$${addCommas(grandTotal)}`} />
      </div>

      <div style={{ background:C.cardDeep, border:`1px solid ${C.goldDim}`, borderRadius:10, padding:'22px', marginBottom:18 }}>
        <div style={{ marginBottom:16 }}><Label color={C.gold}>Recommended Money Split</Label></div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:9, padding:'16px' }}>
            <div style={{ marginBottom:6 }}><Label color={C.blue}>📱 Card / App Payments</Label></div>
            <div style={{ fontFamily:F.mono, fontSize:'1.6rem', color:C.blue, fontWeight:600 }}>${addCommas(cardUSD)}</div>
            <p style={{ color:C.textMuted, fontSize:'0.82rem', marginTop:6, lineHeight:1.5 }}>
              WeChat Pay + no-FTF credit card for hotels, restaurants, transport
            </p>
          </div>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:9, padding:'16px' }}>
            <div style={{ marginBottom:6 }}><Label color={C.gold}>💴 CNY Cash</Label></div>
            <div style={{ fontFamily:F.mono, fontSize:'1.6rem', color:C.gold, fontWeight:600 }}>¥{addCommas(cashCNY)}</div>
            <div style={{ fontFamily:F.mono, fontSize:'0.78rem', color:C.textMuted, marginTop:2 }}>(≈${addCommas(cashUSD)} USD)</div>
            <p style={{ color:C.textMuted, fontSize:'0.82rem', marginTop:6, lineHeight:1.5 }}>
              Markets, small vendors, rural areas, backup cash
            </p>
          </div>
        </div>

        <div style={{ marginTop:16, padding:'12px 16px', background:'rgba(212,168,83,0.05)', border:`1px solid ${C.goldDim}`, borderRadius:8 }}>
          <Label color={C.gold}>Tip</Label>
          <p style={{ color:C.textDim, fontSize:'0.9rem', marginTop:4, lineHeight:1.6 }}>
            Withdraw CNY cash in China from a Bank of China ATM using a Schwab debit card — zero fees, best rate. Don't exchange at US banks or airport kiosks.
          </p>
        </div>
      </div>

      <AffiliateCTA
        heading="Get Your CNY at the Best Rate"
        text="Withdraw Yuan fee-free from Chinese ATMs with a Schwab card, or send money ahead to a Chinese account via Wise before you leave."
        links={[
          { label:'Send via Wise',   url:'https://wise.com' },
          { label:'Try Remitly',     url:'https://remitly.com' },
        ]}
      />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGES
══════════════════════════════════════════════════════════════════════════ */

// HOME
function HomePage({ setPage, rate, loading, updatedAt }) {
  const [usdInput, setUsdInput] = useState(100)
  const r       = rate || 7.2450
  const cnyOut  = (usdInput * r).toFixed(2)

  return (
    <main>
      {/* ── Hero ── */}
      <section style={{
        background:`
          radial-gradient(ellipse at 50% -10%, rgba(91,168,196,0.09) 0%, transparent 65%),
          radial-gradient(ellipse at 85% 60%, rgba(212,168,83,0.06) 0%, transparent 55%),
          #080c14`,
        padding:'88px 24px 80px',
        textAlign:'center', position:'relative', overflow:'hidden',
      }}>
        {/* Subtle grid */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none', opacity:0.18,
          backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`,
          backgroundSize:'72px 72px',
        }} />

        <div style={{ position:'relative', maxWidth:780, margin:'0 auto' }}>
          {/* Live pill */}
          <div className="fade-up" style={{
            display:'inline-flex', alignItems:'center', gap:8, marginBottom:26,
            background:'rgba(212,168,83,0.07)', border:`1px solid ${C.goldDim}`,
            borderRadius:20, padding:'5px 18px',
          }}>
            <span className="live-pulse" style={{ width:6,height:6,background:loading?C.textMuted:C.success,borderRadius:'50%',display:'inline-block' }} />
            <Label color={C.gold}>{loading?'Loading…':`1 USD = ${fmtRate(r)} CNY · Live`}</Label>
          </div>

          <h1 className="fade-up-d1" style={{
            fontFamily:F.display, fontWeight:700, color:C.text,
            fontSize:'clamp(2.1rem,6.5vw,4rem)', letterSpacing:'0.07em', lineHeight:1.08, marginBottom:18,
          }}>
            USD TO<br /><span style={{ color:C.gold }}>CHINESE YUAN</span>
          </h1>

          <p className="fade-up-d2" style={{
            fontFamily:F.body, color:C.textDim, marginBottom:52,
            fontSize:'clamp(1.05rem,2.5vw,1.3rem)', lineHeight:1.65,
          }}>
            Live exchange rate · Currency calculators · Money transfer guides
          </p>

          {/* Hero converter card */}
          <div className="fade-up-d3 hero-glow" style={{
            background:C.card, border:`1px solid ${C.border}`,
            borderRadius:16, padding:'32px', maxWidth:560, margin:'0 auto',
          }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'end', gap:14, marginBottom:20 }}>
              <div>
                <div style={{ marginBottom:8,display:'flex',alignItems:'center',gap:6 }}>
                  <span>🇺🇸</span><Label>USD</Label>
                </div>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',fontFamily:F.mono,color:C.textDim }}>$</span>
                  <input type="number" value={usdInput} onChange={e=>setUsdInput(e.target.value)} style={{paddingLeft:26}} />
                </div>
              </div>
              <div style={{ color:C.gold, fontSize:'1.5rem', paddingBottom:5 }}>→</div>
              <div>
                <div style={{ marginBottom:8,display:'flex',alignItems:'center',gap:6 }}>
                  <span>🇨🇳</span><Label>CNY</Label>
                </div>
                <div style={{ background:C.cardDeep, border:`1px solid ${C.goldDim}`, borderRadius:8, padding:'12px 16px',
                  fontFamily:F.mono, fontSize:'1.1rem', color:C.gold, fontWeight:600 }}>
                  ¥{Number(cnyOut).toLocaleString('en-US',{minimumFractionDigits:2})}
                </div>
              </div>
            </div>
            <button onClick={() => setPage('tools')} style={{
              width:'100%', background:`linear-gradient(135deg,${C.gold},${C.goldDim})`,
              color:'#080c14', fontFamily:F.mono, fontSize:'0.84rem', fontWeight:700,
              letterSpacing:'0.1em', textTransform:'uppercase', padding:'13px',
              borderRadius:8, transition:'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.opacity='0.88';e.currentTarget.style.transform='translateY(-1px)'}}
            onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='translateY(0)'}}>
              Full Calculator Suite →
            </button>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section style={{ maxWidth:1100, margin:'60px auto 0', padding:'0 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:18 }}>
          {[
            { icon:'📊', title:'5 Currency Calculators', desc:'Live converter, cost of living, travel budget, send money comparison, and historical rate lookup.', cta:'Open Tools', target:'tools', color:C.gold },
            { icon:'✈️', title:'Travel Money Guides', desc:'How to avoid fees, best cards for China, visa updates, and full cost-of-living breakdowns.', cta:'Read Guides', target:'guides', color:C.blue },
            { icon:'💸', title:'Best Transfer Services', desc:'Side-by-side comparison of Wise, Remitly, Western Union, and banks — instantly updated to today\'s rate.', cta:'Compare Now', target:'tools', color:C.success },
          ].map((f,i) => {
            const [hov, setHov] = useState(false)
            return (
              <div key={i} onClick={()=>setPage(f.target)}
                onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{
                  background:hov?'#111929':C.card, border:`1px solid ${hov?f.color:C.border}`,
                  borderRadius:12, padding:'28px 24px', cursor:'pointer',
                  transform:hov?'translateY(-3px)':'translateY(0)', transition:'all 0.2s',
                }}>
                <div style={{ fontSize:'2rem', marginBottom:14 }}>{f.icon}</div>
                <div style={{ fontFamily:F.display, fontSize:'1rem', color:C.text, letterSpacing:'0.06em', marginBottom:10 }}>{f.title}</div>
                <p style={{ color:C.textDim, fontSize:'0.92rem', lineHeight:1.65, marginBottom:16 }}>{f.desc}</p>
                <div style={{ fontFamily:F.mono, fontSize:'0.72rem', color:f.color, letterSpacing:'0.08em' }}>{f.cta} →</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Latest Guides ── */}
      <section style={{ maxWidth:1100, margin:'72px auto 0', padding:'0 24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div>
            <div style={{ marginBottom:6 }}><Label color={C.textMuted}>Resource Library</Label></div>
            <h2 style={{ fontFamily:F.display, fontSize:'1.6rem', color:C.text, letterSpacing:'0.06em' }}>Currency & Travel Guides</h2>
          </div>
          <button onClick={()=>setPage('guides')} style={{ background:'none',fontFamily:F.mono,fontSize:'0.76rem',color:C.gold,letterSpacing:'0.08em',textTransform:'uppercase' }}>
            View All →
          </button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:18 }}>
          {ARTICLES.slice(0,3).map(a=><ArticleCard key={a.id} article={a} setPage={setPage}/>)}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth:780, margin:'72px auto 0', padding:'0 24px' }}>
        <div style={{ marginBottom:30 }}>
          <div style={{ marginBottom:6 }}><Label color={C.textMuted}>Common Questions</Label></div>
          <h2 style={{ fontFamily:F.display, fontSize:'1.55rem', color:C.text, letterSpacing:'0.06em' }}>USD to CNY — FAQ</h2>
        </div>
        {[
          { q:'What is the current USD to CNY exchange rate?', a:`The current mid-market rate is approximately ${fmtRate(r)} Chinese Yuan per 1 US Dollar. The rate updates daily based on market conditions and PBOC (People\'s Bank of China) daily fixings. Use our live converter above for real-time rates.` },
          { q:'Is it better to exchange money before or after arriving in China?', a:"For large amounts, transfer to a Chinese bank account via Wise before you go. For daily spending cash, withdraw CNY from a Chinese ATM (Bank of China, ICBC) with a no-fee card like Schwab upon arrival. Never exchange at the airport — markups of 8–12% are standard." },
          { q:'What is the difference between CNY and RMB?', a:"CNY and RMB refer to the same currency. RMB (Renminbi) is the official name — it means 'the people's currency.' CNY is the international currency code used in banking and trading contexts. You'll also see the symbol ¥ or 元 (yuán). All three mean the same thing." },
          { q:'How often does the USD/CNY rate change?', a:"The rate changes daily. The People's Bank of China (PBOC) sets a 'daily fixing' each morning, and the market rate is allowed to move 2% around it. It's a managed float — more stable than free-floating currencies but still moves meaningfully over weeks and months." },
          { q:'What is the best way to send money from the USA to China?', a:"Wise is consistently the best option for most people — it uses the mid-market rate with transparent, low fees. Remitly is excellent for speed. Your US bank is almost always the worst option, adding 3–5% in hidden exchange rate markup plus $25–$50 in wire fees." },
        ].map((item,i) => <FAQItem key={i} q={item.q} a={item.a} />)}
      </section>
    </main>
  )
}

// TOOLS
function ToolsPage({ rate, loading, updatedAt }) {
  const [tab, setTab] = useState('converter')
  const tabs = [
    { id:'converter',  label:'Live Converter' },
    { id:'costliving', label:'Cost of Living' },
    { id:'travel',     label:'Travel Budget' },
    { id:'howmuch',    label:'How Much to Bring' },
    { id:'sendmoney',  label:'Send Money' },
    { id:'salary',     label:'Salary Converter' },
    { id:'import',     label:'Import Costs' },
    { id:'historical', label:'Historical Rates' },
  ]

  return (
    <main style={{ maxWidth:900, margin:'0 auto', padding:'52px 24px' }}>
      <div style={{ marginBottom:36 }}>
        <div style={{ marginBottom:8 }}><Label color={C.textMuted}>Currency Tools</Label></div>
        <h1 style={{ fontFamily:F.display, fontSize:'2rem', color:C.text, letterSpacing:'0.08em', marginBottom:8 }}>
          USD ⇄ CNY Calculators
        </h1>
        <p style={{ color:C.textDim, fontSize:'1.05rem' }}>Eight free tools for every USD to Chinese Yuan calculation you'll need.</p>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, flexWrap:'wrap', borderBottom:`1px solid ${C.border}`, marginBottom:36 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            background:'none', color:tab===t.id?C.gold:C.textDim,
            fontFamily:F.mono, fontSize:'0.73rem', letterSpacing:'0.1em', textTransform:'uppercase',
            padding:'10px 16px', whiteSpace:'nowrap',
            borderBottom:`2px solid ${tab===t.id?C.gold:'transparent'}`,
            transition:'color 0.2s, border-color 0.2s',
          }}>{t.label}</button>
        ))}
      </div>

      <Card>
        {tab==='converter'  && <LiveConverter      rate={rate} loading={loading} updatedAt={updatedAt} />}
        {tab==='costliving' && <CostOfLivingCalc   rate={rate} />}
        {tab==='travel'     && <TravelBudgetCalc   rate={rate} />}
        {tab==='howmuch'    && <HowMuchToBring     rate={rate} />}
        {tab==='sendmoney'  && <SendMoneyComp      rate={rate} />}
        {tab==='salary'     && <SalaryConverter    rate={rate} />}
        {tab==='import'     && <ImportCostCalc     rate={rate} />}
        {tab==='historical' && <HistoricalRateCalc currentRate={rate} />}
      </Card>
    </main>
  )
}

// GUIDES
function GuidesPage({ setPage }) {
  return (
    <main style={{ maxWidth:1100, margin:'0 auto', padding:'52px 24px' }}>
      <div style={{ marginBottom:40 }}>
        <div style={{ marginBottom:8 }}><Label color={C.textMuted}>Resource Library</Label></div>
        <h1 style={{ fontFamily:F.display, fontSize:'2rem', color:C.text, letterSpacing:'0.08em', marginBottom:8 }}>
          USD to CNY Guides
        </h1>
        <p style={{ color:C.textDim, fontSize:'1.05rem' }}>
          In-depth answers to the most-asked questions about converting US dollars to Chinese Yuan.
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:18 }}>
        {ARTICLES.map(a=><ArticleCard key={a.id} article={a} setPage={setPage}/>)}
      </div>
    </main>
  )
}

// ARTICLE
function ArticlePage({ articleId, setPage, rate }) {
  const meta    = ARTICLES.find(a=>a.id===articleId)
  const content = ARTICLE_CONTENT[articleId]
  const r       = rate || 7.2450

  if (!meta||!content) return (
    <main style={{ maxWidth:800,margin:'80px auto',padding:'0 24px',textAlign:'center' }}>
      <p style={{color:C.textDim}}>Article not found.</p>
      <button onClick={()=>setPage('guides')} style={{background:'none',color:C.gold,fontFamily:F.mono,marginTop:14}}>← Back to Guides</button>
    </main>
  )

  return (
    <main style={{ maxWidth:760, margin:'0 auto', padding:'48px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom:26, display:'flex', gap:8, alignItems:'center' }}>
        <button onClick={()=>setPage('guides')} style={{background:'none',color:C.textDim,fontFamily:F.mono,fontSize:'0.73rem',letterSpacing:'0.08em',textTransform:'uppercase'}}>Guides</button>
        <span style={{color:C.textMuted}}>›</span>
        <span style={{fontFamily:F.mono,fontSize:'0.73rem',color:C.textMuted,letterSpacing:'0.06em',textTransform:'uppercase'}}>{meta.category}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom:34 }}>
        <span style={{
          fontFamily:F.mono,fontSize:'0.66rem',color:meta.tagColor,
          background:`${meta.tagColor}18`,border:`1px solid ${meta.tagColor}40`,
          padding:'3px 10px',borderRadius:4,letterSpacing:'0.1em',textTransform:'uppercase',
          display:'inline-block',marginBottom:16,
        }}>{meta.tag}</span>
        <h1 style={{
          fontFamily:F.display,fontSize:'clamp(1.4rem,4vw,2.15rem)',color:C.text,
          letterSpacing:'0.04em',lineHeight:1.32,marginBottom:16,
        }}>{content.title}</h1>
        <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
          <Label color={C.textMuted}>{meta.readTime} read</Label>
          <span style={{width:4,height:4,background:C.textMuted,borderRadius:'50%',display:'inline-block'}} />
          <Label color={C.textMuted}>{meta.category}</Label>
        </div>
        <GoldDivider />
      </div>

      {/* Inline rate CTA */}
      <div style={{
        background:C.card, border:`1px solid ${C.goldDim}`, borderRadius:10,
        padding:'16px 20px', marginBottom:32,
        display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12,
      }}>
        <div>
          <Label color={C.gold}>Live Rate</Label>
          <div style={{fontFamily:F.mono,fontSize:'1.2rem',color:C.text,marginTop:2}}>
            1 USD = <span style={{color:C.gold}}>{fmtRate(r)}</span> CNY
          </div>
        </div>
        <button onClick={()=>setPage('tools')} style={{
          background:C.gold,color:'#080c14',fontFamily:F.mono,fontSize:'0.74rem',
          fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',padding:'9px 18px',borderRadius:6,
        }}>Convert USD →</button>
      </div>

      {/* Article body */}
      <div className="article-body" dangerouslySetInnerHTML={{__html:content.content}} />

      {/* FAQ */}
      {content.faq && (
        <div style={{ marginTop:40 }}>
          <div style={{ marginBottom:18 }}>
            <Label color={C.textMuted}>Frequently Asked</Label>
            <h2 style={{fontFamily:F.display,fontSize:'1.25rem',color:C.text,letterSpacing:'0.04em',marginTop:6}}>Common Questions</h2>
          </div>
          {content.faq.map((item,i)=><FAQItem key={i} q={item.q} a={item.a}/>)}
        </div>
      )}

      {/* More articles */}
      <div style={{ marginTop:50 }}>
        <div style={{ marginBottom:18 }}>
          <Label color={C.textMuted}>Keep Reading</Label>
          <h2 style={{fontFamily:F.display,fontSize:'1.2rem',color:C.text,letterSpacing:'0.04em',marginTop:6}}>More Currency Guides</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16 }}>
          {ARTICLES.filter(a=>a.id!==articleId).slice(0,2).map(a=><ArticleCard key={a.id} article={a} setPage={setPage}/>)}
        </div>
      </div>
    </main>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════════════════════════════════ */
const urlToPage = (pathname) => pathname.replace(/^\//, '') || 'home'
const pageToUrl = (page) => page === 'home' ? '/' : '/' + page
export default function App() {
  const [page, setPage]              = useState('home')
  const { rate, loading, updatedAt } = useLiveRate()
  const articleIds                   = ARTICLES.map(a=>a.id)
  const isArticle                    = articleIds.includes(page)

  const nav = (p) => { setPage(p); window.scrollTo({top:0,behavior:'smooth'}) }

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        <NavBar page={page} setPage={nav} />
        <div style={{ flex:1 }}>
          {page==='home'   && <HomePage   setPage={nav} rate={rate} loading={loading} updatedAt={updatedAt} />}
          {page==='tools'  && <ToolsPage  rate={rate} loading={loading} updatedAt={updatedAt} />}
          {page==='guides' && <GuidesPage setPage={nav} />}
          {isArticle       && <ArticlePage articleId={page} setPage={nav} rate={rate} />}
        </div>
        <Footer setPage={nav} />
      </div>
    </>
  )
}
