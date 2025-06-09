# PassForge

**PassForge** es una suite moderna y profesional para la generación y gestión de contraseñas seguras, diseñada especialmente para entusiastas y profesionales de la ciberseguridad. Construida con React, Vite y TypeScript, PassForge ofrece una experiencia de usuario avanzada, responsiva y con soporte para temas claro/oscuro e internacionalización (español/inglés).

---

## 🚀 Características principales

- **Generador de contraseñas seguras**: Personaliza longitud, uso de mayúsculas, minúsculas, números y símbolos. Visualiza la fortaleza de la contraseña y verifica si ha sido filtrada en brechas conocidas.
- **Generador de passphrases**: Frases seguras y fáciles de recordar, con modo pronunciable y separación personalizable.
- **Generador de PINs**: Crea PINs numéricos robustos y recibe consejos de seguridad.
- **Gestor local de contraseñas por sitio**: Guarda y consulta contraseñas de sitios de forma segura en tu navegador (sin servidores, 100% local).
- **Historial de contraseñas generadas**: Consulta y reutiliza tus contraseñas recientes.
- **Validación de políticas de contraseñas**: Comprueba el cumplimiento de requisitos de seguridad personalizados.
- **Internacionalización**: Cambia entre español e inglés con un solo clic.
- **Modo claro/oscuro**: Interfaz moderna y adaptable a tus preferencias visuales.
- **Animaciones y diseño profesional**: UI atractiva, responsiva y con animaciones suaves.

---

## 🛡️ Enfoque en Ciberseguridad

- **Sin almacenamiento en la nube**: Tus contraseñas y datos nunca salen de tu dispositivo.
- **Verificación de brechas**: Integra la API de Have I Been Pwned para alertarte si una contraseña ha sido filtrada.
- **Buenas prácticas**: Consejos y validaciones para fomentar hábitos seguros en la gestión de contraseñas.
- **Código abierto y auditable**: Ideal para profesionales, pentesters y formadores en ciberseguridad.

---

## 🧩 Tecnologías utilizadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [GSAP](https://greensock.com/gsap/) para animaciones
- API de [Have I Been Pwned](https://haveibeenpwned.com/API/v3) para verificación de brechas

---

## 📚 Estructura del proyecto

- `src/components/` — Componentes principales (generadores, gestor, historial, etc.)
- `src/pages/` — Página principal y navegación
- `src/styles/` — Estilos CSS personalizados
- `src/utils/` — Utilidades de generación y validación
- `src/LanguageContext.tsx` — Contexto global de idioma
- `src/translations.ts` — Traducciones centralizadas

---

## 📝 Licencia

Este proyecto se distribuye bajo la licencia MIT. Puedes usarlo, modificarlo y adaptarlo para tus necesidades profesionales o educativas.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la seguridad, la experiencia de usuario o quieres añadir nuevas funcionalidades, no dudes en abrir un issue o pull request.

---

## 👤 Autor

- **Tu Nombre** — [@ttiziu](https://github.com/ttiziu)

---

## ⚠️ Disclaimer

PassForge es una herramienta educativa y profesional. No almacena datos en la nube ni ofrece recuperación de contraseñas. Úsala bajo tu propio riesgo y sigue siempre las mejores prácticas de ciberseguridad.
