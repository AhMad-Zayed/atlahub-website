import LegalLayout from '../../components/Layout/LegalLayout';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Atla Hub Tech Privacy Policy. Learn how AtlaHub collects, uses, and protects your data, including information on cookies and third-party integrations with Meta and TikTok.',
};

const SECTIONS = [
  { id: 'overview',         label: '1. Overview' },
  { id: 'data-collected',   label: '2. Data We Collect' },
  { id: 'how-we-use',       label: '3. How We Use Your Data' },
  { id: 'legal-basis',      label: '4. Legal Basis for Processing' },
  { id: 'cookies',          label: '5. Cookies & Tracking' },
  { id: 'third-parties',    label: '6. Third-Party Integrations' },
  { id: 'data-sharing',     label: '7. How We Share Data' },
  { id: 'data-retention',   label: '8. Data Retention' },
  { id: 'security',         label: '9. Data Security' },
  { id: 'your-rights',      label: '10. Your Rights' },
  { id: 'international',    label: '11. International Transfers' },
  { id: 'children',         label: '12. Children\'s Privacy' },
  { id: 'dnt',              label: '13. Do Not Track' },
  { id: 'changes',          label: '14. Policy Updates' },
  { id: 'contact',          label: '15. Contact Us' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information."
      lastUpdated="July 22, 2026"
      sections={SECTIONS}
    >
      {/* ── 1. OVERVIEW ── */}
      <section id="overview">
        <h2>1. Overview</h2>
        <p>
          Atla Hub Tech ("AtlaHub," "we," "our," or "us") is committed to protecting the privacy and
          security of the personal data we process. This Privacy Policy describes how we collect,
          use, disclose, and safeguard information when you visit our website, create an account, or
          use the AtlaHub platform and related services (collectively, the "Service").
        </p>
        <p>
          This policy applies to all users of our Service, including business account administrators,
          team agents, and visitors to our marketing website. If you are a business customer using
          AtlaHub to manage communications with your own end customers, please note that AtlaHub
          acts as a <strong>data processor</strong> on your behalf for your customers' data, and you
          remain the <strong>data controller</strong> responsible for that data.
        </p>
        <p>
          By using the Service, you acknowledge that you have read and understood this Privacy
          Policy. If you do not agree, please discontinue your use of the Service.
        </p>
      </section>

      <hr />

      {/* ── 2. DATA COLLECTED ── */}
      <section id="data-collected">
        <h2>2. Data We Collect</h2>
        <p>We collect the following categories of information:</p>

        <h3>2.1 Account & Identity Data</h3>
        <ul>
          <li>Name, email address, phone number, and job title provided during registration</li>
          <li>Company name, billing address, and VAT/tax identification number (for invoicing)</li>
          <li>Password (stored in hashed, salted form — never in plain text)</li>
          <li>Profile photo (if voluntarily uploaded)</li>
        </ul>

        <h3>2.2 Usage & Platform Data</h3>
        <ul>
          <li>Feature usage patterns, page views, and session activity within the platform</li>
          <li>API request logs (endpoint, timestamp, response code, volume)</li>
          <li>Conversation metadata (timestamps, channel source, agent assignment, resolution status)</li>
          <li>System logs and error reports generated during your use of the Service</li>
          <li>Device information, browser type, operating system, and IP address</li>
        </ul>

        <h3>2.3 Communications Data</h3>
        <p>
          When you use AtlaHub's omnichannel inbox, the content of customer messages received via
          connected channels (WhatsApp, Facebook Messenger, Instagram Direct, TikTok) is processed
          and stored within our platform to enable you to respond to, manage, and analyze those
          communications. This content is Customer Data controlled by you; we process it solely on
          your instructions.
        </p>

        <h3>2.4 Payment Data</h3>
        <p>
          We collect billing information necessary to process payments. Full payment card details are
          never stored on AtlaHub's servers — they are handled directly by our PCI-compliant
          third-party payment processor (e.g., Stripe). We only retain the last four digits of your
          card, card type, expiration date, and billing address for reference.
        </p>

        <h3>2.5 Marketing & Communication Preferences</h3>
        <ul>
          <li>Email marketing opt-in/opt-out status</li>
          <li>Communication preferences and language settings</li>
          <li>Records of your correspondence with our support team</li>
        </ul>

        <h3>2.6 Data Collected Automatically</h3>
        <p>
          We use cookies, pixel tags, and similar technologies to automatically collect certain
          information when you access our website or Service. See Section 5 (Cookies & Tracking)
          for full details.
        </p>
      </section>

      <hr />

      {/* ── 3. HOW WE USE DATA ── */}
      <section id="how-we-use">
        <h2>3. How We Use Your Data</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>
            <strong>Service Delivery:</strong> To create and manage your account, provide access to
            the platform, process transactions, and deliver customer support.
          </li>
          <li>
            <strong>Platform Improvement:</strong> To analyze usage patterns, identify bugs, develop
            new features, and improve the overall quality and performance of the Service.
          </li>
          <li>
            <strong>Security & Fraud Prevention:</strong> To detect, investigate, and prevent
            fraudulent activity, abuse, unauthorized access, and other security threats.
          </li>
          <li>
            <strong>Communications:</strong> To send you transactional emails (account confirmations,
            invoices, password resets), product updates, and — with your consent — marketing
            communications.
          </li>
          <li>
            <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal
            processes, and law enforcement requests.
          </li>
          <li>
            <strong>Analytics & Reporting:</strong> To generate aggregated, anonymized insights
            about usage trends. Such aggregated data cannot be used to identify you personally.
          </li>
          <li>
            <strong>AI-Assisted Features:</strong> Where you opt into AI-powered features (e.g.,
            suggested replies, sentiment analysis), your conversation data may be processed by
            machine learning models operating on our infrastructure. We do not use your Customer
            Data to train external AI models.
          </li>
        </ul>
      </section>

      <hr />

      {/* ── 4. LEGAL BASIS ── */}
      <section id="legal-basis">
        <h2>4. Legal Basis for Processing (GDPR)</h2>
        <p>
          For users in the European Economic Area (EEA), United Kingdom, or other jurisdictions
          with similar laws, our legal basis for processing personal data is as follows:
        </p>
        <ul>
          <li>
            <strong>Contract Performance:</strong> Processing necessary to perform our contract with
            you, including providing the Service, managing your account, and processing payments.
          </li>
          <li>
            <strong>Legitimate Interests:</strong> Processing necessary for our legitimate interests,
            such as improving the Service, preventing fraud, and ensuring platform security, where
            these interests are not overridden by your data protection rights.
          </li>
          <li>
            <strong>Legal Obligation:</strong> Processing necessary to comply with legal obligations
            to which AtlaHub is subject.
          </li>
          <li>
            <strong>Consent:</strong> Where you have given us specific, informed consent — for
            example, for marketing emails. You may withdraw consent at any time without affecting
            the lawfulness of prior processing.
          </li>
        </ul>
      </section>

      <hr />

      {/* ── 5. COOKIES ── */}
      <section id="cookies">
        <h2>5. Cookies & Tracking Technologies</h2>
        <h3>5.1 What Are Cookies?</h3>
        <p>
          Cookies are small text files placed on your device by websites you visit. They are widely
          used to make websites work efficiently, remember your preferences, and provide analytical
          information to site owners.
        </p>
        <h3>5.2 Types of Cookies We Use</h3>
        <ul>
          <li>
            <strong>Strictly Necessary Cookies:</strong> Required for the Service to function (e.g.,
            session authentication, load balancing). These cannot be disabled.
          </li>
          <li>
            <strong>Performance & Analytics Cookies:</strong> Help us understand how users interact
            with the Service (e.g., Google Analytics). Data is aggregated and anonymized where
            possible.
          </li>
          <li>
            <strong>Functional Cookies:</strong> Remember your preferences (e.g., language, timezone,
            dashboard layout) to improve your experience.
          </li>
          <li>
            <strong>Marketing & Retargeting Cookies:</strong> Used on our marketing website (not the
            SaaS platform) to deliver relevant advertisements. These may include cookies set by
            Meta (Facebook Pixel) and TikTok (TikTok Pixel). See Section 6 for details.
          </li>
        </ul>
        <h3>5.3 Cookie Consent & Management</h3>
        <p>
          When you first visit our marketing website, we display a cookie consent banner. You can
          accept or decline non-essential cookies. You can also manage cookie preferences at any
          time through your browser settings, by clearing cookies, or by using our Cookie Preference
          Center (where available). Note that disabling certain cookies may affect the functionality
          of the Service.
        </p>
        <h3>5.4 Do Not Track</h3>
        <p>
          Some browsers offer a "Do Not Track" (DNT) signal. We honor browser-level opt-out signals
          for analytics cookies where technically feasible. See Section 13 for more detail.
        </p>
      </section>

      <hr />

      {/* ── 6. THIRD-PARTY INTEGRATIONS ── */}
      <section id="third-parties">
        <h2>6. Third-Party Integrations & Data Sharing</h2>
        <p>
          AtlaHub's core value is integrating with third-party messaging platforms on your behalf.
          This section explains how each integration affects data privacy.
        </p>

        <h3>6.1 Meta (WhatsApp Business API, Facebook Messenger, Instagram Direct)</h3>
        <p>
          When you connect your Meta Business accounts to AtlaHub, you authorize us to access and
          process messages exchanged between your business and your end customers via the Meta
          platform APIs. The following data flows apply:
        </p>
        <ul>
          <li>Message content, media attachments, timestamps, and sender identifiers (e.g., phone numbers for WhatsApp, user IDs for Facebook/Instagram) are received by AtlaHub and stored in your workspace.</li>
          <li>AtlaHub does not sell or independently use this message data. It is processed solely to power your inbox, automation workflows, and analytics within the platform.</li>
          <li>Your use of these integrations is also subject to <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta's Privacy Policy</a> and the relevant platform terms.</li>
          <li>AtlaHub participates in Meta's official partner programs and adheres to Meta's data handling requirements for API partners.</li>
        </ul>

        <h3>6.2 TikTok Messaging API</h3>
        <p>
          When you connect a TikTok Business account to AtlaHub, we access TikTok Direct Messages
          through TikTok's official API. The following data flows apply:
        </p>
        <ul>
          <li>Message content, sender identifiers, and timestamps are received and stored in your AtlaHub workspace.</li>
          <li>This data is processed solely to deliver the inbox functionality you have requested. AtlaHub does not share TikTok conversation data with any third parties beyond those necessary to operate the Service (e.g., our cloud hosting provider).</li>
          <li>Your use of this integration is also subject to <a href="https://www.tiktok.com/legal/page/global/privacy-policy/en" target="_blank" rel="noopener noreferrer">TikTok's Privacy Policy</a> and Developer Terms.</li>
        </ul>

        <h3>6.3 Marketing Pixels (Meta Pixel & TikTok Pixel)</h3>
        <p>
          On our <strong>marketing website</strong> (atlahub.com), we may use the Meta Pixel
          (Facebook Pixel) and TikTok Pixel to measure the effectiveness of our advertising
          campaigns and to deliver relevant ads to visitors. These pixels may collect:
        </p>
        <ul>
          <li>Your IP address and browser user agent</li>
          <li>Pages visited and actions taken on our marketing website (e.g., viewed pricing page, started free trial)</li>
          <li>Hashed email address (if provided during sign-up) for ad matching purposes</li>
        </ul>
        <p>
          You can opt out of these marketing pixels via our Cookie Preference Center or by using
          platform-level ad controls (e.g., Facebook Ad Preferences, TikTok Privacy Settings).
          These pixels are <strong>not active</strong> within the SaaS platform itself — only on
          our public marketing website.
        </p>

        <h3>6.4 Other Third-Party Service Providers</h3>
        <p>We work with carefully vetted third-party vendors to operate the Service, including:</p>
        <ul>
          <li><strong>Cloud Infrastructure:</strong> Cloud hosting and storage providers (e.g., AWS, Google Cloud) for secure data hosting.</li>
          <li><strong>Payment Processing:</strong> PCI-compliant payment processors (e.g., Stripe) for subscription billing.</li>
          <li><strong>Email Delivery:</strong> Transactional email providers (e.g., SendGrid) for system notifications.</li>
          <li><strong>Analytics:</strong> Analytics platforms (e.g., Google Analytics) for website performance measurement.</li>
          <li><strong>Customer Support Tools:</strong> Helpdesk software used by our support team to manage your support tickets.</li>
        </ul>
        <p>All third-party processors are bound by data processing agreements ensuring they handle your data in compliance with applicable privacy law.</p>
      </section>

      <hr />

      {/* ── 7. DATA SHARING ── */}
      <section id="data-sharing">
        <h2>7. How We Share Your Data</h2>
        <p>
          AtlaHub does <strong>not sell</strong> your personal data to any third party. We share
          data only in the following limited circumstances:
        </p>
        <ul>
          <li><strong>Service Providers:</strong> With vetted sub-processors who provide infrastructure, payment, and operational services (see Section 6.4).</li>
          <li><strong>Third-Party Channel APIs:</strong> Data exchanged with Meta and TikTok APIs as part of the core integration functionality you explicitly requested.</li>
          <li><strong>Legal Requirements:</strong> When required by applicable law, court order, or governmental authority, to the extent permitted by law.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of substantially all of our assets, provided the acquiring entity agrees to honor this Privacy Policy.</li>
          <li><strong>With Your Consent:</strong> For any other purpose with your explicit prior consent.</li>
        </ul>
      </section>

      <hr />

      {/* ── 8. DATA RETENTION ── */}
      <section id="data-retention">
        <h2>8. Data Retention</h2>
        <p>
          We retain personal data for as long as necessary to fulfill the purposes described in this
          Privacy Policy, unless a longer retention period is required or permitted by law.
          Specifically:
        </p>
        <ul>
          <li><strong>Account Data:</strong> Retained for the duration of your subscription and for up to 3 years after account closure for legal and audit purposes.</li>
          <li><strong>Conversation & Message Data (Customer Data):</strong> Retained for the duration of your subscription. Following account termination, data is available for export for 30 days, after which it is permanently deleted from our live systems within 90 days.</li>
          <li><strong>Payment Records:</strong> Retained for 7 years to comply with financial and tax regulations.</li>
          <li><strong>Usage Logs:</strong> Retained for up to 12 months for security and performance analysis.</li>
          <li><strong>Marketing Data:</strong> Retained until you withdraw consent or opt out, after which your email is added to a suppression list.</li>
        </ul>
      </section>

      <hr />

      {/* ── 9. SECURITY ── */}
      <section id="security">
        <h2>9. Data Security</h2>
        <p>
          AtlaHub implements industry-standard technical and organizational security measures to
          protect your data, including:
        </p>
        <ul>
          <li><strong>Encryption in Transit:</strong> All data transmitted between your browser/clients and our servers is encrypted using TLS 1.2 or higher.</li>
          <li><strong>Encryption at Rest:</strong> Sensitive data and Customer Data stores are encrypted at rest using AES-256.</li>
          <li><strong>Access Controls:</strong> Role-based access control (RBAC) limits internal access to personal data to authorized personnel with a legitimate business need.</li>
          <li><strong>Security Audits:</strong> We conduct periodic vulnerability assessments and security reviews of our infrastructure and third-party dependencies.</li>
          <li><strong>Incident Response:</strong> We maintain an incident response plan and will notify affected Customers of any personal data breaches in accordance with applicable law (typically within 72 hours for GDPR-covered breaches).</li>
        </ul>
        <p>
          While we employ robust security practices, no method of electronic storage or transmission
          is 100% secure. You acknowledge that you transmit data at your own risk and are responsible
          for protecting your account credentials.
        </p>
      </section>

      <hr />

      {/* ── 10. YOUR RIGHTS ── */}
      <section id="your-rights">
        <h2>10. Your Privacy Rights</h2>
        <p>
          Depending on your location, you may have the following rights regarding your personal data:
        </p>
        <ul>
          <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal data, subject to certain legal exceptions.</li>
          <li><strong>Right to Restriction:</strong> Request that we restrict the processing of your data in certain circumstances.</li>
          <li><strong>Right to Data Portability:</strong> Receive your personal data in a structured, machine-readable format and transfer it to another controller.</li>
          <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or for direct marketing purposes.</li>
          <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent, without affecting the lawfulness of prior processing.</li>
          <li><strong>Rights under CCPA (California Residents):</strong> The right to know what personal information is collected, sold, or disclosed; the right to opt out of the sale of personal information; and the right to non-discrimination for exercising your privacy rights. AtlaHub does not sell personal information.</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{' '}
          <a href="mailto:app.support@atlahub.tech">app.support@atlahub.tech</a>. We will respond within 30 days
          (or within the timeframe required by applicable law). We may ask you to verify your
          identity before processing your request.
        </p>
      </section>

      <hr />

      {/* ── 11. INTERNATIONAL TRANSFERS ── */}
      <section id="international">
        <h2>11. International Data Transfers</h2>
        <p>
          AtlaHub operates globally. Your data may be transferred to and processed in countries other
          than your country of residence, including countries that may not provide the same level of
          data protection as your home country.
        </p>
        <p>
          Where we transfer personal data from the EEA, UK, or Switzerland to countries outside
          these regions, we rely on one or more of the following transfer mechanisms:
        </p>
        <ul>
          <li>European Commission Standard Contractual Clauses (SCCs)</li>
          <li>Adequacy decisions made by the European Commission</li>
          <li>Other legally recognized transfer mechanisms under applicable law</li>
        </ul>
        <p>
          You may request a copy of the relevant transfer safeguards by contacting us at{' '}
          <a href="mailto:app.support@atlahub.tech">app.support@atlahub.tech</a>.
        </p>
      </section>

      <hr />

      {/* ── 12. CHILDREN ── */}
      <section id="children">
        <h2>12. Children's Privacy</h2>
        <p>
          The AtlaHub Service is designed for business use and is not directed at children under
          the age of 16 (or the applicable age of digital consent in your jurisdiction). We do not
          knowingly collect personal data from children. If you believe we have inadvertently
          collected information from a child, please contact us immediately at{' '}
          <a href="mailto:app.support@atlahub.tech">app.support@atlahub.tech</a> and we will promptly delete
          such information.
        </p>
      </section>

      <hr />

      {/* ── 13. DNT ── */}
      <section id="dnt">
        <h2>13. Do Not Track Signals</h2>
        <p>
          Some web browsers and mobile operating systems include a Do Not Track ("DNT") feature that
          signals your preference to not have your online activities tracked. There is currently no
          uniform standard for DNT signals that we are legally required to honor. However, we do
          offer opt-out mechanisms for non-essential cookies through our Cookie Preference Center.
          Please see Section 5 for details.
        </p>
      </section>

      <hr />

      {/* ── 14. CHANGES ── */}
      <section id="changes">
        <h2>14. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices,
          technologies, legal requirements, or other factors. When we make material changes, we will:
        </p>
        <ul>
          <li>Update the "Last Updated" date at the top of this page</li>
          <li>Send a notification email to registered account holders</li>
          <li>Display a prominent banner on the Service for a period of time</li>
        </ul>
        <p>
          We encourage you to review this Privacy Policy periodically. Your continued use of the
          Service after any changes become effective constitutes your acceptance of the revised
          policy.
        </p>
      </section>

      <hr />

      {/* ── 15. CONTACT ── */}
      <section id="contact">
        <h2>15. Contact Us & Data Protection Officer</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our
          privacy practices, please contact us:
        </p>
        <ul>
          <li><strong>Privacy / Data Protection Inquiries:</strong> <a href="mailto:app.support@atlahub.tech">app.support@atlahub.tech</a></li>
          <li><strong>Company:</strong> Atla Hub Tech</li>
          <li><strong>Website:</strong> <a href="https://atlahub.com">atlahub.com</a></li>
        </ul>
        <p>
          If you are located in the EEA or UK and believe your data protection rights have been
          violated, you also have the right to lodge a complaint with your local supervisory
          authority (e.g., the ICO in the UK, or the relevant national data protection authority
          in your EU member state).
        </p>
        <p>We aim to respond to all privacy-related inquiries within <strong>30 days</strong>.</p>
      </section>
    </LegalLayout>
  );
}
