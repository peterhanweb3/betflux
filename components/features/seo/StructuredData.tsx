import Script from "next/script";

type SchemaType =
	| "Organization"
	| "WebSite"
	| "Casino"
	| "FAQPage"
	| "Article"
	| "BreadcrumbList"
	| string;

interface StructuredDataProps {
	id?: string;
	type?: SchemaType;
	data: Record<string, unknown>;
}

export function StructuredData({ id, type, data }: StructuredDataProps) {
	const schema = {
		"@context": "https://schema.org",
		"@type": type,
		...data,
	};

	return (
		<Script
			id={id || `schema-${type?.toLowerCase()}`}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
}

// Helper for Organization Schema (Knowledge Graph)
export function OrganizationSchema() {
	return (
		<StructuredData
			type="Organization"
			data={{
				name: "BetFlux",
				url: "https://betflux.io",
				logo: "https://betflux.io/logo.png",
				sameAs: [
					"https://twitter.com/betflux",
					"https://facebook.com/betflux",
					"https://instagram.com/betflux",
				],
				contactPoint: {
					"@type": "ContactPoint",
					telephone: "+1-800-555-5555",
					contactType: "Customer Support",
				},
			}}
		/>
	);
}

// Helper for WebSite Schema (Sitelinks Search Box)
export function WebsiteSchema() {
	return (
		<StructuredData
			type="WebSite"
			data={{
				name: "BetFlux",
				url: "https://betflux.io",
				description:
					"Your Gateway to Fun and Rewards - Experience the best online gaming with crypto, slots, live casino, and sports betting.",
			}}
		/>
	);
}
