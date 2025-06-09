import React, { useState } from 'react';
import { addToHistory } from './PasswordHistory';
import { useLanguage } from '../LanguageContext';

// Lista de palabras comunes para passphrases (puedes expandirla o cargarla de un archivo externo)
const WORD_LIST = [
  'luz', 'sol', 'mar', 'roca', 'nube', 'paz', 'fuego', 'río', 'bosque', 'llama',
  'cielo', 'lago', 'viento', 'norte', 'sur', 'este', 'oeste', 'nieve', 'arena', 'hoja',
  'luna', 'estrella', 'montaña', 'trueno', 'lluvia', 'flor', 'piedra', 'tierra', 'campo', 'nido'
];

function getRandomWord() {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

function generatePassphrase(numWords: number, separator: string, capitalize: boolean) {
  let words = [];
  for (let i = 0; i < numWords; i++) {
    let word = getRandomWord();
    if (capitalize) word = word.charAt(0).toUpperCase() + word.slice(1);
    words.push(word);
  }
  return words.join(separator);
}

function generatePronounceablePassphrase(numWords: number, separator: string, capitalize: boolean) {
  // Alterna consonante-vocal para cada palabra
  const consonants = 'bcdfghjklmnprstvwxyz';
  const vowels = 'aeiou';
  let words = [];
  for (let i = 0; i < numWords; i++) {
    let word = '';
    const wordLength = Math.floor(Math.random() * 3) + 4; // 4-6 letras
    let isConsonant = Math.random() > 0.5;
    for (let j = 0; j < wordLength; j++) {
      if (isConsonant) {
        word += consonants.charAt(Math.floor(Math.random() * consonants.length));
      } else {
        word += vowels.charAt(Math.floor(Math.random() * vowels.length));
      }
      isConsonant = !isConsonant;
    }
    if (capitalize) word = word.charAt(0).toUpperCase() + word.slice(1);
    words.push(word);
  }
  return words.join(separator);
}

const PassphraseGenerator: React.FC = () => {
  const [numWords, setNumWords] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [capitalize, setCapitalize] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [copied, setCopied] = useState(false);
  const [pronounceable, setPronounceable] = useState(false);
  const { lang } = useLanguage();

  // Traducciones
  const t = {
    es: {
      title: 'Generador de Passphrases',
      words: 'Palabras:',
      separator: 'Separador:',
      capitalize: 'Capitalizar palabras',
      pronounceable: 'Modo pronunciable',
      generate: 'Generar passphrase',
      why: '¿Por qué usar passphrases?',
      tips: [
        'Son más fáciles de recordar que contraseñas aleatorias.',
        'Una passphrase larga es extremadamente difícil de adivinar.',
        'Evita usar frases comunes o citas famosas.'
      ],
      copied: '¡Copiado!',
      copy: 'Copiar',
    },
    en: {
      title: 'Passphrase Generator',
      words: 'Words:',
      separator: 'Separator:',
      capitalize: 'Capitalize words',
      pronounceable: 'Pronounceable mode',
      generate: 'Generate passphrase',
      why: 'Why use passphrases?',
      tips: [
        'They are easier to remember than random passwords.',
        'A long passphrase is extremely hard to guess.',
        'Avoid using common phrases or famous quotes.'
      ],
      copied: 'Copied!',
      copy: 'Copy',
    }
  };
  const tr = t[lang];

  const handleGenerate = () => {
    if (pronounceable) {
      const phrase = generatePronounceablePassphrase(numWords, separator, capitalize);
      setPassphrase(phrase);
      setCopied(false);
      addToHistory(phrase, 'passphrase');
    } else {
      const phrase = generatePassphrase(numWords, separator, capitalize);
      setPassphrase(phrase);
      setCopied(false);
      addToHistory(phrase, 'passphrase');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="passphrase-generator">
      <h2>{tr.title}</h2>
      <div className="options passphrase-options-flex">
        <div className="length-control-block">
          <label className="length-label">{tr.words}</label>
          <div className="length-slider-group-vertical">
            <input
              type="range"
              min={3}
              max={8}
              value={numWords}
              onChange={e => setNumWords(Number(e.target.value))}
              className="length-slider"
              aria-label={tr.words}
            />
            <input
              type="number"
              min={3}
              max={8}
              value={numWords}
              onChange={e => setNumWords(Number(e.target.value))}
              className="length-input"
              aria-label={tr.words + ' (número)'}
            />
          </div>
        </div>
        <div className="passphrase-options-group">
          <label className="separator-label">
            {tr.separator}
            <input type="text" maxLength={2} value={separator} onChange={e => setSeparator(e.target.value)} style={{ width: '40px' }} />
          </label>
          <label>
            <input type="checkbox" checked={capitalize} onChange={e => setCapitalize(e.target.checked)} /> {tr.capitalize}
          </label>
          <label>
            <input type="checkbox" checked={pronounceable} onChange={e => setPronounceable(e.target.checked)} />
            {tr.pronounceable}
          </label>
        </div>
      </div>
      <button onClick={handleGenerate} className="generate-btn">{tr.generate}</button>
      {passphrase && (
        <div className="result">
          <input type="text" value={passphrase} readOnly className="password-field" />
          <button onClick={handleCopy} className="copy-btn">{copied ? tr.copied : tr.copy}</button>
        </div>
      )}
      <div className="info">
        <h4>{tr.why}</h4>
        <ul>
          {tr.tips.map((tip, i) => <li key={i}>{tip}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default PassphraseGenerator;
