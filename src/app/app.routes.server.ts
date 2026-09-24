import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'cv', renderMode: RenderMode.Prerender },
  { path: 'ai-llm', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];