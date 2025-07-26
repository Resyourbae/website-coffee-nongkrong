import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Plus, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'drinks' | 'food';
}

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
  index: number;
}

export function MenuItem({ item, onAddToCart, index }: MenuItemProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:shadow-amber-200/50">
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Rating Badge */}
          <motion.div 
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={isImageLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
          >
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-700">4.8</span>
          </motion.div>

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium capitalize backdrop-blur-sm">
              {item.category === 'drinks' ? 'Minuman' : 'Makanan'}
            </span>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <motion.h3 
              className="font-semibold text-lg text-gray-800 group-hover:text-amber-700 transition-colors duration-300"
              layoutId={`title-${item.id}`}
            >
              {item.name}
            </motion.h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <motion.div
              className="space-y-1"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Rp {item.price.toLocaleString('id-ID')}
              </span>
              <p className="text-xs text-gray-500">Termasuk pajak</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => onAddToCart(item)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-lg hover:shadow-amber-300/50 transition-all duration-300"
                size="sm"
              >
                <motion.div
                  className="flex items-center space-x-1"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah</span>
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}