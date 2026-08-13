<script lang="ts">
import { createEventDispatcher } from "svelte";
import type { CaptchaData } from "./comment-api";

export let captcha: CaptchaData | null = null;
export let submitting = false;
export let captchaLoading = false;
export let captchaError = "";
export let replyTarget: { id: number; name: string } | null = null;

const dispatch = createEventDispatcher();

let name = "";
let email = "";
let content = "";
let captchaCode = "";

// 验证码刷新时清空已输入的内容，避免提交旧答案
$: if (captcha !== null) {
	captchaCode = "";
}

function handleSubmit() {
	if (!name.trim() || !content.trim() || !captchaCode.trim()) return;

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

function handleCancelReply() {
	dispatch("cancelReply");
}
</script>

<div class="comment-form">
	<!-- 回复提示 -->
	{#if replyTarget}
		<div
			class="mb-3 p-3 rounded-xl bg-[var(--primary)]/5 text-sm flex items-center justify-between"
		>
			<span class="text-black/60 dark:text-white/60">
				回复 <span class="font-semibold">@{replyTarget.name}</span>
			</span>
			<button
				type="button"
				class="text-xs text-black/40 dark:text-white/40 hover:text-black/70 dark:hover:text-white/70 transition"
				on:click={handleCancelReply}
			>
				取消
			</button>
		</div>
	{/if}

	<form class="space-y-3" on:submit|preventDefault={handleSubmit}>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			<div>
				<input
					type="text"
					bind:value={name}
					placeholder="显示名称 *"
					maxlength="50"
					required
					class="w-full px-4 py-2.5 rounded-xl text-sm bg-black/[0.03] dark:bg-white/[0.05]
                 border border-transparent focus:border-[var(--primary)]/30
                 outline-none transition text-black/80 dark:text-white/80
                 placeholder:text-black/25 dark:placeholder:text-white/25"
				/>
			</div>
			<div>
				<input
					type="email"
					bind:value={email}
					placeholder="邮箱（可选，用于 Gravatar 头像）"
					maxlength="100"
					class="w-full px-4 py-2.5 rounded-xl text-sm bg-black/[0.03] dark:bg-white/[0.05]
                 border border-transparent focus:border-[var(--primary)]/30
                 outline-none transition text-black/80 dark:text-white/80
                 placeholder:text-black/25 dark:placeholder:text-white/25"
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
				class="w-full px-4 py-2.5 rounded-xl text-sm bg-black/[0.03] dark:bg-white/[0.05]
               border border-transparent focus:border-[var(--primary)]/30
               outline-none transition resize-none text-black/80 dark:text-white/80
               placeholder:text-black/25 dark:placeholder:text-white/25"
			></textarea>
		</div>

		<!-- 验证码 -->
		<div class="flex items-start gap-3">
			{#if captchaLoading}
				<div
					class="h-[52px] w-[156px] rounded-lg bg-black/[0.03] dark:bg-white/[0.05] animate-pulse flex-shrink-0 mt-0"
				></div>
			{:else if captcha}
				<img
					src={captcha.image}
					alt="验证码"
					class="h-[52px] rounded-lg cursor-pointer flex-shrink-0 border border-transparent hover:border-[var(--primary)]/30 transition mt-0"
					on:click={handleRefresh}
					title="点击刷新验证码"
				/>
			{:else}
				<button
					type="button"
					class="text-xs text-[var(--primary)] underline hover:no-underline flex-shrink-0 mt-0"
					on:click={handleRefresh}
				>
					加载验证码
				</button>
			{/if}

			<div class="flex-1 flex flex-col gap-2">
				<div class="flex items-center gap-3">
					<input
						type="text"
						bind:value={captchaCode}
						placeholder="请输入验证码"
						maxlength="10"
						required
						autocomplete="off"
						class="flex-1 px-4 py-2.5 rounded-xl text-sm bg-black/[0.03] dark:bg-white/[0.05]
                       border border-transparent focus:border-[var(--primary)]/30
                       outline-none transition text-black/80 dark:text-white/80
                       placeholder:text-black/25 dark:placeholder:text-white/25"
					/>

					<button
						type="button"
						class="text-xs text-black/30 dark:text-white/30 hover:text-[var(--primary)] transition whitespace-nowrap px-3 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
						on:click={handleRefresh}
						disabled={captchaLoading}
					>
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
		<div class="flex items-center gap-3">
			<button
				type="submit"
				disabled={submitting || !name.trim() || !content.trim() || !captchaCode.trim()}
				class="btn-card px-6 py-2 rounded-xl text-sm font-semibold
               disabled:opacity-40 disabled:cursor-not-allowed
               active:scale-95 transition"
			>
				{#if submitting}
					提交中...
				{:else if replyTarget}
					发表回复
				{:else}
					发表评论
				{/if}
			</button>

			<span class="text-xs text-black/30 dark:text-white/30">
				{#if replyTarget}
					正在回复 @{replyTarget.name}
				{:else}
					支持 Markdown 风格的链接
				{/if}
			</span>
		</div>
	</form>
</div>
