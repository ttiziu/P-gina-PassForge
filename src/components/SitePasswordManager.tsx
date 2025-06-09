import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

const SITE_KEY = 'passforge_site_passwords';

const translations = {
  es: {
    title: 'Gestor de Contraseñas por Sitio',
    sitePlaceholder: 'Nombre del sitio (ej: gmail.com)',
    passwordPlaceholder: 'Contraseña',
    save: 'Guardar',
    copy: 'Copiar',
    copied: '¡Copiado!',
    delete: 'Eliminar',
  },
  en: {
    title: 'Site Password Manager',
    sitePlaceholder: 'Site name (e.g. gmail.com)',
    passwordPlaceholder: 'Password',
    save: 'Save',
    copy: 'Copy',
    copied: 'Copied!',
    delete: 'Delete',
  }
};

type SitePassword = {
  site: string;
  password: string;
  date: string;
};

function loadSitePasswords(): SitePassword[] {
  try {
    const data = localStorage.getItem(SITE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveSitePasswords(passwords: SitePassword[]) {
  localStorage.setItem(SITE_KEY, JSON.stringify(passwords));
}

const SitePasswordManager: React.FC = () => {
  const [site, setSite] = useState('');
  const [password, setPassword] = useState('');
  const [list, setList] = useState<SitePassword[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    setList(loadSitePasswords());
  }, []);

  const handleSave = () => {
    if (!site || !password) return;
    const newList = [...list, { site, password, date: new Date().toISOString() }];
    setList(newList);
    saveSitePasswords(newList);
    setSite('');
    setPassword('');
  };

  const handleCopy = (pwd: string, idx: number) => {
    navigator.clipboard.writeText(pwd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  const handleDelete = (idx: number) => {
    const newList = list.filter((_, i) => i !== idx);
    setList(newList);
    saveSitePasswords(newList);
  };

  return (
    <div className="site-password-manager">
      <h2>{t.title}</h2>
      <div className="site-form">
        <input
          type="text"
          placeholder={t.sitePlaceholder}
          value={site}
          onChange={e => setSite(e.target.value)}
        />
        <input
          type="text"
          placeholder={t.passwordPlaceholder}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="generate-btn" onClick={handleSave}>{t.save}</button>
      </div>
      <ul className="site-list">
        {list.slice(-10).reverse().map((item, idx) => (
          <li key={idx} className="site-item">
            <span className="site-name">{item.site}</span>
            <span className="site-password">{item.password}</span>
            <span className="site-date">{new Date(item.date).toLocaleString()}</span>
            <button className="copy-btn" onClick={() => handleCopy(item.password, idx)}>
              {copiedIdx === idx ? t.copied : t.copy}
            </button>
            <button className="delete-btn" onClick={() => handleDelete(idx)}>{t.delete}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SitePasswordManager;
