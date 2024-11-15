import { ReactNode } from "react"

type PrimaryProps = {
    children: ReactNode
}


function Primary({children}: PrimaryProps) {
    return (
        <main className="main">
            {children}
        </main>
    )
}

export default Primary
