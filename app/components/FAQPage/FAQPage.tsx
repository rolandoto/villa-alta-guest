"use client";
import { useState } from "react";

const faqs = [
  {
    q: "¿Cuál es el precio por noche?",
    a: "Las tarifas inician desde $450,000 COP por noche. Todas nuestras reservas directas incluyen desayuno.",
    icon: "◈",
  },
  {
    q: "¿El desayuno está incluido? ¿Cómo se sirve?",
    a: "Sí, el desayuno está incluido en todas las reservas realizadas directamente con nosotros. Lo servimos directamente en tu habitación en una bandeja de varios niveles — sin horarios fijos, a tu ritmo.",
    icon: "◈",
  },
  {
    q: "¿Cuáles son los horarios de check-in y check-out?",
    a: "El check-in es a partir de las 3:00 p.m. y el check-out hasta las 11:00 a.m. Si necesitas más flexibilidad, con gusto lo coordinamos según disponibilidad. Como cortesía, ofrecemos late check-out hasta las 12:00 p.m. para quienes lo soliciten con anticipación.",
    icon: "◈",
  },
  {
    q: "¿Tienen estacionamiento? ¿Cómo llego al hotel?",
    a: "No contamos con estacionamiento propio. Sin embargo, llegar es fácil: nos encuentras en Google Maps y en plataformas como Uber. Estamos en el corazón del Centro Histórico, en el Callejón de Los Estribos.",
    icon: "◈",
  },
  {
    q: "¿El hotel tiene ascensor? ¿Es accesible?",
    a: "Lamentablemente no contamos con ascensor. El hotel tiene escaleras en diferentes accesos, lo cual es parte de su arquitectura original del siglo XVIII. Te recomendamos consultarnos si tienes necesidades de movilidad específicas para ayudarte a elegir la opción más cómoda.",
    icon: "◈",
  },
  {
    q: "¿Aceptan mascotas?",
    a: "¡Solo las bien portadas! (y las difíciles también, con amor). Las mascotas son bienvenidas, aunque aplicamos un cargo adicional en caso de daños, limpieza extra o molestias a otros huéspedes. Dicho de otra forma: si tu mascota deja recuerdos que no son suyos, los cobramos. 🐾",
    icon: "◈",
  },
  {
    q: "¿Cómo reservo y cuál es la mejor tarifa?",
    a: "Reservando directamente desde nuestra página siempre tendrás la mejor oferta disponible. Si encuentras una tarifa menor en otra plataforma, escríbenos por WhatsApp — la igualamos, aplicamos un descuento adicional e incluimos desayuno si no lo tenía.",
    icon: "◈",
  },
  {
    q: "¿Ofrecen actividades o recomendaciones en Cartagena?",
    a: "¡Todo se puede organizar! Todas las reservas directas incluyen un recorrido por varias tiendas y espacios cercanos al hotel. Además, tenemos las mejores recomendaciones de la ciudad — somos locales, y se nota.",
    icon: "◈",
  },
  {
    q: "¿Cuál es la política de cancelación?",
    a: "Ofrecemos reembolso total para cancelaciones realizadas hasta un día antes de la llegada. Las cancelaciones en el mismo día o los no-shows aplican tarifa completa.",
    icon: "◈",
  },
  {
    q: "¿Tienen WiFi?",
    a: "Sí, contamos con WiFi en toda la propiedad. Tenemos dos puntos de acceso (repetidores) para garantizar buena señal en todas las habitaciones, con 50 Mbps dedicados.",
    icon: "◈",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  .faq-root {
    --wine:      #3a1c20;
    --wine-mid:  #48242a;
    --wine-hi:   #5c2e35;
    --wine-low:  #2c1418;
    --rose:      #c96e85;
    --rose2:     #e0899e;
    --gold:      #c9a96e;
    --gold2:     #e0c490;
    --cream:     #f2ede4;
    --cream2:    #e8e2d8;
    --accent-rose: #8b5c66;
    --muted:     rgba(242,237,228,.32);
    --muted2:    rgba(242,237,228,.50);
    --muted3:    rgba(242,237,228,.72);
    --border:    rgba(242,237,228,.08);

    width: 100%;
    min-height: 100vh;
    background: var(--wine);
    font-family: 'Barlow Condensed', sans-serif;
    position: relative;
    overflow: hidden;
    color: var(--cream);
  }

  .faq-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size: 200px;
    pointer-events: none;
    z-index: 0;
    opacity: .45;
  }

  .faq-inner {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 48px 96px;
  }

  .faq-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 72px;
    font-size: 9px;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: var(--muted2);
  }

  .faq-topbar-logo {
    font-size: 11px;
    letter-spacing: .36em;
    color: var(--cream);
    font-weight: 700;
  }

  .faq-header {
    margin-bottom: 64px;
  }

  .faq-eyebrow {
    font-size: 9px;
    letter-spacing: .32em;
    text-transform: uppercase;
    color: var(--muted2);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .faq-eyebrow::before {
    content: '';
    width: 24px;
    height: 1px;
    background: linear-gradient(to right, var(--gold), transparent);
    flex-shrink: 0;
  }

  .faq-title {
    font-weight: 900;
    font-size: clamp(48px, 7vw, 96px);
    line-height: .86;
    text-transform: uppercase;
    color: var(--cream);
    letter-spacing: -.02em;
    margin: 0 0 12px;
  }

  .faq-title-sub {
    font-weight: 300;
    font-size: clamp(24px, 3.5vw, 44px);
    line-height: .9;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: var(--rose);
    margin: 0 0 28px;
  }

  .faq-lead {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.85;
    color: var(--muted3);
    max-width: 540px;
    margin: 0;
  }

  .faq-divider {
    width: 40px;
    height: 1px;
    background: linear-gradient(to right, var(--gold), transparent);
    margin: 32px 0 48px;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .faq-item {
    border: 1px solid var(--border);
    border-radius: 2px;
    overflow: hidden;
    transition: border-color .25s;
  }

  .faq-item.open {
    border-color: rgba(201,110,133,.22);
  }

  .faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 28px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(13px, 1.5vw, 15px);
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--cream);
    transition: background .2s, color .2s;
  }

  .faq-item.open .faq-question {
    background: rgba(201,110,133,.06);
  }

  .faq-question:hover {
    background: rgba(242,237,228,.04);
  }

  .faq-q-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .faq-num {
    font-size: 9px;
    letter-spacing: .12em;
    color: var(--rose);
    opacity: .6;
    flex-shrink: 0;
    font-weight: 400;
    min-width: 20px;
  }

  .faq-item.open .faq-num {
    opacity: 1;
  }

  .faq-chevron {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border: 1px solid rgba(201,110,133,.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: var(--rose);
    transition: transform .3s cubic-bezier(.4,0,.2,1), background .2s, border-color .2s;
  }

  .faq-item.open .faq-chevron {
    transform: rotate(180deg);
    background: rgba(201,110,133,.15);
    border-color: rgba(201,110,133,.5);
  }

  .faq-answer-wrap {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows .35s cubic-bezier(.4,0,.2,1);
  }

  .faq-item.open .faq-answer-wrap {
    grid-template-rows: 1fr;
  }

  .faq-answer-inner {
    overflow: hidden;
  }

  .faq-answer {
    padding: 0 28px 28px 56px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: 15px;
    line-height: 1.85;
    color: var(--muted3);
    border-top: 1px solid var(--border);
    margin: 0 28px;
    padding: 22px 0 24px 28px;
  }

  .faq-answer-border {
    padding: 22px 28px 26px 56px;
  }

  .faq-gold-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, var(--gold), transparent);
    opacity: .35;
    margin: 0 28px;
    width: calc(100% - 56px);
  }

  .faq-footer {
    margin-top: 80px;
    padding-top: 36px;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }

  .faq-footer-text {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 300;
    font-size: 15px;
    color: var(--muted2);
    max-width: 340px;
    line-height: 1.7;
  }

  .faq-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 36px;
    border-radius: 2px;
    border: 1px solid var(--rose);
    background: transparent;
    color: var(--rose2);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    letter-spacing: .32em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background .25s, color .25s;
    text-decoration: none;
    white-space: nowrap;
  }

  .faq-cta:hover {
    background: var(--rose);
    color: var(--wine);
  }

  .faq-progress {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: rgba(255,255,255,.06);
    z-index: 100;
  }

  .faq-progress-fill {
    height: 100%;
    background: linear-gradient(to right, var(--gold), var(--gold2));
    transition: width .15s;
  }

  @media (max-width: 640px) {
    .faq-inner { padding: 48px 20px 72px; }
    .faq-topbar { margin-bottom: 48px; }
    .faq-header { margin-bottom: 40px; }
    .faq-answer-border { padding: 18px 20px 22px 36px; }
    .faq-question { padding: 18px 20px; font-size: 12px; }
    .faq-gold-line { margin: 0 20px; width: calc(100% - 40px); }
    .faq-footer { flex-direction: column; align-items: flex-start; }
  }
`;

export default function FAQPage() {
 const [open, setOpen] = useState<number | null>(null);
  const [scrollPct, setScrollPct] = useState(0);

const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
  setScrollPct(Math.min(pct, 100));
};

const toggle = (i: number) => setOpen(open === i ? null : i);
  return (
    <>
      <style>{styles}</style>
      <div className="faq-root" onScroll={handleScroll} style={{ overflowY: "auto" }}>
        <div className="faq-progress">
          <div className="faq-progress-fill" style={{ width: `${scrollPct}%` }} />
        </div>

        <div className="faq-inner">
          <div className="faq-topbar">
            <span className="faq-topbar-logo">Villa Alta</span>
            <span>Callejón de los Estribos · Cartagena</span>
          </div>

          <div className="faq-header">
            <div className="faq-eyebrow">Guest House · Preguntas frecuentes</div>
            <h1 className="faq-title">Preguntas</h1>
            <h2 className="faq-title-sub">Frecuentes</h2>
            <p className="faq-lead">
              Todo lo que necesitas saber antes de llegar. Si tienes otra duda, escríbenos — somos locales y se nota.
            </p>
            <div className="faq-divider" />
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
                <button className="faq-question" onClick={() => toggle(i)}>
                  <div className="faq-q-left">
                    <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{faq.q}</span>
                  </div>
                  <span className="faq-chevron">▾</span>
                </button>

                <div className="faq-answer-wrap">
                  <div className="faq-answer-inner">
                    <div className="faq-gold-line" />
                    <div className="faq-answer-border">
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "15px",
                        lineHeight: "1.85",
                        color: "rgba(242,237,228,.72)",
                        margin: 0,
                      }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-footer">
            <p className="faq-footer-text">
              ¿No encontraste lo que buscabas? Estamos a un mensaje de distancia.
            </p>
            <a
              href="https://wa.me/3215062187"
              target="_blank"
              rel="noopener noreferrer"
              className="faq-cta">
              Escríbenos por WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}