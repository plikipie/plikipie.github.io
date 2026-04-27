import { useState, useEffect } from "react";
import { useTheme } from "../lib/theme";
import { useScrollReveal, srStyle } from "../hooks/useScrollReveal";
import { PageWrapper } from "../components/PageWrapper";
import { Btn } from "../components/ui/Elements";

export default function Contact() {
  const ref = useScrollReveal();
  const { t } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("idle");

  useEffect(() => { document.title = "Contact | Hermawan Prastiyanto"; }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_4upkqaq",
          template_id: "template_ncovvyo",
          user_id: "9sF_XE3GXlGKW9XkY",
          template_params: { name: form.name, email: form.email, message: form.message }
        })
      });
      if (!res.ok) { const tx = await res.text(); throw new Error(tx); }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const set = (k: string) => (ev: any) => {
    setForm(f => ({ ...f, [k]: ev.target.value }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: "" }));
  };

  const fStyle = (k: string) => ({ width: "100%", background: t.inputBg, border: `1px solid ${errors[k] ? "rgba(239,68,68,.5)" : t.inputBorder}`, borderRadius: 8, padding: ".65rem 1rem", color: t.text, fontFamily: "monospace", fontSize: ".84rem", transition: "border-color .2s" });
  const Err = ({ k }: { k: string }) => errors[k] ? <span style={{ fontFamily: "monospace", color: "#f87171", fontSize: ".65rem", marginTop: ".3rem", display: "block" }}>{errors[k]}</span> : null;

  return (
    <PageWrapper>
      <div ref={ref} style={{ maxWidth: 680, margin: "0 auto", padding: "7rem 1.5rem 5rem" }}>
        <p data-sr style={{ fontFamily: "monospace", color: t.accent, fontSize: ".7rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".6rem", ...srStyle(0) }}>Contact</p>
        <h1 data-sr style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, letterSpacing: "-.04em", color: t.text, marginBottom: ".8rem", ...srStyle(80) }}>Let's build something together.</h1>
        <p data-sr style={{ color: t.textMuted, fontFamily: "monospace", marginBottom: "2rem", fontSize: ".84rem", ...srStyle(160) }}>Got a project? I respond within 24 hours.</p>
        <a data-sr href="https://hermawanprastiyanto.com" style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", color: "#22c55e", fontFamily: "monospace", fontWeight: 700, fontSize: ".92rem", marginBottom: "2.5rem", textDecoration: "none", ...srStyle(240) }}>→ hermawanprastiyanto@gmail.com</a>

        <div data-sr style={{ border: `1px solid ${t.border}`, borderRadius: 14, padding: "2rem", background: t.bgMuted, ...srStyle(320) }}>
          {status === "success" ? (<div style={{ textAlign: "center", padding: "2.5rem 0" }}><div style={{ color: "#22c55e", fontFamily: "monospace", fontWeight: 800, fontSize: "1.1rem", marginBottom: ".5rem" }}>✓ Message sent</div><div style={{ color: t.textFaint, fontFamily: "monospace", fontSize: ".8rem" }}>I'll get back to you within 24 hours.</div></div>) : (
            <div style={{ display: "grid", gap: "1.2rem" }}>
              <div><label style={{ display: "block", fontFamily: "monospace", color: t.textFaint, fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".4rem" }}>Name</label><input type="text" placeholder="Your name" value={form.name} onChange={set("name")} style={fStyle("name")} /><Err k="name" /></div>
              <div><label style={{ display: "block", fontFamily: "monospace", color: t.textFaint, fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".4rem" }}>Email</label><input type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} style={fStyle("email")} /><Err k="email" /></div>
              <div><label style={{ display: "block", fontFamily: "monospace", color: t.textFaint, fontSize: ".65rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".4rem" }}>Message</label><textarea rows={4} placeholder="Tell me about your project..." value={form.message} onChange={set("message")} style={{ ...fStyle("message"), resize: "none" }} /><Err k="message" /></div>
              {status === "error" && <p style={{ fontFamily: "monospace", color: "#f87171", fontSize: ".72rem", margin: 0 }}>Something went wrong. Please try again or email me directly.</p>}
              <Btn onClick={handleSubmit} style={{ width: "100%", opacity: status === "sending" ? 0.6 : 1, pointerEvents: status === "sending" ? "none" : "auto" }}>{status === "sending" ? "SENDING…" : "SEND MESSAGE →"}</Btn>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
