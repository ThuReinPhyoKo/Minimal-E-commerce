import Image from "next/image";

export default function StackedProfiles() {
    return (
        <div className="flex mb-5">
            <Image
                unoptimized
                src="https://randomuser.me/api/portraits/men/32.jpg"
                width={40}
                height={40}
                alt="Profile 1"
                className="rounded-full border-2 border-white -ml-2"
            />
            <Image
                unoptimized
                src="https://randomuser.me/api/portraits/men/34.jpg"
                width={40}
                height={40}
                alt="Profile 2"
                className="rounded-full border-2 border-white -ml-2"
            />
            <Image
                unoptimized
                src="https://randomuser.me/api/portraits/men/33.jpg"
                width={40}
                height={40}
                alt="Profile 1"
                className="rounded-full border-2 border-white -ml-2"
            />
            <Image
                unoptimized
                src="https://randomuser.me/api/portraits/women/32.jpg"
                width={40}
                height={40}
                alt="Profile 2"
                className="rounded-full border-2 border-white -ml-2"
            />
            <Image
                unoptimized
                src="https://randomuser.me/api/portraits/men/44.jpg"
                width={40}
                height={40}
                alt="Profile 1"
                className="rounded-full border-2 border-white -ml-2"
            />
            <Image
                unoptimized
                src="https://randomuser.me/api/portraits/women/33.jpg"
                width={40}
                height={40}
                alt="Profile 2"
                className="rounded-full border-2 border-white -ml-2"
            />
            <Image
                unoptimized
                src="https://randomuser.me/api/portraits/women/42.jpg"
                width={40}
                height={40}
                alt="Profile 2"
                className="rounded-full border-2 border-white -ml-2"
            />
            <span className="flex items-center justify-center bg-white text-sm text-gray-800 font-semibold border-2 border-gray-200 rounded-full h-10 w-10 -ml-2">+300</span>
        </div>
    )
}