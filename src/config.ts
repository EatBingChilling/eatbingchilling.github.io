import type {
	BookmarkConfig,
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "鳳凰の小窩",
	subtitle: "「鳳兮鳳兮歸故鄉，遨遊四海求其凰。」",
	lang: "zh_TW", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 345, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	customFont: {
		enabled: false, // Enable custom font
		fontFamily: "", // Font family name, e.g. 'Noto Sans SC', 'Roboto'
		fontUrl: "", // Font URL, can be local path or CDN URL, e.g. '/fonts/NotoSansSC.css' or 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap'
	},
	banner: {
		enable: true,
		src: "assets/images/bg.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "top", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "來自 魔法少女的魔女審判", // Credit text to be displayed
			url: "https://manosaba.com/", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		LinkPreset.Friends,
		{
			name: "个人页",
			url: "/personal/", // Internal links should not include the base path, as it is automatically added
			external: false,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/艾瑪.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "鳳凰",
	bio: "「鳳兮鳳兮歸故鄉，遨遊四海求其凰。」\n別名: ImPhoen1x, 小乌龟",
	links: [
		{
			name: "哔哩哔哩",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/2129606465",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/EatBingChilling",
		},
	],
};

export const bookmarksConfig: BookmarkConfig[] = [
	{
		name: "GitHub",
		url: "https://github.com/EatBingChilling",
		icon: "fa6-brands:github",
	},
	{
		name: "哔哩哔哩",
		url: "https://space.bilibili.com/2129606465",
		icon: "fa6-brands:bilibili",
	},
];

export const announcementConfig = {
	enabled: true,
	title: "公告",
	content: "歡迎來到我的博客，較 Mizuki 版本優化了性能，使用 Github Pages 部署。",
	button: {
		enabled: true,
		text: "备用链接",
		url: "https://eatbingchilling.github.io",
	},
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
