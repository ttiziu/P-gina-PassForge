import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';

const translations = {
  es: {
    title: 'Historial de contraseñas generadas',
    clear: 'Limpiar historial',
    copy: 'Copiar',
    password: 'contraseña',
    passphrase: 'passphrase',
    pin: 'pin',
  },
  en: {
    title: 'Generated password history',
    clear: 'Clear history',
    copy: 'Copy',
    password: 'password',
    passphrase: 'passphrase',
    pin: 'pin',
  }
};

const HISTORY_KEY = 'passforge_history';

type HistoryItem = {
  value: string;
  type: 'password' | 'passphrase' | 'pin';
  date: string;
};

function loadHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryItem[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

const PasswordHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const handleClear = () => {
    setHistory([]);
    saveHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <div className="password-history">
      <h3>{t.title}</h3>
      <button className="clear-history-btn" onClick={handleClear}>{t.clear}</button>
      <ul>
        {history.slice(-10).reverse().map((item, idx) => (
          <li key={idx} className={`history-item ${item.type}`}>
            <span className="history-type">[{t[item.type]}]</span>
            <span className="history-value">{item.value}</span>
            <span className="history-date">{new Date(item.date).toLocaleString()}</span>
            <button className="copy-btn" onClick={() => handleCopy(item.value)}>{t.copy}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function addToHistory(value: string, type: 'password' | 'passphrase' | 'pin') {
  const history = loadHistory();
  history.push({ value, type, date: new Date().toISOString() });
  saveHistory(history.slice(-50)); // Máximo 50 entradas
}

export default PasswordHistory;
