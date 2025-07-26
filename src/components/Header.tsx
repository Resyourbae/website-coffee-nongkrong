import { useState, useEffect } from "react";
import { ShoppingCart, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Coffee className={`h-8 w-8 ${scrolled ? 'text-amber-600' : 'text-amber-300'}`} />
          </motion.div>
          <div>
            <h1 className={`text-2xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              Coffee Shop AyserNii
            </h1>
            <p className={`text-xs ${scrolled ? 'text-gray-600' : 'text-amber-200'}`}>
              Cita Rasa Tradisional
            </p>
          </div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            className={`${
              scrolled 
                ? 'bg-white/50 border-amber-300 text-amber-700 hover:bg-amber-50' 
                : 'bg-transparent border-amber-300 text-amber-300 hover:bg-amber-800'
            } relative transition-all duration-300 backdrop-blur-sm`}
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Keranjang
            {cartItemsCount > 0 && (
              <motion.span 
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                key={cartItemsCount}
                whileHover={{ scale: 1.1 }}
              >
                {cartItemsCount}
              </motion.span>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}