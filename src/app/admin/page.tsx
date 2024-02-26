"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import NavigationMenuComponent from "../component/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { uuid } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AddToCart, GetCartDetails, RemoveFromCart } from "../api/cart/page";
import { CartItems } from "../interface/ItemInterface";
import { toast } from "sonner";
import Loader from "../component/Loader";
import { cn } from "@/lib/utils";

const AdminComponent = () => {
  const [CartId, setCartId] = useState<string>("");
  const [CartItemIds, setCartItemIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getCartItemIds();
  }, []);

  const getCartItemIds = async () => {
    let cartId = await uuid();
    setCartId(cartId);
    setIsLoading(true);
    let response = await GetCartDetails(cartId);
    if (response?.data?.cart) {
      let itemsId = response.data.cart.items.map((a: CartItems) => a.id);
      setCartItemIds(itemsId);
      setIsLoading(false);
    }
  };

  const AddItem = async (item: CartItems) => {
    setIsLoading(true);
    let response = await AddToCart(CartId, item);
    if (response?.data?.addItem) {
      let itemsId = response?.data.addItem.items.map((a: CartItems) => a.id);
      setCartItemIds(itemsId);
      toast(`${item.name} is added in your cart.`);
      setIsLoading(false);
    }
  };

  const RemoveItem = async (item: CartItems) => {
    setIsLoading(true);
    let response = await RemoveFromCart(CartId, item.id);
    if (response?.data?.removeItem) {
      let itemsId = response?.data.removeItem.items.map((a: CartItems) => a.id);
      setCartItemIds(itemsId);
      toast(`${item.name} is added in your cart.`);
      setIsLoading(false);
    }
  };

  const ListOfItems: CartItems[] = [
    {
      id: "5e3293a34620510",
      name: "Elegant Velvet Dress",
      description:
        "A stunning velvet dress with intricate design patterns and comfortable fit.",
      images: [
        "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
      ],
      price: 7171,
      quantity: 1,
    },
    {
      id: "5e3293a34620511",
      name: "Cozy Winter Sweater",
      description:
        "Stay warm and stylish with this cozy winter sweater in a lovely shade of blue.",
      images: [
        "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
      ],
      price: 3773,
      quantity: 1,
    },
    {
      id: "5e3293a34620512",
      name: "Vintage Leather Jacket",
      description:
        "An iconic vintage leather jacket for a timeless fashion statement.",
      images: [
        "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
      ],
      price: 6118,
      quantity: 1,
    },
    {
      id: "5e3293a34620513",
      name: "Denim Adventure",
      description:
        "Explore in style with these comfortable denim adventure shorts.",
      images: [
        "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
      ],
      price: 7274,
      quantity: 1,
    },
    {
      id: "5e3293a34620514",
      name: "Sophisticated Business Suit",
      description:
        "Make a powerful impression with this sophisticated business suit for formal occasions.",
      images: [
        "https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80",
      ],
      price: 6251,
      quantity: 1,
    },
    {
      id: "5e3293a34620515",
      name: "Artistic Floral Dress",
      description:
        "Express your artistic side with this beautiful floral dress perfect for any occasion.",
      images: [
        "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
      ],
      price: 9572,
      quantity: 1,
    },
    {
      id: "5e3293a34620516",
      name: "Sporty Running Shoes",
      description:
        "Stay active and comfortable with these sporty running shoes designed for performance.",
      images: [
        "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=300&dpr=2&q=80",
      ],
      price: 2312,
      quantity: 1,
    },
    {
      id: "5e3293a34620517",
      name: "Classic Sunglasses",
      description:
        "Shield your eyes in style with these classic sunglasses that complement any look.",
      images: [
        "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=300&dpr=2&q=80",
      ],
      price: 3355,
      quantity: 1,
    },
    {
      id: "5e3293a34620518",
      name: "Cozy Knit Blanket",
      description:
        "Wrap yourself in warmth with this cozy knit blanket perfect for chilly evenings.",
      images: [
        "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
      ],
      price: 9628,
      quantity: 1,
    },
    {
      id: "5e3293a34620519",
      name: "Leisure Lounge Chair",
      description:
        "Relax in style with this comfortable leisure lounge chair designed for ultimate comfort.",
      images: [
        "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
      ],
      price: 3067,
      quantity: 1,
    },
  ];
  
  return (
    <>
      <NavigationMenuComponent cartItems={CartItemIds} />
      <div className="min-h-screen bg-gray-300  mt-20 flex flex-wrap">
        {ListOfItems.map((item: CartItems, index: number) => (
          <div className="w-1/4 p-4" key={index}>
            <Card className="h-full flex flex-col">
              <div className="flex-grow overflow-hidden rounded-md p-3 justify-center align-center">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={300}
                  height={200}
                  priority
                  className={cn(
                    "h-[200px] w-[400px] object-cover object-top transition-all hover:scale-105",
                    "aspect-[1/4] mt-2"
                  )}
                />
              </div>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="flex-grow">
                  {item.description}
                </CardDescription>
                <CardDescription>Price: {item.price}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end">
                {CartItemIds.includes(item.id) ? (
                  <Button onClick={() => RemoveItem(item)} variant="outline">
                    Remove
                  </Button>
                ) : (
                  <Button onClick={() => AddItem(item)}>Add</Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ))}
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default AdminComponent;
