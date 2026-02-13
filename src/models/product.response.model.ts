export type AddProductResponse =
    | { error: string }
    | {
          message: string;
          product: {
              name: string;
              productId: string;
              price: number;
              count: number;
          };
      };
