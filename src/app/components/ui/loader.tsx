import { CircleCheckBig } from "lucide-react"
import Image from "next/image"

export default function Loader({isSuccess}: {isSuccess: boolean}) {
    return (
        <div id="loader-container" className="w-2xs h-40 p-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
            {isSuccess ? (
                <>
                    <Image src="/checkmark3.svg" width={60} height={60} alt="check success" />
                    <span className="font-inter text-gray-200">Thank you for your order!</span>
                </>
            ) : (
                <>
                    <span className="loader m-6"></span>
                    <span className="font-inter text-gray-200">Placing order...</span>
                </>
            )}
        </div>
    )
}