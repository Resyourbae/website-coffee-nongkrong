import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import type { CartItem } from "./CartDrawer";
import { ProcessingOrder } from "./ProcessingOrder";
import { motion } from "motion/react";

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onConfirmOrder: (orderDetails: OrderDetails) => void;
}

export interface OrderDetails {
  customerName: string;
  tableNumber: string;
  items: CartItem[];
  total: number;
}

export function CheckoutForm({ isOpen, onClose, cartItems, onConfirmOrder }: CheckoutFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName && tableNumber) {
      setIsProcessing(true);
    }
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    onConfirmOrder({
      customerName,
      tableNumber,
      items: cartItems,
      total
    });
    setCustomerName("");
    setTableNumber("");
  };

  return (
    <>
      <Dialog open={isOpen && !isProcessing} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-md border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">Detail Pesanan</DialogTitle>
            <DialogDescription className="text-gray-600">
              Masukkan informasi pemesan untuk menyelesaikan pesanan
            </DialogDescription>
          </DialogHeader>
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="space-y-4">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Label htmlFor="customerName" className="text-gray-700">Nama Pemesan</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)}
                  placeholder="Masukan nama Anda"
                  className="bg-white/50 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20"
                  required
                />
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Label htmlFor="tableNumber" className="text-gray-700">Nomor Meja</Label>
                <Input
                  id="tableNumber"
                  value={tableNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTableNumber(e.target.value)}
                  placeholder="Contoh: 5"
                  className="bg-white/50 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20"
                  required
                />
              </motion.div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h4 className="font-semibold text-gray-800">Ringkasan Pesanan:</h4>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {cartItems.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    className="flex justify-between text-sm bg-gray-50 p-2 rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.5 + (index * 0.1) }}
                  >
                    <span className="text-gray-700">{item.name} x{item.quantity}</span>
                    <span className="font-medium text-gray-800">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              
              <div className="flex justify-between items-center font-semibold text-lg">
                <span className="text-gray-700">Total ({totalQuantity} item):</span>
                <span className="text-xl bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  Rp {total.toLocaleString('id-ID')}
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="flex space-x-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Batal
              </Button>
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-lg"
                  disabled={!customerName || !tableNumber}
                >
                  Konfirmasi Pesanan
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>
        </DialogContent>
      </Dialog>

      <ProcessingOrder 
        isOpen={isProcessing}
        onComplete={handleProcessingComplete}
      />
    </>
  );
}