// Componente principal para generar contraseñas
import React, { useState } from 'react';
import { generatePassword } from '../utils/passwordUtils';
import PasswordBreachChecker from './PasswordBreachChecker';
import { addToHistory } from './PasswordHistory';
import PasswordPolicies from './PasswordPolicies';
import { useLanguage } from '../LanguageContext';

const translations = {
  es: {
    title: 'Generador de Contraseñas',
    length: 'Longitud:',
    uppercase: 'Mayúsculas',
    lowercase: 'Minúsculas',
    numbers: 'Números',
    symbols: 'Símbolos',
    generate: 'Generar contraseña',
    copy: 'Copiar',
    copied: '¡Copiado!',
    strength: 'Fortaleza',
    weak: 'Débil',
    medium: 'Media',
    strong: 'Fuerte',
    why: '¿Por qué usar contraseñas seguras?',
    tips: [
      'Evita el uso de datos personales o palabras comunes.',
      'Combina mayúsculas, minúsculas, números y símbolos.',
      'Usa una longitud mínima de 12 caracteres.',
      'No reutilices contraseñas en diferentes sitios.'
    ]
  },
  en: {
    title: 'Password Generator',
    length: 'Length:',
    uppercase: 'Uppercase',
    lowercase: 'Lowercase',
    numbers: 'Numbers',
    symbols: 'Symbols',
    generate: 'Generate password',
    copy: 'Copy',
    copied: 'Copied!',
    strength: 'Strength',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    why: 'Why use secure passwords?',
    tips: [
      'Avoid using personal data or common words.',
      'Combine uppercase, lowercase, numbers, and symbols.',
      'Use a minimum length of 12 characters.',
      'Do not reuse passwords on different sites.'
    ]
  }
};

const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 16) score++;
  return score;
};

const getStrengthLabel = (score: number, lang: 'es' | 'en') => {
  if (score <= 2) return { label: translations[lang].weak, color: '#e53e3e' };
  if (score <= 4) return { label: translations[lang].medium, color: '#ecc94b' };
  return { label: translations[lang].strong, color: '#38a169' };
};

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleGenerate = () => {
    const newPassword = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
    setPassword(newPassword);
    setCopied(false);
    addToHistory(newPassword, 'password');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const strength = getStrengthLabel(getPasswordStrength(password), lang);

  return (
    <div className="password-generator">
      <div className="options">
        <div className="length-control-block">
          <label className="length-label">{t.length}</label>
          <div className="length-slider-group-vertical">
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              className="length-slider"
              aria-label={t.length}
            />
            <input
              type="number"
              min={6}
              max={32}
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              className="length-input"
              aria-label={t.length + ' (número)'}
            />
          </div>
        </div>
        <div className="options-checkboxes">
          <label>
            <input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> {t.uppercase}
          </label>
          <label>
            <input type="checkbox" checked={useLower} onChange={e => setUseLower(e.target.checked)} /> {t.lowercase}
          </label>
          <label>
            <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} /> {t.numbers}
          </label>
          <label>
            <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} /> {t.symbols}
          </label>
        </div>
      </div>
      <button onClick={handleGenerate} className="generate-btn">{t.generate}</button>
      {password && (
        <>
          <div className="result">
            <input type="text" value={password} readOnly className="password-field" />
            <button onClick={handleCopy} className="copy-btn">{copied ? t.copied : t.copy}</button>
            <div className="strength-bar" style={{ background: strength.color }}>
              {t.strength}: {strength.label}
            </div>
          </div>
          <PasswordBreachChecker password={password} />
          <PasswordPolicies password={password} />
        </>
      )}
      <div className="info">
        <h4>{t.why}</h4>
        <ul>
          {t.tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default PasswordGenerator;
