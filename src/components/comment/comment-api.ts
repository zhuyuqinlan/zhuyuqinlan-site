// comment-api.ts — 评论 API 封装

export interface Comment {
	id: number;
	article_id: string;
	parent_id: number | null;
	name: string;
	email_md5: string;
	content: string;
	website: string;
	created_at: string;
	replies: Comment[];
}

export interface CommentsResponse {
	article_id: string;
	total: number;
	comments: Comment[];
}

export interface CaptchaData {
	captcha_id: string;
	image: string;
}

export interface SubmitData {
	article_id: string;
	parent_id: number | null;
	name: string;
	email: string;
	content: string;
	captcha_id: string;
	captcha_code: string;
}

const API_BASE = import.meta.env.COMMENT_API_URL || "/api";

// 后端统一返回 { code, msg, data }，错误信息在 msg 字段；这里兼容
// msg / message / error 多种字段，避免真实错误被吞掉。
function errorMessage(err: unknown, fallback: string): string {
	if (err && typeof err === "object") {
		const e = err as Record<string, unknown>;
		for (const key of ["msg", "message", "error"]) {
			const v = e[key];
			if (typeof v === "string" && v.trim()) return v.trim();
		}
	}
	return fallback;
}

export async function fetchComments(articleId: string): Promise<CommentsResponse> {
	const res = await fetch(
		`${API_BASE}/comments?article_id=${encodeURIComponent(articleId)}`,
	);
	if (!res.ok) {
		const err = await res.json().catch(() => null);
		throw new Error(errorMessage(err, "加载评论失败"));
	}
	const json = await res.json();
	return json.data as CommentsResponse;
}

export async function fetchCaptcha(): Promise<CaptchaData> {
	const res = await fetch(`${API_BASE}/captcha`);
	if (!res.ok) throw new Error("获取验证码失败");
	const json = await res.json();
	return json.data as CaptchaData;
}

export async function submitComment(data: SubmitData): Promise<Comment> {
	const res = await fetch(`${API_BASE}/comments`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (!res.ok) {
		const err = await res.json().catch(() => null);
		throw new Error(errorMessage(err, "发表失败"));
	}
	const json = await res.json();
	return json.data as Comment;
}

export async function fetchApiKey(): Promise<string> {
	const res = await fetch(`${API_BASE}/config`);
	if (!res.ok) throw new Error("获取配置失败");
	const json = await res.json();
	return json.api_key as string;
}

export async function deleteComment(id: number, apiKey: string): Promise<void> {
	const res = await fetch(`${API_BASE}/comments/${id}`, {
		method: "DELETE",
		headers: { "X-API-Key": apiKey },
	});
	if (!res.ok) {
		const err = await res.json().catch(() => null);
		throw new Error(errorMessage(err, "删除失败"));
	}
}

export function formatTime(isoStr: string): string {
	const d = new Date(isoStr);
	const now = new Date();
	const diffMs = now.getTime() - d.getTime();
	const diffMin = Math.floor(diffMs / 60000);
	const diffHour = Math.floor(diffMs / 3600000);

	if (diffMin < 1) return "刚刚";
	if (diffMin < 60) return `${diffMin} 分钟前`;
	if (diffHour < 24) return `${diffHour} 小时前`;

	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}

export function gravatarUrl(md5: string, size = 48): string {
	return `https://www.gravatar.com/avatar/${md5}?d=identicon&s=${size}`;
}

export function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

export function linkify(text: string): string {
	const escaped = escapeHtml(text);
	return escaped.replace(
		/(https?:\/\/[^\s<]+)/g,
		'<a href="$1" target="_blank" rel="nofollow noopener noreferrer" class="text-[var(--primary)] underline hover:no-underline">$1</a>',
	);
}
