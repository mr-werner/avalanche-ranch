import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Gift, Mail, MapPin, Menu, Phone, Snowflake, Sun, Thermometer, Ticket, X } from "lucide-react";
import { ConceptWidget, StudioCredit } from "./concept.jsx";

// ---------------------------------------------------------------- Content (from avalancheranch.com, checked 2026-10-20)
const COMPANY = "Avalanche Ranch Cabins & Hot Springs";
const ABBR = "ar";
const END_DATE = "2026-11-24T23:59:59-07:00";
const PHONE = "970-963-2846";
const PHONE_HREF = "tel:+19709632846";
const EMAIL = "info@avalancheranch.com";
const ADDRESS = "12863 CO-133, Redstone, CO 81623";
const ORIGINAL = "https://avalancheranch.com/";
const FACEBOOK = "https://www.facebook.com/avalancheranchcabinsandhotsprings";

// Their Flybook booking engine (account 1521). BOOK is the roomfinder link from their homepage;
// day passes and gift certificates use the same Flybook configs as their header buttons (36329, 36351).
const FB = "https://go.theflybook.com/book/1521/32ae2119-66ce-4663-9bfb-3b70eab2b801/0#/Base/1521/32ae2119-66ce-4663-9bfb-3b70eab2b801";
const BOOK = `${FB}/roomfinder`;
const DAYPASS = `${FB}/Config/36329/0`;
const GIFT = `${FB}/Config/36351/0`;

const UP = "https://avalancheranch.com/wp-content/uploads";
const LOGO = "https://avalancheranch.com/wp-content/themes/avalanche-ranch/images/avalanche_ranch_logo.png";
const PHOTO = {
  waterfall: `${UP}/2013/03/Avalanche-Ranch-pools.jpg`,
  winterPools: "https://avalancheranch.com/wp-content/themes/avalanche-ranch/images/slides_home/the_pools.jpg",
  grotto: `${UP}/2014/11/HS_Waterfall.png`,
  route66: `${UP}/2013/03/14-web.jpg`,
  cabin5: `${UP}/2024/12/Cabin5Bed.jpg`,
  loft: `${UP}/2013/05/TheLoft1.jpg`,
  wagon: `${UP}/2026/03/WavesWagon1.jpg`,
  hiking: `${UP}/2013/03/Avalanche-Ranch-Activities.jpg`,
  massage: `${UP}/2013/01/Massage-Avalanche-Ranch.jpg`,
  steve: `${UP}/2013/03/Cowboy_Steve.png`,
  homestead: `${UP}/2013/03/Homestead.png`,
  lodge: `${UP}/2013/03/Lodge.png`,
  animals: `${UP}/2013/03/Animals-Avalanche-Ranch.png`,
  antiques: `${UP}/2026/03/Antiques.png`,
  ceremony: `${UP}/2013/03/Ceremony.png`,
  reception: `${UP}/2013/03/Reception2.png`,
  wedding: `${UP}/2013/03/Ranch_Wedding.png`,
};

const STAYS = [
  { name: "Wagons", from: "$142", sleeps: "2", img: PHOTO.wagon, text: "Wave's, Chuck, Shepherd's, Covered and Gypsy wagons sit closest to the pools. Full bed, propane heater, coffee maker and a grill. Glamping, with restrooms and showers at the hot springs.", note: "No minimum stay" },
  { name: "Studio cabins", from: "$217", sleeps: "2–5", img: PHOTO.route66, text: "Log cabins from the 1890s to the 1950s, each decorated differently: Route 66, Bunk House, Cider House, Eagles Nest. Most have lofts and full kitchens; some have woodstoves and clawfoot tubs.", note: "Also Hill Top, a 100 sq ft tiny house, $192" },
  { name: "1 & 2-bedroom cabins", from: "$317", sleeps: "up to 6", img: PHOTO.cabin5, text: "Mountain Heights, Westward Ho! and Great Outdoors: a bedroom (or two) plus a loft, a full kitchen and a gas log stove. Room for the whole family.", note: "2-bedroom cabins $332" },
  { name: "The Loft & Ranch House", from: "$332", sleeps: "6–8", img: PHOTO.loft, text: "The Loft (added 2008) has a king bed, dishwasher and Wi-Fi. The three-bedroom Ranch House sleeps 8 and has a private deck and gas grill.", note: "Ranch House rates by phone" },
];

const POOLS = [
  ["Tiered", "Three natural hot springs pools step down the hillside, each set so you see little of the next."],
  ["Grotto", "The largest pool is fed by a 3-foot waterfall that falls as a warm screen in front of a rock grotto."],
  ["93–104°F", "The range across the three pools, with views of Mt. Sopris, Elephant Mountain and Avalanche Creek."],
];

const SEASONS = {
  summer: {
    label: "Summer",
    icon: Sun,
    img: PHOTO.hiking,
    lede: "Base camp for the Crystal River Valley. Eight to ten trailheads are 5–15 minutes away.",
    items: [
      ["Fishing", "500 feet of catch-and-release riverfront on Gold Medal water, plus a pond stocked with rainbow trout (keep up to 4 per cabin)."],
      ["Canoe & paddleboats", "A canoe and two paddleboats on the pond, life jackets from the office."],
      ["Campfire with Cowboy Steve", "Wednesday and Saturday nights at 8 in summer: songs, requests and s'mores."],
      ["On the ranch", "A mile of trail, the barnyard (Seamous the llama, Tony the donkey), horseshoes, a sand volleyball court and seasonal cider pressing."],
    ],
  },
  winter: {
    label: "Winter",
    icon: Snowflake,
    img: PHOTO.winterPools,
    lede: "Snow on the pools and a woodstove in the cabin. Snowshoes and sleds are on us.",
    items: [
      ["Snowshoeing", "A fleet of snowshoes for every age, on the ranch trail or at Avalanche Creek, Coal Basin and McClure Pass."],
      ["Sledding & skating", "The sledding hill runs December to February; the ice rink opens mid-winter when it's cold enough."],
      ["Cross-country & backcountry", "Spring Gulch's 20+ km of groomed trail near Carbondale, and Marble's backcountry 15 minutes south."],
      ["Aspen skiing", "Downhill days at Aspen, with the pools waiting when you get back."],
    ],
  },
};

const KNOW = [
  ["Check-in / out", "Check-in after 3 pm, check-out by 11 am. Arriving after 5? Your map and unlocked cabin will be waiting."],
  ["Minimum stays", "3 nights in high season (Memorial Day to Labor Day and winter holidays), 2 nights otherwise. None in the wagons."],
  ["Pets", "Up to two pets per cabin, $50 per pet. No pets in the pool area."],
  ["Unplugged", "No cell service and no Wi-Fi in the cabins. The lodge has a phone and Wi-Fi, open 24 hours."],
  ["Kitchens", "Cabins have full kitchens with coffee, tea and cider. No restaurant on site; Redstone is 4 miles, Carbondale 12."],
  ["Winter roads", "Highway 133 is well kept, but bring snow tires, 4×4 or chains."],
];

// ---------------------------------------------------------------- Motif
function TieredPools({ className = "" }) {
  // Three pools stepping down the hillside, with steam: the ranch's tiered hot springs.
  return (
    <svg className={`tiers ${className}`} viewBox="0 0 600 260" aria-hidden="true">
      <path className="t-hill" d="M0 40 C120 30 180 70 260 80 S420 130 600 150" />
      <path className="t-rock" d="M60 70 C110 52 200 60 230 82 C250 98 220 118 170 118 C110 118 40 104 60 70Z" />
      <path className="t-water" d="M78 78 C120 64 190 70 212 86 C224 96 204 108 166 108 C120 108 66 98 78 78Z" />
      <path className="t-rock" d="M210 132 C270 110 380 118 410 142 C432 160 396 182 330 182 C260 182 190 166 210 132Z" />
      <path className="t-water" d="M230 138 C280 122 370 128 392 146 C406 158 380 172 330 172 C270 172 214 160 230 138Z" />
      <path className="t-rock" d="M370 196 C440 170 580 178 596 206 C606 230 560 248 480 248 C400 248 340 228 370 196Z" />
      <path className="t-water" d="M390 202 C450 182 566 190 578 210 C586 226 548 238 482 238 C414 238 368 222 390 202Z" />
      <path className="t-fall" d="M214 96 C226 110 230 122 236 134 M402 156 C414 170 418 182 424 196" />
      <g className="t-steam">
        <path d="M120 60 C110 44 132 36 122 18" /><path d="M160 58 C150 40 172 32 162 12" />
        <path d="M290 118 C280 100 302 92 292 72" /><path d="M340 116 C330 98 352 90 342 70" />
        <path d="M460 176 C450 158 472 150 462 130" /><path d="M520 178 C510 160 532 152 522 132" />
      </g>
    </svg>
  );
}

function Ridge({ className = "" }) {
  // The valley ridgeline, echoing the peak in their logo.
  return (
    <svg className={`ridge ${className}`} viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 80 L0 58 L90 40 L170 52 L260 22 L330 38 L420 8 L480 26 L540 18 L620 44 L720 30 L800 50 L900 24 L980 42 L1060 34 L1200 54 L1200 80Z" />
    </svg>
  );
}

// ---------------------------------------------------------------- Components
function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["#springs", "Hot Springs"], ["#cabins", "Cabins"], ["#ranch", "The Ranch"], ["#events", "Events"], ["#visit", "Find Us"]];
  return (
    <header className={`site-header${solid || open ? " is-solid" : ""}`}>
      <div className="wrap header-row">
        <a href="#top" className="brand" aria-label={`${COMPANY} home`}><img src={LOGO} alt="Avalanche Ranch Cabins & Hot Springs" className="logo" /></a>
        <nav className={`nav${open ? " is-open" : ""}`} aria-label="Main">
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-pass" href={DAYPASS} target="_blank" rel="noopener noreferrer">Day Pass</a>
          <a className="nav-book" href={BOOK} target="_blank" rel="noopener noreferrer">Book a Cabin</a>
        </nav>
        <button type="button" className="menu-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Redstone, Colorado · 7,000 ft · On the Crystal River</p>
          <h1>Log cabins and <span>three hot springs</span> under Mt. Sopris.</h1>
          <p className="lede">A 36-acre ranch in the Crystal River Valley: 13 historic log cabins, cozy wagons, and natural pools that stay open around the clock for our guests.</p>
          <div className="hero-ctas">
            <a className="btn btn-green" href={BOOK} target="_blank" rel="noopener noreferrer">Book a cabin <ArrowRight size={18} /></a>
            <a className="btn btn-line" href={DAYPASS} target="_blank" rel="noopener noreferrer"><Ticket size={18} /> Hot springs day pass</a>
          </div>
          <a className="hero-phone" href={PHONE_HREF}><Phone size={16} /> {PHONE} · office open daily 9–5</a>
        </div>
        <div className="hero-photos">
          <img className="hp-main" src={PHOTO.waterfall} alt="A guest under the waterfall in Avalanche Ranch's grotto pool" />
          <img className="hp-sub" src={PHOTO.winterPools} alt="The hot springs pools after a snowfall" />
          <div className="hp-temp"><Thermometer size={18} /><strong>93–104°F</strong><span>open year-round</span></div>
        </div>
      </div>
      <Ridge className="hero-ridge" />
    </section>
  );
}

function Board() {
  const rows = [
    ["Lodging guests", "Pools open 24 hours, included in your stay"],
    ["Day visitors", "$34 · 9am–1pm or 1pm–5pm · reserve ahead"],
    ["Wednesdays", "Pools closed 9–5 for cleaning"],
  ];
  return (
    <section className="board" aria-label="Hot springs at a glance">
      <div className="wrap board-row">
        {rows.map(([k, v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}
        <a href={GIFT} target="_blank" rel="noopener noreferrer" className="board-gift"><Gift size={18} /> Gift certificates</a>
      </div>
    </section>
  );
}

function Springs() {
  return (
    <section className="springs" id="springs">
      <div className="wrap springs-grid">
        <div className="springs-copy">
          <p className="eyebrow dark">The hot springs</p>
          <h2>Cascading pools, set into the valley rock.</h2>
          <p>Designed around the natural landscape and rock formations of the Crystal River Valley, the three pools cascade from one to the next. Clothing required, family friendly, no glass and no smoking.</p>
          <TieredPools className="springs-tiers" />
          <ul className="pool-facts">
            {POOLS.map(([k, v]) => <li key={k}><strong>{k}</strong><span>{v}</span></li>)}
          </ul>
        </div>
        <aside className="pass-card">
          <img src={PHOTO.grotto} alt="A soaker leaning back beneath the grotto waterfall" loading="lazy" />
          <div className="pass-body">
            <p className="eyebrow dark">Day pass</p>
            <p className="price"><strong>$34</strong> per person</p>
            <ul>
              <li>Four-hour soaks: <b>9am–1pm</b> or <b>1pm–5pm</b></li>
              <li>Reservations required; pay in full when booking</li>
              <li>48 hours' notice to cancel</li>
              <li>Towel or suit rental $2 each</li>
              <li>Closed Wednesdays · everyone signs a waiver</li>
            </ul>
            <a className="btn btn-green full" href={DAYPASS} target="_blank" rel="noopener noreferrer">Reserve a soak <ArrowUpRight size={18} /></a>
            <a className="pass-waiver" href="https://avalancheranch.com/waiver-and-release-agreement/" target="_blank" rel="noopener noreferrer">Sign the waiver ahead of time</a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Cabins() {
  return (
    <section className="cabins" id="cabins">
      <div className="wrap">
        <div className="head-row">
          <div>
            <p className="eyebrow dark">The cabins</p>
            <h2>Cab·in <em>/ˈkabən/</em></h2>
            <p className="define"><i>noun.</i> A small house made of wood, in a wild or remote area. Ours were built between 1890 and the 1950s, then renovated one at a time.</p>
          </div>
          <a className="btn btn-green" href={BOOK} target="_blank" rel="noopener noreferrer">See availability <ArrowRight size={18} /></a>
        </div>
        <div className="cabin-grid">
          {STAYS.map((s) => (
            <article className="cabin" key={s.name}>
              <div className="cabin-img"><img src={s.img} alt={s.name} loading="lazy" /><span className="tag">from {s.from}/night</span></div>
              <div className="cabin-body">
                <h3>{s.name}</h3>
                <p className="sleeps">Sleeps {s.sleeps}</p>
                <p>{s.text}</p>
                <p className="note">{s.note}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="incl">Every stay includes the hot springs for registered guests, sheets and pool towels, firewood, and a yard with a grill and picnic table.</p>
      </div>
    </section>
  );
}

function Ranch() {
  const [season, setSeason] = useState("summer");
  const s = SEASONS[season];
  return (
    <section className="ranch" id="ranch">
      <div className="wrap">
        <div className="ranch-intro">
          <div>
            <p className="eyebrow">The ranch</p>
            <h2>A Rocky Mountain picture postcard.</h2>
          </div>
          <p>Half a mile of riverfront, apple and plum orchards, a stocked trout pond and a barnyard. The 1913 homestead is a Redstone landmark, the antiques shop fills the old garage (and part of the barn), and the lodge stays open all night with games, books and Wi-Fi. Welcome from the owners, the Ogilby/Jacober family.</p>
        </div>
        <div className="snapshots">
          {[[PHOTO.homestead, "1913 homestead"], [PHOTO.steve, "Cowboy Steve's campfire"], [PHOTO.animals, "The barnyard"], [PHOTO.lodge, "The lodge"], [PHOTO.antiques, "Antiques shop"]].map(([src, cap]) => (
            <figure key={cap}><img src={src} alt={cap} loading="lazy" /><figcaption>{cap}</figcaption></figure>
          ))}
        </div>
        <div className="season">
          <div className="season-tabs" role="tablist" aria-label="Activities by season">
            {Object.entries(SEASONS).map(([key, v]) => {
              const Icon = v.icon;
              return <button key={key} type="button" role="tab" aria-selected={season === key} className={season === key ? "on" : ""} onClick={() => setSeason(key)}><Icon size={18} /> {v.label}</button>;
            })}
          </div>
          <div className="season-panel" role="tabpanel">
            <img src={s.img} alt={`${s.label} at Avalanche Ranch`} loading="lazy" />
            <div>
              <p className="season-lede">{s.lede}</p>
              <dl>{s.items.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Restore() {
  return (
    <section className="restore">
      <div className="wrap restore-grid">
        <img src={PHOTO.massage} alt="Massage at Avalanche Ranch" loading="lazy" />
        <div>
          <p className="eyebrow dark">Massage &amp; yoga</p>
          <h2>Soak first. Then let someone else do the work.</h2>
          <p>Our massage studio sits beside the hot springs and takes one guest at a time, 9 am to 7 pm, seven days a week. Massage-only appointments are welcome.</p>
          <table className="rates">
            <tbody>
              <tr><th>50 minutes</th><td>$150</td></tr>
              <tr><th>80 minutes</th><td>$216</td></tr>
              <tr><th>110 minutes</th><td>$295</td></tr>
              <tr><th>Private yoga, up to 5</th><td>$200 lodging guests · $275 day visitors, pools included</td></tr>
            </tbody>
          </table>
          <p className="fine">Book at least 24 hours ahead by calling <a href={PHONE_HREF}>{PHONE}</a>. 48-hour cancellation policy.</p>
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section className="events" id="events">
      <div className="wrap events-grid">
        <div>
          <p className="eyebrow">Private events</p>
          <h2>Weddings, reunions and retreats, all in one place.</h2>
          <p>Rent the ranch so your guests can all stay together. We set up tents, picnic tables and chairs and share a list of local caterers, musicians, florists and rental companies.</p>
          <div className="cap">
            <div><strong>75</strong><span>guests outside under tents</span></div>
            <div><strong>25</strong><span>inside, for meetings, yoga and retreats</span></div>
            <div><strong>~60</strong><span>overnight across the property</span></div>
          </div>
          <p className="fine light">Group bookings of 3 or more units need management approval. Hosting a retreat? Write to <a href="mailto:molly@avalancheranch.com">molly@avalancheranch.com</a>.</p>
          <a className="btn btn-cream" href={`mailto:${EMAIL}?subject=Private%20event%20inquiry`}><Mail size={18} /> Plan an event</a>
        </div>
        <div className="event-circles">
          <img src={PHOTO.ceremony} alt="A wedding ceremony at the ranch" />
          <img src={PHOTO.wedding} alt="Bride and groom with one of the ranch sheep" />
          <img src={PHOTO.reception} alt="A tented reception" />
        </div>
      </div>
    </section>
  );
}

function Know() {
  return (
    <section className="know">
      <div className="wrap">
        <p className="eyebrow dark">Know before you go</p>
        <div className="know-grid">
          {KNOW.map(([k, v]) => <div key={k} className="know-item"><h3>{k}</h3><p>{v}</p></div>)}
        </div>
        <p className="know-more"><a href="https://avalancheranch.com/faq/" target="_blank" rel="noopener noreferrer">All FAQs</a> · <a href="https://avalancheranch.com/policy/" target="_blank" rel="noopener noreferrer">Policies</a> · <a href="https://avalancheranch.com/pet-policy/" target="_blank" rel="noopener noreferrer">Pet policy</a></p>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="visit" id="visit">
      <div className="wrap visit-grid">
        <div>
          <p className="eyebrow dark">Find us</p>
          <h2>On Highway 133, four miles north of Redstone.</h2>
          <dl className="details">
            <div><dt><MapPin size={16} /> Address</dt><dd>{ADDRESS}</dd></div>
            <div><dt><Phone size={16} /> Office</dt><dd><a href={PHONE_HREF}>{PHONE}</a> · daily 9am–5pm, open year-round</dd></div>
            <div><dt><Mail size={16} /> Email</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
          </dl>
          <p className="fine">About 12 miles south of Carbondale (groceries at City Market and Mana Foods).</p>
          <div className="visit-ctas">
            <a className="btn btn-green" href={BOOK} target="_blank" rel="noopener noreferrer">Book a cabin <ArrowRight size={18} /></a>
            <a className="btn btn-outline" href="https://goo.gl/maps/mDHNe" target="_blank" rel="noopener noreferrer"><MapPin size={18} /> Directions</a>
          </div>
        </div>
        <div className="map"><iframe title="Map to Avalanche Ranch" src="https://maps.google.com/maps?q=Avalanche%20Ranch%20Cabins%20%26%20Hot%20Springs%2C%2012863%20CO-133%2C%20Redstone%2C%20CO%2081623&z=12&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Ridge className="footer-ridge" />
      <div className="wrap footer-row">
        <img src={LOGO} alt="Avalanche Ranch Cabins & Hot Springs" className="footer-logo" />
        <div className="footer-links">
          <a href="#springs">Hot Springs</a><a href="#cabins">Cabins</a><a href="#ranch">Activities</a><a href="#events">Events</a>
          <a href={GIFT} target="_blank" rel="noopener noreferrer">Gift Certificates</a>
          <a href={FACEBOOK} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
        <a className="footer-phone" href={PHONE_HREF}><Phone size={16} /> {PHONE}</a>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} Avalanche Ranch. Independent concept · not for official use. Current site: <a href={ORIGINAL}>avalancheranch.com</a></span>
        <StudioCredit />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Board />
        <Springs />
        <Cabins />
        <Ranch />
        <Restore />
        <Events />
        <Know />
        <Visit />
      </main>
      <Footer />
      <ConceptWidget company={COMPANY} abbr={ABBR} endDate={END_DATE} />
    </>
  );
}
