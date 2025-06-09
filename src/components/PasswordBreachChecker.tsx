import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

// Utiliza la API de Have I Been Pwned para comprobar si una contraseña ha sido filtrada
async function checkPasswordBreach(password: string): Promise<number> {
  // SHA-1 hash de la contraseña
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  const prefix = hashHex.slice(0, 5);
  const suffix = hashHex.slice(5);

  // Consulta la API de HIBP (K-Anonymity)
  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await res.text();
  const lines = text.split('\n');
  for (const line of lines) {
    const [hashSuffix, count] = line.split(':');
    if (hashSuffix === suffix) {
      return parseInt(count, 10);
    }
  }
  return 0;
}

const translations = {
  es: {
    check: '¿Ha sido filtrada esta contraseña?',
    checking: 'Comprobando...',
    error: 'Error al consultar la API. Intenta de nuevo.',
    found: '¡Esta contraseña ha aparecido en filtraciones {count} veces! No la uses.',
    safe: '¡Esta contraseña no ha sido encontrada en filtraciones conocidas!'
  },
  en: {
    check: 'Has this password been leaked?',
    checking: 'Checking...',
    error: 'API error. Try again.',
    found: 'This password has appeared in leaks {count} times! Do not use it.',
    safe: 'This password was not found in known leaks!'
  }
};

const PasswordBreachChecker: React.FC<{ password: string }> = ({ password }) => {
  const [breachCount, setBreachCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    setBreachCount(null);
    try {
      const count = await checkPasswordBreach(password);
      setBreachCount(count);
    } catch (e) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  if (!password) return null;

  return (
    <div className="breach-checker">
      <button onClick={handleCheck} disabled={loading} className="breach-btn">
        {loading ? t.checking : t.check}
      </button>
      {error && <div className="breach-error">{error}</div>}
      {breachCount !== null && (
        breachCount > 0 ? (
          <div className="breach-result breach-found">
            {t.found.replace('{count}', breachCount.toString())}
          </div>
        ) : (
          <div className="breach-result breach-safe">
            {t.safe}
          </div>
        )
      )}
    </div>
  );
};

export default PasswordBreachChecker;
