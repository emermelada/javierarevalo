/**
 * CV content: the single source of truth for everything that is *not* a
 * project case study (those live in src/content/work/*.md).
 *
 * Two pages read from here: the home page (src/pages/index.astro) and the
 * printable CV (src/pages/cv.astro). They lay the same facts out very
 * differently, which is exactly why the facts stopped living in the markup.
 *
 * Editing rule: change it here, both pages follow. After touching anything
 * that appears on the CV, regenerate the PDF (scripts/make-pdf.sh).
 */

/** A stack chip. `key` renders it in the accent colour (one or two per entry). */
export interface Tag {
	label: string;
	key?: boolean;
}

export interface Entry {
	/** Date range, already formatted for display. */
	when: string;
	role: string;
	org: string;
	points?: string[];
	tags?: Tag[];
}

export interface Cert {
	name: string;
	issuer: string;
	/** Public verification link, when the credential has one. */
	url?: string;
}

export const profile = {
	name: 'Javier Arévalo',
	role: 'Software Developer · Heading into Cloud',
	location: 'Madrid, Spain',
	email: 'javier.arevalo.11111@gmail.com',
	linkedin: 'https://www.linkedin.com/in/javier-arevalo-hernandez',
	linkedinLabel: 'in/javier-arevalo-hernandez',
	github: 'https://github.com/emermelada',
	githubLabel: 'github.com/emermelada',
	site: 'https://cv.javierarevalo.dev',
	siteLabel: 'cv.javierarevalo.dev',
};

/**
 * Hero pitch, one sentence per item. The first sentence is rendered in the
 * accent colour on the home page, so keep it short and self-contained.
 */
export const pitch = [
	'Developer based in Madrid.',
	'C# and Azure at Axazure: Dynamics 365 plugins, APIs and automated workloads.',
	'Kotlin and Android before that.',
	'Starting a Computer Science degree at SDU in September 2026.',
];

/** About paragraph (home) and profile summary (PDF). */
export const about =
	'Two internships so far: cloud consultancy at Axazure and mobile development ' +
	'at Skiller Academy. Day to day that meant C# against Dynamics 365, automating ' +
	'Azure workloads, and Kotlin on Android. In September 2026 I move to Denmark ' +
	'for a Computer Science degree, and I am looking for work alongside my studies, ' +
	'part-time or as an intern. What I want next is cloud and platform work rather ' +
	'than app development. Linux is my daily driver and where most of my own time ' +
	'outside work goes.';

export interface Fact {
	label: string;
	value: string;
	/** Renders the accent bullet before the value (used for availability). */
	dot?: boolean;
}

export const facts: Fact[] = [
	{ label: 'Based in', value: 'Madrid, Spain' },
	{ label: 'Languages', value: 'English C1 · Spanish native' },
	{ label: 'Focus', value: 'Azure · Java · Automation' },
	{ label: 'Status', value: 'Open to opportunities', dot: true },
];

export const experience: Entry[] = [
	{
		when: 'Mar–May 2026',
		role: 'Cloud Developer, Internship',
		org: 'Axazure S.L. · Madrid',
		points: [
			'Wrote plugins and APIs in C# for Dynamics 365, deployed to client environments.',
			'Automated recurring Azure workloads that until then were run by hand.',
			'Built Customer Insights integrations for live client projects.',
		],
		tags: [
			{ label: 'C#', key: true },
			{ label: 'Microsoft Azure', key: true },
			{ label: 'Dynamics 365' },
			{ label: 'Customer Insights' },
			{ label: 'Automation' },
		],
	},
	{
		when: 'Mar–Jun 2025',
		role: 'Software Developer, Internship',
		org: 'Skiller Academy S.L. · Madrid',
		points: [
			'Built features for a native Android app in Kotlin.',
			'Integrated third-party SDKs and shipped them with a small product team.',
		],
		tags: [{ label: 'Kotlin', key: true }, { label: 'Android SDK' }],
	},
];

export const education: Entry[] = [
	{
		when: 'From Sep 2026',
		role: 'BSc in Computer Science',
		org: 'University of Southern Denmark (SDU) · Vejle',
	},
	{
		when: '2023–2025',
		role: 'Higher Degree in Multi-platform Application Development',
		org: 'U-tad · Madrid',
	},
];

export const certs: Cert[] = [
	{
		name: 'Azure Fundamentals (AZ-900)',
		issuer: 'Microsoft · 2026',
		url: 'https://learn.microsoft.com/api/credentials/share/es-es/JavierArvaloHernndez-6412/EE44B11A8EEC4AF4?sharingId=2CD221F199B6E73C',
	},
	{ name: 'Python Essentials 1', issuer: 'Cisco' },
	{ name: 'Python for Data Science & AI', issuer: 'IBM · Coursera' },
];

export const skills = [
	{
		title: 'Cloud & Microsoft',
		items: 'Microsoft Azure, Dynamics 365, Customer Insights, GitHub Actions, Cloudflare',
	},
	{ title: 'Programming', items: 'Kotlin, Java, SQL / MySQL, Python, Swift, C# / .NET' },
	{ title: 'Mobile & Embedded', items: 'Android SDK, iOS / Swift, ESP32, FSM / ISR design, sensors' },
	{ title: 'AI-assisted delivery', items: 'Prompt engineering, review of generated code, prototyping' },
	/* Personal, not professional: its own group so it never reads as a claim of
	   work experience with Linux. */
	{ title: 'Linux', items: 'CachyOS daily; Debian, Mint, Arch, Raspberry Pi OS' },
];

/** Spoken languages. Only the PDF has a dedicated block for them. */
export const spokenLanguages = [
	{ name: 'Spanish', level: 'Native' },
	{ name: 'English', level: 'C1' },
];

/** The one line under the "Next stop" card on the home page. */
export const nextStop = {
	label: 'Next stop',
	title: 'BSc Computer Science',
	org: 'University of Southern Denmark · Vejle',
	when: 'Sep 2026 →',
};
