import LegalLayout from '@/components/Layout/LegalLayout';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata() {
  return {
    title: 'Privacy Policy | Atla Hub Tech',
    description:
      'Read the Atla Hub Tech Privacy Policy. Learn how we collect, use, and protect your data, including our use of cookies and third-party integrations with Meta and TikTok.',
  };
}

const SECTIONS = [
  { id: 'overview',       label: '1. Overview' },
  { id: 'data-collected', label: '2. Data We Collect' },
  { id: 'how-we-use',    label: '3. How We Use Your Data' },
  { id: 'legal-basis',   label: '4. Legal Basis (GDPR)' },
  { id: 'cookies',        label: '5. Cookies & Tracking' },
  { id: 'third-parties', label: '6. Third-Party Integrations' },
  { id: 'data-sharing',  label: '7. How We Share Data' },
  { id: 'data-retention', label: '8. Data Retention' },
  { id: 'security',       label: '9. Data Security' },
  { id: 'your-rights',   label: '10. Your Rights' },
  { id: 'international', label: '11. International Transfers' },
  { id: 'children',       label: '12. Children\'s Privacy' },
  { id: 'dnt',            label: '13. Do Not Track' },
  { id: 'changes',        label: '14. Policy Updates' },
  { id: 'contact',        label: '15. Contact Us' },
];

export default async function PrivacyPolicyPage({ params }) {
  const { lang } = await params;

  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information."
      lastUpdated="July 22, 2026"
      sections={SECTIONS}
      lang={lang}
    >
      <section id="overview">
        <h2>1. Overview</h2>
        <p>
          Atla Hub Tech ("AtlaHub," "we," "our," or "us") is committed to protecting the privacy
          and security of the personal data we process. This Privacy Policy describes how we
          collect, use, disclose, and safeguard information when you visit our website, create
          an account, or use the AtlaHub platform and related services (collectively, the "Service").
        </p>
        <p>
          If you are a business customer using AtlaHub to manage communications with your own end
          customers, note that AtlaHub acts as a <strong>data processor</strong> on your behalf
          for your customers' data, and you remain the <strong>data controller</strong> responsible
          for that data.
        </p>
        <p>
          By using the Service, you acknowledge that you have read and understood this Privacy
          Policy.
        </p>
      </section>

      <hr />

      <section id="data-collected">
        <h2>2. Data We Collect</h2>

        <h3>2.1 Account & Identity Data</h3>
        <ul>
          <li>Name, email address, phone number, and job title provided during registration</li>
          <li>Company name, billing address, and VAT/tax identification number</li>
          <li>Password (stored in hashed, salted form — never in plain text)</li>
        </ul>

        <h3>2.2 Usage & Platform Data</h3>
        <ul>
          <li>Feature usage patterns, page views, and session activity within the platform</li>
          <li>API request logs (endpoint, timestamp, response code, volume)</li>
          <li>Conversation metadata (timestamps, channel source, agent assignment, resolution status)</li>
          <li>Device information, browser type, operating system, and IP address</li>
        </ul>

        <h3>2.3 Communications Data</h3>
        <p>
          When you use AtlaHub's omnichannel inbox, the content of customer messages received
          via connected channels (WhatsApp, Facebook Messenger, Instagram Direct, TikTok) is
          processed and stored within our platform to enable you to manage and respond to those
          communications. This content is Customer Data controlled by you; we process it solely
          on your instructions.
        </p>

        <h3>2.4 Payment Data</h3>
        <p>
          Full payment card details are never stored on AtlaHub's servers — they are handled
          directly by our PCI-compliant payment processor. We only retain the last four digits
          of your card, card type, and billing address for reference.
        </p>

        <h3>2.5 Data Collected Automatically</h3>
        <p>
          We use cookies, pixel tags, and similar technologies to automatically collect certain
          information when you access our website or Service. See Section 5 (Cookies & Tracking)
          for full details.
        </p>
      </section>

      <hr />

      <section id="how-we-use">
        <h2>3. How We Use Your Data</h2>
        <ul>
          <li><strong>Service Delivery:</strong> To create and manage your account, provide platform access, process transactions, and deliver support.</li>
          <li><strong>Platform Improvement:</strong> To analyze usage patterns, identify bugs, develop new features, and improve Service quality.</li>
          <li><strong>Security & Fraud Prevention:</strong> To detect, investigate, and prevent fraudulent activity, abuse, and unauthorized access.</li>
          <li><strong>Communications:</strong> To send transactional emails (confirmations, invoices, password resets), product updates, and — with your consent — marketing communications.</li>
          <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, and law enforcement requests.</li>
          <li><strong>Analytics & Reporting:</strong> To generate aggregated, anonymized insights about usage trends. Such data cannot be used to identify you personally.</li>
        </ul>
      </section>

      <hr />

      <section id="legal-basis">
        <h2>4. Legal Basis for Processing (GDPR)</h2>
        <p>For users in the EEA, UK, or similar jurisdictions, our legal basis for processing personal data is:</p>
        <ul>
          <li><strong>Contract Performance:</strong> Processing necessary to perform our contract with you, including providing the Service and processing payments.</li>
          <li><strong>Legitimate Interests:</strong> Processing for our legitimate interests such as improving the Service, preventing fraud, and ensuring platform security.</li>
          <li><strong>Legal Obligation:</strong> Processing necessary to comply with legal obligations.</li>
          <li><strong>Consent:</strong> Where you have given us specific consent — for example, for marketing emails. You may withdraw consent at any time.</li>
        </ul>
      </section>

      <hr />

      <section id="cookies">
        <h2>5. Cookies & Tracking Technologies</h2>
        <h3>5.1 Types of Cookies We Use</h3>
        <ul>
          <li><strong>Strictly Necessary Cookies:</strong> Required for the Service to function (e.g., session authentication). These cannot be disabled.</li>
          <li><strong>Performance & Analytics Cookies:</strong> Help us understand how users interact with the Service (e.g., Google Analytics). Data is aggregated and anonymized where possible.</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences (e.g., language, timezone) to improve your experience.</li>
          <li><strong>Marketing & Retargeting Cookies:</strong> Used on our marketing website to deliver relevant advertisements. These may include cookies set by Meta (Facebook Pixel) and TikTok (TikTok Pixel). See Section 6 for details.</li>
        </ul>
        <h3>5.2 Cookie Management</h3>
        <p>
          When you first visit our marketing website, we display a cookie consent banner. You can
          accept or decline non-essential cookies at any time through your browser settings or our
          Cookie Preference Center. Disabling certain cookies may affect the functionality of the
          Service.
        </p>
      </section>

      <hr />

      <section id="third-parties">
        <h2>6. Third-Party Integrations & Data Flows</h2>

        <h3>6.1 Meta (WhatsApp Business API, Facebook Messenger, Instagram Direct)</h3>
        <p>
          When you connect your Meta Business accounts to AtlaHub, you authorize us to access and
          process messages exchanged via the Meta platform APIs. The following data flows apply:
        </p>
        <ul>
          <li>Message content, media attachments, timestamps, and sender identifiers are received by AtlaHub and stored in your workspace.</li>
          <li>AtlaHub does not sell or independently use this message data. It is processed solely to power your inbox, automation, and analytics within the platform.</li>
          <li>Your use of these integrations is also subject to <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta's Privacy Policy</a>.</li>
          <li>AtlaHub participates in Meta's official partner programs and adheres to Meta's data handling requirements for API partners.</li>
        </ul>

        <h3>6.2 TikTok Messaging API</h3>
        <p>
          When you connect a TikTok Business account to AtlaHub, we access TikTok Direct Messages
          through TikTok's official API:
        </p>
        <ul>
          <li>Message content, sender identifiers, and timestamps are received and stored in your AtlaHub workspace.</li>
          <li>This data is processed solely to deliver the inbox functionality you requested. AtlaHub does not share TikTok conversation data with any third parties beyond those necessary to operate the Service.</li>
          <li>Your use is also subject to <a href="https://www.tiktok.com/legal/page/global/privacy-policy/en" target="_blank" rel="noopener noreferrer">TikTok's Privacy Policy</a>.</li>
        </ul>

        <h3>6.3 Meta Pixel & TikTok Pixel (Marketing Website Only)</h3>
        <p>
          On our <strong>marketing website</strong> (atlahub.tech), we may use the Meta Pixel and
          TikTok Pixel to measure advertising effectiveness and deliver relevant ads. These pixels
          may collect:
        </p>
        <ul>
          <li>Your IP address and browser user agent</li>
          <li>Pages visited and actions taken on our marketing website</li>
          <li>Hashed email address (if provided during sign-up) for ad matching</li>
        </ul>
        <p>
          You can opt out via our Cookie Preference Center or platform-level ad controls. These
          pixels are <strong>not active</strong> within the SaaS platform itself — only on our
          public marketing website.
        </p>

        <h3>6.4 Other Service Providers</h3>
        <ul>
          <li><strong>Cloud Infrastructure:</strong> Cloud hosting providers (e.g., AWS, Google Cloud) for secure data hosting.</li>
          <li><strong>Payment Processing:</strong> PCI-compliant processors (e.g., Stripe) for subscription billing.</li>
          <li><strong>Email Delivery:</strong> Transactional email providers (e.g., SendGrid) for system notifications.</li>
          <li><strong>Analytics:</strong> Analytics platforms (e.g., Google Analytics) for website measurement.</li>
        </ul>
        <p>All third-party processors are bound by data processing agreements ensuring compliance with applicable privacy law.</p>
      </section>

      <hr />

      <section id="data-sharing">
        <h2>7. How We Share Your Data</h2>
        <p>AtlaHub does <strong>not sell</strong> your personal data to any third party. We share data only in these limited circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> With vetted sub-processors providing infrastructure, payment, and operational services.</li>
          <li><strong>Third-Party Channel APIs:</strong> Data exchanged with Meta and TikTok APIs as part of the core integration functionality you explicitly requested.</li>
          <li><strong>Legal Requirements:</strong> When required by applicable law, court order, or governmental authority.</li>
          <li><strong>Business Transfers:</strong> In connection with a merger or acquisition, provided the acquiring entity agrees to honor this Privacy Policy.</li>
          <li><strong>With Your Consent:</strong> For any other purpose with your explicit prior consent.</li>
        </ul>
      </section>

      <hr />

      <section id="data-retention">
        <h2>8. Data Retention</h2>
        <ul>
          <li><strong>Account Data:</strong> Retained for the duration of your subscription and up to 3 years after account closure for legal and audit purposes.</li>
          <li><strong>Conversation & Message Data:</strong> Retained during your subscription. Following termination, available for export for 30 days, then permanently deleted within 90 days.</li>
          <li><strong>Payment Records:</strong> Retained for 7 years to comply with financial and tax regulations.</li>
          <li><strong>Usage Logs:</strong> Retained for up to 12 months for security and performance analysis.</li>
          <li><strong>Marketing Data:</strong> Retained until you withdraw consent or opt out.</li>
        </ul>
      </section>

      <hr />

      <section id="security">
        <h2>9. Data Security</h2>
        <p>AtlaHub implements industry-standard security measures, including:</p>
        <ul>
          <li><strong>Encryption in Transit:</strong> All data transmitted between your clients and our servers is encrypted using TLS 1.2 or higher.</li>
          <li><strong>Encryption at Rest:</strong> Sensitive data stores are encrypted at rest using AES-256.</li>
          <li><strong>Access Controls:</strong> Role-based access control (RBAC) limits internal access to authorized personnel only.</li>
          <li><strong>Security Audits:</strong> Periodic vulnerability assessments and security reviews of our infrastructure.</li>
          <li><strong>Incident Response:</strong> We maintain an incident response plan and will notify affected Customers of any personal data breaches within 72 hours (for GDPR-covered breaches).</li>
        </ul>
        <p>
          While we employ robust security practices, no method of electronic storage or transmission
          is 100% secure. You are responsible for protecting your account credentials.
        </p>
      </section>

      <hr />

      <section id="your-rights">
        <h2>10. Your Privacy Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to Erasure:</strong> Request deletion of your personal data, subject to legal exceptions.</li>
          <li><strong>Right to Restriction:</strong> Request that we restrict processing of your data in certain circumstances.</li>
          <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
          <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or for direct marketing.</li>
          <li><strong>Rights under CCPA (California Residents):</strong> The right to know what personal information is collected; the right to opt out of the sale of personal information (AtlaHub does not sell personal information); and the right to non-discrimination.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:app.support@atlahub.tech">app.support@atlahub.tech</a>. We will respond
          within 30 days (or as required by applicable law).
        </p>
      </section>

      <hr />

      <section id="international">
        <h2>11. International Data Transfers</h2>
        <p>
          Your data may be transferred to and processed in countries other than your country of
          residence. Where we transfer personal data from the EEA, UK, or Switzerland to countries
          outside these regions, we rely on:
        </p>
        <ul>
          <li>European Commission Standard Contractual Clauses (SCCs)</li>
          <li>Adequacy decisions made by the European Commission</li>
          <li>Other legally recognized transfer mechanisms</li>
        </ul>
        <p>
          You may request a copy of the relevant transfer safeguards by contacting{' '}
          <a href="mailto:app.support@atlahub.tech">app.support@atlahub.tech</a>.
        </p>
      </section>

      <hr />

      <section id="children">
        <h2>12. Children's Privacy</h2>
        <p>
          The AtlaHub Service is designed for business use and is not directed at children under
          the age of 16. We do not knowingly collect personal data from children. If you believe
          we have inadvertently collected such information, please contact us immediately at{' '}
          <a href="mailto:app.support@atlahub.tech">app.support@atlahub.tech</a> and we will
          promptly delete it.
        </p>
      </section>

      <hr />

      <section id="dnt">
        <h2>13. Do Not Track Signals</h2>
        <p>
          Some browsers include a Do Not Track ("DNT") feature. There is currently no uniform
          standard for DNT signals. However, we offer opt-out mechanisms for non-essential cookies
          through our Cookie Preference Center. Please see Section 5 for details.
        </p>
      </section>

      <hr />

      <section id="changes">
        <h2>14. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we make material changes, we will:
        </p>
        <ul>
          <li>Update the "Last Updated" date at the top of this page</li>
          <li>Send a notification email to registered account holders</li>
          <li>Display a prominent banner on the Service</li>
        </ul>
        <p>Your continued use of the Service after the effective date constitutes your acceptance of the revised policy.</p>
      </section>

      <hr />

      <section id="contact">
        <h2>15. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:app.support@atlahub.tech">app.support@atlahub.tech</a></li>
          <li><strong>Company:</strong> Atla Hub Tech</li>
          <li><strong>Website:</strong> <a href="https://atlahub.tech">atlahub.tech</a></li>
        </ul>
        <p>
          If you are in the EEA or UK and believe your data protection rights have been violated,
          you have the right to lodge a complaint with your local supervisory authority (e.g., the
          ICO in the UK).
        </p>
        <p>We aim to respond to all privacy-related inquiries within <strong>30 days</strong>.</p>
      </section>
    </LegalLayout>
  );
}
