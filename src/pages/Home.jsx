import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SectionLink from "../components/SectionLink.jsx";
import Seo from "../components/Seo.jsx";
import { LabzMark, Wordmark } from "../components/BrandMark.jsx";
import { FAQ } from "../seo/faq.js";
import loadLabAssets from "../lib/labAssets.js";
import "./Home.css";

const ORBIT_SPEED = 0.045;

const BUILDINGS = [
  { key: "server_farm", name: "Server Farm", cls: "COMPUTE", accent: "cyan" },
  { key: "training_cluster", name: "Training Cluster", cls: "INTELLIGENCE", accent: "violet" },
  { key: "containment_vault", name: "Containment Vault", cls: "CONTAINMENT", accent: "amber" },
  { key: "research_lab", name: "Research Lab", cls: "SCIENCE", accent: "green" },
  { key: "quantum_annealer", name: "Quantum Annealer", cls: "COMPUTE", accent: "violet" },
  { key: "fusion_plant", name: "Fusion Plant", cls: "POWER", accent: "amber" },
  { key: "signal_array", name: "Signal Array", cls: "COMPUTE", accent: "cyan" },
  { key: "drone_bay", name: "Drone Bay", cls: "LOGISTICS", accent: "cyan" },
  { key: "cryo_cooler", name: "Cryo Cooler", cls: "POWER", accent: "cyan" },
  { key: "memory_silo", name: "Memory Silo", cls: "COMPUTE", accent: "cyan" },
];

const DOT = { cyan: "#17BFE0", violet: "#8B5CF6", amber: "#F5A623", green: "#2FB273" };

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

/* Waitlist delivery: Web3Forms relays each signup straight to the inbox that
   owns the access key — no backend, no database here. The key is meant to be
   public (it only authorises posting to that one form), which is why it ships
   in the bundle as a VITE_ var. Unset, the form tells people to email us
   rather than silently swallowing an address. */
const WAITLIST_ENDPOINT = "https://api.web3forms.com/submit";
const WAITLIST_KEY = import.meta.env.VITE_WAITLIST_KEY ?? "";
const CONTACT_EMAIL = "ailabzsupport@gmail.com";

function milestoneFor(level) {
  if (level <= 2) return 1;
  if (level <= 5) return 2;
  if (level <= 8) return 3;
  return 4;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [level, setLevel] = useState(9);
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

  return (
    <div className="home">
      <Seo path="/" />
      <section id="top" className="shell hero">
        <div className="pill">
          <span className="pill__dot" style={{ background: "#35C77A" }} />
          <span className="pill__label">COMING SOON ON iPHONE &amp; ANDROID</span>
        </div>
        <h1 className="hero__title">
          Build intelligence.
          <br />
          Contain what you create.
        </h1>
        <p className="hero__lede">
          An idle lab-management game for iPhone and Android. Ten buildings, ten upgrade tiers
          each, and one
          containment vault that will not stay quiet while you scale.
        </p>
        <div className="hero__actions">
          <SectionLink id="waitlist" className="btn btn--primary">
            Get early access
          </SectionLink>
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
          <div>10 buildings</div>
          <div>40 structural upgrades</div>
          <div>10 AI specimens</div>
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
          <div className="eyebrow">THE LAB</div>
          <h2 className="section__title">Every upgrade rebuilds the building</h2>
          <p className="section__lede">
            Four visual milestones per building. A level 10 server farm isn&rsquo;t a bigger level
            1 - it&rsquo;s a different structure. Pick one and drag the level.
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
                style={i === active ? { borderColor: DOT[b.accent] } : undefined}
                onClick={() => setActive(i)}
              >
                <span className="lab-row__dot" style={{ background: DOT[b.accent] }} />
                <span className="lab-row__name">{b.name}</span>
                <span className="lab-row__cls">{b.cls}</span>
              </button>
            ))}
          </div>

          <div className="lab__detail">
            <div className="building">
              {labReady ? (
                <lab-building
                  asset={building.key}
                  level={String(level)}
                  accent={building.accent}
                />
              ) : (
                <div className="scene__fallback" />
              )}
              <div className="building__caption">
                <div className="building__name">{building.name}</div>
                <div className="building__meta">
                  {building.cls} · MILESTONE {milestoneFor(level)} OF 4
                </div>
              </div>
            </div>

            <div className="level-card">
              <div className="level-card__head">
                <div className="level-card__label">UPGRADE LEVEL</div>
                <div className="level-card__value">
                  {level}
                  <span> / 10</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={level}
                aria-label="Upgrade level"
                onChange={(e) => setLevel(Number(e.target.value))}
              />
              <div className="level-card__scale">
                <span>1–2 shed</span>
                <span>3–5 racks</span>
                <span>6–8 hall</span>
                <span>9–10 tower</span>
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

      <Waitlist />
    </div>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | joined | error
  const [error, setError] = useState("");

  async function join(event) {
    event.preventDefault();
    if (status === "sending") return;
    if (!/.+@.+\..+/.test(email)) {
      setError("That address doesn't look right.");
      setStatus("error");
      return;
    }
    if (!WAITLIST_KEY) {
      setError(`The waitlist isn't connected yet - email ${CONTACT_EMAIL} and we'll add you.`);
      setStatus("error");
      return;
    }
    /* Honeypot: only a bot autofilling every field ticks the hidden checkbox.
       Test `.checked` — a checkbox's `.value` is the string "on" whether or
       not it is ticked, so testing `.value` swallows every real signup. */
    if (event.target.botcheck?.checked) {
      setStatus("joined");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WAITLIST_KEY,
          email,
          source: "ai-labz-web",
          botcheck: "",
        }),
      });
      /* Web3Forms answers with {success, message} and uses 4xx for a bad or
         missing key. Visitors get one plain sentence either way; the real
         message goes to the console, where whoever set the key will look. */
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Signup failed (${response.status})`);
      }
      setStatus("joined");
    } catch (err) {
      console.error("[waitlist]", err);
      setStatus("error");
      setError(`Couldn't reach the waitlist. Try again, or email ${CONTACT_EMAIL}.`);
    }
  }

  return (
    <section id="waitlist" className="shell section">
      <div className="cta">
        <div className="cta__copy">
          <div className="cta__brand">
            <LabzMark size={46} dark className="cta__mark" />
            <Wordmark dark />
          </div>
          <h2 className="cta__title">Be in the first cohort of lab directors</h2>
          <p className="cta__lede">
            TestFlight invites go out in waves. One email when it&rsquo;s your turn, nothing else.
          </p>
        </div>

        <div className="cta__form">
          {status === "joined" ? (
            <div className="joined">
              <div className="joined__title">You&rsquo;re on the list</div>
              <div className="joined__body">
                We&rsquo;ll mail {email} when your invite is ready.
              </div>
            </div>
          ) : (
            <form onSubmit={join} className="signup" noValidate>
              {/* Honeypot: hidden from people and from screen readers, so a
                  filled value means a bot walked the form. */}
              <input
                type="checkbox"
                name="botcheck"
                className="signup__botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@lab.com"
                aria-label="Email address"
                autoComplete="email"
              />
              <button type="submit" className="signup__submit" disabled={status === "sending"}>
                {status === "sending" ? "Joining…" : "Join the waitlist"}
              </button>
              {status === "error" ? (
                <div className="signup__error" role="alert">
                  {error}
                </div>
              ) : null}
              <div className="signup__fine">iPhone · iOS 17+ · free with optional upgrades</div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
