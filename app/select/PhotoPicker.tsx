"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import images from "../images.js";
import styles from "./picker.module.css";

const onSite = new Set([
  images[1], images[24], images[95], images[139], images[180], images[210],
  ...images.filter((_: string, index: number) => index % 7 === 0).slice(0, 30),
]);
const allImages = [...new Set([...onSite, ...images])] as string[];

export default function PhotoPicker() {
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState("site");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(48);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/photo-selection")
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const data = await response.json();
        setSelected(data.selected);
        setReady(true);
      })
      .catch(() => setMessage("Couldn’t load your saved selection. Refresh to try again."));
  }, []);

  function toggle(src: string) {
    setSelected((current) => current.includes(src) ? current.filter((item) => item !== src) : [...current, src]);
    setMessage("Unsaved changes. Save when you’re ready.");
  }

  async function save() {
    setBusy(true);
    try {
      const response = await fetch("/api/photo-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected }),
      });
      if (!response.ok) throw new Error();
      setMessage("Selection saved. Come back to the chat and say “done.” No photos have been deleted.");
    } catch {
      setMessage("Couldn’t save. Your choices are still here—please try again.");
    } finally {
      setBusy(false);
    }
  }

  const matching = allImages.filter((src) =>
    (filter === "all" || (filter === "site" ? onSite.has(src) : selected.includes(src))) &&
    src.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main className={styles.picker}>
      <header className={styles.heading}>
        <Link href="/" className={styles.back}>← Back to website</Link>
        <p className={styles.eyebrow}>Local photo picker</p>
        <h1>Choose what goes.</h1>
        <p>Click the photos you want removed from the website. Save your selection, then return to the chat. Your original files stay untouched.</p>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Photos to show">
          {[ ["site", "On the website"], ["all", "All photos"], ["selected", `Selected (${selected.length})`] ].map(([value, label]) => (
            <button key={value} type="button" aria-pressed={filter === value} onClick={() => { setFilter(value); setLimit(48); }}>{label}</button>
          ))}
        </div>
        <label className={styles.search}>Find a filename<input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setLimit(48); }} placeholder="Search photos…" /></label>
      </div>

      <div className={styles.status}>
        <span>{selected.length} selected · {matching.length} photos in this view</span>
        <button type="button" disabled={!ready || busy || selected.length === 0} onClick={() => { setSelected([]); setMessage("Selection cleared. Save to update your list."); }}>Clear selection</button>
      </div>

      <div className={styles.grid}>
        {matching.slice(0, limit).map((src) => {
          const checked = selected.includes(src);
          const filename = src.split("/").pop();
          return (
            <button key={src} type="button" className={styles.card} aria-pressed={checked} aria-label={`${checked ? "Deselect" : "Select"} ${filename}`} disabled={!ready || busy} onClick={() => toggle(src)}>
              <span className={styles.photo}><Image src={src} alt={filename || "Portfolio photograph"} fill sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw" /><span className={styles.check} aria-hidden="true">{checked ? "✓" : "+"}</span></span>
              <span className={styles.caption}>{filename}<small>{checked ? "Selected for removal" : onSite.has(src) ? "On the website" : "In your library"}</small></span>
            </button>
          );
        })}
      </div>
      {matching.length === 0 && <p>No photos in this view.</p>}
      {matching.length > limit && <button type="button" className={styles.more} onClick={() => setLimit(limit + 48)}>Show more photos</button>}

      <div className={styles.savebar}>
        <div><strong>{selected.length} photos selected</strong><p role="status">{message || "Choose photos, then save your list. Nothing is deleted here."}</p></div>
        <button type="button" disabled={!ready || busy} onClick={save}>{busy ? "Saving…" : "Save selection"}</button>
      </div>
    </main>
  );
}
