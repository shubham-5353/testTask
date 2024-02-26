"use client";

import { CartItems } from "@/app/interface/ItemInterface";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CardComponent = ({
  item,
  index,
  CartItemIds,
  handleRemoveItem,
  handleAddItem,
}: CartItems | number | string[] | any) => {
  return (
    <div className="w-1/4 p-4" key={index}>
      <Card>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Price: {item.price}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          {CartItemIds.includes(item.id) ? (
            <Button onClick={() => handleRemoveItem(item)} variant="outline">
              Remove
            </Button>
          ) : (
            <Button onClick={() => handleAddItem(item)}>Add</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardComponent;
