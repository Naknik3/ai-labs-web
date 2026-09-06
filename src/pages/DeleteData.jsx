import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import "./LegalPage.css";

export default function DeleteData() {
  return (
    <div className="legal">
      <Seo path="/delete-data" />
      <div className="legal__header">
        <h1>Delete your AI-LABZ data</h1>
        <p className="legal__updated">Last updated September 6, 2026</p>
      </div>

      <div className="legal__doc">
        <h2>How to request deletion</h2>
        <p>
          AI-LABZ has no account and no login, so there is nothing to sign
          in to and delete. Instead, send us the device token your lab is
          stored under and we'll delete it.
        </p>
        <ul>
          <li>Open AI-LABZ and go to Settings.</li>
          <li>
            Tap <strong>Contact support</strong>. This opens your email app
            with your device token and lab ID already filled in, so you
            don't have to find them yourself.
          </li>
          <li>
            Change the subject to <strong>"Delete my AI-LABZ data"</strong>{" "}
            and send it.
          </li>
        </ul>
        <p>
          If you've already uninstalled the app, email{" "}
          <a href="mailto:ailabzsupport@gmail.com?subject=Delete%20my%20AI-LABZ%20data">
            ailabzsupport@gmail.com
          </a>{" "}
          with the same subject and tell us roughly when you last played and
          on what device - we'll find the lab from that.
        </p>
        <p>
          We delete the lab within 30 days of receiving the request and
          reply to confirm when it's done.
        </p>

        <h2>What gets deleted</h2>
        <ul>
          <li>Your device token and the lab it identifies.</li>
          <li>
            All game state tied to it: resources, buildings, unlocked
            territory, trained models, and incident history.
          </li>
          <li>Your notification push token, if you enabled notifications.</li>
        </ul>

        <h2>What we keep, and for how long</h2>
        <ul>
          <li>
            <strong>Backend logs</strong> - request timestamps and coarse
            error information, retained up to 90 days for security and
            debugging, then deleted on a rolling basis. These are not tied
            to a deleted lab in any way we can search after the fact.
          </li>
          <li>
            <strong>Purchase records</strong> - the App Store and Google
            Play keep their own record of any AI-LABZ PRO subscription for
            tax and refund purposes. That record is theirs, not ours, and we
            cannot delete it. Manage or cancel a subscription through your
            store account.
          </li>
          <li>
            <strong>Aggregate analytics</strong> - counts and trends that
            can no longer be traced back to an individual device.
          </li>
        </ul>

        <h2>Third-party data</h2>
        <p>
          Advertising and measurement partners hold identifiers we don't
          control - see{" "}
          <Link to="/privacy">Third-party services</Link> in our Privacy
          Policy for who they are. To cut those off, delete or reset your
          advertising ID on Android (Settings → Privacy → Ads), or turn off
          tracking on iOS (Settings → Privacy &amp; Security → Tracking).
          Uninstalling AI-LABZ stops any further collection.
        </p>

        <h2>Questions</h2>
        <p>
          Email{" "}
          <a href="mailto:ailabzsupport@gmail.com">ailabzsupport@gmail.com</a>{" "}
          and we'll help.
        </p>
      </div>
    </div>
  );
}
