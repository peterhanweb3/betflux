import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/seo-provider";
import {
	generateOrganizationSchema,
	generateWebPageSchema,
} from "@/lib/seo/schema-generator";

export const metadata: Metadata = generateSEOMetadata({
	title: "FAQs | betflux.games – Crypto Casino Help & Support",
	description:
		"Find answers to common betflux.games questions. Learn about wallet login, deposits, withdrawals, fair play, and blockchain transparency.",
	keywords: [
		"BetFlux FAQ",
		"BetFlux crypto casino help",
		"wallet login guide",
		"crypto deposit",
		"crypto withdrawal",
		"provably fair games",
	],
	path: "/faqs",
	pageType: "faqs",
	ogType: "website",
	ogImage: "/assets/seo/og.png",
	schemas: [
		generateOrganizationSchema(),
		generateWebPageSchema({
			title: "FAQs – BetFlux Crypto Casino Help Center",
			url: "https://betflux.games/faqs",
			description:
				"Explore FAQs at betflux.games. Learn how to connect your wallet, deposit crypto, withdraw winnings, and play provably fair blockchain games.",
		}),
	],
});

export default function FAQsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
