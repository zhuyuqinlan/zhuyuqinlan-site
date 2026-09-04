<script lang="ts">
import { createEventDispatcher } from "svelte";
import Icon from "@iconify/svelte";
import type { Comment } from "./comment-api";
import { formatTime, gravatarUrl, linkify } from "./comment-api";

export let comment: Comment;

const dispatch = createEventDispatcher();

function reply() {
	dispatch("reply", { id: comment.id, name: comment.name });
}

function deleteComment() {
	dispatch("delete", { id: comment.id, name: comment.name, content: comment.content });
}
</script>

<div class="comment-item py-4 border-b border-[var(--line-divider)] border-dashed last:border-b-0">
	<!-- 主评论 -->
	<div
		class="flex gap-3 -mx-3 px-3 py-2 -my-2 rounded-2xl transition
		hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
	>
		<img
			src={gravatarUrl(comment.email_md5 || "default")}
			alt={comment.name}
			class="w-10 h-10 rounded-full flex-shrink-0 bg-black/5 dark:bg-white/10
			ring-1 ring-black/[0.06] dark:ring-white/[0.10]"
			loading="lazy"
		/>

		<div class="flex-1 min-w-0">
			<div class="flex flex-wrap items-center gap-2 mb-1">
				<span class="font-semibold text-sm text-black/85 dark:text-white/85">
					{comment.name}
				</span>
				{#if comment.website}
					<a
						href={comment.website}
						target="_blank"
						rel="nofollow noopener noreferrer"
						class="text-xs text-[var(--primary)] hover:underline"
					>
						{comment.website.replace(/^https?:\/\//, "").split("/")[0]}
					</a>
				{/if}
				<span class="text-xs text-black/30 dark:text-white/30">
					{formatTime(comment.created_at)}
				</span>
				<span class="text-xs text-black/20 dark:text-white/20">
					#{comment.id}
				</span>
			</div>

			<div
				class="text-sm text-black/70 dark:text-white/70 leading-relaxed break-words
				[&_a]:text-[var(--primary)] [&_a]:underline [&_a]:hover:no-underline"
			>
				{@html linkify(comment.content)}
			</div>

			<div class="mt-2 flex items-center gap-1 -ml-2">
				<button
					class="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs
					text-black/35 dark:text-white/35 hover:text-[var(--primary)]
					hover:bg-[var(--btn-plain-bg-hover)] transition"
					on:click={reply}
				>
					<Icon icon="fa6-regular:comment" class="text-[0.7rem]" />
					回复
				</button>
				<button
					class="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs
					text-black/25 dark:text-white/25 hover:text-red-500 dark:hover:text-red-400
					hover:bg-red-50 dark:hover:bg-red-900/20 transition"
					on:click={deleteComment}
				>
					<Icon icon="fa6-regular:trash-can" class="text-[0.7rem]" />
					删除
				</button>
			</div>
		</div>
	</div>

	{#if comment.replies?.length > 0}
		<!-- 楼中楼：虚线线程 -->
		<div
			class="ml-8 md:ml-12 mt-4 pl-4 space-y-4
			border-l-2 border-dashed border-[var(--line-divider)]"
		>
			{#each comment.replies as sub (sub.id)}
				<div class="flex gap-3">
					<img
						src={gravatarUrl(sub.email_md5 || "default")}
						alt={sub.name}
						class="w-8 h-8 rounded-full flex-shrink-0 bg-black/5 dark:bg-white/10
						ring-1 ring-black/[0.06] dark:ring-white/[0.10]"
						loading="lazy"
					/>
					<div class="flex-1 min-w-0">
						<div class="flex flex-wrap items-center gap-2 mb-1">
							<span class="font-semibold text-sm text-black/85 dark:text-white/85">
								{sub.name}
							</span>
							<span class="text-xs text-black/30 dark:text-white/30">
								{formatTime(sub.created_at)}
							</span>
							<span class="text-xs text-black/20 dark:text-white/20">
								#{sub.id}
							</span>
							<button
								class="px-1.5 py-0.5 -mx-1 rounded-md text-xs
								text-black/30 dark:text-white/30 hover:text-[var(--primary)]
								hover:bg-[var(--btn-plain-bg-hover)] transition"
								on:click={() => dispatch("reply", { id: sub.id, name: sub.name })}
							>
								回复
							</button>
							<button
								class="px-1.5 py-0.5 -mx-1 rounded-md text-xs
								text-black/20 dark:text-white/20 hover:text-red-500 dark:hover:text-red-400
								hover:bg-red-50 dark:hover:bg-red-900/20 transition"
								on:click={() => dispatch("delete", { id: sub.id, name: sub.name, content: sub.content })}
							>
								删除
							</button>
						</div>
						<div
							class="text-sm text-black/70 dark:text-white/70 leading-relaxed break-words
							[&_a]:text-[var(--primary)] [&_a]:underline"
						>
							{@html linkify(sub.content)}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
