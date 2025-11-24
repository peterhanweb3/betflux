import { Suspense } from "react";
import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/utils/seo/seo-provider";
import { GamesPageLayoutWrapper } from "./games-page-layout-wrapper";
import { QueryPageSkeleton } from "@/components/features/query-display/query-page-skeleton";
// import { interpolateSiteName } from "@/lib/utils/site-config";
import { PROVIDER_SLUG_MAP } from "@/lib/utils/provider-slug-mapping";

interface PageProps {
	params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const { slugToProviderDisplayName, slugToCategory } = await import(
		"@/lib/utils/provider-slug-mapping"
	);
	// const siteName = interpolateSiteName(`{siteName}`);

	if (slug.length === 1) {
		// Provider only: /games/pg-soft or /games/pragmatic-play
		const providerName = slugToProviderDisplayName(
			decodeURIComponent(slug[0])
		);

		return generateSEOMetadata({
			title: `${providerName} Games - Play Online Casino Games - BetFlux`,
			description: `Explore all ${providerName} games on BetFlux. Play slots, live casino, and more from ${providerName} with amazing features and big wins.`,
			keywords: [
				providerName,
				"games",
				"casino games",
				"online slots",
				"live casino",
			],
			path: `/games/${slug[0]}`,
			pageType: "game",
			ogType: "website",
		});
	} else if (slug.length === 2) {
		// Provider + category: /games/pg-soft/slot or /games/pragmatic-play/slot
		const providerName = slugToProviderDisplayName(
			decodeURIComponent(slug[0])
		);
		const category = slugToCategory(decodeURIComponent(slug[1]));

		// Use friendly category names
		const categoryMap: Record<string, string> = {
			SLOT: "Slot",
			"LIVE CASINO": "Live Casino",
			"SPORT BOOK": "Sports",
			SPORTSBOOK: "Sports",
			RNG: "Table",
		};
		const categoryName =
			categoryMap[category] ||
			category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

		return generateSEOMetadata({
			title: `${providerName} ${categoryName} Games - BetFlux`,
			description: `Play ${categoryName} games from ${providerName} on BetFlux. Enjoy the best ${categoryName} gaming experience with top features and rewards.`,
			keywords: [
				providerName,
				categoryName,
				"games",
				"casino",
				"online gaming",
			],
			path: `/games/${slug[0]}/${slug[1]}`,
			pageType: "game",
			ogType: "website",
		});
	}

	// Fallback
	return generateSEOMetadata({
		title: "Games - BetFlux",
		description: "Explore all games on BetFlux",
		keywords: ["games", "casino", "online gaming"],
		path: "/games",
		pageType: "game",
		ogType: "website",
	});
}

export default async function DynamicGamesPage({ params }: PageProps) {
	const { slug } = await params;

	return (
		<Suspense fallback={<QueryPageSkeleton />}>
			<GamesPageLayoutWrapper slug={slug} />
		</Suspense>
	);
}

// Generate static params for ALL providers (SEO optimization)
export function generateStaticParams() {
	// Get all unique provider slugs (69 providers)
	const allProviderSlugs = Object.keys(PROVIDER_SLUG_MAP).filter(
		// Filter out aliases to avoid duplicates
		(slug) =>
			!["relax-gaming", "hacksaw-gaming", "nolimit-city"].includes(slug)
	);

	const categories = ["slot", "live-casino", "sports", "rng"];

	const params = [];

	// Generate provider-only pages for top 50 providers (SEO focus)
	const topProviders = [
		"pg-soft",
		"pragmatic-play",
		"evolution",
		"netent",
		"ka-gaming",
		"playtech",
		"microgaming",
		"habanero",
		"red-tiger",
		"yggdrasil",
		"sa-gaming",
		"jili",
		"cq9",
		"jdb",
		"live22",
		"booongo",
		"btg",
		"relax",
		"no-limit",
		"fa-chai",
		...allProviderSlugs.slice(0, 30), // Add more providers
	];

	// Provider only pages (50 providers)
	for (const provider of topProviders) {
		params.push({ slug: [provider] });
	}

	// Provider + category pages (top 20 providers × 4 categories = 80 pages)
	const topProvidersForCategories = topProviders.slice(0, 20);
	for (const provider of topProvidersForCategories) {
		for (const category of categories) {
			params.push({ slug: [provider, category] });
		}
	}

	// Total: ~130 static pages for maximum SEO coverage
	return params;
}
