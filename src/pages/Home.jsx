import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SectionLink from "../components/SectionLink.jsx";
import AppStoreButton from "../components/AppStoreButton.jsx";
import BuildingViewer from "../components/BuildingViewer.jsx";
import GooglePlayButton from "../components/GooglePlayButton.jsx";
import ModelViewer from "../components/ModelViewer.jsx";
import Seo from "../components/Seo.jsx";
import { LabzMark, Wordmark } from "../components/BrandMark.jsx";
import { BUILDINGS, tierForLevel } from "../data/buildings.js";
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
    body: "Place compute, power and cooling on the island. Every structure feeds the next one, so layout decides your ceiling.",
  },
  {
    n: "2",
    title: "Train the models",
    tint: "#F1EBFE",
    color: "#8B5CF6",
    body: "Compute becomes research. Research becomes specimens with their own behaviour, rarity and appetite for power.",
  },
  {
    n: "3",
    title: "Keep it contained",
    tint: "#FFF3E2",
    color: "#E8891F",
    body: "Smarter models raise the threat meter. Cool it, cage it, or watch the vault breach and take the sector with it.",
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [buildingLevels, setBuildingLevels] = useState(() =>
    Object.fromEntries(BUILDINGS.map((building) => [building.key, Math.min(9, building.maxLevel)])),
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
  const level = buildingLevels[building.key];
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
          An idle lab-management game, live now on iPhone and Android. Sixteen building systems,
          sixteen specimens, and one
          containment vault that will not stay quiet while you scale.
        </p>
        <div className="hero__actions">
          <AppStoreButton className="btn btn--primary" />
          <GooglePlayButton className="btn btn--ghost" />
          <SectionLink id="buildings" className="btn btn--ghost">
            See the lab
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
          <div>16 building systems</div>
          <div>65 visual tiers</div>
          <div>16 AI specimens</div>
          <div>Runs while you&rsquo;re away</div>
        </div>
      </section>

      <section id="play" className="shell section">
        <div className="section__head">
          <div className="eyebrow">HOW IT PLAYS</div>
          <h2 className="section__title">Three loops, one island</h2>
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

      <section id="buildings" className="shell section">
        <div className="section__head section__head--wide">
          <div className="eyebrow">THE LAB · {BUILDINGS.length} SYSTEMS</div>
          <h2 className="section__title">Every upgrade rebuilds the building</h2>
          <p className="section__lede">
            From training halos to power plants, every system has its own silhouette and upgrade
            path. Pick one and drag the level.
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
              <BuildingViewer building={building} level={level} />
              <div className="building__caption">
                <div className="building__name">{building.name}</div>
                <div className="building__meta">
                  {building.cls} · TIER {tierForLevel(building, level)} OF {building.tierBreakpoints?.length ?? 4}
                </div>
              </div>
            </div>

            <div className="level-card">
              <div className="level-card__head">
                <div className="level-card__label">UPGRADE LEVEL</div>
                <div className="level-card__value">
                  {level}
                  <span> / {building.maxLevel}</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                step="1"
                value={level}
                aria-label="Upgrade level"
                max={building.maxLevel}
                onChange={(e) =>
                  setBuildingLevels((current) => ({
                    ...current,
                    [building.key]: Number(e.target.value),
                  }))
                }
              />
              <div className="level-card__scale">
                <span>1</span>
                <span>{building.maxLevel}</span>
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
            Train them, contain them, and learn what they become. Every specimen has a generation,
            a class, and a reason not to leave it unattended.
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
