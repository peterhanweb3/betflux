import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/seo-provider";
import {
	generateOrganizationSchema,
	generateWebPageSchema,
} from "@/lib/seo/schema-generator";

// Generate SEO Metadata for Privacy Policy Page
export const metadata: Metadata = generateSEOMetadata({
	title: "Privacy Policy | betflux.games – Crypto Wallet Casino Security",
	description:
		"Learn how betflux.games protects wallet addresses and crypto data with SSL, AML, and GDPR-compliant privacy for secure blockchain gaming.",
	keywords: [
		"BetFlux privacy policy",
		"BetFlux crypto casino",
		"BetFlux data protection",
		"BetFlux wallet security",
		"crypto gambling privacy",
		"GDPR crypto casino",
		"blockchain casino policy",
		"BetFlux games secure",
		"crypto betting privacy",
	],
	path: "/privacy",
	pageType: "privacy",
	ogType: "website",
	ogImage: "/assets/seo/og.png",
	schemas: [
		generateOrganizationSchema(),
		generateWebPageSchema({
			title: "Privacy Policy - BetFlux",
			url: "https://betflux.games/privacy",
			description:
				"BetFlux Privacy Policy - How we collect, use, store and protect your personal and transaction data.",
		}),
	],
});

export default function PrivacyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
