import { useCallback, useState } from "react";
import LabMapBackground from "./LabMapBackground.jsx";
import { KEYFRAMES, threatMeta } from "../data/mapTimeline.js";
import "./HeroDevice.css";

const FIRST = KEYFRAMES[0];

/**
 * A phone-frame mockup of the actual AI LAB map screen — status bar, HUD
 * cards, a status toast, and the build dock — styled straight from the
 * team's own design reference (docs/design_handoff_ai_lab_light). The map
 * inside it is the live, real game scene, not a screenshot.
 */
export default function HeroDevice() {
  const [frame, setFrame] = useState(FIRST);

  const handleFrame = useCallback((f) => setFrame(f), []);

  const threat = threatMeta(frame.threat);
  const meterWidth = `${frame.threat}%`;
  const meterMid = `${Math.min(90, Math.max(30, frame.threat))}%`;

  return (
    <div className="hero-device">
      <div className="hero-device__frame">
        <LabMapBackground onFrame={handleFrame} />

        <div className="hero-device__statusbar">
          <span>9:41</span>
          <span>▮▮▮ 82%</span>
        </div>

        <div className="hero-device__hud">
          <div className="hud-card">
            <div className="hud-card__label">
              <span className="hud-card__dot" style={{ background: "#17BFE0" }} />
              CREDITS
            </div>
            <div className="hud-card__value">{frame.credits}</div>
          </div>
          <div className="hud-card">
            <div className="hud-card__label">
              <span className="hud-card__dot" style={{ background: "#8B5CF6" }} />
              RESEARCH
            </div>
            <div className="hud-card__value">{frame.research}</div>
          </div>
          <div className="hud-card hud-card--threat">
            <div className="hud-card__row">
              <span className="hud-card__label">AI THREAT</span>
              <span className="hud-card__tag" style={{ color: threat.color }}>
                {threat.label}
              </span>
            </div>
            <div className="hud-card__value">{frame.threat}%</div>
            <div className="hud-card__meter">
              <div
                className="hud-card__meter-fill"
                style={{
                  width: meterWidth,
                  background: `linear-gradient(90deg,#FFC46B,#FF9A3C ${meterMid},#F2544B)`,
                }}
              />
            </div>
          </div>
        </div>

        {frame.toast && frame.toast.tone === "warn" ? (
          <div className="hero-device__toast hero-device__toast--warn">
            <span className="hero-device__toast-icon">⚠</span>
            <span>{frame.toast.text}</span>
          </div>
        ) : frame.toast ? (
          <div className="hero-device__toast hero-device__toast--ok">
            <span className="hero-device__toast-dot" />
            <span>{frame.toast.text}</span>
          </div>
        ) : null}

        <div className="hero-device__dock">
          <div className="hero-device__dock-head">
            <span>BUILD</span>
            <span className="hero-device__dock-link">All assets ›</span>
          </div>
          <div className="hero-device__dock-row">
            <div className="dock-card">
              <div className="dock-card__art dock-card__art--cyan" />
              <div className="dock-card__name">Server Farm</div>
              <div className="dock-card__value" style={{ color: "#17BFE0" }}>
                18.4K
              </div>
            </div>
            <div className="dock-card">
              <div className="dock-card__art dock-card__art--violet" />
              <div className="dock-card__name">Training</div>
              <div className="dock-card__value" style={{ color: "#8B5CF6" }}>
                96.0K
              </div>
            </div>
            <div className="dock-card">
              <div className="dock-card__art dock-card__art--green" />
              <div className="dock-card__name">Research</div>
              <div className="dock-card__value" style={{ color: "#2FB273" }}>
                Level 4
              </div>
            </div>
            <div className="dock-card dock-card--locked">
              <div className="dock-card__art dock-card__art--locked">🔒</div>
              <div className="dock-card__name">Annealer</div>
              <div className="dock-card__value">40K RP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
