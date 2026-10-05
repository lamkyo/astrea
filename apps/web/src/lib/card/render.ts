export type CardTheme = "dark" | "light";

export interface CardModel {
	login: string;
	isPublic: boolean;
	eventsParticipated: number;
	prizesWon: number;
	totalPaidAmount: string;
	totalPaidAsset: string;
	lastEvents: string[]; // up to 3 event names
	profileUrl: string;
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export function renderSvgCard(model: CardModel, theme: CardTheme = "dark"): string {
	const isDark = theme === "dark";
	const bg = isDark ? "#09090b" : "#ffffff";
	const border = isDark ? "#27272a" : "#e4e4e7";
	const textPrimary = isDark ? "#ffffff" : "#09090b";
	const textMuted = isDark ? "#a1a1aa" : "#71717a";
	const accentBg = isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.08)";
	const accentText = isDark ? "#60a5fa" : "#2563eb";
	const cardBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)";

	if (!model.isPublic) {
		return `<svg width="480" height="160" viewBox="0 0 480 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="480" height="160" rx="16" fill="${bg}" stroke="${border}" stroke-width="1"/>
  <g transform="translate(32, 32)">
    <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="700" fill="${textPrimary}">@${escapeXml(model.login)}</text>
    <text x="0" y="56" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" fill="${textMuted}">Profile not public</text>
    <rect x="0" y="80" width="120" height="24" rx="12" fill="${accentBg}"/>
    <text x="12" y="96" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="600" fill="${accentText}">ASTREA</text>
  </g>
</svg>`;
	}

	const eventsText = `${model.eventsParticipated} event${model.eventsParticipated === 1 ? "" : "s"}`;
	const prizesText = `${model.prizesWon} win${model.prizesWon === 1 ? "" : "s"}`;
	const totalPaidText = `${model.totalPaidAmount} ${model.totalPaidAsset}`;

	const eventItems = model.lastEvents
		.slice(0, 3)
		.map((eventName, idx) => {
			const y = 24 + idx * 22;
			return `<g transform="translate(0, ${y})">
      <circle cx="4" cy="-4" r="3" fill="${accentText}"/>
      <text x="16" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" fill="${textPrimary}">${escapeXml(eventName)}</text>
    </g>`;
		})
		.join("\n");

	return `<svg width="480" height="160" viewBox="0 0 480 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; fill: ${textMuted}; text-transform: uppercase; letter-spacing: 0.05em; }
    .value { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; fill: ${textPrimary}; }
  </style>
  <rect width="480" height="160" rx="16" fill="${bg}" stroke="${cardBorder}" stroke-width="1"/>

  <!-- Header / Login -->
  <g transform="translate(24, 24)">
    <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="700" fill="${textPrimary}">@${escapeXml(model.login)}</text>
    <rect x="340" y="0" width="92" height="22" rx="11" fill="${accentBg}"/>
    <text x="352" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="10" font-weight="700" fill="${accentText}" letter-spacing="0.08em">ASTREA</text>
  </g>

  <!-- Stats Grid -->
  <g transform="translate(24, 64)">
    <g transform="translate(0, 0)">
      <text x="0" y="0" class="label">Events</text>
      <text x="0" y="20" class="value">${escapeXml(eventsText)}</text>
    </g>
    <g transform="translate(120, 0)">
      <text x="0" y="0" class="label">Prizes</text>
      <text x="0" y="20" class="value">${escapeXml(prizesText)}</text>
    </g>
    <g transform="translate(240, 0)">
      <text x="0" y="0" class="label">Total Paid</text>
      <text x="0" y="20" class="value">${escapeXml(totalPaidText)}</text>
    </g>
  </g>

  <!-- Recent Events / Footer divider -->
  <line x1="24" y1="110" x2="456" y2="110" stroke="${cardBorder}" stroke-width="1"/>

  <g transform="translate(24, 130)">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" fill="${textMuted}">Recent: ${model.lastEvents.length > 0 ? escapeXml(model.lastEvents.join(" • ")) : "None"}</text>
  </g>
</svg>`;
}
