import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, AlertCircle } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

export const Toaster: React.FC = () => {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.3 }}
            transition={{ duration: 0.3 }}
            className={`
              flex items-center gap-3 p-4 rounded-lg shadow-lg backdrop-blur-sm border max-w-md
              ${toast.variant === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-100' : 
                toast.variant === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-100' : 
                'bg-slate-800/90 border-slate-700 text-white'}
            `}
          >
            {toast.variant === 'success' && <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />}
            {toast.variant === 'error' && <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />}
            
            <div className="flex-1">
              <div className="font-semibold">{toast.title}</div>
              {toast.description && (
                <div className="text-sm opacity-90">{toast.description}</div>
              )}
            </div>
            
            <button
              onClick={() => dismiss(toast.id)}
              className="text-current opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}