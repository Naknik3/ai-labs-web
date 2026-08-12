import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import "./LegalPage.css";

export default function RestorePurchases() {
  return (
    <div className="legal">
      <Seo path="/restore-purchases" />
      <div className="legal__header">
        <h1>Restore Purchases</h1>
        <p className="legal__updated">Last updated August 12, 2026</p>
      </div>

      <div className="legal__doc">
        <h2>How your subscription is tied to your account</h2>
        <p>
          AI-LABZ PRO is billed and managed entirely through the Apple App
          Store or Google Play - never by us directly. Your subscription
          is tied to the Apple ID or Google account you purchased it
          with, not to AI-LABZ's device token, so it will reappear
          automatically whenever that same account signs in through the
          store on a device.
        </p>
        <p>
          Because AI-LABZ has no login of its own, restoring your
          subscription won't bring back a lab's buildings or progress from
          another device - game state is tied to the device token
          described in our <Link to="/privacy">Privacy Policy</Link>, not to
          your store account. Restoring purchases only reconnects your
          AI-LABZ PRO entitlement.
        </p>

        <h2>iOS - restore in AI-LABZ</h2>
        <ul>
          <li>Open AI-LABZ and go to Settings.</li>
          <li>Tap AI-LABZ PRO, then tap "Restore Purchases."</li>
          <li>Sign in with the Apple ID you originally subscribed with, if prompted.</li>
        </ul>
        <p>
          You can also manage or cancel your subscription directly: open
          the Settings app on your iPhone or iPad → tap your name → tap
          Subscriptions → select AI-LABZ PRO.
        </p>

        <h2>Android - restore in AI-LABZ</h2>
        <ul>
          <li>Open AI-LABZ and go to Settings.</li>
          <li>Tap AI-LABZ PRO, then tap "Restore Purchases."</li>
          <li>Make sure you're signed into the same Google account you subscribed with.</li>
        </ul>
        <p>
          You can also manage or cancel your subscription directly: open
          the Google Play Store app → tap your profile icon → Payments
          &amp; subscriptions → Subscriptions → select AI-LABZ PRO.
        </p>

        <h2>If restoring doesn't work</h2>
        <p>
          Double-check you're signed into the same Apple ID or Google
          account you used when you originally subscribed - this is the
          most common cause. If it still doesn't restore, email{" "}
          <a href="mailto:ailabzsupport@gmail.com?subject=Restore%20purchase%20issue%20-%20AI-LABZ">
            ailabzsupport@gmail.com
          </a>{" "}
          with your purchase receipt (from the App Store or Play Store)
          and we'll help sort it out.
        </p>

        <h2>Refunds</h2>
        <p>
          Refunds for App Store and Google Play purchases are handled by
          Apple and Google respectively, under their own refund policies -
          we don't have the ability to issue refunds directly. Request one
          through the App Store's "Report a Problem" page or Google Play's
          order history.
        </p>

        <h2>Contact us</h2>
        <p>
          Still stuck? Email{" "}
          <a href="mailto:ailabzsupport@gmail.com">ailabzsupport@gmail.com</a> and
          we'll help.
        </p>
      </div>
    </div>
  );
}
