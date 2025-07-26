import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import type { MenuItemType } from "./MenuItem";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: CartDrawerProps) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Keranjang Belanja</SheetTitle>
          <SheetDescription>
            Kelola pesanan Anda dan lanjutkan ke checkout
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Keranjang belanja kosong
            </p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Rp {item.price.toLocaleString('id-ID')}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-amber-700">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
            <Button 
              onClick={onCheckout}
              className="w-full bg-amber-600 hover:bg-amber-700"
              size="lg"
            >
              Lanjutkan Pesanan
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}