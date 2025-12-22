import "./global.css";

export const metadata = {
    title: 'F1 GPT',
    description: 'Your personal Formula 1 assistant powered by GPT-5.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}