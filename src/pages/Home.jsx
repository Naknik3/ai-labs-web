import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SectionLink from "../components/SectionLink.jsx";
import AppStoreButton from "../components/AppStoreButton.jsx";
import BuildingViewer from "../components/BuildingViewer.jsx";
import GameClip from "../components/GameClip.jsx";
import GooglePlayButton from "../components/GooglePlayButton.jsx";
import ModelViewer from "../components/ModelViewer.jsx";
import Seo from "../components/Seo.jsx";
import { LabzMark, Wordmark } from "../components/BrandMark.jsx";
import {
  BUILDINGS,
  levelForTier,
  tierCountFor,
  VISUAL_TIER_COUNT,
} from "../data/buildings.js";
import { MODELS } from "../data/models.js";
import { FAQ } from "../seo/faq.js";
import loadLabAssets from "../lib/labAssets.js";
import "./Home.css";

const ORBIT_SPEED = 0.045;

const STEPS = [
  {
    n: "1",
    title: "Build the stack",
    tint: "#EAF6FA",
    color: "#17BFE0",
    body: "Power, mines and training halls, spread over eight sectors of land you buy one at a time. Every building feeds the next, and the lab keeps earning while you're away.",
  },
  {
    n: "2",
    title: "Train the models",
    tint: "#F1EBFE",
    color: "#8B5CF6",
    body: "Win a trial to train a model, then fuse two matching ones into something stronger. Each generation earns more and pulls harder at its cage.",
  },
  {
    n: "3",
    title: "Keep it contained",
    tint: "#FFF3E2",
    color: "#E8891F",
    body: "Smarter models raise the threat meter until something breaks. Every incident is a puzzle on a clock: solve it, or watch a model get out.",
  },
];

const CLIPS = [
  {
    key: "breach",
    label: "INCIDENT",
    accent: "red",
    title: "Something got out",
    body: "A breach lights up the vault. Solve the board before the clock hits zero.",
  },
  {
    key: "recapture",
    label: "RECAPTURE",
    accent: "amber",
    title: "It runs. You throw.",
    body: "Steer the clamp and time the throw, or the runaway comes home weaker.",
  },
  {
    key: "arcade",
    label: "ARCADE",
    accent: "cyan",
    title: "Runaway",
    body: "Cut the floor, seal it off, and don't let the hunters catch your wall.",
  },
  {
    key: "idle",
    label: "IDLE",
    accent: "green",
    title: "Day 1 to day 7",
    body: "Buy land, stack buildings, and come back to a lab that kept working.",
  },
];

const FEATURES = [
  {
    title: "15 incident puzzles",
    tag: "CONTAIN",
    accent: "red",
    body: "Every breach is a board on a clock: circuits, sweep, snake, tetris, breakout, unblock and more. Solve it and the lab is sealed.",
  },
  {
    title: "Recapture",
    tag: "CONTAIN",
    accent: "amber",
    body: "Fail a board and a model can break out. Chase it into the Recapture Range. Lose the chase and it comes home levels down - or, at level 1, it's gone.",
  },
  {
    title: "Loot chests",
    tag: "REWARD",
    accent: "violet",
    body: "Solved incidents pay out in a chest. Its rarity rolls from common to legendary, and the rarity multiplies what's inside.",
  },
  {
    title: "Arcade: Runaway",
    tag: "WEEKLY",
    accent: "cyan",
    body: "Build the Arcade and play swipe-to-contain. Everyone gets the same floors each day, and your best run of the week goes on the board.",
  },
  {
    title: "Weekly leaderboards",
    tag: "WEEKLY",
    accent: "cyan",
    body: "Three contests every week: XP, Arcade and Raid. Prizes of credits, chips and Cores land every Monday.",
  },
  {
    title: "Lab Raids",
    tag: "ONLINE",
    accent: "red",
    body: "A rogue model walks into the containment field and every lab hits it at once. Solve boards to deal damage. The kill pays everyone who hit it.",
  },
  {
    title: "Prestige",
    tag: "ENDGAME",
    accent: "lime",
    body: "At lab level 100 the Epoch Gate wipes the lab into a stronger run. Pick a perk each time, and buy the three prestige models, the strongest in the game.",
  },
  {
    title: "Model skins",
    tag: "STYLE",
    accent: "violet",
    body: "Dress your models in skins with their own finish and etched pattern. Skins are the one thing a prestige never takes.",
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [buildingTiers, setBuildingTiers] = useState(() =>
    Object.fromEntries(
      BUILDINGS.map((building) => [
        building.key,
        tierCountFor(building),
      ]),
    ),
  );
  const [activeModel, setActiveModel] = useState(0);
  const [labReady, setLabReady] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    let alive = true;
    loadLabAssets().then(
      () => alive && setLabReady(true),
      () => {},
    );
    return () => {
      alive = false;
    };
  }, []);

  // Arriving from another page via a header/footer section link.
  useEffect(() => {
    if (!state?.scrollTo) return;
    document.getElementById(state.scrollTo)?.scrollIntoView({ block: "start" });
  }, [state]);

  const building = BUILDINGS[active];
  const tier = buildingTiers[building.key] ?? 1;
  const tierCount = tierCountFor(building);
  const level = levelForTier(building, tier);
  const model = MODELS[activeModel];

  return (
    <div className="home">
      <Seo path="/" />
      <section id="top" className="shell hero">
        <div className="pill">
          <span className="pill__dot" style={{ background: "#35C77A" }} />
          <span className="pill__label">OUT NOW ON iPHONE · ANDROID</span>
        </div>
        <h1 className="hero__title">
          Build intelligence.
          <br />
          Contain what you create.
        </h1>
        <p className="hero__lede">
          A free idle lab game for iPhone and Android. Build the lab, train AI models, and solve
          the puzzle when one breaks out. Then chase it down, top the weekly boards, and prestige
          into a stronger run.
        </p>
        <div className="hero__actions">
          <AppStoreButton className="btn btn--primary" />
          <GooglePlayButton className="btn btn--ghost" />
          <SectionLink id="gameplay" className="btn btn--ghost">
            Watch it play
          </SectionLink>
        </div>
      </section>

      <section className="shell scene-section">
        <div className="scene">
          {labReady ? (
            <lab-scene mode="calm" threat="12" orbit={String(ORBIT_SPEED)} />
          ) : (
            <div className="scene__fallback" />
          )}
          <div className="scene__risers" aria-hidden="true">
            <div className="riser" style={{ left: "22%", top: "44%", color: "#17BFE0" }}>
              +184
            </div>
            <div
              className="riser"
              style={{ left: "58%", top: "34%", color: "#8B5CF6", animationDelay: "1.4s" }}
            >
              +42
            </div>
            <div
              className="riser"
              style={{ left: "38%", top: "62%", color: "#2FB273", animationDelay: "2.4s" }}
            >
              +7 RP
            </div>
          </div>
          <div className="scene__tag">LIVE IN-GAME RENDER</div>
        </div>
        <div className="scene-stats">
          <div>{BUILDINGS.length} building systems</div>
          <div>{MODELS.length} AI specimens</div>
          <div>15 incident puzzles</div>
          <div>3 weekly contests</div>
          <div>Runs while you&rsquo;re away</div>
        </div>
      </section>

      <section id="play" className="shell section">
        <div className="section__head">
          <div className="eyebrow">HOW IT PLAYS</div>
          <h2 className="section__title">Build it. Train it. Contain it.</h2>
        </div>
        <div className="steps">
          {STEPS.map((step) => (
            <div className="step-card" key={step.n}>
              <div className="step-card__head">
                <div
                  className="step-card__badge"
                  style={{ background: step.tint, color: step.color }}
                >
                  {step.n}
                </div>
                <div className="step-card__title">{step.title}</div>
              </div>
              <div className="step-card__body">{step.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="gameplay" className="shell section">
        <div className="section__head section__head--wide">
          <div className="eyebrow">SEE IT MOVE</div>
          <h2 className="section__title">Real footage from the game</h2>
        </div>
        <div className="clips">
          {CLIPS.map((clip) => (
            <GameClip
              key={clip.key}
              src={`/clips/${clip.key}.mp4`}
              poster={`/clips/${clip.key}.jpg`}
              label={clip.label}
              title={clip.title}
              body={clip.body}
              accent={clip.accent}
            />
          ))}
        </div>
      </section>

      <section id="features" className="shell section">
        <div className="section__head section__head--wide">
          <div className="eyebrow">BEYOND THE LAB</div>
          <h2 className="section__title">Something to chase every week</h2>
          <p className="section__lede">
            The idle lab is where it starts. Incidents, contests, raids and prestige are what keep
            it moving.
          </p>
        </div>
        <div className="features">
          {FEATURES.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <span
                className="feature-card__tag"
                style={{ color: `var(--${feature.accent})` }}
              >
                {feature.tag}
              </span>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__body">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="buildings" className="shell section">
        <div className="section__head section__head--wide">
          <div className="eyebrow">THE LAB · {BUILDINGS.length} SYSTEMS</div>
          <h2 className="section__title">Every upgrade rebuilds the building</h2>
          <p className="section__lede">
            From training halls to the Epoch Gate, every system has its own silhouette and upgrade
            path - {VISUAL_TIER_COUNT} visual tiers in all. Pick one and drag across them.
          </p>
        </div>

        <div className="lab">
          <div className="lab__list" aria-label="Lab buildings">
            {BUILDINGS.map((b, i) => (
              <button
                key={b.key}
                type="button"
                aria-pressed={i === active}
                className={i === active ? "lab-row is-active" : "lab-row"}
                style={i === active ? { borderColor: `var(--${b.accent})` } : undefined}
                onClick={() => setActive(i)}
              >
                <span className="lab-row__dot" style={{ background: `var(--${b.accent})` }} />
                <span className="lab-row__name">{b.name}</span>
                <span className="lab-row__cls">{b.cls}</span>
              </button>
            ))}
          </div>

          <div className="lab__detail">
            <div className="building">
              <BuildingViewer building={building} level={level} tier={tier} />
              <div className="building__caption">
                <div className="building__name">{building.name}</div>
                <div className="building__meta">
                  {building.cls} · TIER {tier} OF {tierCount}
                </div>
              </div>
            </div>

            <div className="tier-card">
              <div className="tier-card__head">
                <div className="tier-card__label">VISUAL TIER</div>
                <div className="tier-card__value">
                  {tier}
                  <span> / {tierCount}</span>
                </div>
              </div>
              <p className="tier-card__desc">{building.description}</p>
              <input
                type="range"
                min="1"
                step="1"
                value={tier}
                aria-label={`${building.name} visual tier`}
                max={tierCount}
                onChange={(e) =>
                  setBuildingTiers((current) => ({
                    ...current,
                    [building.key]: Number(e.target.value),
                  }))
                }
              />
              <div className="tier-card__scale">
                <span>1</span>
                <span>{tierCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="models" className="shell section">
        <div className="section__head section__head--wide">
          <div className="eyebrow">AI SPECIMENS · {MODELS.length} MODELS</div>
          <h2 className="section__title">Meet what the lab creates</h2>
          <p className="section__lede">
            Train them, fuse them, and contain what they become. Every specimen has a generation,
            a class, and a reason not to leave it unattended. The last three only exist after the
            Epoch Gate.
          </p>
        </div>

        <div className="lab model-browser">
          <div className="lab__list" aria-label="AI models">
            {MODELS.map((item, i) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={i === activeModel}
                className={i === activeModel ? "lab-row is-active" : "lab-row"}
                onClick={() => setActiveModel(i)}
              >
                <span className={`model-row__swatch model-row__swatch--${item.rarity.toLowerCase()}`} />
                <span className="lab-row__name">{item.name}</span>
                <span className="lab-row__cls">G{item.gen}</span>
              </button>
            ))}
          </div>

          <div className="lab__detail">
            <div className="model-preview">
              <ModelViewer model={model} />
              <div className="model-preview__caption">
                <div className="model-preview__name">{model.name}</div>
                <div className="model-preview__meta">
                  GENERATION {model.gen} · {model.rarity}
                </div>
              </div>
            </div>
            <div className="model-card">
              <div className="model-card__eyebrow">MODEL PROFILE</div>
              <div className="model-card__title">{model.cls}</div>
              <p className="model-card__body">{model.note}</p>
              <div className="model-card__tags">
                <span>GEN {model.gen}</span>
                <span>{model.rarity}</span>
                <span>AI SPECIMEN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The answers here are also emitted as FAQPage structured data from
          the same src/seo/faq.js - Google only honours that markup when the
          text is visible on the page, and answer engines quote what they can
          read, so this section is the SEO surface, not a decoration. */}
      <section id="faq" className="shell section">
        <div className="section__head">
          <div className="eyebrow">QUESTIONS</div>
          <h2 className="section__title">Frequently asked</h2>
        </div>
        <div className="faq">
          {FAQ.map(({ q, a }) => (
            <div className="faq-item" key={q}>
              <h3 className="faq-item__q">{q}</h3>
              <p className="faq-item__a">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <DownloadCta />
    </div>
  );
}

function DownloadCta() {
  return (
    <section id="download" className="shell section">
      <div className="cta">
        <div className="cta__copy">
          <div className="cta__brand">
            <LabzMark size={46} className="cta__mark" />
            <Wordmark dark />
          </div>
          <h2 className="cta__title">Play it now on iPhone and Android</h2>
          <p className="cta__lede">
            AI-LABZ is live on the App Store and Google Play. Build your lab, train your models,
            and contain what you create.
          </p>
          <div className="cta__stores">
            <AppStoreButton className="btn btn--primary" />
            <GooglePlayButton className="btn btn--ghost cta__play" />
          </div>
        </div>
      </div>
    </section>
  );
}
