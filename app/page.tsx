"use client";

import { useEffect, useMemo, useState } from "react";

type Pillar = { id: string; title: string; subtitle: string; points: number; icon: string; mission: string };
const pillars: Pillar[] = [
  { id: "physical", title: "Physique", subtitle: "Force · santé · endurance", points: 20, icon: "◈", mission: "Respecter ma séance ou mon activité physique" },
  { id: "mental", title: "Mental", subtitle: "Confiance · maîtrise · courage", points: 15, icon: "✧", mission: "Faire mon exercice mental et agir malgré le doute" },
  { id: "music", title: "Musique", subtitle: "Identité · création · progression", points: 15, icon: "♫", mission: "Créer, écrire ou travailler ma technique" },
  { id: "studies", title: "Études", subtitle: "Marketing · examens · régularité", points: 15, icon: "▤", mission: "Effectuer ma session de révision" },
  { id: "smoking", title: "Liberté", subtitle: "Réduction puis arrêt du tabac", points: 15, icon: "◇", mission: "Suivre mon plan sans me juger et noter mes envies" },
  { id: "digital", title: "Discipline digitale", subtitle: "Instagram · attention · messages", points: 20, icon: "⌁", mission: "Maîtriser mon temps d'écran et vérifier mes messages" },
];
const today = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());

export default function Home() {
  const [done, setDone] = useState<string[]>([]);
  const [weight, setWeight] = useState("55");
  const [sleep, setSleep] = useState("7");
  const [cigarettes, setCigarettes] = useState("0");
  const [screen, setScreen] = useState(" ");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const score = useMemo(() => pillars.reduce((sum, p) => sum + (done.includes(p.id) ? p.points : 0), 0), [done]);

  useEffect(() => {
    const raw = localStorage.getItem("beast-montana-day");
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      setDone(data.done ?? []); setWeight(data.weight ?? "55"); setSleep(data.sleep ?? "7");
      setCigarettes(data.cigarettes ?? "0"); setScreen(data.screen ?? ""); setNote(data.note ?? "");
    } catch { localStorage.removeItem("beast-montana-day"); }
  }, []);

  function toggle(id: string) { setDone(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]); setSaved(false); }
  function saveDay() {
    localStorage.setItem("beast-montana-day", JSON.stringify({ date: new Date().toISOString().slice(0, 10), done, weight, sleep, cigarettes, screen, note }));
    setSaved(true);
  }
  const level = score >= 90 ? "EXCELLENCE" : score >= 75 ? "SOLIDE" : score >= 60 ? "EN PROGRESSION" : score >= 40 ? "À CORRIGER" : "REPRENDS LE CONTRÔLE";

  return <main className="shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">BM</span><span>BEAST <b>MONTANA</b><small>THE DISCIPLINE PROJECT</small></span></a><span className="private-tag">● ESPACE PRIVÉ</span></header>
    <section className="hero" id="top"><div className="eyebrow">365 JOURS · UN ENGAGEMENT</div><h1>DEVIENS<br/><em>INARRÊTABLE.</em></h1><p>La discipline avant la motivation. L'action avant les excuses. La constance avant la perfection.</p><div className="hero-bottom"><span>{today}</span><span className="gold-line"/><span>JOUR 1 · DÉPART PRÉVU 18.11.2026</span></div></section>
    <section className="score-panel"><div><div className="eyebrow">TON SCORE DU JOUR</div><div className="score-number">{score}<span>/100</span></div><div className="score-level">{level}</div></div><div className="score-ring" style={{ background: `conic-gradient(var(--gold) ${score * 3.6}deg, #28251f 0deg)` }}><div><strong>{score}%</strong><small>DISCIPLINE</small></div></div></section>
    <div className="section-heading"><div><div className="eyebrow">LES 6 PILIERS</div><h2>Maîtrise chaque domaine.</h2></div><span className="muted">100 POINTS</span></div>
    <section className="pillars">{pillars.map((p, i) => <article className={`pillar ${done.includes(p.id) ? "completed" : ""}`} key={p.id}><div className="pillar-top"><span className="pillar-icon">{p.icon}</span><span className="pillar-points">{p.points} PTS</span></div><div className="pillar-title-row"><div><h3>{p.title}</h3><p>{p.subtitle}</p></div><span className="pillar-index">0{i + 1}</span></div><div className="mission"><span>{p.mission}</span><button className={done.includes(p.id) ? "check checked" : "check"} onClick={() => toggle(p.id)} aria-label={`Valider ${p.title}`}>{done.includes(p.id) ? "✓" : ""}</button></div></article>)}</section>
    <section className="section-heading"><div><div className="eyebrow">SUIVI PERSONNEL</div><h2>Les données du jour.</h2></div></section>
    <section className="stats-grid"><label>POIDS (KG)<input value={weight} onChange={e => setWeight(e.target.value)} inputMode="decimal" /></label><label>SOMMEIL (H)<input value={sleep} onChange={e => setSleep(e.target.value)} inputMode="decimal" /></label><label>CIGARETTES<input value={cigarettes} onChange={e => setCigarettes(e.target.value)} inputMode="numeric" /></label><label>TEMPS INSTAGRAM<input value={screen} onChange={e => setScreen(e.target.value)} placeholder="Ex. 2 h 30" /></label></section>
    <label className="notes-label">NOTE DU COACH / JOURNAL<textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Qu'ai-je accompli ? Qu'est-ce qui m'a freiné ? Quelle correction pour demain ?" rows={4}/></label>
    <button className="save-button" onClick={saveDay}>ENREGISTRER MA JOURNÉE <span>↗</span></button>{saved && <p className="saved-message">✓ Journée enregistrée sur cet appareil.</p>}
    <section className="routine"><div className="eyebrow">STRUCTURE QUOTIDIENNE</div><h2>Une journée avec intention.</h2><div className="routine-row"><time>08:00</time><span>MENTAL & DISCIPLINE</span><small>20 MIN</small></div><div className="routine-row"><time>12:30</time><span>ÉTUDES & RÉVISION</span><small>30 MIN</small></div><div className="routine-row"><time>17:45</time><span>MUSIQUE & CRÉATION</span><small>40 MIN</small></div><div className="routine-row"><time>19:00</time><span>ENTRAÎNEMENT</span><small>SELON LE PROGRAMME</small></div></section>
    <footer><div className="brand-mark">BM</div><p>BEAST MONTANA</p><small>DISCIPLINE · FORCE · CONSTANCE</small></footer>
  </main>;
}
