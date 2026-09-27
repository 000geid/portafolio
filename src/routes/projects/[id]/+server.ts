import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Per-project case study pages were retired; keep old/indexed links landing on the projects list.
export const GET: RequestHandler = () => {
	redirect(301, '/projects');
};
