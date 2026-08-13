<script lang="ts">
import { createEventDispatcher } from "svelte";
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

<div class="comment-item py-4 border-b border-[var(--line-divider)] border-dashed">
	<div class="flex gap-3">
		<img
			src={gravatarUrl(comment.email_md5 || "default")}
			alt={comment.name}
			class="w-10 h-10 rounded-full flex-shrink-0 bg-black/5 dark:bg-white/10"
			loading="lazy"
		/>

		<div class="flex-1 min-w-0">
			<div class="flex flex-wrap items-center gap-2 mb-1">
				<span class="font-semibold text-sm text-black/80 dark:text-white/80">
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
				class="text-sm text-black/70 dark:text-white/70 leading-relaxed break-words [&_a]:text-[var(--primary)] [&_a]:underline [&_a]:hover:no-underline"
			>
				{@html linkify(comment.content)}
			</div>

			<div class="mt-2 flex items-center gap-3">
				<button
					class="text-xs text-black/30 dark:text-white/30 hover:text-[var(--primary)] transition"
					on:click={reply}
				>
					回复
				</button>
				<button
					class="text-xs text-black/20 dark:text-white/20 hover:text-red-500 dark:hover:text-red-400 transition"
					on:click={deleteComment}
				>
					删除
				</button>
			</div>
		</div>
	</div>

	{#if comment.replies?.length > 0}
		<div class="ml-8 md:ml-12 mt-3 space-y-3">
			{#each comment.replies as sub (sub.id)}
				<div class="flex gap-3">
					<img
						src={gravatarUrl(sub.email_md5 || "default")}
						alt={sub.name}
						class="w-8 h-8 rounded-full flex-shrink-0 bg-black/5 dark:bg-white/10"
						loading="lazy"
					/>
					<div class="flex-1 min-w-0">
						<div class="flex flex-wrap items-center gap-2 mb-1">
							<span
								class="font-semibold text-sm text-black/80 dark:text-white/80"
							>
								{sub.name}
							</span>
							<span class="text-xs text-black/30 dark:text-white/30">
								{formatTime(sub.created_at)}
							</span>
							<span class="text-xs text-black/20 dark:text-white/20">
								#{sub.id}
							</span>
							<button
								class="text-xs text-black/30 dark:text-white/30 hover:text-[var(--primary)] transition"
								on:click={() => dispatch("reply", { id: sub.id, name: sub.name })}
							>
								回复
							</button>
							<button
								class="text-xs text-black/20 dark:text-white/20 hover:text-red-500 dark:hover:text-red-400 transition"
								on:click={() => dispatch("delete", { id: sub.id, name: sub.name, content: sub.content })}
							>
								删除
							</button>
						</div>
						<div
							class="text-sm text-black/70 dark:text-white/70 leading-relaxed break-words [&_a]:text-[var(--primary)] [&_a]:underline"
						>
							{@html linkify(sub.content)}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
