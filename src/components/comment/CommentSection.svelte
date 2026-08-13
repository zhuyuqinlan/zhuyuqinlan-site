<script lang="ts">
import { onMount } from "svelte";
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
}

function cancelDelete() {
	deleteTarget = null;
}

async function confirmDelete(event: CustomEvent<{ apiKey: string }>) {
	if (!deleteTarget) return;
	deleting = true;
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
		submitError = (e as Error).message || "删除失败";
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
	<div class="flex items-center gap-3 mb-6">
		<h3 class="text-xl font-bold text-black/90 dark:text-white/90">
			评论 ({total})
		</h3>
		<div class="flex-1 border-t border-[var(--line-divider)] border-dashed"></div>
	</div>

	{#if loadError}
		<div
			class="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
		>
			{loadError}
			<button class="ml-2 underline hover:no-underline" on:click={loadComments}
				>重试</button
			>
		</div>
	{/if}

	{#if loading}
		<div class="text-center py-8 text-black/40 dark:text-white/40 text-sm">
			加载评论中...
		</div>
	{/if}

	{#if submitSuccess}
		<div
			class="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm"
		>
			{submitSuccess}
		</div>
	{/if}

	{#if submitError}
		<div
			class="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
		>
			{submitError}
		</div>
	{/if}

	{#if !loading}
		<CommentList
			{comments}
			on:reply={handleReply}
			on:delete={handleDeleteRequest}
		/>
		{#if comments.length === 0}
			<div class="text-center py-8 text-black/30 dark:text-white/30 text-sm">
				暂无评论，来抢个沙发吧~
			</div>
		{/if}
	{/if}

	<div class="mt-8">
		<h4 class="text-base font-bold text-black/80 dark:text-white/80 mb-4">
			发表评论
		</h4>
		<CommentForm
			{captcha}
			{submitting}
			{captchaLoading}
			{captchaError}
			{replyTarget}
			on:submit={handleSubmit}
			on:refreshCaptcha={refreshCaptcha}
			on:cancelReply={cancelReply}
		/>
	</div>
</div>

<Portal>
	{#if deleteTarget}
		<DeleteConfirmModal
			commentName={deleteTarget.name}
			commentContent={deleteTarget.content}
			{apiKey}
			{deleting}
			on:confirm={confirmDelete}
			on:cancel={cancelDelete}
		/>
	{/if}
</Portal>
