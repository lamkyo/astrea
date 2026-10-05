import { describe, expect, it } from "vitest";
import { type CardModel, renderSvgCard } from "./render";

describe("renderSvgCard", () => {
	const publicModel: CardModel = {
		login: "alice",
		isPublic: true,
		eventsParticipated: 4,
		prizesWon: 2,
		totalPaidAmount: "1,250",
		totalPaidAsset: "USDC",
		lastEvents: [
			"Stellar Meridian 2026",
			"DeFi Hack <Summer>",
			'Special & Secret "Prize"',
		],
		profileUrl: "https://astrea.io/p/alice",
	};

	it("renders a public card with correctly escaped XML/SVG entities", () => {
		const svg = renderSvgCard(publicModel, "dark");
		expect(svg).toContain("@alice");
		expect(svg).toContain("4 events");
		expect(svg).toContain("2 wins");
		expect(svg).toContain("1,250 USDC");
		// Verify special character escaping
		expect(svg).toContain("DeFi Hack &lt;Summer&gt;");
		expect(svg).toContain("Special &amp; Secret &quot;Prize&quot;");
		expect(svg).not.toContain("<Summer>");
	});

	it("renders the neutral card when profile is not public", () => {
		const privateModel: CardModel = {
			...publicModel,
			isPublic: false,
		};
		const svg = renderSvgCard(privateModel, "dark");
		expect(svg).toContain("@alice");
		expect(svg).toContain("Profile not public");
		expect(svg).not.toContain("1,250 USDC");
	});

	it("renders properly with light theme", () => {
		const svg = renderSvgCard(publicModel, "light");
		expect(svg).toContain('fill="#ffffff"');
		expect(svg).toContain("@alice");
	});
});
