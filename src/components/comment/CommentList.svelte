<script lang="ts">
import { createEventDispatcher } from "svelte";
import CommentItem from "./CommentItem.svelte";
import type { Comment } from "./comment-api";

export let comments: Comment[];

const dispatch = createEventDispatcher();

function onReply(event: CustomEvent<{ id: number; name: string }>) {
	dispatch("reply", event.detail);
}

function onDelete(event: CustomEvent<{ id: number; name: string; content: string }>) {
	dispatch("delete", event.detail);
}
</script>

{#each comments as comment (comment.id)}
	<CommentItem {comment} on:reply={onReply} on:delete={onDelete} />
{/each}
