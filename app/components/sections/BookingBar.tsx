"use client";
import { useState } from "react";
import Link from "next/link";

const ITEMS = [
  "Patrimonio Arquitectónico",
  "Centro Histórico",
  "7 Suites Únicas",
  "Cartagena de Indias",
  "Siglo XVIII",
  "Calificación 9.4 / 10",
  "Desayuno Incluido",
  "Patrimonio Arquitectónico",
  "Centro Histórico",
  "7 Suites Únicas",
  "Cartagena de Indias",
  "Siglo XVIII",
  "Calificación 9.4 / 10",
  "Desayuno Incluido",
];

export function MarqueeStrip() {
  return (
    <div style={{ background: "var(--gold)", padding: "13px 0", overflow: "hidden", borderTop: "1px solid rgba(0,0,0,.15)" }}>
      <div className="marquee-inner">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11,
              letterSpacing: ".28em", textTransform: "uppercase",
              color: "var(--navy)", opacity: 0.7, padding: "0 40px",
              display: "flex", alignItems: "center", gap: 40,
            }}
          >
            {item}
            <span style={{ opacity: 0.4, fontSize: 8 }}>✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BookingBar() {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [rooms, setRooms] = useState("1 Habitación");
  const [guests, setGuests] = useState("2 Adultos");

  const fields = [
    { label: "Llegada", value: checkin, setter: setCheckin, type: "date" },
    { label: "Salida", value: checkout, setter: setCheckout, type: "date" },
  ];

  return (
    <div style={{ background: "rgba(12,15,25,.97)", borderBottom: "1px solid rgba(201,169,110,.06)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto" }}>
        {fields.map(({ label, value, setter, type }) => (
          <div
            key={label}
            style={{
              padding: "24px 36px", borderRight: "1px solid rgba(255,255,255,.05)",
              transition: "background .3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <span style={{ display: "block", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 8, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(201,169,110,.55)", marginBottom: 7 }}>{label}</span>
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              style={{ background: "none", border: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "rgba(255,255,255,.75)", width: "100%", colorScheme: "dark" }}
            />
          </div>
        ))}
        <div
          style={{ padding: "24px 36px", borderRight: "1px solid rgba(255,255,255,.05)", transition: "background .3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "")}
        >
          <span style={{ display: "block", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 8, letterSpacing: ".3em", textTransform: "uppercase", color: "rgba(201,169,110,.55)", marginBottom: 7 }}>Habitaciones / Huéspedes</span>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <select value={rooms} onChange={(e) => setRooms(e.target.value)} style={{ background: "none", border: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "rgba(255,255,255,.7)", WebkitAppearance: "none" }}>
              <option>1 Habitación</option>
              <option>2 Habitaciones</option>
              <option>3+</option>
            </select>
            <span style={{ color: "rgba(255,255,255,.15)" }}>·</span>
            <select value={guests} onChange={(e) => setGuests(e.target.value)} style={{ background: "none", border: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: 15, color: "rgba(255,255,255,.7)", WebkitAppearance: "none" }}>
              <option>2 Adultos</option>
              <option>1 Adulto</option>
              <option>2 Adultos / 1 Niño</option>
            </select>
          </div>
        </div>
        <Link
          href="/contacto"
          style={{
            padding: "24px 48px",
            background: "linear-gradient(135deg,#c9a96e 0%,#9a7540 100%)",
            color: "var(--navy)", fontWeight: 800,
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase",
            whiteSpace: "nowrap", display: "flex", alignItems: "center",
            transition: "opacity .3s, transform .2s",
          }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, { opacity: ".85", transform: "scale(1.02)" })}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, { opacity: "1", transform: "" })}
        >
          RESERVAR AHORA
        </Link>
      </div>
    </div>
  );
}
