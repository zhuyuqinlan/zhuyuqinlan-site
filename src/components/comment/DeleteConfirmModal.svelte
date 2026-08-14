<script lang="ts">
import { createEventDispatcher } from "svelte";

export let commentName = "";
export let commentContent = "";
export let apiKey = "";
export let deleting = false;
export let deleteError = "";

const dispatch = createEventDispatcher();

let inputKey = "";

$: canSubmit = inputKey.trim().length > 0 && !deleting;

function handleConfirm() {
	if (!canSubmit) return;
	dispatch("confirm", { apiKey: inputKey.trim() });
}

function handleCancel() {
	if (deleting) return;
	dispatch("cancel");
}
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
	on:click={handleCancel}
	on:keydown={(e) => e.key === "Escape" && handleCancel()}
>
	<div
		class="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl w-full max-w-xs p-4"
		on:click|stopPropagation
	>
		<h3 class="text-base font-bold text-black/90 dark:text-white/90 mb-3">
			删除评论
		</h3>

		<div
			class="mb-3 p-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] text-sm text-black/70 dark:text-white/70"
		>
			<p class="font-semibold text-xs mb-0.5">@{commentName}</p>
			<p class="text-black/50 dark:text-white/50 text-xs line-clamp-2">
				{commentContent}
			</p>
		</div>

		<div
			class="mb-3 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs leading-relaxed"
		>
			删除后无法恢复，该评论的所有回复也会被一并删除。
			<br />
			游客请联系站长处理。
		</div>

		<div class="mb-4">
			<label
				class="block text-xs font-medium text-black/70 dark:text-white/70 mb-1"
			>
				请输入管理员密钥（API Key）
			</label>
			<input
				type="password"
				bind:value={inputKey}
				placeholder="输入 API Key..."
				disabled={deleting}
				autocomplete="off"
				class="w-full px-3 py-2 rounded-lg text-sm bg-black/[0.03] dark:bg-white/[0.05]
               border border-transparent focus:border-red-400/40
               outline-none transition text-black/80 dark:text-white/80
               placeholder:text-black/25 dark:placeholder:text-white/25
               disabled:opacity-50"
			/>
		</div>

		{#if deleteError}
			<div
				class="mb-3 p-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs"
			>
				{deleteError}
			</div>
		{/if}

		<div class="flex items-center justify-end gap-2">
			<button
				type="button"
				disabled={deleting}
				on:click={handleCancel}
				class="px-3 py-1.5 rounded-lg text-xs text-black/50 dark:text-white/50
               hover:text-black/80 dark:hover:text-white/80 transition
               disabled:opacity-40"
			>
				取消
			</button>
			<button
				type="button"
				disabled={!canSubmit}
				on:click={handleConfirm}
				class="px-4 py-1.5 rounded-lg text-xs font-semibold bg-red-500 text-white
               hover:bg-red-600 active:scale-95 transition
               disabled:opacity-40 disabled:cursor-not-allowed"
			>
				{#if deleting}
					删除中...
				{:else}
					确认删除
				{/if}
			</button>
		</div>
	</div>
</div>
