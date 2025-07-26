import { useState } from "react";
import { Header } from "./components/Header";
import { MenuItem } from "./components/MenuItem";
import type { MenuItemType } from "./components/MenuItem";
import { CartDrawer } from "./components/CartDrawer";
import type { CartItem } from "./components/CartDrawer";
import { CheckoutForm } from "./components/CheckoutForm";
import type { OrderDetails } from "./components/CheckoutForm";
import { OrderConfirmation } from "./components/OrderConfirmation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { motion } from "motion/react";
import { Coffee, UtensilsCrossed, Star, Award } from "lucide-react";

// Data menu minuman dan makanan
const menuItems: MenuItemType[] = [
  // Minuman
  {
    id: "1",
    name: "Kopi Tubruk",
    description: "Kopi tradisional Indonesia yang diseduh dengan cara tubruk",
    price: 15000,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop",
    category: "drinks"
  },
  {
    id: "2", 
    name: "Kopi Latte",
    description: "Espresso dengan susu steamed yang creamy",
    price: 25000,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop",
    category: "drinks"
  },
  {
    id: "3",
    name: "Cappuccino",
    description: "Espresso dengan foam susu yang lembut",
    price: 23000,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
    category: "drinks"
  },
  {
    id: "4",
    name: "Es Kopi Susu",
    description: "Kopi dingin dengan susu segar",
    price: 18000,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    category: "drinks"
  },
  {
    id: "5",
    name: "Teh Tarik",
    description: "Teh susu yang ditarik dengan teknik khusus",
    price: 12000,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
    category: "drinks"
  },
  {
    id: "6",
    name: "Jus Jeruk",
    description: "Jus jeruk segar tanpa gula tambahan",
    price: 15000,
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop",
    category: "drinks"
  },
  
  // Makanan
  {
    id: "7",
    name: "Nasi Gudeg",
    description: "Nasi dengan gudeg khas Yogyakarta",
    price: 35000,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    category: "food"
  },
  {
    id: "8",
    name: "Gado-Gado",
    description: "Sayuran segar dengan bumbu kacang",
    price: 25000,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    category: "food"
  },
  {
    id: "9",
    name: "Sate Ayam",
    description: "Sate ayam dengan bumbu kacang dan lontong",
    price: 30000,
    image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400&h=300&fit=crop",
    category: "food"
  },
  {
    id: "10",
    name: "Pisang Goreng",
    description: "Pisang goreng crispy dengan taburan gula",
    price: 12000,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    category: "food"
  },
  {
    id: "11",
    name: "Croissant",
    description: "Roti croissant dengan mentega premium",
    price: 20000,
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=300&fit=crop",
    category: "food"
  },
  {
    id: "12",
    name: "Sandwich",
    description: "Sandwich dengan isian daging dan sayuran segar",
    price: 28000,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    category: "food"
  }
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(null);

  const addToCart = (item: MenuItemType) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (orderDetails: OrderDetails) => {
    setCurrentOrder(orderDetails);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
    setCartItems([]); // Clear cart after order
  };

  const handleOrderComplete = () => {
    setIsConfirmationOpen(false);
    setCurrentOrder(null);
  };

  const drinks = menuItems.filter(item => item.category === 'drinks');
  const foods = menuItems.filter(item => item.category === 'food');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl" />
      </div>

      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Cita Rasa Nusantara
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Nikmati kelezatan kopi dan makanan tradisional Indonesia dengan sentuhan modern di café kami
            </p>
            
            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {[
                { icon: Coffee, label: "Minuman Premium", value: "20+" },
                { icon: UtensilsCrossed, label: "Makanan Lezat", value: "15+" },
                { icon: Star, label: "Rating Bintang", value: "4.9" },
                { icon: Award, label: "Tahun Berpengalaman", value: "10+" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="flex flex-col items-center space-y-2 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                  <span className="text-sm text-gray-600 text-center">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <main className="container mx-auto px-4 pb-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Menu Spesial Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dipilih dengan cermat dari bahan-bahan terbaik untuk memberikan pengalaman kuliner yang tak terlupakan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="drinks" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white/70 backdrop-blur-md border border-white/50 shadow-lg p-1 rounded-2xl">
                <TabsTrigger 
                  value="drinks" 
                  className="rounded-xl px-8 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Minuman
                </TabsTrigger>
                <TabsTrigger 
                  value="food"
                  className="rounded-xl px-8 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all duration-300"
                >
                  <UtensilsCrossed className="w-5 h-5 mr-2" />
                  Makanan
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="drinks" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {drinks.map((item, index) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    index={index}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="food" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {foods.map((item, index) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    index={index}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onConfirmOrder={handleConfirmOrder}
      />

      <OrderConfirmation
        isOpen={isConfirmationOpen}
        onClose={handleOrderComplete}
        orderDetails={currentOrder}
      />
    </div>
  );
}