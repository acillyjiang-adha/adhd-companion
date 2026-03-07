// api/chat.js
export const config = {
    runtime: 'edge', // 启用 Edge Runtime，这是 Vercel 为 AI 流式输出专门优化的极速环境
};

export default async function handler(req) {
    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        // 接收前端（diary.html）传过来的对话数据
        const body = await req.json();

        // 带着隐藏的 API Key，去请求真实的 DeepSeek 服务器
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 🔐 核心安全点：这里的 Key 是从 Vercel 后台的安全环境变量里读出来的，绝对不会暴露给前端
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify(body)
        });

        // 原封不动地把 DeepSeek 返回的“流式数据”管子，直接怼回给前端
        return new Response(response.body, {
            status: response.status,
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}