"use client"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Label } from "@workspace/ui/components/label"

function LegalDialog({
  trigger,
  title,
  children,
}: {
  trigger: string
  title: string
  children: React.ReactNode
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="transition-colors hover:text-primary">
          {trigger}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>Last updated: March 30, 2026</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-muted-foreground [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:leading-6">
            {children}
          </div>
        </ScrollArea>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}

function PrivacyPolicyContent() {
  return (
    <>
      <section>
        <h3>1. Introduction</h3>
        <p>
          FA Automations (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
          committed to protecting the privacy of our clients and website
          visitors. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you visit our website or use our
          hotel automation services.
        </p>
      </section>
      <section>
        <h3>2. Information We Collect</h3>
        <p>
          We may collect personal information that you voluntarily provide when
          you contact us, request a demo, or use our services. This includes
          your name, email address, phone number, company name, and any other
          information you choose to provide. We also automatically collect
          certain technical data such as your IP address, browser type, and
          usage patterns through cookies and similar technologies.
        </p>
      </section>
      <section>
        <h3>3. How We Use Your Information</h3>
        <p>
          We use the information we collect to provide and improve our hotel
          automation services, respond to your inquiries, send you relevant
          updates about our services, personalize your experience, and comply
          with legal obligations. We do not sell your personal information to
          third parties.
        </p>
      </section>
      <section>
        <h3>4. Data Sharing</h3>
        <p>
          We may share your information with trusted third-party service
          providers who assist us in operating our business, such as hosting
          providers, analytics services, and communication platforms. These
          providers are contractually obligated to protect your data and may only
          use it for the purposes we specify.
        </p>
      </section>
      <section>
        <h3>5. Data Retention</h3>
        <p>
          We retain your personal information only for as long as necessary to
          fulfill the purposes outlined in this policy, unless a longer
          retention period is required or permitted by law.
        </p>
      </section>
      <section>
        <h3>6. Your Rights</h3>
        <p>
          Under the General Data Protection Regulation (GDPR), you have the
          right to access, correct, delete, or restrict processing of your
          personal data. You may also withdraw consent at any time. To exercise
          these rights, contact us at contact@faautomations.com.
        </p>
      </section>
      <section>
        <h3>7. Security</h3>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </p>
      </section>
      <section>
        <h3>8. Contact Us</h3>
        <p>
          If you have questions about this Privacy Policy, please contact us at
          contact@faautomations.com or call (+45) 61448587.
        </p>
      </section>
    </>
  )
}

function TermsOfServiceContent() {
  return (
    <>
      <section>
        <h3>1. Agreement to Terms</h3>
        <p>
          By accessing or using the services provided by FA Automations, you
          agree to be bound by these Terms of Service. If you do not agree to
          these terms, you may not access or use our services.
        </p>
      </section>
      <section>
        <h3>2. Description of Services</h3>
        <p>
          FA Automations provides hotel automation workflow solutions, including
          but not limited to automated guest communication, booking management
          integrations, and operational workflow automation. The specific
          features and scope of services are defined in individual service
          agreements.
        </p>
      </section>
      <section>
        <h3>3. User Obligations</h3>
        <p>
          You agree to use our services only for lawful purposes and in
          accordance with these terms. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities
          that occur under your account.
        </p>
      </section>
      <section>
        <h3>4. Intellectual Property</h3>
        <p>
          All content, features, and functionality of our services, including
          but not limited to text, graphics, logos, and software, are the
          exclusive property of FA Automations and are protected by copyright,
          trademark, and other intellectual property laws.
        </p>
      </section>
      <section>
        <h3>5. Payment Terms</h3>
        <p>
          Fees for our services are outlined in your service agreement. Payment
          is due according to the billing schedule specified in your plan. We
          reserve the right to modify pricing with 30 days&apos; written notice.
        </p>
      </section>
      <section>
        <h3>6. Limitation of Liability</h3>
        <p>
          To the maximum extent permitted by law, FA Automations shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages arising from your use of our services. Our total
          liability shall not exceed the amount paid by you for the services in
          the twelve months preceding the claim.
        </p>
      </section>
      <section>
        <h3>7. Termination</h3>
        <p>
          Either party may terminate the service agreement with 30 days&apos;
          written notice. We may immediately terminate or suspend access to our
          services if you breach these terms. Upon termination, your right to
          use the services will immediately cease.
        </p>
      </section>
      <section>
        <h3>8. Governing Law</h3>
        <p>
          These terms shall be governed by and construed in accordance with the
          laws of Denmark, without regard to conflict of law provisions. Any
          disputes arising under these terms shall be subject to the exclusive
          jurisdiction of the courts of Denmark.
        </p>
      </section>
      <section>
        <h3>9. Contact Us</h3>
        <p>
          If you have questions about these Terms of Service, please contact us
          at contact@faautomations.com or call (+45) 61448587.
        </p>
      </section>
    </>
  )
}

function CookieSettingsContent() {
  return (
    <>
      <section>
        <h3>1. What Are Cookies</h3>
        <p>
          Cookies are small text files that are stored on your device when you
          visit a website. They are widely used to make websites work more
          efficiently, provide a better user experience, and supply information
          to site owners.
        </p>
      </section>
      <section>
        <h3>2. How We Use Cookies</h3>
        <p>
          FA Automations uses cookies and similar tracking technologies to
          operate and improve our website, analyze traffic, personalize content,
          and remember your preferences. We use both session cookies (which
          expire when you close your browser) and persistent cookies (which
          remain on your device for a set period).
        </p>
      </section>
      <section>
        <h3>3. Types of Cookies We Use</h3>
        <p>
          <strong className="text-foreground">Essential cookies:</strong>{" "}
          Required for the website to function properly. These cannot be
          disabled.
        </p>
        <p className="mt-2">
          <strong className="text-foreground">Analytics cookies:</strong> Help
          us understand how visitors interact with our website by collecting
          anonymous usage data.
        </p>
        <p className="mt-2">
          <strong className="text-foreground">Functional cookies:</strong>{" "}
          Remember your preferences and settings, such as language and theme.
        </p>
        <p className="mt-2">
          <strong className="text-foreground">Marketing cookies:</strong> Used
          to deliver relevant advertisements and track the effectiveness of our
          marketing campaigns. These are only set with your consent.
        </p>
      </section>
      <section>
        <h3>4. Third-Party Cookies</h3>
        <p>
          Some cookies are placed by third-party services that appear on our
          pages, such as analytics providers and advertising partners. We do not
          control these cookies. Please refer to the respective third-party
          privacy policies for more information.
        </p>
      </section>
      <section>
        <h3>5. Managing Cookies</h3>
        <p>
          You can control and manage cookies through your browser settings. Most
          browsers allow you to block or delete cookies. However, please note
          that disabling certain cookies may affect the functionality of our
          website. You can also withdraw your consent for non-essential cookies
          at any time.
        </p>
      </section>
      <section>
        <h3>6. Updates to This Policy</h3>
        <p>
          We may update this Cookie Policy from time to time to reflect changes
          in technology, legislation, or our data practices. We encourage you to
          review this page periodically.
        </p>
      </section>
      <section>
        <h3>7. Contact Us</h3>
        <p>
          If you have questions about our use of cookies, please contact us at
          contact@faautomations.com or call (+45) 61448587.
        </p>
      </section>
    </>
  )
}

function Footerdemo() {
  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">
              Still have questions?
            </h2>
            <p className="mb-6 text-muted-foreground">
              We&apos;re here to help you. Reach out to our team.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/25 transition-transform duration-300 hover:translate-y-[-2px]"
                >
                  Ask Us
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                  <DialogDescription>
                    Send us a message and we&apos;ll get back to you as soon as
                    possible.
                  </DialogDescription>
                </DialogHeader>
                <form
                  action="https://formsubmit.co/filip.almeida@faautomations.com"
                  method="POST"
                  className="space-y-4"
                >
                  <input
                    type="hidden"
                    name="_subject"
                    value="New contact from FA Automations website"
                  />
                  <input type="hidden" name="_captcha" value="false" />
                  <input
                    type="hidden"
                    name="_next"
                    value={typeof window !== "undefined" ? window.location.href : "/"}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="How can we help you?"
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                Home
              </a>
              <a
                href="#how-we-do-it"
                className="block transition-colors hover:text-primary"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="block transition-colors hover:text-primary"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="block transition-colors hover:text-primary"
              >
                Pricing
              </a>
              <a
                href="#faqs"
                className="block transition-colors hover:text-primary"
              >
                FAQs
              </a>
              <a
                href="/team"
                className="block transition-colors hover:text-primary"
              >
                Team
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <div className="flex gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <img
                  src="/team/member-1.jpg"
                  alt="Felipe Figueiredo"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="text-sm font-medium">Felipe</p>
                  <a
                    href="mailto:filip.almeida@faautomations.com"
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    filip.almeida@
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <img
                  src="/team/member-2.jpg"
                  alt="Partner"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <p className="text-sm font-medium">Partner</p>
                  <a
                    href="mailto:contact@faautomations.com"
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    contact@
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 FA Automations. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <LegalDialog trigger="Privacy Policy" title="Privacy Policy">
              <PrivacyPolicyContent />
            </LegalDialog>
            <LegalDialog trigger="Terms of Service" title="Terms of Service">
              <TermsOfServiceContent />
            </LegalDialog>
            <LegalDialog trigger="Cookie Settings" title="Cookie Settings">
              <CookieSettingsContent />
            </LegalDialog>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
