"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GetCartDetails,
  RemoveFromCart,
  decrementItem,
  emptyCart,
  incrementItem,
} from "../api/cart/page";
import NavigationMenuComponent from "../component/Navbar";
import { cn, uuid } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import ButtonIcon from "../component/Button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "../component/Loader";
import Image from "next/image";

const CartComponent = () => {
  const [CartId, setCartId] = useState<string>("");
  const [CartDetails, setCartDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    let cartId = await uuid();
    setCartId(cartId);
    setIsLoading(true);
    let response = await GetCartDetails(cartId);
    if (response?.data?.cart) {
      setCartDetails(response.data.cart);
      setIsLoading(false);
    }
  };

  const incrementProduct = async (item: any) => {
    setIsLoading(true);
    let response = await incrementItem(CartId, item.id);
    if (response?.data?.incrementItemQuantity) {
      setCartDetails(response?.data?.incrementItemQuantity);
      setIsLoading(false);
    }
  };

  const decrementProduct = async (item: any) => {
    setIsLoading(true);
    let response = await decrementItem(CartId, item.id);
    if (response?.data?.decrementItemQuantity) {
      setCartDetails(response?.data?.decrementItemQuantity);
      setIsLoading(false);
    }
  };

  const RemoveItem = async (item: any) => {
    setIsLoading(true);
    let response = await RemoveFromCart(CartId, item.id);
    if (response?.data?.removeItem) {
      setCartDetails(response?.data?.removeItem);
      setIsLoading(false);
    }
  };

  const onEmptyCart = async () => {
    setIsLoading(true);
    let response = await emptyCart(CartId);
    if (response?.data?.emptyCart) {
      setCartDetails(response?.data?.emptyCart);
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavigationMenuComponent
        cartItems={CartDetails ? CartDetails?.items : []}
      />
      <div className="min-h-screen  bg-gray-300  mt-20">
        <h1 className="mb-10 text-center text-2xl font-bold  mt-20">
          Cart Items
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="h-screen rounded-lg md:w-2/3">
            {CartDetails?.isEmpty ? (
              <div className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm: justify-center">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 justify-center">
                  Your cart is empty.
                </h2>
              </div>
            ) : null}
            <ScrollArea className="h-[600px] w-100 rounded-md border">
              {CartDetails?.items?.map((item: any, index: any) => {
                return (
                  <div>
                    <Card>
                      <CardHeader>
                        <div className="flex flex-wrap overflow-hidden rounded-md p-3 justify-center align-center">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            width={300}
                            height={200}
                            priority
                            className={cn(
                              "h-[200px] w-[400px] object-cover object-top transition-all hover:scale-105",
                              "aspect-[1/4] m-2"
                            )}
                          />
                          <CardTitle>{item.name}</CardTitle>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Price: {item.unitTotal.formatted}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total Price: {item.lineTotal.formatted}</p>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <div className="flex items-center border-gray-100">
                          <span
                            className="cursor-pointer rounded-l py-1 px-3.5 duration-100"
                            onClick={() =>
                              item.quantity > 1
                                ? decrementProduct(item)
                                : RemoveItem(item)
                            }
                          >
                            {item.quantity > 1 ? (
                              <ButtonIcon buttonType={"minus"} />
                            ) : (
                              <ButtonIcon buttonType={"delete"} />
                            )}
                          </span>
                          <Badge>{item.quantity}</Badge>
                          <span
                            className="cursor-pointer rounded-r py-1 px-3 duration-100"
                            onClick={() => incrementProduct(item)}
                          >
                            <ButtonIcon buttonType={"plus"} />
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                    <Separator />
                  </div>
                );
              })}
            </ScrollArea>
          </div>
          {CartDetails?.items?.length > 0 ? (
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  {CartDetails?.subTotal?.formatted}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    {CartDetails?.subTotal?.formatted}
                  </p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <Button
                className="mt-6 w-full rounded-md py-1.5 font-medium"
                onClick={() => onEmptyCart()}
              >
                Empty Your Cart
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default CartComponent;
