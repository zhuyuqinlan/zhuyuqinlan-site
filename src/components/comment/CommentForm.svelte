<script lang="ts">
import { createEventDispatcher } from "svelte";
import Icon from "@iconify/svelte";
import type { CaptchaData } from "./comment-api";

export let captcha: CaptchaData | null = null;
export let submitting = false;
export let captchaLoading = false;
export let captchaError = "";
export let replyTarget: { id: number; name: string } | null = null;

const dispatch = createEventDispatcher();

// Tailwind v3 无法对 var() 颜色使用 /透明度 修饰符，主题色淡色一律用 color-mix
const field =
	"w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-white/[0.06] " +
	"border border-black/[0.08] dark:border-white/[0.08] " +
	"hover:border-[color-mix(in_oklab,var(--primary)_35%,transparent)] " +
	"focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_12%,transparent)] " +
	"outline-none transition text-black/80 dark:text-white/80 " +
	"placeholder:text-black/25 dark:placeholder:text-white/25";

let name = "";
let email = "";
let content = "";
let captchaCode = "";

// 验证码刷新时清空已输入的内容，避免提交旧答案
$: if (captcha !== null) {
	captchaCode = "";
}

function handleSubmit() {
	if (!content.trim() || !captchaCode.trim()) return;

	dispatch("submit", {
		name: name.trim(),
		email: email.trim(),
		content: content.trim(),
		captchaCode: captchaCode.trim(),
	});

	// 清空内容（保留名称邮箱方便连续评论）
	content = "";
	captchaCode = "";
}

function handleRefresh() {
	dispatch("refreshCaptcha");
}
</script>

<form class="space-y-3" on:submit|preventDefault={handleSubmit}>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
		<div>
			<input
				type="text"
				bind:value={name}
				placeholder="显示名称（可选，不填将自动生成中文昵称）"
				maxlength="50"
				class={field}
			/>
		</div>
		<div>
			<input
				type="email"
				bind:value={email}
				placeholder="邮箱（可选，用于 Gravatar 头像）"
				maxlength="100"
				class={field}
			/>
		</div>
	</div>

	<div>
		<textarea
			bind:value={content}
			placeholder={replyTarget ? `回复 @${replyTarget.name}...` : "写下你的评论..."}
			maxlength="2000"
			required
			rows="4"
			class="{field} resize-none"
		></textarea>
	</div>

	<!-- 验证码 -->
	<div class="flex items-start gap-3">
		{#if captchaLoading}
			<div
				class="h-[42px] w-[140px] rounded-xl bg-black/[0.06] dark:bg-white/[0.08] animate-pulse flex-shrink-0"
			></div>
		{:else if captcha}
			<img
				src={captcha.image}
				alt="验证码"
				class="h-[42px] rounded-xl cursor-pointer flex-shrink-0
				border border-black/[0.08] dark:border-white/[0.08]
				hover:border-[color-mix(in_oklab,var(--primary)_35%,transparent)] transition"
				on:click={handleRefresh}
				title="点击刷新验证码"
			/>
		{:else}
			<button
				type="button"
				class="text-xs text-[var(--primary)] underline hover:no-underline flex-shrink-0 self-center"
				on:click={handleRefresh}
			>
				加载验证码
			</button>
		{/if}

		<div class="flex-1 flex flex-col gap-2">
			<div class="flex items-center gap-2">
				<input
					type="text"
					bind:value={captchaCode}
					placeholder="请输入验证码"
					maxlength="10"
					required
					autocomplete="off"
					class="{field} flex-1"
				/>

				<button
					type="button"
					class="flex items-center gap-1.5 flex-shrink-0 px-3 py-2.5 rounded-xl text-xs
					text-black/40 dark:text-white/40 border border-black/[0.08] dark:border-white/[0.08]
					hover:text-[var(--primary)] hover:border-[color-mix(in_oklab,var(--primary)_35%,transparent)]
					transition disabled:opacity-40 disabled:cursor-not-allowed"
					on:click={handleRefresh}
					disabled={captchaLoading}
				>
					<Icon icon="fa6-solid:arrows-rotate" class="text-[0.7rem]" />
					换一张
				</button>
			</div>

			{#if captchaError}
				<p class="text-xs text-red-500 dark:text-red-400 ml-1">
					{captchaError}
				</p>
			{/if}
		</div>
	</div>

	<!-- 提交按钮 -->
	<button
		type="submit"
		disabled={submitting || !content.trim() || !captchaCode.trim()}
		class="w-full h-11 rounded-xl text-sm font-bold transition
		flex items-center justify-center gap-2
		bg-[var(--primary)] text-[var(--deep-text)] shadow-sm
		hover:brightness-95 active:brightness-90 active:scale-[0.98]
		disabled:opacity-40 disabled:cursor-not-allowed"
	>
		{#if submitting}
			<Icon icon="fa6-solid:arrows-rotate" class="text-xs animate-spin" />
			提交中...
		{:else}
			<Icon icon="fa6-regular:paper-plane" class="text-xs" />
			{replyTarget ? "发表回复" : "发表评论"}
		{/if}
	</button>
</form>
