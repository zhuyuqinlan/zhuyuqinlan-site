<script lang="ts">
import { onMount } from "svelte";
import CommentForm from "./CommentForm.svelte";
import CommentList from "./CommentList.svelte";
import type { CaptchaData, Comment } from "./comment-api";
import { fetchCaptcha, fetchComments, submitComment } from "./comment-api";

export let articleId: string;

let comments: Comment[] = [];
let total = 0;
let loading = true;
let loadError = "";
let submitError = "";
let submitSuccess = "";
let submitting = false;

// 验证码相关
let captcha: CaptchaData | null = null;
let captchaLoading = false;
let captchaError = "";

// 回复目标（null 表示顶层评论）
let replyTarget: { id: number; name: string } | null = null;

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

function handleReply(event: CustomEvent<{ id: number; name: string }>) {
	replyTarget = event.detail;
}

function cancelReply() {
	replyTarget = null;
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

		// 刷新验证码
		await refreshCaptcha();

		if (parentId === null) {
			// 顶层评论：插入到列表开头
			comments = [newComment, ...comments];
		} else {
			// 回复：找到父评论并追加到 replies
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
});
</script>

<div class="comment-section w-full mt-8">
	<!-- 标题 -->
	<div class="flex items-center gap-3 mb-6">
		<h3 class="text-xl font-bold text-black/90 dark:text-white/90">
			评论 ({total})
		</h3>
		<div class="flex-1 border-t border-[var(--line-divider)] border-dashed"></div>
	</div>

	<!-- 加载错误 -->
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

	<!-- 加载中 -->
	{#if loading}
		<div class="text-center py-8 text-black/40 dark:text-white/40 text-sm">
			加载评论中...
		</div>
	{/if}

	<!-- 成功提示 -->
	{#if submitSuccess}
		<div
			class="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm"
		>
			{submitSuccess}
		</div>
	{/if}

	<!-- 提交错误 -->
	{#if submitError}
		<div
			class="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm"
		>
			{submitError}
		</div>
	{/if}

	<!-- 评论列表 -->
	{#if !loading}
		<CommentList {comments} on:reply={handleReply} />
		{#if comments.length === 0}
			<div class="text-center py-8 text-black/30 dark:text-white/30 text-sm">
				暂无评论，来抢个沙发吧~
			</div>
		{/if}
	{/if}

	<!-- 发表表单 -->
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
