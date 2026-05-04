import { useTheme } from "../../lib/theme";

export function ThemeSwitcher() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={dark ? "Switch to Light" : "Switch to Dark"}
      aria-label="Toggle Theme"
      style={{
        position: 'relative',
        width: '64px',
        height: '32px',
        borderRadius: '999px',
        border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        cursor: 'pointer',
        background: dark ? '#FFFFFF' : '#333333',
        boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: dark ? '#000000' : '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: dark ? 'translateX(32px)' : 'translateX(0)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), background 0.3s ease',
          color: dark ? '#FFFFFF' : '#000000',
        }}
      >
        {!dark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </div>
    </button>
  );
}
