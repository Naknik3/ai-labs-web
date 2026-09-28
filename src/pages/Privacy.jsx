import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import "./LegalPage.css";

export default function Privacy() {
  return (
    <div className="legal">
      <Seo path="/privacy" />
      <div className="legal__header">
        <h1>Privacy Policy</h1>
        <p className="legal__updated">Last updated September 28, 2026</p>
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
        <p>
          AI-LABZ is made by <strong>G.L.H Development</strong>, based in
          Israel, which is the controller of the personal data described
          here. Contact:{" "}
          <a href="mailto:ailabzsupport@gmail.com">ailabzsupport@gmail.com</a>.
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
        <h3>Lab name and leaderboards</h3>
        <p>
          Your lab has a name. Until you choose one it is a generated
          placeholder; you can rename it in the game. The name, your weekly
          score and your rank are shown to other players on the weekly
          leaderboards and in Lab Raid standings. Don't put your real name
          or anything personal in it. Names that break our rules on slurs,
          hate or sexual content are rejected.
        </p>
        <h3>Advertising and device identifiers</h3>
        <p>
          AI-LABZ shows ads through Google AdMob. AdMob also runs mediation,
          which lets Meta Audience Network and AppLovin compete to fill the
          same ad slot. To do that, the app reads your device's advertising
          identifier - the Android Advertising ID on Android, or the
          Identifier for Advertisers (IDFA) on iOS, only if you allow
          tracking - and the ad network that
          serves an ad uses it to select ads, measure how they perform, and
          limit how often you see the same one. Depending on your settings
          and region, those ads may be personalized to you.
        </p>
        <p>
          We also use AppsFlyer to measure which ad or link led to your
          install, so we know where new players come from. AppsFlyer
          receives your advertising identifier (if available), the device's
          vendor identifier (IDFV on iOS), its own AppsFlyer ID, and an
          identifier for your lab, and may pass attribution signals back to
          the ad network that referred you. We store the attribution result
          (which network or campaign brought you) with your lab.
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
        <h3>Purchases and subscriptions</h3>
        <p>
          In-app purchases - AI-LABZ PRO (monthly or lifetime), Cores,
          credit packs and bundles - are billed by the App Store or Google
          Play and managed for us by RevenueCat. RevenueCat receives an
          identifier for your device and your lab ID, the purchase and
          renewal status reported by the store, and ad revenue events, so
          the game knows what you bought and whether PRO is active. Neither
          we nor RevenueCat ever see your card, bank, or store account
          details.
        </p>
        <h3>Technical and diagnostic data</h3>
        <p>
          Our backend logs the technical data needed to run the game and
          keep it stable: request timestamps, your IP address, your lab ID,
          and coarse error information. We look up your country from your
          IP address on our own server (no third party is involved) and
          store it with your lab and in analytics, to understand where
          players are. Server errors are reported to Sentry. All traffic
          between the app and our servers is encrypted in transit.
        </p>
        <h3>This website</h3>
        <p>
          The site you're reading this on (the AI-LABZ marketing site) is
          hosted on Vercel, which receives your IP address to serve it. It uses
          Google Analytics 4 to count visits and see which pages and store
          buttons get used. Google Analytics sets first-party cookies and
          receives your IP address, browser and device type, and the pages
          you view. We use it only in aggregate and don't combine it with
          your game data. You can block it with your browser's cookie or
          tracking settings, or with Google's{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer noopener">opt-out add-on</a>.
        </p>

        <h2>What we don't collect</h2>
        <ul>
          <li>No name, email address, or phone number, unless you choose to email us</li>
          <li>No contacts, photos, microphone, or precise location (only the country, from your IP address)</li>
          <li>No payment card details - purchases are handled entirely by the App Store / Google Play billing system, which we never see</li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To run your lab: save and load your progress, resources, and incidents.</li>
          <li>To run the weekly leaderboards and Lab Raids: rank labs and pay out prizes.</li>
          <li>To keep the game fair and stable: prevent duplicate or conflicting progress across devices, debug crashes and errors.</li>
          <li>To show ads, which are how the game pays for itself, and to measure whether they worked.</li>
          <li>To understand in aggregate how the game is played, so we can balance and improve it.</li>
          <li>To know which campaign or link brought you to the game.</li>
          <li>To communicate with you only if you email us directly.</li>
        </ul>
        <p>
          We do not sell your personal information for money. We do share
          the identifiers described above with Google AdMob, its mediation
          partners Meta Audience Network and AppLovin, and AppsFlyer, who
          use them for advertising and attribution - under some privacy
          laws, including California's, that counts as "sharing" for
          cross-context behavioral advertising, and the controls below are
          how you opt out of it.
        </p>

        <h2>Legal bases (EU/UK players)</h2>
        <ul>
          <li><strong>Performance of our agreement with you</strong> - running your lab, leaderboards, raids and purchases.</li>
          <li><strong>Legitimate interests</strong> - security, fraud and cheat prevention, crash reports, and aggregate game analytics that help us fix and balance the game.</li>
          <li><strong>Consent</strong> - personalized ads, install attribution and non-essential cookies. You can withdraw consent at any time through Ad Privacy Choices in the game's Settings or your device settings.</li>
          <li><strong>Legal obligation</strong> - keeping records the law requires, such as purchase and tax records.</li>
        </ul>

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
            <strong>Meta Audience Network</strong> - advertising, via AdMob
            mediation.{" "}
            <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer noopener">Meta Privacy Policy</a>
          </li>
          <li>
            <strong>AppLovin</strong> - advertising, via AdMob mediation.{" "}
            <a href="https://www.applovin.com/privacy/" target="_blank" rel="noreferrer noopener">AppLovin Privacy Policy</a>
          </li>
          <li>
            <strong>Google Analytics</strong> - visit statistics for this
            website only.{" "}
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
            <strong>RevenueCat</strong> - purchase and subscription management.{" "}
            <a href="https://www.revenuecat.com/privacy/" target="_blank" rel="noreferrer noopener">RevenueCat Privacy Policy</a>
          </li>
          <li>
            <strong>Sentry</strong> - server error monitoring.{" "}
            <a href="https://sentry.io/privacy/" target="_blank" rel="noreferrer noopener">Sentry Privacy Policy</a>
          </li>
          <li>
            <strong>Hostinger</strong> - hosts the game's servers and database.{" "}
            <a href="https://www.hostinger.com/privacy-policy" target="_blank" rel="noreferrer noopener">Hostinger Privacy Policy</a>
          </li>
          <li>
            <strong>Cloudflare R2</strong> - stores encrypted database backups.{" "}
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer noopener">Cloudflare Privacy Policy</a>
          </li>
          <li>
            <strong>Vercel</strong> - hosts this website.{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer noopener">Vercel Privacy Policy</a>
          </li>
          <li>
            <strong>Apple App Store and Google Play</strong> - distribution
            and billing, each governed by its own privacy policy.
          </li>
        </ul>

        <h2>How long we keep it</h2>
        <ul>
          <li><strong>Lab and game state</strong> - while you keep playing. A lab untouched for 24 months may be deleted. You can ask us to delete it at any time - see <Link to="/delete-data">Delete your data</Link>.</li>
          <li><strong>Server logs</strong> - up to 90 days.</li>
          <li><strong>Backups</strong> - up to 6 months, then overwritten.</li>
          <li><strong>Leaderboard entries</strong> - 30 days after the week closes; prize receipts stay with your lab.</li>
          <li><strong>Emails to support</strong> - as long as needed to answer you, then up to 2 years.</li>
          <li><strong>Third parties</strong> - under their own retention settings, linked above.</li>
        </ul>

        <h2>International transfers</h2>
        <p>
          We are based in Israel, which the European Commission recognizes
          as providing adequate protection for personal data. Some of the
          services listed above process data in the United States and other
          countries; where they receive data from the EU or UK, they rely on
          the European Commission's Standard Contractual Clauses or the
          EU-U.S. Data Privacy Framework.
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
        <h2>Your rights</h2>
        <p>
          Depending on where you live (for example under the EU/UK GDPR,
          Israel's Privacy Protection Law, or California's CCPA), you can ask
          us to:
        </p>
        <ul>
          <li>tell you what data we hold about your lab and give you a copy;</li>
          <li>correct it or delete it;</li>
          <li>restrict or object to how we use it, including for analytics or advertising;</li>
          <li>send it to you in a portable format;</li>
          <li>withdraw consent you gave, at any time, without affecting what happened before.</li>
        </ul>
        <p>
          Email <a href="mailto:ailabzsupport@gmail.com">ailabzsupport@gmail.com</a>{" "}
          with the Lab and Ref lines from the game's Contact support email so
          we can find your lab. We answer within 30 days. We won't treat you
          differently for using these rights. You also have the right to
          complain to your local data protection authority - in the EU, the
          one in your country; in Israel, the Privacy Protection Authority.
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
