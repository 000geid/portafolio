import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const sectionToAnchor: Record<string, string> = {
	about: '#home',
	skills: '#skills',
	career: '#career',
	education: '#education',
	contact: '#contact'
};

export const load: PageServerLoad = ({ params }) => {
	const anchor = sectionToAnchor[params.section] ?? '';
	redirect(301, `/${anchor}`);
};
