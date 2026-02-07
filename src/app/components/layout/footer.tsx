export default function Footer() {
    return (
        <>
            <footer className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Minimal. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    )
}