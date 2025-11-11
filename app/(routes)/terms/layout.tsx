import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/seo-provider";
import {
	generateOrganizationSchema,
	generateWebPageSchema,
} from "@/lib/seo/schema-generator";

export const metadata: Metadata = generateSEOMetadata({
	title: "Terms & Conditions | BetFlux.games – Crypto Casino Rules",
	description:
		"Read BetFlux.games Terms & Conditions. Learn about wallet login (Dynamic.xyz), crypto deposits, withdrawals, fair play, and responsible gaming policies.",
	keywords: [
		"BetFlux Terms and Conditions",
		"BetFlux crypto casino rules",
		"Dynamic.xyz wallet login",
		"BetFlux withdrawal policy",
		"BetFlux fair play",
	],
	path: "/terms",
	pageType: "terms",
	ogType: "website",
	ogImage: "/assets/seo/og.png",
	schemas: [
		generateOrganizationSchema(),
		generateWebPageSchema({
			title: "Terms & Conditions - BetFlux",
			url: "https://betflux.games/terms",
			description:
				"BetFlux Terms & Conditions - User agreement and platform rules.",
		}),
	],
});

export default function TermsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
