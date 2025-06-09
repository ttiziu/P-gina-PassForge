import React from 'react';
import { useLanguage } from '../LanguageContext';

const translations = {
  es: {
    title: 'Validación de políticas personalizadas',
    policies: [
      'Al menos 1 mayúscula',
      'Al menos 1 minúscula',
      'Al menos 1 número',
      'Al menos 1 símbolo',
      'Mínimo 12 caracteres',
    ],
    ok: '✔️',
    fail: '❌',
  },
  en: {
    title: 'Custom policy validation',
    policies: [
      'At least 1 uppercase',
      'At least 1 lowercase',
      'At least 1 number',
      'At least 1 symbol',
      'Minimum 12 characters',
    ],
    ok: '✔️',
    fail: '❌',
  }
};

const PasswordPolicies: React.FC<{ password: string }> = ({ password }) => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const policies = [
    { label: t.policies[0], test: (p: string) => /[A-Z]/.test(p) },
    { label: t.policies[1], test: (p: string) => /[a-z]/.test(p) },
    { label: t.policies[2], test: (p: string) => /[0-9]/.test(p) },
    { label: t.policies[3], test: (p: string) => /[^A-Za-z0-9]/.test(p) },
    { label: t.policies[4], test: (p: string) => p.length >= 12 },
  ];

  return (
    <div className="password-policies">
      <h4>{t.title}</h4>
      <ul>
        {policies.map((policy, idx) => (
          <li key={idx} className={policy.test(password) ? 'policy-ok' : 'policy-fail'}>
            {policy.test(password) ? t.ok : t.fail} {policy.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordPolicies;
