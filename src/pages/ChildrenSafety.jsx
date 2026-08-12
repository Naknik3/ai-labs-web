import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import "./LegalPage.css";

export default function ChildrenSafety() {
  return (
    <div className="legal">
      <Seo path="/children-safety" />
      <div className="legal__header">
        <h1>Children's Safety Standards</h1>
        <p className="legal__updated">Last updated August 12, 2026</p>
      </div>

      <div className="legal__doc">
        <h2>Our commitment</h2>
        <p>
          AI-LABZ has zero tolerance for child sexual abuse and exploitation
          (CSAE) in any form, and for any content or conduct that
          endangers minors. This page explains how AI-LABZ is built to keep
          young players safe, how we handle reports, and how to reach us.
        </p>

        <h2>Who AI-LABZ is for</h2>
        <p>
          AI-LABZ is not directed at, marketed to, or designed for children
          under 13. It carries a general audience rating appropriate for
          teens and adults. We do not knowingly collect personal
          information from children under 13 - see our{" "}
          <Link to="/privacy">Privacy Policy</Link> for details.
        </p>

        <h2>No stranger contact by design</h2>
        <p>
          AI-LABZ has no chat, messaging, friends list, or any way for
          players to contact each other. There is no user-generated
          content, no public profiles, and no login - every lab is
          identified only by an anonymous device token. There is no
          mechanism in the game for one player to interact with, message,
          or share content with another. This removes the primary vectors
          for grooming and stranger contact that this policy exists to
          prevent.
        </p>

        <h2>What we don't collect from anyone, including minors</h2>
        <p>
          AI-LABZ does not ask for a name, email, phone number, photo, or
          precise location from any player, of any age. There is no
          account creation and nothing to fill out. See our{" "}
          <Link to="/privacy">Privacy Policy</Link> for the full list of what
          we do and don't collect.
        </p>

        <h2>Parental guidance</h2>
        <p>
          We encourage parents and guardians to use the parental controls
          built into iOS (Screen Time) and Android (Family Link / Google
          Play parental controls) to manage app access, in-app purchases,
          and playtime for children in their care. If AI-LABZ PRO is
          active, subscriptions are purchased and managed through the
          Apple App Store or Google Play, both of which support purchase
          approval requirements for family accounts.
        </p>

        <h2>Reporting a concern</h2>
        <p>
          If you believe you've encountered content, behavior, or a
          security issue that endangers a child in connection with AI-LABZ,
          report it immediately to{" "}
          <a href="mailto:ailabzsupport@gmail.com?subject=Child%20safety%20report%20-%20AI-LABZ">
            ailabzsupport@gmail.com
          </a>
          . We review every report we receive, take appropriate action -
          up to and including removing access and reporting to law
          enforcement or the National Center for Missing &amp; Exploited
          Children (NCMEC) - and cooperate with law enforcement as
          required by applicable law.
        </p>

        <h2>Changes to this page</h2>
        <p>
          If AI-LABZ adds features that change how players can interact -
          for example, social or community features - we will update
          this page before those features launch, and revisit these
          standards accordingly.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about child safety in AI-LABZ? Email{" "}
          <a href="mailto:ailabzsupport@gmail.com">ailabzsupport@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
