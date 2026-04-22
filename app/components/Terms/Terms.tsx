"use client";
import { useState } from "react";

const sections = [
  {
    id: "reservas",
    title: "Reservas y tarifas",
    content: `Las tarifas inician desde $450,000 COP por noche. El precio puede variar según el tipo de suite, la temporada y el canal de reserva. Las reservas realizadas directamente con Villa Alta Guest House siempre ofrecen la mejor tarifa disponible. Si encuentras una tarifa menor en otra plataforma, escríbenos por WhatsApp antes de completar tu reserva — la igualamos, aplicamos un descuento adicional e incluimos desayuno si no estaba incluido.`,
  },
  {
    id: "pagos",
    title: "Métodos de pago",
    content: `Aceptamos tarjetas débito y crédito de las principales franquicias, pagos mediante link electrónico, transferencias bancarias y efectivo. No aceptamos pagos por Nequi. Para reservas directas, el pago se gestiona a través de nuestra plataforma de reservas. No se requiere depósito de garantía al momento del check-in.`,
  },
  {
    id: "retracto",
    title: "Derecho de retracto",
    content: `El huésped podrá ejercer el derecho de retracto únicamente en compras no presenciales realizadas a través de portales web o canales de reserva directa (WhatsApp, correo electrónico o central telefónica). La solicitud deberá realizarse dentro de un plazo máximo de cinco (5) días hábiles posteriores a la confirmación de la reserva. Si la fecha de ingreso está dentro de ese plazo, no procederá el derecho de retracto y aplicarán las políticas de cancelación estándar.`,
  },
  {
    id: "cancelaciones",
    title: "Políticas de cancelación",
    content: `En caso de no aplicar el derecho de retracto, las cancelaciones se regirán bajo las siguientes condiciones basadas en la anticipación del aviso:`,
    items: [
      { label: "8 días o más antes del check-in", value: "Devolución del 80% del valor depositado." },
      { label: "Entre 8 y 3 días antes del check-in", value: "Se retendrá el 50% del valor depositado." },
      { label: "Dentro de las 48 horas previas", value: "Se cobrará el 100% del valor depositado (No reembolsable)." },
      { label: "Salidas anticipadas", value: "Se generará un saldo a favor por las noches no utilizadas, válido por un (1) año, sujeto a disponibilidad." },
    ],
  },
  {
    id: "devoluciones",
    title: "Políticas de devolución",
    content: `Cuando proceda una devolución conforme a nuestras políticas, Villa Alta Guest House gestionará el reembolso bajo los siguientes términos:`,
    items: [
      { label: "Plazo de ejecución", value: "Máximo 30 días calendario a partir de la solicitud formal." },
      { label: "Método de reembolso", value: "Consignación bancaria al titular de la reserva o reversión al mismo medio de pago utilizado." },
    ],
  },
  {
    id: "checkin",
    title: "Check-in y check-out",
    content: null,
    items: [
      { label: "Check-in", value: "desde las 3:00 p.m." },
      { label: "Check-out", value: "hasta las 11:00 a.m." },
      { label: "Late check-out", value: "hasta las 12:00 p.m. de cortesía, sujeto a disponibilidad, para quienes lo soliciten con anticipación." },
    ],
    note: "Solicitudes fuera de estos horarios se evalúan caso a caso sin costo adicional garantizado.",
  },
  {
    id: "capacidad",
    title: "Capacidad y ocupación",
    content: `Nuestras suites están diseñadas para dos personas. No contamos con camas adicionales, camas nido ni cunas. No es posible acomodar más huéspedes de los indicados en la reserva.`,
  },
  {
    id: "menores",
    title: "Menores de edad",
    content: `Los menores de edad son bienvenidos únicamente acompañados de su representante legal. La reserva debe ser realizada por un adulto mayor de 18 años. No se admiten reservas ni hospedajes para menores sin representante legal presente.`,
  },
  {
    id: "mascotas",
    title: "Mascotas",
    content: `Las mascotas son bienvenidas. El huésped asume plena responsabilidad por cualquier daño causado a las instalaciones o molestias ocasionadas. Los costos de reparación o limpieza profunda serán cargados al método de pago registrado.`,
  },
  {
    id: "convivencia",
    title: "Convivencia",
    content: `Villa Alta es un espacio compartido de respeto. No contamos con horario de silencio estricto, pero exigimos comportamiento moderado. La administración se reserva el derecho de retiro sin reembolso en caso de molestias significativas a terceros.`,
  },
  {
    id: "accesibilidad",
    title: "Accesibilidad",
    content: `El hotel no cuenta con ascensor. Al ser una arquitectura original del siglo XVIII, el acceso requiere el uso de escaleras. Por favor, infórmenos si tiene necesidades de movilidad específicas antes de reservar.`,
  },
  {
    id: "privacidad",
    title: "Privacidad y Datos",
    content: `Diez Elementos S.A.S. (Ley 1581 de 2012) utiliza sus datos solo para la gestión del alojamiento y obligaciones legales. Para consultas o supresión de datos: hotelvillaaltac@gmail.com.`,
  },
];
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  .tc-root {
    --wine:#3a1c20;--wine-mid:#48242a;--wine-hi:#5c2e35;--wine-low:#2c1418;
    --rose:#c96e85;--rose2:#e0899e;--gold:#c9a96e;--gold2:#e0c490;
    --cream:#f2ede4;--cream2:#e8e2d8;--accent-rose:#8b5c66;
    --muted:rgba(242,237,228,.32);--muted2:rgba(242,237,228,.50);--muted3:rgba(242,237,228,.72);
    --border:rgba(242,237,228,.08);
    width:100%;min-height:100vh;background:var(--wine);
    font-family:'Barlow Condensed',sans-serif;position:relative;overflow:hidden;color:var(--cream);
  }
  .tc-root::before {
    content:'';position:fixed;inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size:200px;pointer-events:none;z-index:0;opacity:.45;
  }
  .tc-layout {
    position:relative;z-index:1;display:grid;
    grid-template-columns:220px 1fr;min-height:100vh;
  }
  .tc-sidebar {
    border-right:1px solid var(--border);padding:52px 28px 52px 36px;
    display:flex;flex-direction:column;gap:0;position:sticky;top:0;height:100vh;overflow-y:auto;
  }
  .tc-sidebar::-webkit-scrollbar{display:none;}
  .tc-logo {
    font-size:11px;letter-spacing:.36em;color:var(--cream);font-weight:700;margin-bottom:8px;
  }
  .tc-sub {
    font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted2);margin-bottom:40px;
  }
  .tc-nav-label {
    font-size:8px;letter-spacing:.28em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;
    display:flex;align-items:center;gap:10px;
  }
  .tc-nav-label::after{content:'';flex:1;height:1px;background:var(--border);}
  .tc-nav {
    display:flex;flex-direction:column;gap:2px;flex:1;
  }
  .tc-nav-item {
    font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted2);
    padding:8px 12px;border-radius:2px;cursor:pointer;transition:background .2s,color .2s;
    border:none;background:transparent;text-align:left;font-family:'Barlow Condensed',sans-serif;
    border-left:2px solid transparent;
  }
  .tc-nav-item:hover{color:var(--cream);background:rgba(242,237,228,.04);}
  .tc-nav-item.active{color:var(--rose2);border-left-color:var(--rose);background:rgba(201,110,133,.06);}
  .tc-main {
    padding:52px 56px 96px;overflow-y:auto;
    scrollbar-width:none;
  }
  .tc-main::-webkit-scrollbar{display:none;}
  .tc-topbar {
    display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:60px;
    font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:var(--muted2);
  }
  .tc-eyebrow {
    font-size:9px;letter-spacing:.32em;text-transform:uppercase;color:var(--muted2);
    margin-bottom:16px;display:flex;align-items:center;gap:14px;
  }
  .tc-eyebrow::before{content:'';width:24px;height:1px;background:linear-gradient(to right,var(--gold),transparent);flex-shrink:0;}
  .tc-h1{font-weight:900;font-size:clamp(40px,6vw,76px);line-height:.86;text-transform:uppercase;color:var(--cream);letter-spacing:-.02em;margin:0 0 8px;}
  .tc-h1-sub{font-weight:300;font-size:clamp(20px,3vw,36px);line-height:.9;text-transform:uppercase;letter-spacing:.06em;color:var(--rose);margin:0 0 24px;}
  .tc-entity {
    font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;
    font-size:14px;line-height:1.85;color:var(--muted2);margin:0;
  }
  .tc-entity a{color:var(--rose2);text-decoration:none;}
  .tc-div{width:40px;height:1px;background:linear-gradient(to right,var(--gold),transparent);margin:28px 0 56px;}
  .tc-section{margin-bottom:56px;scroll-margin-top:52px;}
  .tc-sec-head {
    display:flex;align-items:center;gap:16px;margin-bottom:20px;
  }
  .tc-sec-num{font-size:9px;letter-spacing:.12em;color:var(--rose);opacity:.6;font-weight:400;flex-shrink:0;min-width:20px;}
  .tc-sec-title{font-size:clamp(13px,1.4vw,15px);font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--cream);}
  .tc-gold-line{height:1px;background:linear-gradient(to right,var(--gold),transparent);opacity:.3;margin-bottom:20px;}
  .tc-body{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:15px;line-height:1.85;color:var(--muted3);margin:0;}
  .tc-items{display:flex;flex-direction:column;gap:10px;margin-bottom:12px;}
  .tc-item{display:grid;grid-template-columns:auto 1fr;gap:0 20px;align-items:baseline;}
  .tc-item-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--rose);font-weight:700;white-space:nowrap;padding-top:2px;}
  .tc-item-val{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:15px;line-height:1.7;color:var(--muted3);}
  .tc-note{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-top:12px;}
  .tc-footer{margin-top:80px;padding-top:36px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;}
  .tc-footer-text{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:14px;color:var(--muted2);line-height:1.7;margin:0;}
  .tc-cta{display:inline-flex;align-items:center;gap:10px;padding:12px 32px;border-radius:2px;border:1px solid var(--rose);background:transparent;color:var(--rose2);font-family:'Barlow Condensed',sans-serif;font-size:9px;letter-spacing:.32em;text-transform:uppercase;cursor:pointer;transition:background .25s,color .25s;text-decoration:none;white-space:nowrap;}
  .tc-cta:hover{background:var(--rose);color:var(--wine);}
  .tc-update{font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-top:20px;}

  @media (max-width:860px){
    .tc-layout{grid-template-columns:1fr;}
    .tc-sidebar{display:none;}
    .tc-main{padding:40px 24px 72px;}
  }
`;

export default function TermsPage() {
  const [active, setActive] = useState("reservas");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="tc-root">
        <div className="tc-layout">
          <aside className="tc-sidebar">
            <div className="tc-logo">Villa Alta</div>
            <div className="tc-sub">Guest House</div>
            <div className="tc-nav-label">Secciones</div>
            <nav className="tc-nav">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  className={`tc-nav-item${active === s.id ? " active" : ""}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {String(i + 1).padStart(2, "0")} — {s.title}
                </button>
              ))}
            </nav>
          </aside>

          <main className="tc-main">
            <div className="tc-topbar">
              <span>Hotel Villa alta · NIT 1047403601-9</span>
              <span>RNT No. 224939</span>
            </div>

            <div className="tc-eyebrow">Políticas y Términos</div>
            <h1 className="tc-h1">Términos</h1>
            <h2 className="tc-h1-sub">& Condiciones</h2>
            <p className="tc-entity">
              Nombre comercial: Villa Alta Guest House<br />
              Callejón de Los Estribos 116, P2, Centro Histórico, Cartagena de Indias<br />
              <a href="tel:+573215062187">+57 321 506 2187</a>
              {" · "}
              <a href="mailto:hotelvillaaltac@gmail.com">hotelvillaaltac@gmail.com</a>
            </p>
            <div className="tc-div" />

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="tc-section">
                <div className="tc-sec-head">
                  <span className="tc-sec-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tc-sec-title">{s.title}</span>
                </div>
                <div className="tc-gold-line" />

                {s.items ? (
                  <>
                    <div className="tc-items">
                      {s.items.map((item, j) => (
                        <div key={j} className="tc-item">
                          <span className="tc-item-label">{item.label}</span>
                          <span className="tc-item-val">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    {s.note && <p className="tc-note">{s.note}</p>}
                  </>
                ) : (
                  <p className="tc-body">{s.content}</p>
                )}
              </section>
            ))}
            <div className="tc-footer">
              <p className="tc-footer-text">
                ¿Tienes preguntas sobre estas políticas?<br />Escríbenos, somos locales y se nota.
              </p>
              <a
                href="https://wa.me/573215062187"
                target="_blank"
                rel="noopener noreferrer"
                className="tc-cta"
              >
                Escríbenos por WhatsApp →
              </a>
            </div>
            <p className="tc-update">Última actualización: abril de 2026</p>
          </main>
        </div>
      </div>
    </>
  );
}