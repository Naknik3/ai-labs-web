import Seo from "../components/Seo.jsx";
import "./LegalPage.css";

export default function Terms() {
  return (
    <div className="legal">
      <Seo path="/terms" />
      <div className="legal__header">
        <h1>Terms of Service</h1>
        <p className="legal__updated">Last updated September 28, 2026</p>
      </div>

      <div className="legal__doc">
        <h2>1. Acceptance of terms</h2>
        <p>
          By downloading, installing, or playing AI-LABZ (the "Game"), you
          agree to these Terms of Service. If you don't agree, please don't
          use the Game.
        </p>

        <h2>2. What AI-LABZ is</h2>
        <p>
          AI-LABZ is an idle AI research management game. The Game's server
          is the source of truth for your progress; the app on your phone
          is a presentation of that state. Features, balance, content, and
          pricing may change as the Game is developed.
        </p>

        <h2>3. Eligibility</h2>
        <p>
          AI-LABZ is not directed at children under 13. If you're under the
          age required by your local law to agree to these terms on your
          own, you should only use the Game with the involvement of a
          parent or guardian.
        </p>

        <h2>4. Your lab, your device token</h2>
        <p>
          AI-LABZ has no login. Your progress is tied to a device token
          generated on your device. If you lose or reset your device
          without transferring that token, you may lose access to your
          lab - we don't currently offer account recovery, because there's
          no account to recover.
        </p>

        <h2>5. License</h2>
        <p>
          We grant you a limited, non-exclusive, non-transferable,
          revocable license to install and play AI-LABZ on devices you own
          or control, for your personal, non-commercial entertainment. You
          may not copy, modify, decompile, reverse-engineer, distribute, or
          create derivative works from the Game, except where applicable
          law says we can't stop you.
        </p>

        <h2>6. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Cheat, exploit bugs, or use unauthorized third-party software to gain an unfair advantage;</li>
          <li>Interfere with or disrupt the Game's servers or other players' access;</li>
          <li>Attempt to gain unauthorized access to any part of the Game or its infrastructure;</li>
          <li>Give your lab a name that is hateful, sexual, harassing, or impersonates someone else - lab names are shown to other players on leaderboards;</li>
          <li>Use the Game for any unlawful purpose.</li>
        </ul>
        <p>
          We may suspend or reset a lab we reasonably believe is violating
          these terms, rename it, or remove it from a leaderboard and its
          prizes.
        </p>

        <h2>7. Virtual items, Cores and AI-LABZ PRO</h2>
        <p>
          AI-LABZ is free to play. It offers optional rewarded ads, optional
          one-time purchases (Cores, credit packs and bundles), and an
          optional subscription ("AI-LABZ PRO") with perks such as no
          interstitial ads, boosts without watching an ad, and shorter
          training cooldowns. All of them are billed and managed through the
          Apple App Store or Google Play.
        </p>
        <p>
          Cores are a premium in-game currency, spent in the Game on skins
          and credits. Cores, credits, chips, models, skins and every other
          in-game item have no real-world monetary value, cannot be redeemed
          for cash, and are not transferable outside the Game. Consumable
          purchases such as Cores and credit packs are used up when
          delivered and cannot be restored the way a subscription can.
        </p>
        <p>
          <strong>Prestige resets your lab.</strong> Prestiging at the Epoch
          Gate is always your choice, and it wipes the lab back to a new
          lab's state. Only cosmetics, such as skins, survive it. Credits,
          chips, models and other items from paid packs and bundles are
          wiped along with everything else, and the Game says so on the
          confirm screen before you prestige.
        </p>
        <p>
          Subscription pricing, renewal, and cancellation are governed by
          the terms of the store you subscribed through.
        </p>

        <h2>8. Third-party platforms</h2>
        <p>
          You access AI-LABZ through the Apple App Store or Google Play, and
          those platforms' own terms of service and payment terms apply
          alongside these terms whenever you install the Game or purchase
          AI-LABZ PRO through them.
        </p>

        <h2>9. Availability</h2>
        <p>
          AI-LABZ depends on our servers being up. We'll try to keep the
          Game available and your progress intact, but we don't guarantee
          uninterrupted access, and we may need to take the Game down
          temporarily for maintenance, or permanently if we discontinue it.
        </p>

        <h2>10. Disclaimers</h2>
        <p>
          The Game is provided "as is" and "as available," without
          warranties of any kind, express or implied, including
          merchantability, fitness for a particular purpose, and
          non-infringement, to the fullest extent permitted by law.
        </p>

        <h2>11. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, we won't be liable for
          any indirect, incidental, special, or consequential damages, or
          any loss of data or progress, arising from your use of the Game.
        </p>

        <h2>12. Termination</h2>
        <p>
          You can stop using the Game at any time by uninstalling it. We
          may suspend or terminate access to the Game, in whole or in
          part, for violation of these terms or for operational reasons.
        </p>

        <h2>13. Governing law</h2>
        <p>
          These terms are governed by the laws of{" "}
          <strong>[governing-law jurisdiction - fill this in]</strong>,
          without regard to conflict-of-law principles.
        </p>

        <h2>14. Severability</h2>
        <p>
          If any part of these terms is found unenforceable, the rest
          remains in full effect.
        </p>

        <h2>15. Entire agreement</h2>
        <p>
          These terms, together with our Privacy Policy, are the entire
          agreement between you and us about the Game, and replace any
          earlier agreements on the same subject.
        </p>

        <h2>16. Assignment</h2>
        <p>
          You may not assign or transfer these terms. We may assign these
          terms in connection with a merger, acquisition, or sale of
          assets.
        </p>

        <h2>17. Changes to these terms</h2>
        <p>
          We may update these terms as the Game evolves. Continuing to
          play after an update means you accept the revised terms. We'll
          update the "last updated" date above whenever we make changes.
        </p>

        <h2>18. Contact us</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href="mailto:ailabzsupport@gmail.com">ailabzsupport@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
