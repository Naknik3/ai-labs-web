import HeroScene from "../components/HeroScene.jsx";
import "./Home.css";

const LOOP_STEPS = [
  { n: "01", label: "Idle lab", copy: "Resources accumulate while you're away — credits, compute, data, research, energy." },
  { n: "02", label: "Train AI", copy: "Build models with unique traits, generations and rarities. Each one thinks differently." },
  { n: "03", label: "Produce value", copy: "Trained models generate revenue. The stronger the model, the bigger the payout." },
  { n: "04", label: "Cause an incident", copy: "Higher capability means higher risk. Sooner or later, something goes wrong." },
  { n: "05", label: "Investigate & solve", copy: "Read the logs, examine the system map, solve a procedural puzzle tied to the failure." },
  { n: "06", label: "Contain & rebuild", copy: "Resolve the incident, repair your systems, bank the reward, and build something stronger." },
];

const MODELS = [
  { key: "seed_01", name: "SEED-01", cls: "REASONER", rarity: "COMMON", note: "First light. A single closed proof, turning." },
  { key: "orrery_41", name: "ORRERY-41", cls: "FORECASTER", rarity: "EPIC", note: "Runs the world forward and does not tell you where it stops." },
  { key: "arc_7", name: "ARC-7", cls: "UNBOUNDED", rarity: "ANOMALY", note: "Left the sandbox at 04:13:52. Recovered. Watched." },
];

const SECTORS = [
  { name: "North Ridge", bonus: "+8% compute", building: "Cryo Cooler + Memory Silo" },
  { name: "East Field", bonus: "Unlocks research", building: "Research Lab + Quantum Annealer" },
  { name: "South Basin", bonus: "+0.5 credits/s", building: "Drone Bay + Signal Array" },
  { name: "Deep Core", bonus: "+4 energy/s", building: "Server Farm + Fusion Plant" },
  { name: "West Crater", bonus: "Containment", building: "Containment Vault" },
];

export default function Home() {
  return (
    <>
      <HeroScene>
        <p className="hero__eyebrow">Idle AI research &amp; management</p>
        <h1 className="hero__title">
          Build intelligence.
          <br />
          Contain what you create.
        </h1>
        <p className="hero__sub">
          Train increasingly powerful AI models, watch your lab grow tile by
          tile, and race to contain the incidents your own creations cause.
          Everything behind this text is your actual lab, live — the same
          scene, the same HUD, running right now.
        </p>
        <div className="hero__cta">
          <span className="btn btn--primary" aria-disabled="true">
            Coming soon — iOS &amp; Android
          </span>
          <a className="btn btn--ghost" href="mailto:guylhass@gmail.com?subject=Notify%20me%20-%20AI%20LAB">
            Get notified at launch
          </a>
        </div>
      </HeroScene>

      <section className="section">
        <h2 className="section__title">The loop</h2>
        <p className="section__lede">
          Ten steps, six shown here — the rest is discovering how bad it can
          get.
        </p>
        <div className="loop-grid">
          {LOOP_STEPS.map((step) => (
            <div className="loop-card" key={step.n}>
              <span className="loop-card__n">{step.n}</span>
              <h3>{step.label}</h3>
              <p>{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Your creations</h2>
        <p className="section__lede">
          Three of ten model architectures. Each generation gets riskier —
          and more valuable.
        </p>
        <div className="model-grid">
          {MODELS.map((m) => (
            <div className={`model-card model-card--${m.key}`} key={m.key}>
              <div className="model-card__top">
                <span className="model-card__rarity">{m.rarity}</span>
                <span className="model-card__cls">{m.cls}</span>
              </div>
              <h3>{m.name}</h3>
              <p>{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Territory</h2>
        <p className="section__lede">
          A new lab starts with one building online. Everything else is an
          empty pad until you unlock the ground beneath it.
        </p>
        <div className="sector-grid">
          {SECTORS.map((s) => (
            <div className="sector-card" key={s.name}>
              <h3>{s.name}</h3>
              <p className="sector-card__building">{s.building}</p>
              <p className="sector-card__bonus">{s.bonus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--cta">
        <h2 className="section__title">Ready to build something dangerous?</h2>
        <p className="section__lede">
          AI LAB is in development for iOS and Android. Leave your email and
          we'll let you know the moment it's live.
        </p>
        <a className="btn btn--primary" href="mailto:guylhass@gmail.com?subject=Notify%20me%20-%20AI%20LAB">
          Get notified at launch
        </a>
      </section>
    </>
  );
}
