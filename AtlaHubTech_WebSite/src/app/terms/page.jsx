import LegalLayout from '../../components/Layout/LegalLayout';

export const metadata = {
  title: 'Terms of Service',
  description:
    'Read the Atla Hub Tech Terms of Service. Understand your rights and responsibilities as an AtlaHub SaaS subscriber, API usage limits, and subscription terms.',
};

const SECTIONS = [
  { id: 'acceptance',       label: '1. Acceptance of Terms' },
  { id: 'services',         label: '2. Description of Services' },
  { id: 'accounts',         label: '3. Accounts & Registration' },
  { id: 'subscription',     label: '4. Subscription & Billing' },
  { id: 'api-usage',        label: '5. API Usage & Fair Use' },
  { id: 'user-responsibilities', label: '6. User Responsibilities' },
  { id: 'ip',               label: '7. Intellectual Property' },
  { id: 'confidentiality',  label: '8. Confidentiality' },
  { id: 'data-privacy',     label: '9. Data & Privacy' },
  { id: 'uptime',           label: '10. Uptime & SLA' },
  { id: 'disclaimers',      label: '11. Disclaimers' },
  { id: 'liability',        label: '12. Limitation of Liability' },
  { id: 'indemnification',  label: '13. Indemnification' },
  { id: 'termination',      label: '14. Termination' },
  { id: 'governing-law',    label: '15. Governing Law' },
  { id: 'changes',          label: '16. Changes to Terms' },
  { id: 'contact',          label: '17. Contact Us' },
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using AtlaHub's platform and services."
      lastUpdated="July 22, 2026"
      sections={SECTIONS}
    >
      {/* ── 1. ACCEPTANCE ── */}
      <section id="acceptance">
        <h2>1. Acceptance of Terms</h2>
        <p>
          Welcome to <strong>Atla Hub Tech</strong> ("AtlaHub," "we," "our," or "us"). By accessing
          or using our cloud-based customer support and omnichannel messaging platform (the
          "Service"), you ("Customer," "you," or "your") agree to be bound by these Terms of
          Service ("Terms"). If you are entering into these Terms on behalf of a company or other
          legal entity, you represent that you have the authority to bind such entity to these Terms,
          in which case the terms "you" or "your" shall refer to that entity.
        </p>
        <p>
          If you do not agree to all of these Terms, you must not access or use the Service. Your
          continued use of the Service after any modification to these Terms constitutes your
          acceptance of the updated Terms.
        </p>
      </section>

      <hr />

      {/* ── 2. SERVICES ── */}
      <section id="services">
        <h2>2. Description of Services</h2>
        <p>
          AtlaHub provides a B2B Software-as-a-Service (SaaS) platform that enables businesses to
          manage customer communications across multiple channels from a single dashboard. Our core
          offerings include, but are not limited to:
        </p>
        <ul>
          <li>
            <strong>Omnichannel Inbox:</strong> Centralized management of customer messages received
            via WhatsApp Business API, Facebook Messenger, Instagram Direct, and TikTok messaging
            integrations.
          </li>
          <li>
            <strong>Automated Workflows:</strong> Chatbot builders, auto-reply rules, and intelligent
            routing logic to streamline customer support operations.
          </li>
          <li>
            <strong>Team Collaboration:</strong> Multi-agent assignment, internal notes, and
            conversation tagging for support teams.
          </li>
          <li>
            <strong>Analytics & Reporting:</strong> Real-time dashboards for response times,
            resolution rates, and agent performance.
          </li>
          <li>
            <strong>API Access:</strong> RESTful API and webhook infrastructure for custom
            integrations (subject to usage limits defined in Section 5).
          </li>
          <li>
            <strong>Third-Party Channel Integrations:</strong> Managed connections to Meta
            (WhatsApp, Facebook, Instagram) and TikTok platforms through their respective official
            APIs.
          </li>
        </ul>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of the Service at any
          time, with or without notice, provided that we will make commercially reasonable efforts to
          notify paying Customers in advance of any material changes.
        </p>
      </section>

      <hr />

      {/* ── 3. ACCOUNTS ── */}
      <section id="accounts">
        <h2>3. Accounts & Registration</h2>
        <h3>3.1 Account Creation</h3>
        <p>
          To access the Service, you must create an account by providing accurate, complete, and
          current information, including a valid business email address and organization name. You
          are responsible for maintaining the confidentiality of your account credentials.
        </p>
        <h3>3.2 Account Security</h3>
        <p>
          You are solely responsible for all activities that occur under your account. You must
          immediately notify us at <strong>app.support@atlahub.tech</strong> upon becoming aware of any
          unauthorized use of your account. AtlaHub will not be liable for any loss arising from
          unauthorized account access caused by your failure to safeguard your credentials.
        </p>
        <h3>3.3 Eligibility</h3>
        <p>
          The Service is intended for business use only. You must be at least 18 years of age and
          have the legal capacity to enter into a binding contract to use the Service. The Service
          is not available to individuals using it for purely personal, family, or household
          purposes.
        </p>
      </section>

      <hr />

      {/* ── 4. SUBSCRIPTION ── */}
      <section id="subscription">
        <h2>4. Subscription & Billing</h2>
        <h3>4.1 Subscription Plans</h3>
        <p>
          AtlaHub offers tiered subscription plans (e.g., Starter, Growth, Enterprise) with varying
          feature sets, agent seat limits, message volumes, and API call allowances. Details of each
          plan are published on our pricing page and may be updated from time to time.
        </p>
        <h3>4.2 Fees & Payment</h3>
        <p>
          All subscription fees are billed in advance on a monthly or annual cycle, depending on the
          plan you select. Fees are non-refundable except as expressly set forth in our Refund
          Policy or as required by applicable law. You authorize AtlaHub (or our payment processor)
          to charge your designated payment method for all applicable fees.
        </p>
        <h3>4.3 Overage Charges</h3>
        <p>
          If your usage exceeds the limits included in your subscription plan (e.g., message volume,
          API calls, agent seats), you may be charged overage fees at the rates displayed in your
          account settings. We will make commercially reasonable efforts to alert you before overages
          are incurred.
        </p>
        <h3>4.4 Free Trials</h3>
        <p>
          AtlaHub may offer free trial periods at its discretion. At the end of a free trial, your
          account will automatically be downgraded to a free tier or charged according to the
          selected plan, unless you cancel before the trial ends. We will provide notice of the
          trial's end date at the time of sign-up.
        </p>
        <h3>4.5 Price Changes</h3>
        <p>
          We reserve the right to change our pricing at any time. For existing paid subscribers,
          price changes will take effect at the next billing cycle after at least 30 days' written
          notice via email.
        </p>
        <h3>4.6 Taxes</h3>
        <p>
          All fees are exclusive of applicable taxes, levies, or duties imposed by taxing
          authorities. You are responsible for paying all such taxes, excluding taxes based on
          AtlaHub's income.
        </p>
      </section>

      <hr />

      {/* ── 5. API USAGE ── */}
      <section id="api-usage">
        <h2>5. API Usage & Fair Use Policy</h2>
        <h3>5.1 API Access</h3>
        <p>
          Customers on eligible plans receive access to the AtlaHub REST API. API access is governed
          by rate limits and message volume caps that vary by subscription tier, as specified in our
          API documentation.
        </p>
        <h3>5.2 Rate Limits</h3>
        <p>
          To ensure platform stability and fair access for all Customers, the following default rate
          limits apply (actual limits may vary by plan):
        </p>
        <ul>
          <li><strong>API Requests:</strong> Up to 1,000 requests per minute per workspace on Growth plans; 5,000 requests per minute on Enterprise plans.</li>
          <li><strong>Message Send Rate:</strong> Subject to the per-channel limits imposed by upstream providers (Meta, TikTok). AtlaHub enforces additional platform-level limits to prevent abuse.</li>
          <li><strong>Webhook Deliveries:</strong> AtlaHub will retry failed webhook deliveries up to 5 times with exponential backoff. Failed deliveries beyond this threshold are dropped.</li>
        </ul>
        <h3>5.3 Third-Party Channel API Compliance</h3>
        <p>
          By using AtlaHub's integrations with third-party messaging platforms, you agree to comply
          with the terms and acceptable use policies of those platforms, including:
        </p>
        <ul>
          <li>
            <strong>Meta (WhatsApp Business API, Facebook Messenger, Instagram Messaging):</strong> You
            must comply with Meta's{' '}
            <a href="https://www.whatsapp.com/legal/business-policy" target="_blank" rel="noopener noreferrer">
              WhatsApp Business Policy
            </a>
            , the{' '}
            <a href="https://developers.facebook.com/policy/" target="_blank" rel="noopener noreferrer">
              Meta Platform Policy
            </a>
            , and all applicable community standards. Marketing messages must comply with opt-in
            requirements. Sending spam or unsolicited bulk messages is strictly prohibited and may
            result in immediate account suspension.
          </li>
          <li>
            <strong>TikTok Messaging API:</strong> You must comply with{' '}
            <a href="https://www.tiktok.com/legal/page/global/terms-of-service/en" target="_blank" rel="noopener noreferrer">
              TikTok's Terms of Service
            </a>{' '}
            and Developer Policies. Use of TikTok messaging integrations for spam, harassment, or
            any prohibited content is strictly forbidden.
          </li>
        </ul>
        <h3>5.4 Prohibited API Uses</h3>
        <p>You must not use the AtlaHub API to:</p>
        <ul>
          <li>Circumvent or attempt to circumvent channel-level rate limits or message opt-out mechanisms</li>
          <li>Send unsolicited commercial messages (spam) to any end user</li>
          <li>Scrape, harvest, or collect user data in violation of applicable privacy laws</li>
          <li>Resell or redistribute API access to third parties without explicit written authorization from AtlaHub</li>
          <li>Conduct load testing or stress testing without prior written approval</li>
        </ul>
        <p>
          Violations of this Fair Use Policy may result in rate throttling, temporary suspension, or
          permanent termination of your account, at AtlaHub's sole discretion.
        </p>
      </section>

      <hr />

      {/* ── 6. USER RESPONSIBILITIES ── */}
      <section id="user-responsibilities">
        <h2>6. User Responsibilities</h2>
        <h3>6.1 Acceptable Use</h3>
        <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You are solely responsible for all content transmitted through the Service, including messages sent to your end customers.</p>
        <h3>6.2 Prohibited Conduct</h3>
        <p>You must not, and must not permit any user in your organization to:</p>
        <ul>
          <li>Use the Service to transmit illegal, defamatory, harassing, abusive, fraudulent, or otherwise objectionable content</li>
          <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
          <li>Attempt to gain unauthorized access to any part of the Service, its servers, or any related systems</li>
          <li>Introduce viruses, trojans, worms, or any other malicious code into the Service</li>
          <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Service</li>
          <li>Use the Service in any manner that could damage, disable, overburden, or impair it</li>
          <li>Use the Service to violate the privacy rights of your end customers, including by collecting personal data without proper legal basis or consent</li>
          <li>Violate any applicable local, national, or international law or regulation</li>
        </ul>
        <h3>6.3 End Customer Compliance</h3>
        <p>
          You are responsible for obtaining all necessary consents from your end customers before
          messaging them through the Service, in compliance with applicable anti-spam laws (including
          but not limited to CAN-SPAM, GDPR, and any local equivalents). AtlaHub is a technology
          intermediary and bears no responsibility for the content of your communications or for
          your compliance with messaging regulations.
        </p>
      </section>

      <hr />

      {/* ── 7. IP ── */}
      <section id="ip">
        <h2>7. Intellectual Property</h2>
        <h3>7.1 AtlaHub IP</h3>
        <p>
          The Service, including all software, interfaces, algorithms, documentation, and associated
          intellectual property, is and remains the exclusive property of Atla Hub Tech. Nothing in
          these Terms grants you any right, title, or interest in or to the Service beyond the
          limited right to use it as expressly set forth herein.
        </p>
        <h3>7.2 Your Data & Content</h3>
        <p>
          You retain all ownership rights to the data, content, and materials you submit to the
          Service ("Customer Data"). You grant AtlaHub a limited, non-exclusive, royalty-free license
          to process, store, and transmit your Customer Data solely as necessary to provide the
          Service to you.
        </p>
        <h3>7.3 Feedback</h3>
        <p>
          If you provide suggestions, ideas, or other feedback regarding the Service, you grant
          AtlaHub a perpetual, irrevocable, royalty-free license to use such feedback for any
          purpose without compensation or attribution to you.
        </p>
      </section>

      <hr />

      {/* ── 8. CONFIDENTIALITY ── */}
      <section id="confidentiality">
        <h2>8. Confidentiality</h2>
        <p>
          Each party agrees to hold the other's Confidential Information in strict confidence and
          not to disclose it to any third party, except as required by law or with prior written
          consent. "Confidential Information" means any non-public information disclosed by one
          party to the other in connection with the Service, including but not limited to business
          plans, technical data, pricing, and customer lists. This obligation survives termination
          of the agreement for a period of three (3) years.
        </p>
      </section>

      <hr />

      {/* ── 9. DATA & PRIVACY ── */}
      <section id="data-privacy">
        <h2>9. Data & Privacy</h2>
        <p>
          AtlaHub's collection and use of personal data in connection with the Service is governed
          by our <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms by
          reference. To the extent that you process personal data of your end customers through the
          Service, you acknowledge that AtlaHub acts as a data processor on your behalf, and you act
          as the data controller. You are responsible for ensuring that your use of the Service
          complies with all applicable data protection laws, including the GDPR and any local
          equivalents.
        </p>
        <p>
          A Data Processing Agreement (DPA) is available upon request for Customers who require it
          for GDPR compliance. Please contact <strong>app.support@atlahub.tech</strong> to request a DPA.
        </p>
      </section>

      <hr />

      {/* ── 10. UPTIME ── */}
      <section id="uptime">
        <h2>10. Uptime & Service Level Agreement</h2>
        <p>
          AtlaHub targets a monthly uptime of <strong>99.5%</strong> for the core platform,
          excluding scheduled maintenance windows (announced at least 24 hours in advance) and
          events outside our reasonable control (including third-party API outages from Meta, TikTok,
          or other providers).
        </p>
        <p>
          Enterprise plan Customers may be eligible for specific SLA terms and service credits, as
          detailed in their Order Form or a separate SLA addendum. Please contact our sales team for
          details.
        </p>
      </section>

      <hr />

      {/* ── 11. DISCLAIMERS ── */}
      <section id="disclaimers">
        <h2>11. Disclaimers</h2>
        <p>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
          EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. ATLAHUB DOES NOT
          WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
        </p>
        <p>
          ATLAHUB IS NOT RESPONSIBLE FOR THE AVAILABILITY, ACCURACY, OR CONTENT OF THIRD-PARTY
          SERVICES (INCLUDING META AND TIKTOK APIs) INTEGRATED INTO THE PLATFORM. ANY DOWNTIME,
          POLICY CHANGE, OR RESTRICTION IMPOSED BY A THIRD-PARTY PROVIDER IS OUTSIDE ATLAHUB'S
          CONTROL AND DOES NOT CONSTITUTE A BREACH OF THESE TERMS.
        </p>
      </section>

      <hr />

      {/* ── 12. LIABILITY ── */}
      <section id="liability">
        <h2>12. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ATLAHUB, ITS
          OFFICERS, DIRECTORS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR
          GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE SERVICE, EVEN IF
          ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          ATLAHUB'S TOTAL CUMULATIVE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS OR THE
          SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE TOTAL FEES PAID BY YOU TO ATLAHUB IN THE
          TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS (USD $100).
        </p>
        <p>
          Some jurisdictions do not allow the exclusion of certain warranties or the limitation or
          exclusion of liability for incidental or consequential damages. Accordingly, some of the
          limitations above may not apply to you.
        </p>
      </section>

      <hr />

      {/* ── 13. INDEMNIFICATION ── */}
      <section id="indemnification">
        <h2>13. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless AtlaHub and its officers, directors,
          employees, and agents from and against any claims, liabilities, damages, losses, and
          expenses (including reasonable legal fees) arising out of or in any way connected with:
          (a) your access to or use of the Service; (b) your violation of these Terms; (c) your
          Customer Data; (d) your violation of any third-party rights, including intellectual
          property or privacy rights; or (e) your violation of applicable laws.
        </p>
      </section>

      <hr />

      {/* ── 14. TERMINATION ── */}
      <section id="termination">
        <h2>14. Termination</h2>
        <h3>14.1 Termination by You</h3>
        <p>
          You may cancel your subscription at any time through your account settings or by
          contacting support. Cancellation takes effect at the end of the current billing period.
          No refunds are issued for partial periods, except as required by law.
        </p>
        <h3>14.2 Termination by AtlaHub</h3>
        <p>
          AtlaHub may suspend or terminate your access to the Service immediately and without
          notice if: (a) you materially breach these Terms; (b) you fail to pay any fees when due;
          (c) required by law or a competent authority; or (d) a third-party channel provider
          (Meta, TikTok) suspends your associated account or access.
        </p>
        <h3>14.3 Effect of Termination</h3>
        <p>
          Upon termination, your right to use the Service ceases immediately. AtlaHub will make
          your Customer Data available for export for a period of 30 days following termination,
          after which it may be permanently deleted. Provisions of these Terms that by their nature
          should survive termination will survive, including Sections 7, 8, 11, 12, 13, and 15.
        </p>
      </section>

      <hr />

      {/* ── 15. GOVERNING LAW ── */}
      <section id="governing-law">
        <h2>15. Governing Law & Dispute Resolution</h2>
        <p>
          These Terms are governed by and construed in accordance with applicable commercial law.
          Any disputes arising out of or related to these Terms or the Service that cannot be
          resolved informally will be subject to binding arbitration or resolved in the courts of
          competent jurisdiction in the territory where AtlaHub is registered.
        </p>
        <p>
          You agree that any dispute resolution proceedings will be conducted only on an individual
          basis and not in a class, consolidated, or representative action.
        </p>
      </section>

      <hr />

      {/* ── 16. CHANGES ── */}
      <section id="changes">
        <h2>16. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. When we make material changes, we will
          notify you by email or by displaying a prominent notice within the Service at least 14
          days before the changes take effect. Your continued use of the Service after the
          effective date of the updated Terms constitutes your acceptance of them. If you do not
          agree to the updated Terms, you must stop using the Service before they take effect.
        </p>
      </section>

      <hr />

      {/* ── 17. CONTACT ── */}
      <section id="contact">
        <h2>17. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:app.support@atlahub.tech">app.support@atlahub.tech</a></li>
          <li><strong>Company:</strong> Atla Hub Tech</li>
          <li><strong>Website:</strong> <a href="https://atlahub.com">atlahub.com</a></li>
        </ul>
        <p>
          We aim to respond to all legal inquiries within 5 business days.
        </p>
      </section>
    </LegalLayout>
  );
}
