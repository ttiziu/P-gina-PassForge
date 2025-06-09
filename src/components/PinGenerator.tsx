import React, { useState } from 'react';
import { addToHistory } from './PasswordHistory';
import { useLanguage } from '../LanguageContext';

const translations = {
  es: {
    title: 'Generador de PIN Seguro',
    length: 'Longitud:',
    generate: 'Generar PIN',
    copy: 'Copiar',
    copied: '¡Copiado!',
    tipsTitle: 'Consejos para PINs seguros',
    tips: [
      'No uses fechas de nacimiento ni números repetidos.',
      'Evita secuencias como 1234 o 0000.',
      'Cambia tu PIN regularmente.'
    ]
  },
  en: {
    title: 'Secure PIN Generator',
    length: 'Length:',
    generate: 'Generate PIN',
    copy: 'Copy',
    copied: 'Copied!',
    tipsTitle: 'Tips for secure PINs',
    tips: [
      'Do not use birth dates or repeated numbers.',
      'Avoid sequences like 1234 or 0000.',
      'Change your PIN regularly.'
    ]
  }
};

function generatePin(length: number = 4): string {
  let pin = '';
  for (let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 10).toString();
  }
  return pin;
}

const PinGenerator: React.FC = () => {
  const [length, setLength] = useState(4);
  const [pin, setPin] = useState('');
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];

  const handleGenerate = () => {
    const newPin = generatePin(length);
    setPin(newPin);
    setCopied(false);
    addToHistory(newPin, 'pin');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pin);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="pin-generator">
      <h2>{t.title}</h2>
      <div className="options">
        <label>
          {t.length}
          <input type="number" min={4} max={12} value={length} onChange={e => setLength(Number(e.target.value))} />
        </label>
      </div>
      <button onClick={handleGenerate} className="generate-btn">{t.generate}</button>
      {pin && (
        <div className="result">
          <input type="text" value={pin} readOnly className="password-field" />
          <button onClick={handleCopy} className="copy-btn">{copied ? t.copied : t.copy}</button>
        </div>
      )}
      <div className="info">
        <h4>{t.tipsTitle}</h4>
        <ul>
          {t.tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default PinGenerator;
