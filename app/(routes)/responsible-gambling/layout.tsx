import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/seo-provider";
import {
	generateOrganizationSchema,
	generateWebPageSchema,
} from "@/lib/seo/schema-generator";

export const metadata: Metadata = generateSEOMetadata({
	title: "Responsible Gambling | betflux.games – Play Smart, Stay Safe",
	description:
		"Learn about responsible gambling at betflux.games. Stay in control, play responsibly, and get support through global help organizations.",
	keywords: [
		"BetFlux Responsible Gambling",
		"BetFlux play safe",
		"crypto casino responsible gaming",
		"gambling help",
		"BetFlux self exclusion",
	],
	path: "/responsible-gambling",
	pageType: "responsibleGambling",
	ogType: "website",
	ogImage: "/assets/seo/og.png",
	schemas: [
		generateOrganizationSchema(),
		generateWebPageSchema({
			title: "Responsible Gambling at betflux.games",
			url: "https://betflux.games/responsible-gambling",
			description:
				"betflux.games promotes responsible crypto gaming. Learn to play safely, control habits, and access global gambling support organizations.",
		}),
	],
});

export default function ResponsibleGamblingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
