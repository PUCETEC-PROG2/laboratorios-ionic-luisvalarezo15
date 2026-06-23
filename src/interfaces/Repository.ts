export interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  avatarUrl: string;
}

export const repositoryList: Repository[] = [
  {
    id: 1,
    name: "react-dashboard",
    avatarUrl: "https://avatars.githubusercontent.com/u/191405317?v=4",
    description:
      "Un panel de control de administración moderno construido con React y Tailwind.",
    language: "TypeScript",
  },
  {
    id: 2,
    name: "fastapi-backend",
    avatarUrl: "https://avatars.githubusercontent.com/u/191405317?v=4",
    description:
      "API REST de alto rendimiento para el manejo de usuarios y autenticación.",
    language: "Python",
  },
  {
    id: 3,
    name: "awesome-utils",
    avatarUrl: "https://avatars.githubusercontent.com/u/191405317?v=4",
    description:
      "Colección de funciones utilitarias para el día a día en JavaScript vanilla.",
    language: "JavaScript",
  },
  {
    id: 4,
    name: "flutter-ecommerce",
    avatarUrl: "https://avatars.githubusercontent.com/u/191405317?v=4",
    description:
      "Aplicación móvil de comercio electrónico con soporte para iOS y Android.",
    language: "Dart",
  },
  {
    id: 5,
    name: "rust-game-engine",
    avatarUrl: "https://avatars.githubusercontent.com/u/16384?v=4",
    description:
      "Un motor de videojuegos 2D enfocado en el rendimiento y la seguridad de memoria.",
    language: "Rust",
  },
  {
    id: 6,
    name: "django-web-app",
    avatarUrl: "https://avatars.githubusercontent.com/u/16384?v=4",
    description: "Una aplicación web construida con Django y PostgreSQL.",
    language: "Python",
  },
];