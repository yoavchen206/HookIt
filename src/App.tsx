import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppProvider } from '@/contexts/AppContext'
import GeneratorPage from '@/pages/GeneratorPage'
import HistoryPage from '@/pages/HistoryPage'
import PricingPage from '@/pages/PricingPage'

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <TooltipProvider delayDuration={250}>
          <Routes>
            <Route path="/" element={<GeneratorPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
        </TooltipProvider>
      </AppProvider>
    </BrowserRouter>
  )
}
