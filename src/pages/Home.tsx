// Página principal de PassForge
import React from 'react';
import gsap from 'gsap';
import PasswordGenerator from '../components/PasswordGenerator';
import PassphraseGenerator from '../components/PassphraseGenerator';
import PinGenerator from '../components/PinGenerator';
import PasswordHistory from '../components/PasswordHistory';
import ThemeToggle from '../components/ThemeToggle';
import SitePasswordManager from '../components/SitePasswordManager';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import '../styles/PassForge.css';

const options = [
  {
    key: 'password',
    title: { es: 'Generador de Contraseñas', en: 'Password Generator' },
    desc: { es: 'Crea contraseñas seguras y personalizadas.', en: 'Create secure, custom passwords.' },
    icon: '🔒',
    component: <PasswordGenerator />,
  },
  {
    key: 'passphrase',
    title: { es: 'Generador de Passphrases', en: 'Passphrase Generator' },
    desc: { es: 'Frases seguras y fáciles de recordar.', en: 'Secure, memorable passphrases.' },
    icon: '📝',
    component: <PassphraseGenerator />,
  },
  {
    key: 'pin',
    title: { es: 'Generador de PIN Seguro', en: 'Secure PIN Generator' },
    desc: { es: 'PINs numéricos fuertes para tus cuentas.', en: 'Strong numeric PINs for your accounts.' },
    icon: '🔢',
    component: <PinGenerator />,
  },
  {
    key: 'site',
    title: { es: 'Gestor de Contraseñas por Sitio', en: 'Site Password Manager' },
    desc: { es: 'Guarda y gestiona contraseñas localmente.', en: 'Save and manage passwords locally.' },
    icon: '🌐',
    component: <SitePasswordManager />,
  },
  {
    key: 'history',
    title: { es: 'Historial', en: 'History' },
    desc: { es: 'Consulta tu historial de contraseñas generadas.', en: 'View your generated password history.' },
    icon: '📜',
    component: <PasswordHistory />,
  },
];

const Banner = ({ lang }: { lang: 'es' | 'en' }) => (
  <div className="banner">
    <h1>{translations[lang].appName}</h1>
    <p>{translations[lang].appDesc}</p>
  </div>
);

const Home: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const { lang, toggleLang } = useLanguage();

  React.useEffect(() => {
    if (selected) {
      gsap.fromTo('.option-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    }
  }, [selected]);

  return (
    <div className="passforge-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.7rem', marginBottom: '1rem' }}>
        <button className="lang-toggle-btn" onClick={toggleLang}>
          {translations[lang].langBtn}
        </button>
        <ThemeToggle />
      </div>
      <Banner lang={lang} />
      {!selected && (
        <div className="options-grid">
          {options.map(opt => (
            <div
              key={opt.key}
              className="option-card"
              onClick={() => setSelected(opt.key)}
            >
              <div className="option-icon">{opt.icon}</div>
              <div className="option-title">{opt.title[lang]}</div>
              <div className="option-desc">{opt.desc[lang]}</div>
            </div>
          ))}
        </div>
      )}
      {selected && (
        <div className="option-content">
          <button className="back-btn" onClick={() => setSelected(null)}>
            {translations[lang].back}
          </button>
          {options.find(opt => opt.key === selected)?.component}
        </div>
      )}
    </div>
  );
};

export default Home;
