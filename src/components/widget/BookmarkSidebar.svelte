<script lang="ts">
import Icon from "@iconify/svelte";
import { profileConfig, bookmarksConfig } from "@/config";
import { onMount, onDestroy } from "svelte";
import avatar from "@/assets/images/艾瑪.jpg";

let currentTime = $state("");
let currentDate = $state("");
let timeInterval: number;

// 从配置文件读取书签
let bookmarks = bookmarksConfig;

function updateTime() {
	const now = new Date();
	const hours = now.getHours().toString().padStart(2, '0');
	const minutes = now.getMinutes().toString().padStart(2, '0');
	const seconds = now.getSeconds().toString().padStart(2, '0');
	currentTime = `${hours}:${minutes}:${seconds}`;
	
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, '0');
	const day = now.getDate().toString().padStart(2, '0');
	const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	const weekday = weekdays[now.getDay()];
	currentDate = `${year}年${month}月${day}日 ${weekday}`;
}

onMount(() => {
	updateTime();
	timeInterval = setInterval(updateTime, 1000) as unknown as number;
});

onDestroy(() => {
	if (timeInterval) {
		clearInterval(timeInterval);
	}
});

function closeSidebar() {
	const sidebar = document.getElementById("bookmark-sidebar");
	const overlay = document.getElementById("sidebar-overlay");
	if (sidebar) {
		sidebar.classList.add("sidebar-closed");
	}
	if (overlay) {
		overlay.classList.add("sidebar-closed");
	}
}
</script>

<!-- Background Overlay -->
<div 
	id="sidebar-overlay" 
	class="sidebar-closed fixed inset-0 bg-black/50 z-[9998] transition-all duration-300"
	onclick={closeSidebar}
	role="button"
	tabindex="-1"
	aria-label="关闭侧边栏"
></div>

<div id="bookmark-sidebar" class="sidebar-closed fixed top-0 right-0 h-screen z-[9999] transition-all duration-300 ease-in-out">
	<div class="h-full w-80 bg-[var(--card-bg)] shadow-2xl flex flex-col rounded-l-[var(--radius-large)]">
		<!-- Header with close button -->
		<div class="flex justify-end items-center p-4">
			<button 
				aria-label="关闭侧边栏" 
				class="btn-plain scale-animation rounded-lg h-10 w-10 active:scale-90"
				onclick={closeSidebar}
			>
				<Icon icon="material-symbols:close-rounded" class="text-[1.5rem]"></Icon>
			</button>
		</div>

		<!-- Content -->
		<div class="flex-1 overflow-y-auto hide-scrollbar p-4 pt-0 space-y-6">
			<!-- Profile Section -->
			<div class="flex flex-col items-center space-y-3">
				<div class="relative w-24 h-24 rounded-full overflow-hidden">
					<img 
						src={avatar.src} 
						alt={profileConfig.name}
						class="w-full h-full object-cover"
					/>
				</div>
				<div class="text-center">
					<h3 class="text-xl font-bold text-90">{profileConfig.name}</h3>
					<p class="text-sm text-50 mt-1 whitespace-pre-line">{profileConfig.bio}</p>
				</div>
			</div>

			<!-- Time Display -->
			<div class="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 rounded-2xl p-6 space-y-2">
				<div class="text-center">
					<div class="text-4xl font-bold text-90 tracking-wider">
						{currentTime}
					</div>
					<div class="text-sm text-50 mt-2">
						{currentDate}
					</div>
				</div>
			</div>

			<!-- Bookmarks Section -->
			<div class="space-y-3">
				<div class="flex items-center gap-2 px-2">
					<Icon icon="material-symbols:bookmark-outline-rounded" class="text-[1.25rem] text-[var(--primary)]"></Icon>
					<h3 class="text-base font-bold text-90">我的书签</h3>
				</div>
				<div class="space-y-2">
					{#each bookmarks as bookmark}
						<a 
							href={bookmark.url} 
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 p-3 rounded-xl bg-[var(--btn-regular-bg)] hover:bg-[var(--btn-regular-bg-hover)] active:bg-[var(--btn-regular-bg-active)] transition group"
						>
							<div class="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--card-bg)] text-[var(--primary)] group-hover:scale-110 transition">
								<Icon icon={bookmark.icon} class="text-[1.5rem]"></Icon>
							</div>
							<span class="text-90 font-medium flex-1">{bookmark.name}</span>
							<Icon icon="material-symbols:arrow-forward-ios-rounded" class="text-[0.875rem] text-50 group-hover:translate-x-1 transition"></Icon>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="stylus">
	#bookmark-sidebar
		&.sidebar-closed
			transform translateX(100%)
			opacity 0
		
		&:not(.sidebar-closed)
			transform translateX(0)
			opacity 1
	
	#sidebar-overlay
		&.sidebar-closed
			opacity 0
			pointer-events none
		
		&:not(.sidebar-closed)
			opacity 1
			pointer-events auto
</style>

