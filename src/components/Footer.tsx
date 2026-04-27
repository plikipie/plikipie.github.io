import { useState } from "react";
import { useTheme } from "../lib/theme";

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/plikipie", icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /> },
  { name: "LinkedIn", url: "https://linkedin.com/in/hermawanp", icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /> },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/~011ed9e7191a475683", icon: <path d="M17.854 8.796c-1.576 0-2.923.75-3.805 1.956-.838-1.716-1.636-3.771-2.072-5.485h-2.316v7.35c0 1.921-1.56 3.486-3.475 3.486-1.914 0-3.473-1.565-3.473-3.486v-7.35H.397v7.35C.397 15.65 2.87 18.13 5.861 18.13c2.99 0 5.464-2.48 5.464-5.513V9.757c.394 1.488 1.05 3.195 1.758 4.675l-1.392 6.643h2.378l.995-4.717c.801.405 1.742.639 2.788.639 3.011 0 5.385-2.43 5.385-5.333 0-2.793-2.308-4.868-5.383-4.868zm.052 8.718c-.815 0-1.583-.223-2.222-.619l.711-3.39c.395-.31.951-.519 1.511-.519 1.83 0 3.036 1.439 3.036 3.208 0 1.848-1.258 3.32-3.036 3.32z" /> },
  { name: "Twitter", url: "https://twitter.com", icon: <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /> }
];

const SocialIcon = ({ s, t }: { s: typeof SOCIALS[0]; t: any }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noreferrer"
      className="interactive"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? t.accent : t.textMuted,
        transition: "all 0.2s ease",
        padding: ".5rem"
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ transform: hov ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s ease" }}>
        {s.icon}
      </svg>
    </a>
  );
};

export default function Footer() {
  const { t } = useTheme();
  return (
    <footer style={{ borderTop: `1px solid ${t.borderMid}`, padding: "4rem 1.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", background: t.bgCard }}>
      <div style={{ display: "flex", gap: "1.2rem" }}>
        {SOCIALS.map(s => <SocialIcon key={s.name} s={s} t={t} />)}
      </div>
      <p style={{ color: t.textMuted, fontFamily: "monospace", fontSize: ".75rem", letterSpacing: ".04em" }}>
        © {new Date().getFullYear()} Hermawan Prastiyanto
      </p>
    </footer>
  );
}
