import './globals.css'

export const metadata = {
    title: 'OpenAI Chat',
    description: 'シンプルなOpenAI GPTチャットボット',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    )
}