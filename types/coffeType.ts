export interface Coffe {
    id: string;
    coffe_shop_id: string;
    name: string;
    type: string;
    description: string;
    price: number;
    image_url: any;
    votes: number;
    rating: number;
    quantity?: number
}