'use client'
import { useParams } from "next/navigation";
import { useSingleProduct } from "@/app/features/products/api/getSingleProduct";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { discountPrice } from "./productCard";
import { useCartStore } from "@/app/features/cart/store/cartStore";
import { Star, Mail, Heart, ShoppingCart } from "lucide-react";
import { formatCategoryName } from "@/app/features/products/data/categoryList";
import { useWishlistStore } from "@/app/features/wishlist/store/wishlistStore";
import { dateFormat } from "@/app/utils/dateFormat";

export default function ProductPage() {
    const [ selectedImage, setSelectedImage ] = useState<string | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);
    const addToWishlist = useWishlistStore((state) => state.addToWishlist);
    const params = useParams();
    const id = params?.id;
    const { data, isLoading, isError } = useSingleProduct(id? String(id) : "");

    return (
        <div className={`w-full ${ isLoading || isError ? "h-screen" : "" } flex flex-col items-center justify-center bg-white text-black`}>
            {isLoading && <span className="loading"></span>}
            {isError && <span>Failed to load product details 😢</span>}
            {data && (
                <section className="w-full flex gap-5 p-20">            
                    <div id="detail-image"  className="w-80 flex flex-col items-center gap-4 mb-4">
                        <Image
                            src={selectedImage || data.images[0]}
                            width="300"
                            height="300"
                            alt="test"
                            className="object-contain rounded-xl bg-gray-100 w-2xs h-auto"
                        />
                        <div className="flex items-center justify-center gap-5">
                            {data.images.length > 0 && 
                                <Button className="border border-white hover:border-gray-500 bg-gray-200" variant="none" size="sm" onMouseOver={() => setSelectedImage(data.images[0])} onMouseLeave={() => setSelectedImage(null)}>
                                    <Image src={data.images[0]} width="40" height="50" alt={data.title} />
                                </Button>
                            }
                            {data.images.length > 1 && 
                                <Button className="border border-white hover:border-gray-500 bg-gray-200" variant="none" size="sm" onMouseOver={() => setSelectedImage(data.images[1])} onMouseLeave={() => setSelectedImage(null)}>
                                    <Image src={data.images[1]} width="40" height="50" alt={data.title} />
                                </Button>
                            }
                            {data.images.length > 2 && 
                                <Button className="border border-white hover:border-gray-500 bg-gray-200" variant="none" size="sm" onMouseOver={() => setSelectedImage(data.images[2])} onMouseLeave={() => setSelectedImage(null)}>
                                    <Image src={data.images[2]} width="40" height="50" alt={data.title} />
                                </Button>
                            }
                        </div>
                    </div>

                    <div id="details" className="font-inter w-2xl flex flex-col items-start justify-start gap-4">
                        <h1 className="text-2xl text-gray-800 font-semibold">{data.title}</h1>
                        <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-6 w-6 stroke-0 ${i < data .rating ? "fill-yellow-500" : "fill-gray-400"}`} />
                        ))}
                        {data.rating && <span className="ml-2 text-gray-800 font-inter font-semibold">{data.rating}</span>}
                        {data.stock > 0 ? (
                            <span className="ml-4 text-green-600 font-inter font-medium">In Stock</span>
                        ) : (
                            <span className="ml-4 text-red-600 font-inter font-medium">Out of Stock</span>
                        )}
                        </div>
                        <p className="text-xl text-gray-700 font-medium">
                            ${discountPrice(data.price, data.discountPercentage)}
                            <span className="line-through text-base text-gray-500 px-1.5">${data.price}</span>
                            <span className="text-green-600 text-lg font-semibold"> {data.discountPercentage}% OFF</span>
                        </p>
                        <p className="text-gray-800">{data.description}</p>
                        <p className="text-gray-800"><span className="text-gray-500">Brand:</span> {data.brand} | {data.sku}</p>
                        <p className="text-gray-800"><span className="text-gray-500">Category:</span> {formatCategoryName(data.category)}</p>
                        <p className="text-gray-800"><span className="text-gray-500">Weight:</span> {data.weight}</p>
                        <p className="text-gray-800"><span className="text-gray-500">Dimension:</span> {data.dimensions.width} x {data.dimensions.height} x {data.dimensions.depth} cm</p>
                        <p className="text-gray-800"><span className="text-gray-500">Warranty:</span> {data.warrantyInformation}</p>
                        {/* <p className="text-gray-500">Stock: <span className="text-gray-800">{data.stock}</span><span className="text-green-600 font-medium"> Available</span></p> */}
                        <div className="flex gap-5">
                            <Button variant="main" size="md" icon={<ShoppingCart className="h-4 w-4" />} onClick={() => addToCart(data)}>Add to Cart</Button>
                            <Button variant="gray" size="md" icon={<Heart className="h-4 w-4" />} onClick={() => addToWishlist(data)}>Add to Wishlist</Button>
                        </div>
                        <div id="Reviews" className="border border-black/20 my-3 rounded-2xl p-4 w-full">
                            <h3 className="text-lg font-semibold">Customer Reviews</h3>
                            {data.reviews.length === 0 ? (
                                <p className="text-gray-600 mt-2">No reviews yet.</p>
                            ) : (
                                data.reviews.map((review, index) => (
                                    <div key={index} className="flex gap-3 p-4 rounded-md bg-[hsl(220,13%,98%)] shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-gray-300 mt-4 pt-4">
                                        <img className="w-10 h-10 rounded-full" src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${review.reviewerEmail}`} />
                                        <div className="w-full">
                                            <div className="w-full flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <p className="text-gray-700 font-medium pr-2">{review.reviewerName}</p>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-3 w-3 stroke-0 ${i < review.rating ? "fill-yellow-500" : "fill-gray-400"}`} />
                                                    ))}
                                                    <span className="ml-2 text-gray-800 font-inter text-sm font-medium">{review.rating} Stars</span>
                                                </div>
                                                <p className="text-xs text-gray-500">{dateFormat(review.date)}</p>
                                            </div>
                                            <div className="text-gray-600 text-xs flex items-center gap-1 mb-2">
                                                <Mail className="w-3 h-3 text-gray-600" />
                                                <p>{review.reviewerEmail}</p>
                                            </div>
                                                
                                            <p className="text-gray-800">"{review.comment}"</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    
                </section>
            )}
            
        </div>
    )
}