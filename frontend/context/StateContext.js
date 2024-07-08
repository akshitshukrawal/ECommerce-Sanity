import React, { useState, useEffect, useContext, createContext } from "react";
import { toast } from 'react-hot-toast';
import { client } from "../lib/client.js";

const context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [emailId,SetEmailId] = useState();

    const onAdd = (product, quantity) => {
        if (!product) return;

        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevQty) => prevQty + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                    };
                }
                return cartProduct;
            });

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to cart.`);
    };

    const onRemove = (product) => {
        const foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prev) => prev - foundProduct.quantity);
        setCartItems(newCartItems);
    };

    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (foundProduct) {
            if (value === 'inc') {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
                setTotalPrice((prev) => prev + foundProduct.price);
                setTotalQuantities((prev) => prev + 1);
            } else if (value === 'dec') {
                if (foundProduct.quantity > 1) {
                    setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                    setTotalPrice((prev) => prev - foundProduct.price);
                    setTotalQuantities((prev) => prev - 1);
                }
            }
        }
    };

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };

    const handleCartBuy = async () => {
        try {
            // Create an array of promises for creating orders
            const createOrderPromises = cartItems.map((cartItem) => {
                const formData = {
                    _type: 'orders',
                    userId: cartItem?.userId,
                    product: {
                        _type: 'reference',
                        _ref: cartItem?._id
                    },
                    emailId:emailId,
                    quantity: cartItem?.quantity,
                    createdAt: new Date().toISOString() // Adding timestamp
                };

                console.log('Creating order:', formData);

                // Return the promise from client.create
                return client.create(formData);
            });

            // Await all promises to complete
            const responses = await Promise.all(createOrderPromises);
            console.log("responses ", responses);

            // Optionally clear cartItems or perform other actions upon successful creation
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantities(0);

            // Notify user of successful order creation
            toast.success('Orders placed successfully!');
            
        } catch (error) {
            console.error('Error creating orders:', error);
            // Handle errors appropriately
            toast.error('Failed to place orders. Please try again later.');
        }
    };

    return (
        <context.Provider
            value={{
                showCart,
                SetEmailId,
                setShowCart,
                handleCartBuy,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}>
            {children}
        </context.Provider>
    );
};

export const useStateContext = () => useContext(context);
