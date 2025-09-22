import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../ui/button"

export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center bg-[url('/hero-image.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-18"></div>
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <h1 className="font-roboto text-8xl font-bold text-gray-700">Minimal</h1>
              <h2 className="font-inter tracking-widest text-[#fff700] text-7xl font-bold">Essentials</h2>
              <p className="text-gray-700 text-center text-xl font-inter my-5">Discover our curated collection of thoughtfully designed<br/> products for the modern lifestyle. Less is more.</p>
              <div className="flex items-center gap-8">
                <Button
                  variant="main"
                  size="md"
                  icon={<ArrowRight />}
                  iconPosition="right"
                  className="mt-2.5 shadow-lg mb-8"
                >
                  Shop Collection
                </Button>
                <Button
                 variant="transparent"
                 size="md"
                 icon={<UserRoundPlus />}
                 iconPosition="left"
                 className="mt-2.5 mb-8 group hover:bg-gray-700 shadow-lg hover:text-white"
                >
                  Join as Seller
                </Button>
              </div>
            </div>
            <div className="w-auto h-20 absolute bottom-0 m-5 flex items-centejustify-center">
              <div className="flex flex-col items-center mx-10">
                <h3 className="text-4xl font-bold font-inter text-gray-900">10K+</h3>
                <p className="text-gray-700 font-inter">Happy Customers</p>
              </div>
              <div className="flex flex-col items-center mx-10">
                <h3 className="text-4xl font-bold font-inter text-gray-900">500+</h3>
                <p className="text-gray-700 font-inter">Products</p>
              </div>
              <div className="flex flex-col items-center mx-10">
                <h3 className="text-4xl font-bold font-inter text-gray-900">4.9★</h3>
                <p className="text-gray-700 font-inter">Average Rating</p>
              </div>
            </div>
        </section>
    )
}