import "./LegalPage.css";

export default function Privacy() {
  return (
    <div className="legal">
      <div className="legal__header">
        <h1>Privacy Policy</h1>
        <p className="legal__updated">Last updated August 12, 2026</p>
      </div>

      <div className="legal__notice">
        <strong>Before you publish this:</strong> this is a working draft
        written to match how AI LAB actually handles data today. It isn't
        legal advice. Have a lawyer review it — especially the sections on
        children's privacy, advertising/analytics, and regional rights
        (GDPR, CCPA, and similar) — before it goes live for real users.
      </div>

      <div className="legal__doc">
        <h2>Overview</h2>
        <p>
          AI LAB ("we", "us", "the game") is an idle AI research management
          game for iOS and Android. This policy explains what information
          the game collects, why, and what choices you have. We built AI LAB
          to run without an account or login — this policy reflects that.
        </p>

        <h2>Information we collect</h2>
        <h3>Device token</h3>
        <p>
          When you first open AI LAB, the app generates a random device
          token and stores it on your device. That token — not your name,
          email, or any account — is how our server recognizes your lab. It
          is the only thing standing in for a login. There is no
          username, password, or personal profile to create.
        </p>
        <h3>Game state</h3>
        <p>
          Your lab's progress — resources, buildings, unlocked territory,
          trained models, incident history — is stored on our servers,
          associated with your device token, so your lab persists between
          sessions and survives app restarts.
        </p>
        <h3>Technical and diagnostic data</h3>
        <p>
          Our backend logs standard technical data needed to run the game
          and keep it stable, such as request timestamps and coarse error
          information. We do not currently run analytics, crash reporting,
          or advertising SDKs. If we turn on tools like Firebase Analytics,
          AdMob, or a subscription platform (RevenueCat) for AI LAB PRO in
          the future, we will update this policy before they collect any
          data, and — where those tools have their own settings — give you
          a way to opt out of non-essential tracking.
        </p>

        <h2>What we don't collect</h2>
        <ul>
          <li>No name, email address, or phone number</li>
          <li>No contacts, photos, or precise location</li>
          <li>No payment card details (a future subscription would be handled entirely by the App Store / Google Play billing system, which we never see)</li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To run your lab: save and load your progress, resources, and incidents.</li>
          <li>To keep the game fair and stable: prevent duplicate or conflicting progress across devices, debug issues.</li>
          <li>To communicate with you only if you email us directly.</li>
        </ul>
        <p>We do not sell personal information, and we do not share your data with third parties for their own marketing purposes.</p>

        <h2>How long we keep it</h2>
        <p>
          Your lab's game state is kept for as long as your device token is
          active, so you don't lose progress. If you'd like your data
          deleted — for example, because you're switching devices and don't
          want your old lab around, or you simply want it gone — email us at{" "}
          <a href="mailto:guylhass@gmail.com">guylhass@gmail.com</a> and
          we'll delete the lab tied to your device token.
        </p>

        <h2>Children's privacy</h2>
        <p>
          AI LAB is not directed at children under 13, and we do not
          knowingly collect personal information from children under 13. If
          you believe a child has provided us information, contact us at
          the address below and we'll remove it.
        </p>

        <h2>Your choices</h2>
        <p>
          Because there's no account, there's nothing to "log out" of.
          Uninstalling the app and asking us to delete your data (above)
          removes your lab entirely. If you're in a region with specific
          data rights (like the EU/UK's GDPR or California's CCPA), you can
          exercise them the same way — by emailing us.
        </p>

        <h2>Security</h2>
        <p>
          We take reasonable technical measures to protect the data we
          store, but no system is perfectly secure, and we can't guarantee
          absolute security of information transmitted over the internet.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we materially change how AI LAB handles data — for example,
          when analytics, ads, or subscriptions go live — we'll update this
          page and change the "last updated" date above.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy or your data? Email{" "}
          <a href="mailto:guylhass@gmail.com">guylhass@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
