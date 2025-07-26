import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
import type { OrderDetails } from "./CheckoutForm";

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: OrderDetails | null;
}

export function OrderConfirmation({ isOpen, onClose, orderDetails }: OrderConfirmationProps) {
  if (!orderDetails) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            <span>Pesanan Berhasil!</span>
          </DialogTitle>
          <DialogDescription>
            Pesanan Anda telah berhasil diterima dan sedang diproses
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-center text-green-800">
              Terima kasih atas pesanan Anda!
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Nama Pemesan:</span>
              <span className="font-medium">{orderDetails.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>Nomor Meja:</span>
              <span className="font-medium">{orderDetails.tableNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Pesanan:</span>
              <span className="font-medium text-amber-700">
                Rp {orderDetails.total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-amber-800 text-center">
              Pesanan Anda sedang diproses. Mohon menunggu di meja nomor {orderDetails.tableNumber}.
            </p>
          </div>

          <Button 
            onClick={onClose} 
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            Selesai
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}