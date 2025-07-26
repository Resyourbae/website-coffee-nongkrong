import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { motion } from "motion/react";
import { CheckCircle, Coffee } from "lucide-react";
import { useState, useEffect } from "react";

interface ProcessingOrderProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function ProcessingOrder({ isOpen, onComplete }: ProcessingOrderProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      const timer1 = setTimeout(() => setStep(1), 1000);
      const timer2 = setTimeout(() => setStep(2), 2500);
      const timer3 = setTimeout(() => {
        setStep(3);
        setTimeout(onComplete, 500);
      }, 3500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen, onComplete]);

  const stepMessages = [
    "Memproses pesanan...",
    "Menyiapkan bahan...",
    "Meracik pesanan...",
    "Pesanan siap!"
  ];

  return (
    <Dialog open={isOpen}>
      <DialogContent className="max-w-sm border-0 bg-white/95 backdrop-blur-md shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Memproses Pesanan</DialogTitle>
          <DialogDescription>
            Pesanan Anda sedang diproses. Mohon tunggu sebentar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          {/* Coffee Animation */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center"
              animate={{ 
                rotate: step >= 1 ? [0, 360] : 0,
                scale: step >= 2 ? [1, 1.1, 1] : 1
              }}
              transition={{ 
                rotate: { duration: 1, ease: "easeInOut" },
                scale: { duration: 0.5, ease: "easeInOut" }
              }}
            >
              <Coffee className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Success Checkmark */}
            {step >= 3 && (
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </motion.div>

          {/* Progress Steps */}
          <div className="text-center space-y-2">
            <motion.h3 
              className="text-lg font-semibold text-gray-800"
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {stepMessages[step]}
            </motion.h3>
            
            {/* Progress Bar */}
            <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ 
                  width: step === 0 ? "25%" : 
                         step === 1 ? "50%" : 
                         step === 2 ? "75%" : "100%" 
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Loading Dots */}
          {step < 3 && (
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-amber-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}