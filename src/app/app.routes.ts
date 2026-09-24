import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Ongun Akay — Cloud Engineer | Google Cloud · AI/LLM · GKE',
    data: {
      description:
        'Cloud Engineer building AI-powered, cloud-native applications on Google Cloud — Cloud Run, GKE, Firebase, LLM & RAG pipelines.',
    },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About — Ongun Akay, Cloud Engineer',
    data: {
      description:
        'Cloud Engineer with 14+ years in system design, cloud-native architecture, and AI application engineering.',
    },
  },
  {
    path: 'cv',
    loadComponent: () =>
      import('./pages/cv/cv.component').then((m) => m.CvComponent),
    title: 'CV — Ongun Akay, Cloud Engineer',
    data: {
      description:
        'Full CV: Google Cloud, AI/LLM engineering, Cloud Security, 30+ GCP Skill Badges, Professional Cloud Architect (in progress).',
    },
  },
  {
    path: 'ai-llm',
    loadComponent: () =>
      import('./pages/ai-llm/ai-llm.component').then((m) => m.AiLlmComponent),
    title: 'AI & LLM Engineering — Ongun Akay',
    data: {
      description:
        'LLM applications, RAG pipelines, and AI agents built on Google Cloud — Gemini, Vertex AI, vector search, Firebase.',
    },
  },
  { path: '**', redirectTo: '' },
];