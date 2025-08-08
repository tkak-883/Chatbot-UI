import { NextRequest, NextResponse } from 'next/server'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

interface Config {
    model: string
    temperature: number
    maxTokens: number
}

interface RequestBody {
    messages: Message[]
    config: Config
}

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.OPENAI_API_KEY
        
        if (!apiKey) {
            return NextResponse.json(
                { error: 'OpenAI APIキーが設定されていません。環境変数OPENAI_API_KEYを設定してください。' },
                { status: 500 }
            )
        }

        const body: RequestBody = await request.json()
        const { messages, config } = body

        if (!messages || messages.length === 0) {
            return NextResponse.json(
                { error: 'メッセージが必要です。' },
                { status: 400 }
            )
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: config.model,
                messages: messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                max_tokens: config.maxTokens,
                temperature: config.temperature,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }))
            
            let errorMessage = 'OpenAI APIでエラーが発生しました。'
            
            if (response.status === 401) {
                errorMessage = 'APIキーが無効です。環境変数を確認してください。'
            } else if (response.status === 429) {
                errorMessage = 'API使用制限に達しました。しばらく待ってから再試行してください。'
            } else if (response.status === 400) {
                errorMessage = `リクエストが無効です: ${errorData.error?.message || 'Unknown error'}`
            }
            
            return NextResponse.json(
                { error: errorMessage },
                { status: response.status }
            )
        }

        const data = await response.json()
        const responseContent = data.choices[0].message.content

        return NextResponse.json({
            content: responseContent,
        })

    } catch (error) {
        console.error('Chat API error:', error)
        
        return NextResponse.json(
            { error: 'サーバー内部でエラーが発生しました。' },
            { status: 500 }
        )
    }
}