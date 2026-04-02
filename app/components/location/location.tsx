"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

/* ─── Data ──────────────────────────────────────────────────────── */
const store = {
  id: 1,
  name: "Villa Alta Guest House",
  neighborhood: "Centro Histórico",
  address: "Callejón De Los Estribos 2-116, Centro Histórico, Cartagena de Indias",
  lat: 10.4240595,
  lng: -75.5523084,
  open: "Lun – Dom · Recepción 24 horas",
  phone: "+57 321 506 2187",
  email: "hotelvillaaltac@gmail.com",
  photo: "/FotosHotelVillaAlta/FOTOS/DSC06318.jpg",
  tagline: "En el corazón del Centro Histórico",
  checkIn: "3:00 PM",
  checkOut: "11:00 PM",
  rating: "9.4",
};

const nearbyPlaces = [
  { id: "p1", name: "Plaza de Santo Domingo", dist: "2 min a pie",   lat: 10.424340,  lng: -75.551975  },
  { id: "p2", name: "Ciudad Amurallada",       dist: "3 min a pie",   lat: 10.4231546, lng: -75.5502165 },
  { id: "p3", name: "Palacio de la Inquisición",dist: "4 min a pie",  lat: 10.4231599, lng: -75.5515244 },
  { id: "p4", name: "Castillo San Felipe",      dist: "15 min en taxi",lat: 10.422506,  lng: -75.539271  },
];

/* ─── Map config ─────────────────────────────────────────────────── */
const MAP_CENTER = { lat: 10.4238, lng: -75.5515 };
const LIBRARIES: ("places")[] = [];
const containerStyle = { width: "100%", height: "100%" };

const mapStyles = [
  { featureType: "all",               elementType: "geometry",           stylers: [{ color: "#f5f0e8" }] },
  { featureType: "water",             elementType: "geometry",           stylers: [{ color: "#ddeaf2" }] },
  { featureType: "road",              elementType: "geometry",           stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial",     elementType: "geometry",           stylers: [{ color: "#ede8da" }] },
  { featureType: "landscape.natural", elementType: "geometry",           stylers: [{ color: "#e8ede0" }] },
  { featureType: "poi.park",          elementType: "geometry",           stylers: [{ color: "#d4e8c2" }] },
  { featureType: "poi",                                                  stylers: [{ visibility: "off" }] },
  { featureType: "transit",                                              stylers: [{ visibility: "off" }] },
  { featureType: "road",              elementType: "labels.text.fill",   stylers: [{ color: "#b0a080" }] },
  { featureType: "administrative",    elementType: "labels.text.fill",   stylers: [{ color: "#7a6a50" }] },
];

/* pin SVGs */
const activePinSVG = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
<svg width="44" height="54" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="22" cy="50" rx="8" ry="3" fill="rgba(0,0,0,0.18)"/>
  <path d="M22 2 C12 2 4 10 4 20 C4 32 22 48 22 48 C22 48 40 32 40 20 C40 10 32 2 22 2Z" fill="#3d2c14" stroke="white" stroke-width="2.5"/>
  <circle cx="22" cy="20" r="7" fill="white"/>
  <circle cx="22" cy="20" r="3.5" fill="#b8975a"/>
</svg>`);

const idlePinSVG = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
<svg width="34" height="42" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="17" cy="38" rx="6" ry="2.5" fill="rgba(0,0,0,0.12)"/>
  <path d="M17 2 C9 2 3 8 3 16 C3 26 17 36 17 36 C17 36 31 26 31 16 C31 8 25 2 17 2Z" fill="#b8975a" stroke="white" stroke-width="2"/>
  <circle cx="17" cy="16" r="5" fill="white"/>
</svg>`);

/* ─── Skeleton ───────────────────────────────────────────────────── */
function MapSkeleton({ error, onRetry }: { error?: boolean; onRetry?: () => void }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#f0ece2]">
      {error ? (
        <div className="text-center">
          <p className="text-[#7a6a52] text-sm mb-1">Map failed to load</p>
          {onRetry && (
            <button onClick={onRetry}
              className="mt-3 px-4 py-2 bg-[#3d2c14] text-white text-xs tracking-wider rounded-full">
              Retry
            </button>
          )}
        </div>
      ) : (
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-[#d4c4a0] border-t-[#b8975a] animate-spin mx-auto mb-3" />
          <p className="text-[#b0a080] text-xs tracking-widest uppercase">Cargando mapa…</p>
        </div>
      )}
    </div>
  );
}

/* ─── Map inner ──────────────────────────────────────────────────── */
function MapInner({ selected, onSelect, onLoad }: {
  selected: boolean;
  onSelect: () => void;
  onLoad: (map: google.maps.Map) => void;
}) {
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={MAP_CENTER} zoom={15}
      options={{ styles: mapStyles, disableDefaultUI: true, zoomControl: true, gestureHandling: "greedy", zoomControlOptions: { position: 7 } }}
      onLoad={onLoad}>
      <Marker position={{ lat: store.lat, lng: store.lng }} onClick={onSelect}
        icon={{ url: selected ? activePinSVG : idlePinSVG }} title={store.name} />
      {nearbyPlaces.map((p) => (
        <Marker key={p.id} position={{ lat: p.lat, lng: p.lng }}
          icon={{ url: idlePinSVG }} title={p.name} />
      ))}
    </GoogleMap>
  );
}

/* ─── Main ───────────────────────────────────────────────────────── */
export default function ContactSection() {
  const [selected, setSelected]       = useState(false);
  const [mobileTab, setMobileTab]     = useState<"list"|"map">("list");
  const [mapRendered, setMapRendered] = useState(false);
  const [loadError, setLoadError]     = useState(false);
  const [retryKey, setRetryKey]       = useState(0);
  const [copiedPhone, setCopied]      = useState(false);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError: apiError } = useJsApiLoader({
    googleMapsApiKey:  "AIzaSyB5gsEN5HLPh4Q9RdCImZZVR71A-cXkY2Y",
    libraries: LIBRARIES,
  });

  useEffect(() => { if (apiError) setLoadError(true); }, [apiError]);
  useEffect(() => {
    if (isLoaded) return;
    const t = setTimeout(() => setLoadError(true), 12000);
    return () => clearTimeout(t);
  }, [isLoaded, retryKey]);

  const handleSelect = useCallback(() => {
    setSelected(true);
    setMobileTab("map");
    if (mapInstance) { mapInstance.panTo({ lat: store.lat, lng: store.lng }); mapInstance.setZoom(16); }
  }, [mapInstance]);

  const handleDeselect = useCallback(() => {
    setSelected(false);
    if (mapInstance) { mapInstance.panTo(MAP_CENTER); mapInstance.setZoom(15); }
  }, [mapInstance]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(store.phone);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMapInstance(map); setMapRendered(true);
  }, []);

  const showSkeleton = !isLoaded || !mapRendered;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500&display=swap');
        .va-root { font-family: 'Jost', sans-serif; background: #faf7f2; }
        .va-serif { font-family: 'Cormorant Garamond', Georgia, serif; }

        .va-card {
          background: #ffffff;
          border: 1.5px solid transparent;
          border-radius: 16px;
          transition: box-shadow .35s ease, border-color .3s ease, transform .35s cubic-bezier(.22,1,.36,1);
          cursor: pointer;
        }
        .va-card:hover { box-shadow: 0 12px 36px rgba(61,44,20,.1); transform: translateY(-2px); }
        .va-card.active { border-color: #b8975a; box-shadow: 0 12px 36px rgba(184,151,90,.18); }
        .va-card-img { transition: transform .7s cubic-bezier(.22,1,.36,1); }
        .va-card:hover .va-card-img { transform: scale(1.06); }

        .va-nearby-row {
          border-bottom: 1px solid #f5ede0;
          transition: background .2s ease;
        }
        .va-nearby-row:last-child { border-bottom: none; }
        .va-nearby-row:hover { background: rgba(184,151,90,.05); }

        @keyframes vaSheet {
          from { opacity:0; transform: translateY(16px) scale(.98); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        .va-popup { animation: vaSheet .38s cubic-bezier(.22,1,.36,1) both; }

        .va-tab-active { border-bottom: 2px solid #b8975a; color: #3d2c14; font-weight: 500; }
        .va-tab-idle   { border-bottom: 2px solid transparent; color: #9a8a72; }

        .va-scroll::-webkit-scrollbar { width: 3px; }
        .va-scroll::-webkit-scrollbar-thumb { background: #d4c4a0; border-radius: 4px; }

        .va-map-overlay { transition: opacity .6s ease; }
        .va-map-overlay.gone { opacity: 0; pointer-events: none; }

        .va-btn-dark {
          background: #3d2c14; color: #f5ede0;
          font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
          transition: background .25s ease, transform .15s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .va-btn-dark:hover { background: #2e2010; }
        .va-btn-dark:active { transform: scale(.97); }

        .va-btn-wa {
          background: #25d366; color: white;
          font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
          transition: background .25s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .va-btn-wa:hover { background: #1ebe5d; }

        .va-btn-ghost {
          border: 1px solid rgba(61,44,20,.2); color: #3d2c14;
          font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
          transition: border-color .25s ease, background .25s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .va-btn-ghost:hover { border-color: rgba(61,44,20,.5); background: rgba(61,44,20,.04); }

        .gold-rule { display:block; width:36px; height:1px; background:linear-gradient(90deg,transparent,#b8975a,transparent); margin-top:10px; }
      `}</style>

      <div className="va-root" id="ubicacion">

        {/* ── MOBILE TAB BAR ─────────────────────────────────────── */}
        <div className="lg:hidden sticky top-0 z-30 flex border-b bg-[#faf7f2]/95 backdrop-blur-sm"
          style={{ borderColor: "#e8dfc8" }}>
          {(["list","map"] as const).map(tab => (
            <button key={tab} role="tab" aria-selected={mobileTab===tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 py-3.5 text-[11px] font-medium tracking-widest uppercase transition-all ${
                mobileTab===tab ? "va-tab-active" : "va-tab-idle"
              }`}>
              {tab === "list" ? "◆ Ubicación" : "◆ Mapa"}
            </button>
          ))}
        </div>

        {/* ── MAIN SPLIT ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:h-screen">

          {/* ════════════════════════════════════════════════════════
              LEFT PANEL  (same width as the screenshot ~44%)
          ════════════════════════════════════════════════════════ */}
          <div className={`va-scroll w-full lg:w-[44%] overflow-y-auto bg-[#faf7f2]
            ${mobileTab === "list" ? "block" : "hidden"} lg:block`}>
            <div className="px-7 sm:px-10 py-9 sm:py-12">

              {/* Header — identical structure to screenshot */}
              <div className="mb-7">
                <p className="text-[#b8975a] text-[10px] tracking-[0.3em] font-medium uppercase mb-1">
                  1 Ubicación · Cartagena de Indias
                </p>
                <h2 className="va-serif text-[#3d2c14] font-light"
                  style={{ fontSize: "clamp(1.55rem, 2.5vw, 1.95rem)" }}>
                  Encuentra tu espacio
                </h2>
                <span className="gold-rule" />
              </div>

              {/* ── Hotel card (mirrors the store cards in screenshot) */}
              <div onClick={handleSelect}
                onKeyDown={e => e.key==="Enter" && handleSelect()}
                tabIndex={0} role="button" aria-pressed={selected}
                className={`va-card mb-4 overflow-hidden ${selected ? "active" : "shadow-sm"}`}>
                <div className="flex items-stretch">

                  {/* Thumbnail */}
                  <div className="relative w-[110px] sm:w-[140px] flex-shrink-0 overflow-hidden" style={{ minHeight: 110 }}>
                    <Image src={store.photo} alt={store.name} fill className="va-card-img object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#3d2c14]/10" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-4 py-4 min-w-0">
                    <p className="text-[#b8975a] text-[10px] tracking-[0.22em] uppercase font-medium mb-0.5">
                      {store.neighborhood}
                    </p>
                    <h3 className="va-serif text-[#3d2c14] font-medium text-[15px] leading-tight mb-0.5">
                      {store.name}
                    </h3>
                    <p className="text-[#b8975a]/60 text-[10px] italic mb-3">{store.tagline}</p>

                    <div className="flex items-start gap-2 text-[11px] text-[#7a6a52] mb-1.5">
                      {/* pin */}
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#b8975a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span className="line-clamp-2 leading-snug">{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#7a6a52]">
                      {/* clock */}
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#b8975a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{store.open}</span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div className={`flex items-center pr-4 transition-all duration-300 ${
                    selected ? "text-[#b8975a]" : "text-[#d4c4a0] -translate-x-1"}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>

                {/* Gold underline when active */}
                <div className={`h-[2px] transition-all duration-500 ${selected
                  ? "bg-gradient-to-r from-transparent via-[#b8975a] to-transparent opacity-100"
                  : "opacity-0"}`} />
              </div>

              {/* ── Nearby places card (mirrors "Reservations" card in screenshot) */}
              <div className="bg-white border border-[#e8dfc8] rounded-2xl overflow-hidden mb-4 shadow-sm">
                <div className="px-5 py-3.5 border-b border-[#f0e8d8]">
                  <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-[#3d2c14]">
                    Cerca de Villa Alta
                  </p>
                </div>
                {nearbyPlaces.map((p) => (
                  <div key={p.id} className="va-nearby-row flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[#b8975a] text-[10px]">◆</span>
                      <span className="text-[12px] text-[#3d2c14]">{p.name}</span>
                    </div>
                    <span className="text-[10px] text-[#9a8a72] flex-shrink-0 ml-2">{p.dist}</span>
                  </div>
                ))}
              </div>

              {/* ── Contact card (mirrors the phone card in screenshot) */}
              <div className="bg-white border border-[#e8dfc8] rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#b8975a]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#b8975a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#3d2c14] text-xs font-medium mb-0.5">Reservas e Información</p>
                    <button onClick={handleCopy}
                      className="text-[#7a6a52] text-[11px] hover:text-[#3d2c14] transition-colors flex items-center gap-2">
                      {store.phone}
                      <span className={`text-[9px] tracking-wide transition-all ${copiedPhone ? "text-emerald-600" : "text-[#b8975a]/50"}`}>
                        {copiedPhone ? "✓ Copiado" : "Copiar"}
                      </span>
                    </button>
                    <p className="text-[#7a6a52] text-[11px] mt-0.5">{store.email}</p>
                    <p className="text-[#b8975a]/60 text-[10px] leading-relaxed mt-2">
                      Walk-ins bienvenidos sujeto a disponibilidad. Desayuno incluido.
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-8" />
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
              RIGHT PANEL — MAP (same ~56% as screenshot)
          ════════════════════════════════════════════════════════ */}
          <div className={`w-full lg:w-[56%] lg:h-screen lg:sticky lg:top-0 relative
            ${mobileTab === "map" ? "block" : "hidden"} lg:block`}
            style={{ height: mobileTab==="map" ? "calc(100vh - 49px)" : undefined }}>

            {/* Skeleton overlay */}
            <div className={`va-map-overlay absolute inset-0 z-10 ${!showSkeleton && !loadError ? "gone" : ""}`}
              aria-hidden={!showSkeleton && !loadError}>
              <MapSkeleton error={loadError}
                onRetry={() => { setLoadError(false); setRetryKey(k => k+1); }} />
            </div>

            {isLoaded && !loadError && (
              <MapInner selected={selected} onSelect={handleSelect} onLoad={handleMapLoad} />
            )}

            {/* ── POPUP — mirrors the popup in screenshot */}
            {selected && (
              <div className="va-popup absolute z-50 bg-white overflow-hidden
                bottom-0 left-0 right-0 rounded-t-2xl
                lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto
                lg:rounded-2xl lg:w-[85%] lg:max-w-[360px]
                shadow-2xl border border-[#e8dfc8]">

                {/* Photo header */}
                <div className="relative overflow-hidden" style={{ height: 160 }}>
                  <Image src={store.photo} alt={store.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008]/80 via-[#1a1008]/15 to-transparent" />

                  {/* Mobile drag handle */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-9 h-1 bg-white/40 rounded-full lg:hidden" />

                  {/* Close */}
                  <button onClick={handleDeselect} aria-label="Cerrar"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/55 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
                    <p className="text-[#e8c870] text-[9px] tracking-[0.28em] uppercase font-medium mb-0.5">
                      {store.neighborhood}
                    </p>
                    <h3 className="va-serif text-white font-light text-[18px] leading-tight">
                      {store.name}
                    </h3>
                    <p className="text-white/50 text-[10px] italic">{store.tagline}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="space-y-2.5 mb-5">
                    {/* Address */}
                    <div className="flex items-start gap-2.5 text-[12px] text-[#6b5c42]">
                      <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#b8975a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span>{store.address}</span>
                    </div>
                    {/* Hours */}
                    <div className="flex items-center gap-2.5 text-[12px] text-[#6b5c42]">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#b8975a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>{store.open}</span>
                      <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        Abierto
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[#d4c090] to-transparent mb-5" />

                  {/* CTA grid */}
                  <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                      target="_blank" rel="noopener noreferrer"
                      className="va-btn-dark py-3.5 rounded-xl text-[10px]">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                      </svg>
                      Cómo llegar
                    </a>
                    <a href={`https://wa.me/${store.phone.replace(/\D/g,"")}`}
                      target="_blank" rel="noopener noreferrer"
                      className="va-btn-wa py-3.5 rounded-xl text-[10px]">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                  <a href={`tel:${store.phone}`}
                    className="va-btn-ghost py-3 rounded-xl w-full">
                    <svg className="w-3.5 h-3.5 text-[#b8975a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Llamar
                  </a>
                </div>
              </div>
            )}

            {/* No selection hint */}
            {!selected && mapRendered && !loadError && (
              <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-[#e8dfc8]">
                <svg className="w-3 h-3 text-[#b8975a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/>
                </svg>
                <p className="text-[#7a6a52] text-[11px] tracking-wide">Selecciona la ubicación para más detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}