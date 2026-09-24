"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const nav = document.getElementById("nav");
    const onScrollNav = () => {
      nav?.classList.toggle("solid", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScrollNav, { passive: true });
    onScrollNav();

    const revealAll = () => {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
    };

    let io: IntersectionObserver | null = null;
    let safety: number | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      document.querySelectorAll("[data-reveal]").forEach((el) => io?.observe(el));
      safety = window.setTimeout(revealAll, 4000);
    } else {
      revealAll();
    }

    const heroH1 = document.getElementById("hero-h1");
    const heroSub = document.querySelector<HTMLElement>(".hero-sub");
    const chambersImg = document.getElementById("chambers-img");
    const justiceImg = document.getElementById("justice-img");

    const onScrollParallax = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        if (heroH1) heroH1.style.transform = `translateY(${y * 0.18}px)`;
        if (heroSub) heroSub.style.opacity = String(Math.max(0, 1 - y / 600));
      }
      (
        [
          [chambersImg, 0.08],
          [justiceImg, 0.06],
        ] as const
      ).forEach(([img, speed]) => {
        if (!img?.parentElement) return;
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const p = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
          img.style.transform = `translateY(${-p}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScrollParallax, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollNav);
      window.removeEventListener("scroll", onScrollParallax);
      io?.disconnect();
      if (safety) window.clearTimeout(safety);
    };
  }, []);

  return (
    <>
      <div id="loader">
        <div className="mono">
          <img src="/images/im-logo.png" alt="IM Solicitors" />
        </div>
        <div className="bar">
          <i />
        </div>
      </div>

      <nav id="nav">
        <a className="brand" href="#top">
          <img src="/images/im-logo.png" alt="IM Solicitors" />
        </a>
        <div className="nav-links">
          <a href="#firm">The Firm</a>
          <a href="#practice">Practice Areas</a>
          <a href="#team">Our Team</a>
          <a href="#insights">Insights</a>
          <a href="#contact">Contact</a>
          <a className="nav-cta" href="tel:+442070000000">
            24/7 Emergency
          </a>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-bg">
          <img
            src="/images/hero-courts.jpg"
            alt="The Royal Courts of Justice, London, at dusk"
          />
        </div>
        <div className="vlines" id="hero-lines">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="badge" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <g className="ring">
              <path
                id="circ"
                d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                fill="none"
              />
              <text
                fontSize="7.2"
                letterSpacing="2.4"
                fill="#008034"
                fontFamily="var(--font-inter),Inter,sans-serif"
                fontWeight="600"
              >
                <textPath href="#circ">
                  24/7 POLICE STATION REPRESENTATION • CALL ANYTIME •
                </textPath>
              </text>
            </g>
            <line x1="50" y1="34" x2="50" y2="66" stroke="#909090" strokeWidth="1" />
            <line x1="34" y1="50" x2="66" y2="50" stroke="#909090" strokeWidth="1" />
          </svg>
        </div>

        <p className="hero-kicker">Boutique Criminal Defence &amp; Public Law — London</p>
        <h1 id="hero-h1">
          <span className="line">
            <span>In your corner</span>
          </span>
          <span className="line">
            <span>when it matters</span>
          </span>
          <span className="line">
            <span>
              <em>most.</em>
            </span>
          </span>
        </h1>
        <p className="hero-sub" data-reveal="">
          IM Solicitors is a boutique London practice defending liberty at every level of the
          justice system — from the police station interview room to the Supreme Court.
        </p>
        <div className="hero-actions" data-reveal="2">
          <a className="btn btn-gold" href="#contact">
            Request Representation →
          </a>
          <a className="btn btn-ghost" href="#practice">
            Our Practice Areas
          </a>
        </div>
        <div className="hero-foot">
          <span>Est. London, England</span>
          <span className="scroll-hint">
            Scroll<i />
          </span>
          <span>Defence · Liberties · Public Law</span>
        </div>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Criminal Defence</span>
          <span>Civil Liberties</span>
          <span>Public Law</span>
          <span>Regulatory Crime</span>
          <span>Inquests</span>
          <span>Prison Law</span>
          <span>Criminal Defence</span>
          <span>Civil Liberties</span>
          <span>Public Law</span>
          <span>Regulatory Crime</span>
          <span>Inquests</span>
          <span>Prison Law</span>
        </div>
      </div>

      <section className="about" id="firm">
        <div className="wrap split">
          <div className="label" data-reveal="">
            <span className="sticky">01 — The Firm</span>
          </div>
          <div className="body-col">
            <div className="about-top">
              <figure className="about-img" data-reveal="">
                <img
                  src="/images/chambers.jpg"
                  alt="A barrister's chambers at night — briefs, law books and a brass lamp"
                  id="chambers-img"
                />
                <figcaption>Chambers — London</figcaption>
              </figure>
              <p className="statement" data-reveal="2">
                A small firm by design. <em>Formidable</em> by reputation. We take on the cases
                that define people&apos;s lives — and we do not flinch.
              </p>
            </div>
            <div className="cols">
              <p data-reveal="2">
                IM Solicitors was founded on a simple conviction: that every individual —
                whatever the allegation, whatever the odds — deserves advocacy of the highest
                calibre. We deliberately remain boutique, so that every client is represented by
                a senior solicitor who knows their case inside out.
              </p>
              <p data-reveal="3">
                Our practice sits at the intersection of criminal defence, civil liberties and
                public law. We defend the accused, challenge the state, and hold public
                authorities to account — in police stations, courtrooms and inquiry halls across
                England and Wales.
              </p>
            </div>
            <div className="stats">
              <div className="stat" data-reveal="">
                <b>
                  24<sup>/7</sup>
                </b>
                <span>Emergency representation</span>
              </div>
              <div className="stat" data-reveal="2">
                <b>5</b>
                <span>Levels of court covered</span>
              </div>
              <div className="stat" data-reveal="3">
                <b>6</b>
                <span>Specialist practice areas</span>
              </div>
              <div className="stat" data-reveal="">
                <b>
                  100<sup>%</sup>
                </b>
                <span>Senior-led casework</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="practice" id="practice">
        <div className="wrap split">
          <div className="label" data-reveal="">
            <span className="sticky">02 — Practice Areas</span>
          </div>
          <div className="body-col">
            <div className="practice-head">
              <h2 data-reveal="">
                What we defend,
                <br />
                challenge &amp; protect.
              </h2>
              <p data-reveal="2">
                Six tightly focused practice areas, each handled by solicitors who specialise —
                and nothing else.
              </p>
            </div>
            <div className="pindex">
              {[
                [
                  "01",
                  "Criminal Defence",
                  "Round-the-clock representation at police stations, Magistrates' Courts, the Crown Court, the Court of Appeal and the Supreme Court.",
                ],
                [
                  "02",
                  "Civil Liberties & Human Rights",
                  "Discrimination, data protection, asylum, domestic violence and trafficking — safeguarding fundamental rights against powerful interests.",
                ],
                [
                  "03",
                  "Public Law & Judicial Review",
                  "Challenging unfair or unlawful decisions by government bodies and public authorities through judicial review proceedings.",
                ],
                [
                  "04",
                  "Regulatory Crime",
                  "Defending individuals and organisations facing regulatory investigations, enforcement action or prosecution.",
                ],
                [
                  "05",
                  "Inquests & Public Inquiries",
                  "Securing evidence, questioning witnesses and guiding families through formal inquiries into a death or major event.",
                ],
                [
                  "06",
                  "Prison Law",
                  "Protecting the fundamental rights of people in custody — and standing beside their families throughout.",
                ],
              ].map(([num, title, body]) => (
                <a className="prow" href="#contact" data-reveal="" key={num}>
                  <span className="num">/ {num}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <span className="arrow">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                      <path d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="path" id="courts">
        <div className="wrap split">
          <div className="label" data-reveal="">
            <span className="sticky">03 — How We Work</span>
          </div>
          <div className="body-col">
            <h2 data-reveal="">
              With you at <em>every stage</em> of the justice system.
            </h2>
            <div className="stages">
              <div className="stage" data-reveal="">
                <i>Stage 01</i>
                <b>Police Station</b>
                <span>
                  Immediate advice and representation during interview — the moment cases are
                  won or lost.
                </span>
              </div>
              <div className="stage" data-reveal="2">
                <i>Stage 02</i>
                <b>Magistrates&apos; Court</b>
                <span>First hearings, bail applications and summary trials, handled with precision.</span>
              </div>
              <div className="stage" data-reveal="3">
                <i>Stage 03</i>
                <b>Crown Court</b>
                <span>Serious indictable matters, with experienced advocates and instructed counsel.</span>
              </div>
              <div className="stage" data-reveal="2">
                <i>Stage 04</i>
                <b>Court of Appeal</b>
                <span>Challenging unsafe convictions and excessive sentences.</span>
              </div>
              <div className="stage" data-reveal="3">
                <i>Stage 05</i>
                <b>Supreme Court</b>
                <span>Taking points of principle to the highest court in the land.</span>
              </div>
            </div>
            <div className="emergency" data-reveal="">
              <div>
                <h3>
                  Arrested? Asked to attend <em>a voluntary interview?</em>
                </h3>
                <p>
                  Say nothing until you have legal advice. Our solicitors answer day and night,
                  365 days a year — representation at the police station is free, regardless of
                  your means.
                </p>
              </div>
              <a className="phone" href="tel:+442070000000">
                020 7000 0000
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="team" id="team">
        <div className="wrap split">
          <div className="label" data-reveal="">
            <span className="sticky">04 — Our Team</span>
          </div>
          <div className="body-col">
            <div className="team-head">
              <h2 data-reveal="">
                Senior solicitors.
                <br />
                <em>Every</em> case.
              </h2>
              <p data-reveal="2">
                Placeholder profiles for now — replace with real names, portraits and
                biographies when ready.
              </p>
            </div>
          </div>
          <div className="team-grid">
            {[
              ["AR", "Managing Partner", "A. Rahman", "Criminal Defence", "Placeholder biography. Specialises in serious crime and police station representation across London and the South East."],
              ["SO", "Partner", "S. Okonkwo", "Public Law", "Placeholder biography. Advises on judicial review, human rights challenges and inquiries involving public authorities."],
              ["EW", "Senior Solicitor", "E. Whitfield", "Civil Liberties", "Placeholder biography. Acts in discrimination, data protection and trafficking matters with a focus on vulnerable clients."],
              ["JP", "Solicitor", "J. Patel", "Regulatory & Prison Law", "Placeholder biography. Defends regulatory prosecutions and protects the rights of people held in custody."],
            ].map(([initials, role, name, focus, bio], i) => (
              <article
                className="member"
                data-reveal={i % 3 === 0 ? "" : String((i % 3) + 1)}
                key={name}
              >
                <div className="member-photo" aria-hidden="true">
                  <span>{initials}</span>
                </div>
                <div className="role">{role}</div>
                <h3>{name}</h3>
                <div className="focus">{focus}</div>
                <p>{bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="insights" id="insights">
        <div className="wrap split">
          <div className="label" data-reveal="">
            <span className="sticky">05 — Insights</span>
          </div>
          <div className="body-col">
            <div className="insights-head">
              <h2 data-reveal="">
                Clear thinking on
                <br />
                the law that <em>matters.</em>
              </h2>
              <p data-reveal="2">
                Placeholder articles for the blog. Swap in real posts, dates and links when
                content is ready.
              </p>
            </div>
            <div className="posts">
              <a className="post" href="#insights" data-reveal="">
                <time dateTime="2026-09-12">12 Sep 2026</time>
                <div>
                  <h3>Asked to attend a voluntary interview?</h3>
                  <p>
                    Placeholder excerpt. What a voluntary interview really means, why you should
                    not go alone, and how early advice can change the course of a case.
                  </p>
                </div>
                <span className="more">Read →</span>
              </a>
              <a className="post" href="#insights" data-reveal="2">
                <time dateTime="2026-08-28">28 Aug 2026</time>
                <div>
                  <h3>When can you challenge a public decision?</h3>
                  <p>
                    Placeholder excerpt. A plain-English guide to judicial review — standing,
                    time limits, and the kinds of decisions that can be brought before the
                    courts.
                  </p>
                </div>
                <span className="more">Read →</span>
              </a>
              <a className="post" href="#insights" data-reveal="3">
                <time dateTime="2026-08-04">04 Aug 2026</time>
                <div>
                  <h3>Your rights at the police station</h3>
                  <p>
                    Placeholder excerpt. Free legal advice, the right to silence, and what
                    happens in interview — practical points every detained person should know.
                  </p>
                </div>
                <span className="more">Read →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="quote">
        <div className="quote-bg">
          <img
            src="/images/justice.jpg"
            alt="Lady Justice holding the scales against a stormy sky"
            id="justice-img"
          />
        </div>
        <div className="wrap">
          <blockquote data-reveal="">
            &quot;Liberty is not defended in the abstract. It is defended{" "}
            <em>one person, one case,</em> at a time.&quot;
          </blockquote>
          <cite data-reveal="2">— The founding principle of IM Solicitors</cite>
        </div>
      </section>

      <footer id="contact">
        <div className="foot-bg">
          <img src="/images/london.jpg" alt="The London skyline at dusk across the Thames" />
        </div>
        <div className="wrap">
          <div className="label" style={{ color: "var(--green)" }} data-reveal="">
            <span>06 — Contact</span>
          </div>
          <h2 data-reveal="" style={{ marginTop: 40 }}>
            Speak to a solicitor <em>today.</em>
          </h2>
          <div className="hero-actions" data-reveal="2">
            <a className="btn btn-gold" href="tel:+442070000000">
              Call 020 7000 0000
            </a>
            <a className="btn btn-ghost" href="mailto:enquiries@imsolicitors.com">
              enquiries@imsolicitors.com
            </a>
          </div>
          <div className="foot-grid">
            <div className="foot-brand">
              <img src="/images/im-logo.png" alt="IM Solicitors" />
              <p>
                IM Solicitors is a boutique law practice in London specialising in criminal
                defence, civil liberties and public law. Regulated by the Solicitors Regulation
                Authority.
              </p>
            </div>
            <div>
              <h4>Practice</h4>
              <a href="#practice">Criminal Defence</a>
              <a href="#practice">Civil Liberties</a>
              <a href="#practice">Public Law</a>
              <a href="#practice">Regulatory Crime</a>
              <a href="#practice">Inquests &amp; Inquiries</a>
              <a href="#practice">Prison Law</a>
            </div>
            <div>
              <h4>Firm</h4>
              <a href="#firm">The Firm</a>
              <a href="#team">Our Team</a>
              <a href="#insights">Insights</a>
              <a href="#courts">How We Work</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <h4>Visit</h4>
              <p>
                London, England
                <br />
                United Kingdom
              </p>
            </div>
            <div>
              <h4>Hours</h4>
              <p>
                Office: Mon–Fri, 9:00–18:00
                <br />
                Emergency line: 24 hours, every day
              </p>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 IM Solicitors</span>
            <span>Authorised &amp; regulated by the SRA</span>
            <span>Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}
