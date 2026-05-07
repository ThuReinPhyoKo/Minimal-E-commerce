"use client"

import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../ui/button"
import StackedProfiles from "../ui/stackedProfiles"
import { useAuthModalStore } from "../auth/store/authModalStore"

export default function Hero() {
    const openAuthModal = useAuthModalStore((state) => state.openAuthModal);

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center bg-[url('/hero-image.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black opacity-18"></div>
            <div className="relative flex flex-col items-center justify-center w-full h-full">
              <StackedProfiles />
              <h1 className="font-roboto text-7xl md:text-8xl font-bold text-gray-700">Minimal</h1>
              <h2 className="font-inter tracking-widest text-[#fff700] text-5xl md:text-7xl font-bold ">Essentials</h2>
              <p className="text-gray-700 text-center text-base md:text-xl font-inter my-5">Discover our curated collection of thoughtfully designed<br className="hidden md:block"/> products for the modern lifestyle. Less is more.</p>
              <div className="flex items-center gap-4 md:gap-8">
                <a href="#browse-products">
                  <Button
                    variant="main"
                    size="md"
                    icon={<ArrowRight />}
                    iconPosition="right"
                    className="mt-2.5 shadow-lg mb-8 font-semibold"
                  >
                    Shop Collection
                  </Button>
                </a>
                <Button
                 variant="transparent"
                 size="md"
                 icon={<UserRoundPlus />}
                 iconPosition="left"
                 className="mt-2.5 mb-8 font-semibold group hover:bg-gray-700 box-shadow-strong hover:text-white"
                 onClick={openAuthModal}
                >
                  Join as Seller
                </Button>
              </div>
            </div>
            <div className="w-auto h-20 absolute bottom-0 flex mb-4 mx-4">
              <div className="flex flex-col items-center mx-5 md:mx-10">
                <h3 className="text-2xl md:text-4xl font-bold font-inter text-gray-900">10K+</h3>
                <p className="text-gray-700 text-sm md:text-base font-inter text-center">Happy Customers</p>
              </div>
              <div className="flex flex-col items-center mx-5 md:mx-10">
                <h3 className="text-2xl md:text-4xl font-bold font-inter text-gray-900">500+</h3>
                <p className="text-gray-700 text-sm md:text-base font-inter text-center">Products</p>
              </div>
              <div className="flex flex-col items-center mx-5 md:mx-10">
                <h3 className="text-2xl md:text-4xl font-bold font-inter text-gray-900">4.9★</h3>
                <p className="text-gray-700 text-sm md:text-base font-inter text-center">Average Rating</p>
              </div>
            </div>
        </section>
    )
}