import { CartItems } from "@/app/interface/ItemInterface";
import { GRAPH_API_URL } from "@/constant/constant";

export async function GetCartDetails(id: string) {
  const data: any = await fetch(GRAPH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        cart(id: "${id}") {
          id
          isEmpty
          totalItems
          totalItems
    totalUniqueItems
    subTotal {
      formatted
    }
    items {
      id
      name
      description
      images
      unitTotal {
        amount
        formatted
      }
      lineTotal {
        amount
        formatted
      }
      quantity
    }
        }
      }`,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err.json());
  return data;
}

export async function AddToCart(cartId: string, item: CartItems) {
  const mutation = `
  mutation AddToCartInput($input: AddToCartInput!) {
    addItem(input: $input) {
      id
      isEmpty
      abandoned
      totalItems
      totalUniqueItems
      subTotal {
        formatted
      }
      
    items {
      id
      name
      description
      images
      unitTotal {
        amount
        formatted
      }
      lineTotal {
        amount
        formatted
      }
      quantity
    }
    }
  }
`;
  const input = {
    cartId: cartId,
    id: item.id,
    name: item.name,
    description: item.description,
    images: item.images,
    price: item.price,
    quantity: item.quantity,
  };
  const data: any = await fetch(GRAPH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: mutation,
      variables: { input },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err.json());
  return data;
}

export async function RemoveFromCart(cartId: string, itemId: string) {
  const mutation = `
  mutation RemoveCartItemInput($input: RemoveCartItemInput!) {
    removeItem(input: $input) {
      id
    isEmpty
    totalItems
    totalUniqueItems
    subTotal {
      formatted
    }
    items {
      id
      name
      description
      images
      unitTotal {
        amount
        formatted
      }
      lineTotal {
        amount
        formatted
      }
      quantity
    }
  }
}
`;
  const input = {
    cartId: cartId,
    id: itemId,
  };
  const data: any = await fetch(GRAPH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: mutation,
      variables: { input },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err.json());
  return data;
}

export async function incrementItem(cartId: string, itemId: string) {
  const mutation = `
  mutation incrementItemQuantity($input: UpdateItemQuantityInput!) {
    incrementItemQuantity(input: $input) {
      id
    isEmpty
    totalItems
    totalUniqueItems
    subTotal {
      formatted
    }
    items {
      id
      name
      description
      images
      unitTotal {
        amount
        formatted
      }
      lineTotal {
        amount
        formatted
      }
      quantity
    }
    }
  }
`;

  const input = {
    cartId: cartId,
    id: itemId,
    by: 1,
  };

  const data: any = await fetch(GRAPH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: mutation,
      variables: { input },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err.json());
  return data;
}

export async function decrementItem(cartId: string, itemId: string) {
  const mutation = `
  mutation decrementItemQuantity($input: UpdateItemQuantityInput!) {
    decrementItemQuantity(input: $input) {
      id
    isEmpty
    abandoned
    totalItems
    totalUniqueItems
    subTotal {
      formatted
    }
    items {
      id
      name
      description
      images
      unitTotal {
        amount
        formatted
      }
      lineTotal {
        amount
        formatted
      }
      quantity
    }
    }
  }
`;

  const input = {
    cartId: cartId,
    id: itemId,
    by: 1,
  };

  const data: any = await fetch(GRAPH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: mutation,
      variables: { input },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err.json());
  return data;
}

export async function emptyCart(cartId: string) {
  const mutation = `
  mutation emptyCart($input: EmptyCartInput!) {
    emptyCart(input: $input) {
      id
    isEmpty
    totalItems
    totalUniqueItems
    subTotal {
      formatted
    }
    items {
      id
      name
      description
      images
      unitTotal {
        amount
        formatted
      }
      lineTotal {
        amount
        formatted
      }
      quantity
    }
    }
  }
`;

  const input = {
    id: cartId,
  };
  const data: any = await fetch(GRAPH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: mutation,
      variables: { input },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => err.json());
  return data;
}
