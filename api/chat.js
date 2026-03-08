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
        const incomingBody = await req.json();

        // 构造发送给 DeepSeek 的最终请求体
        const deepseekRequestBody = {
            ...incomingBody,
            model: "deepseek-chat", // 确保模型参数存在
            stream: false // 【关键】关闭流式输出！
        };

        // 带着隐藏的 API Key，去请求真实的 DeepSeek 服务器
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 🔐 核心安全点：这里的 Key 是从 Vercel 后台的安全环境变量里读出来的，绝对不会暴露给前端
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify(deepseekRequestBody)
        });

        // 直接等待 DeepSeek 的完整回复
        const data = await response.json();

        // 将完整的 JSON 回复直接返回给前端
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}