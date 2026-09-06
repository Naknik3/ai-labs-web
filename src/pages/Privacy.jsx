import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import "./LegalPage.css";

export default function Privacy() {
  return (
    <div className="legal">
      <Seo path="/privacy" />
      <div className="legal__header">
        <h1>Privacy Policy</h1>
        <p className="legal__updated">Last updated September 6, 2026</p>
      </div>

      <div className="legal__doc">
        <h2>Overview</h2>
        <p>
          AI-LABZ ("we", "us", "the game") is an idle AI research management
          game for iOS and Android. This policy explains what information
          the game - and this website - collect, why, who receives it, and
          what choices you have. AI-LABZ runs without an account or login,
          and this policy reflects that.
        </p>

        <h2>Information we collect</h2>
        <h3>Device token</h3>
        <p>
          When you first open AI-LABZ, the app generates a random device
          token and stores it on your device. That token - not your name,
          email, or any account - is how our server recognizes your lab. It
          is the only thing standing in for a login. There is no username,
          password, or personal profile to create.
        </p>
        <h3>Game state</h3>
        <p>
          Your lab's progress - resources, buildings, unlocked territory,
          trained models, incident history - is stored on our servers,
          associated with your device token, so your lab persists between
          sessions and survives app restarts.
        </p>
        <h3>Advertising and device identifiers</h3>
        <p>
          AI-LABZ shows ads through Google AdMob. To do that, the app reads
          your device's advertising identifier - the Android Advertising ID
          on Android, or the Identifier for Advertisers (IDFA) on iOS - and
          Google uses it to select ads, measure how they perform, and limit
          how often you see the same one. Depending on your settings and
          region, those ads may be personalized to you.
        </p>
        <p>
          We also use AppsFlyer to measure which ad or link led to your
          install, so we know where new players come from. AppsFlyer
          receives your advertising identifier and its own AppsFlyer ID, and
          may pass attribution signals back to the ad network that referred
          you.
        </p>
        <h3>Analytics, crash reports, and notifications</h3>
        <p>
          We use Firebase Analytics to understand how the game is played in
          aggregate - which screens are opened, which upgrades are bought,
          where players get stuck - and Firebase Crashlytics to receive
          crash reports and stability diagnostics when something goes
          wrong. Both are given a random installation identifier generated
          by Firebase. If you enable notifications, Firebase Cloud
          Messaging stores a push token for your device so we can send
          them.
        </p>
        <p>
          The gameplay events we send to Firebase Analytics are also
          mirrored to AppsFlyer, so our install attribution can be measured
          against what players actually do in the game. That mirror
          includes subscription events - when an AI-LABZ PRO subscription
          starts or lapses - but never any payment details.
        </p>
        <h3>Subscriptions</h3>
        <p>
          AI-LABZ PRO is billed by the App Store or Google Play and managed
          for us by RevenueCat. RevenueCat receives your device token as
          its user identifier, along with the purchase and renewal status
          reported by the store, so the game knows whether your
          subscription is active. Neither we nor RevenueCat ever see your
          card, bank, or store account details.
        </p>
        <h3>Technical and diagnostic data</h3>
        <p>
          Our backend logs the standard technical data needed to run the
          game and keep it stable, such as request timestamps and coarse
          error information. All traffic between the app and our servers is
          encrypted in transit.
        </p>
        <h3>This website</h3>
        <p>
          The site you're reading this on (the AI-LABZ marketing site) is a
          static page. It doesn't use cookies, doesn't run analytics, and
          doesn't set any tracking identifiers. Clicking a "get notified"
          link simply opens an email to us - we don't capture anything
          automatically.
        </p>

        <h2>What we don't collect</h2>
        <ul>
          <li>No name, email address, or phone number, unless you choose to email us</li>
          <li>No contacts, photos, microphone, or precise location</li>
          <li>No payment card details - subscriptions are handled entirely by the App Store / Google Play billing system, which we never see</li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To run your lab: save and load your progress, resources, and incidents.</li>
          <li>To keep the game fair and stable: prevent duplicate or conflicting progress across devices, debug crashes and errors.</li>
          <li>To show ads, which are how the game pays for itself, and to measure whether they worked.</li>
          <li>To understand in aggregate how the game is played, so we can balance and improve it.</li>
          <li>To know which campaign or link brought you to the game.</li>
          <li>To communicate with you only if you email us directly.</li>
        </ul>
        <p>
          We do not sell your personal information for money. We do share
          the identifiers described above with Google AdMob and AppsFlyer,
          who use them for advertising and attribution - under some privacy
          laws, including California's, that counts as "sharing" for
          cross-context behavioral advertising, and the controls below are
          how you opt out of it.
        </p>

        <h2>Third-party services</h2>
        <p>
          These are every service that receives data from AI-LABZ today. If
          we add another, we will list it here and change the "last
          updated" date above.
        </p>
        <ul>
          <li>
            <strong>Google AdMob</strong> - advertising.{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer noopener">Google Privacy Policy</a>
          </li>
          <li>
            <strong>Firebase Analytics, Crashlytics, and Cloud Messaging</strong>{" "}
            (Google) - analytics, crash reporting, notifications.{" "}
            <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noreferrer noopener">Firebase privacy</a>
          </li>
          <li>
            <strong>AppsFlyer</strong> - install attribution and marketing
            measurement.{" "}
            <a href="https://www.appsflyer.com/legal/services-privacy-policy/" target="_blank" rel="noreferrer noopener">AppsFlyer Privacy Policy</a>
          </li>
          <li>
            <strong>RevenueCat</strong> - subscription management.{" "}
            <a href="https://www.revenuecat.com/privacy/" target="_blank" rel="noreferrer noopener">RevenueCat Privacy Policy</a>
          </li>
          <li>
            <strong>Apple App Store and Google Play</strong> - distribution
            and billing, each governed by its own privacy policy.
          </li>
        </ul>

        <h2>How long we keep it</h2>
        <p>
          Your lab's game state is kept for as long as your device token is
          active, so you don't lose progress. You can ask us to delete it at
          any time - see <Link to="/delete-data">Delete your data</Link> for
          the steps and what gets removed.
        </p>

        <h2>International users</h2>
        <p>
          AI-LABZ's servers may process and store data in a different
          country than the one you're playing from, and the third-party
          services listed above operate internationally. By using the game,
          you understand your information may be transferred to and
          processed in those locations.
        </p>

        <h2>Children's privacy</h2>
        <p>
          AI-LABZ is not directed at children under 13, and we do not
          knowingly collect personal information from children under 13. If
          you believe a child has provided us information, contact us at
          the address below and we'll remove it.
        </p>

        <h2>Your choices</h2>
        <p>
          Because there's no account, there's nothing to "log out" of. The
          controls you do have:
        </p>
        <ul>
          <li>
            <strong>On Android:</strong> Settings → Privacy → Ads lets you
            delete or reset your advertising ID and opt out of ad
            personalization. Deleting it stops apps, including this one,
            from receiving an advertising identifier at all.
          </li>
          <li>
            <strong>On iOS:</strong> AI-LABZ asks for tracking permission
            the first time it loads ads. If you decline - or turn it off
            later under Settings → Privacy &amp; Security → Tracking - iOS
            withholds the IDFA and our advertising and attribution partners
            cannot read it.
          </li>
          <li>
            <strong>Notifications:</strong> turning them off in your device
            settings stops the push token from being used.
          </li>
          <li>
            <strong>Everything else:</strong> uninstalling the app and
            asking us to delete your data removes your lab entirely.
          </li>
        </ul>
        <p>
          If you're in a region with specific data rights (like the EU/UK's
          GDPR or California's CCPA), you can exercise them by emailing us
          at <a href="mailto:ailabzsupport@gmail.com">ailabzsupport@gmail.com</a>.
        </p>

        <h2>Security</h2>
        <p>
          We take reasonable technical measures to protect the data we
          store, but no system is perfectly secure, and we can't guarantee
          absolute security of information transmitted over the internet.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we materially change how AI-LABZ handles data - for example,
          when a new third-party service goes live - we'll update this page
          and change the "last updated" date above. Continuing to play
          after a change means you accept the updated policy.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy or your data? Email{" "}
          <a href="mailto:ailabzsupport@gmail.com">ailabzsupport@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
