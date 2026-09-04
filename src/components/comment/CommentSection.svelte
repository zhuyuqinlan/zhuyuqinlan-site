<script lang="ts">
import { onMount } from "svelte";
import Icon from "@iconify/svelte";
import CommentForm from "./CommentForm.svelte";
import CommentList from "./CommentList.svelte";
import DeleteConfirmModal from "./DeleteConfirmModal.svelte";
import Portal from "./Portal.svelte";
import type { CaptchaData, Comment } from "./comment-api";
import {
	fetchCaptcha,
	fetchComments,
	submitComment,
	fetchApiKey,
	deleteComment,
} from "./comment-api";

export let articleId: string;

let comments: Comment[] = [];
let total = 0;
let loading = true;
let loadError = "";
let submitError = "";
let submitSuccess = "";
let submitting = false;

let captcha: CaptchaData | null = null;
let captchaLoading = false;
let captchaError = "";

let replyTarget: { id: number; name: string } | null = null;

let apiKey = "";
let apiKeyLoading = true;

let deleteTarget: { id: number; name: string; content: string } | null = null;
let deleting = false;
let deleteError = "";

let formCard: HTMLElement | null = null;

async function loadComments() {
	loading = true;
	loadError = "";
	try {
		const data = await fetchComments(articleId);
		comments = data.comments;
		total = data.total;
	} catch (e: unknown) {
		loadError = (e as Error).message || "加载评论失败";
	} finally {
		loading = false;
	}
}

async function refreshCaptcha() {
	captchaLoading = true;
	captchaError = "";
	try {
		captcha = await fetchCaptcha();
	} catch {
		// ignore
	} finally {
		captchaLoading = false;
	}
}

async function loadApiKey() {
	apiKeyLoading = true;
	try {
		apiKey = await fetchApiKey();
	} catch {
		// silently fail; delete button won't work
	} finally {
		apiKeyLoading = false;
	}
}

function handleReply(event: CustomEvent<{ id: number; name: string }>) {
	replyTarget = event.detail;
	// 表单在评论区顶部，点击回复后滚动过去并聚焦输入框
	setTimeout(() => {
		formCard?.scrollIntoView({ behavior: "smooth", block: "center" });
		formCard?.querySelector("textarea")?.focus({ preventScroll: true });
	}, 50);
}

function cancelReply() {
	replyTarget = null;
}

function handleDeleteRequest(event: CustomEvent<{
	id: number;
	name: string;
	content: string;
}>) {
	deleteTarget = event.detail;
	deleteError = "";
}

function cancelDelete() {
	deleteTarget = null;
	deleteError = "";
}

async function confirmDelete(event: CustomEvent<{ apiKey: string }>) {
	if (!deleteTarget) return;
	deleting = true;
	deleteError = "";
	try {
		await deleteComment(deleteTarget.id, event.detail.apiKey);
		comments = comments.filter((c) => {
			if (c.id === deleteTarget.id) return false;
			c.replies = c.replies.filter((r) => r.id !== deleteTarget.id);
			return true;
		});
		total--;
		deleteTarget = null;
	} catch (e: unknown) {
		// 错误提示显示在模态框内部，主区域的 submitError 会被遮罩挡住
		deleteError = (e as Error).message || "删除失败";
	} finally {
		deleting = false;
	}
}

async function handleSubmit(
	event: CustomEvent<{
		name: string;
		email: string;
		content: string;
		captchaCode: string;
	}>,
) {
	const detail = event.detail;
	if (!captcha) return;

	const parentId = replyTarget?.id ?? null;
	submitting = true;
	submitError = "";
	submitSuccess = "";
	captchaError = "";

	try {
		const newComment = await submitComment({
			article_id: articleId,
			parent_id: parentId,
			name: detail.name,
			email: detail.email,
			content: detail.content,
			captcha_id: captcha.captcha_id,
			captcha_code: detail.captchaCode,
		});

		await refreshCaptcha();

		if (parentId === null) {
			comments = [newComment, ...comments];
		} else {
			comments = comments.map((c) => {
				if (c.id === parentId) {
					return { ...c, replies: [...c.replies, newComment] };
				}
				return c;
			});
		}

		total++;
		replyTarget = null;
		submitSuccess = parentId === null ? "评论发表成功！" : "回复成功！";
		setTimeout(() => {
			submitSuccess = "";
		}, 3000);
	} catch (e: unknown) {
		const msg = (e as Error).message || "发表失败";
		if (msg.includes("验证码错误")) {
			await refreshCaptcha();
			captchaError = "验证码错误或已过期，请重新输入";
		} else {
			submitError = msg;
		}
	} finally {
		submitting = false;
	}
}

onMount(() => {
	loadComments();
	refreshCaptcha();
	loadApiKey();
});
</script>

<div class="comment-section w-full mt-8">
	<!-- 标题栏 -->
	<div class="flex items-center gap-3 mb-6">
		<div
			class="w-9 h-9 rounded-xl bg-[var(--btn-regular-bg)] text-[var(--btn-content)]
			flex items-center justify-center flex-shrink-0"
		>
			<Icon icon="fa6-regular:comments" class="text-[1.05rem]" />
		</div>
		<h3 class="text-xl font-bold text-black/90 dark:text-white/90">评论</h3>
		{#if !loading}
			<span
				class="px-2.5 py-0.5 rounded-full bg-[var(--btn-regular-bg)] text-[var(--btn-content)]
				text-xs font-bold transition"
			>
				{total}
			</span>
		{/if}
		<div class="flex-1 border-t border-[var(--line-divider)] border-dashed"></div>
	</div>

	{#if loadError}
		<div
			class="mb-4 flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20
			text-red-600 dark:text-red-400 text-sm"
		>
			<Icon icon="fa6-solid:circle-exclamation" class="flex-shrink-0" />
			<span>{loadError}</span>
			<button
				class="ml-auto flex-shrink-0 underline hover:no-underline"
				on:click={loadComments}>重试</button
			>
		</div>
	{/if}

	{#if submitSuccess}
		<div
			class="mb-4 flex items-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20
			text-green-600 dark:text-green-400 text-sm"
		>
			<Icon icon="fa6-solid:circle-check" class="flex-shrink-0" />
			{submitSuccess}
		</div>
	{/if}

	{#if submitError}
		<div
			class="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20
			text-red-600 dark:text-red-400 text-sm"
		>
			<Icon icon="fa6-solid:circle-exclamation" class="flex-shrink-0" />
			{submitError}
		</div>
	{/if}

	<!-- 发表评论（置于评论列表上方） -->
	<div
		bind:this={formCard}
		class="mb-8 p-4 md:p-5 rounded-2xl border border-[var(--line-divider)]
		bg-black/[0.02] dark:bg-white/[0.03] transition"
	>
		<div class="flex items-center justify-between gap-2 mb-4">
			<div class="flex items-center gap-2">
				<Icon
					icon={replyTarget ? "fa6-solid:reply" : "fa6-regular:pen-to-square"}
					class="text-[var(--primary)]"
				/>
				<h4 class="text-base font-bold text-black/80 dark:text-white/80">
					{replyTarget ? `回复 @${replyTarget.name}` : "发表评论"}
				</h4>
			</div>
			{#if replyTarget}
				<button
					type="button"
					class="text-xs px-2.5 py-1 rounded-lg text-black/40 dark:text-white/40
					hover:text-black/70 dark:hover:text-white/70 hover:bg-[var(--btn-plain-bg-hover)]
					transition"
					on:click={cancelReply}
				>
					取消回复
				</button>
			{/if}
		</div>
		<CommentForm
			{captcha}
			{submitting}
			{captchaLoading}
			{captchaError}
			{replyTarget}
			on:submit={handleSubmit}
			on:refreshCaptcha={refreshCaptcha}
		/>
	</div>

	<!-- 评论列表 -->
	{#if loading}
		<div class="space-y-7 py-2">
			{#each [0, 1, 2] as i (i)}
				<div class="flex gap-3 animate-pulse">
					<div
						class="w-10 h-10 rounded-full bg-black/[0.06] dark:bg-white/[0.06] flex-shrink-0"
					></div>
					<div class="flex-1 space-y-2.5">
						<div class="h-3.5 w-28 rounded bg-black/[0.06] dark:bg-white/[0.06]"></div>
						<div class="h-3 w-full rounded bg-black/[0.04] dark:bg-white/[0.04]"></div>
						<div class="h-3 w-2/3 rounded bg-black/[0.04] dark:bg-white/[0.04]"></div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<CommentList
			{comments}
			on:reply={handleReply}
			on:delete={handleDeleteRequest}
		/>
		{#if comments.length === 0}
			<div
				class="flex flex-col items-center gap-3 py-10 text-black/30 dark:text-white/30"
			>
				<Icon icon="fa6-regular:comment-dots" class="text-4xl" />
				<p class="text-sm">还没有评论，来抢个沙发吧~</p>
			</div>
		{/if}
	{/if}
</div>

<Portal>
	{#if deleteTarget}
		<DeleteConfirmModal
			commentName={deleteTarget.name}
			commentContent={deleteTarget.content}
			{apiKey}
			{deleting}
			{deleteError}
			on:confirm={confirmDelete}
			on:cancel={cancelDelete}
		/>
	{/if}
</Portal>
