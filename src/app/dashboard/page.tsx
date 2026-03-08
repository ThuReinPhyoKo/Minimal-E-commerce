"use client"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { UserDetails } from "../components/auth/user/userDetail"
import Image from "next/image";

export default function Dashboard() {

    const { name, profile } = UserDetails;
    const router = useRouter();

    return (
        <section className="min-h-screen bg-[hsl(220,13%,98%)]/50 font-inter">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-[hsl(220,13%,91%)]">
                <div className="max-w-6xl mx-auto px-16 h-14 flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="transparent"
                            size="sm"
                            icon={<ArrowLeft className="text-gray-500 w-4 group-hover:text-gray-800" />}
                            iconPosition="left"
                            onClick={() => router.push("/")}
                            className="hover:bg-yellow-300 group"
                        >
                            <span className="text-gray-500 font-medium group-hover:text-gray-800">Back to Store</span>
                        </Button>
                        <div className="w-px h-5 bg-[hsl(220,13%,91%)]" />
                        <h1 className="font-semibold text-gray-900 text-sm">Admin Dashboard</h1>
                    </div>
                    {/* Right side */}
                    <div className="flex items-center">
                        <h2 className="text-sm font-semibold text-gray-900">{name}</h2>
                        <Image src={profile} alt="Profile Picture" width={32} height={32} className="rounded-full mx-2 border border-yellow-300" />
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Overview, basic metric cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                </div>
            </main>
        </section>
    )
}