'use client'
import { store } from "@/store/store"
import { Provider } from "react-redux"

export default function RootLayout({
    children,
    className
}: Readonly<{
    children: React.ReactNode
    className: any
}>) {
    return (
        <Provider store={store}>
            <html lang="en">
                <body className={className}>
                    {children}
                </body>
            </html>
        </Provider>
    )
}
