import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { hasAcceptedDisclaimer, PortfolioDisclaimer } from './components/layout/PortfolioDisclaimer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { WhatsappFloat } from './components/layout/WhatsappFloat';
import { CartProvider } from './context/CartContext';
import { OrdersProvider } from './context/OrdersContext';
import Cardapio from './pages/Cardapio';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import Contato from './pages/Contato';
import Home from './pages/Home';
import NaoEncontrada from './pages/NaoEncontrada';
import PedidoStatus from './pages/PedidoStatus';
import Sobre from './pages/Sobre';

export default function App() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(hasAcceptedDisclaimer);

  return (
    <CartProvider>
      <OrdersProvider>
        <BrowserRouter>
          <ScrollToTop />
          {!disclaimerAccepted && <PortfolioDisclaimer onAccept={() => setDisclaimerAccepted(true)} />}

          {/* `inert` impede foco e clique no site enquanto o aviso estiver aberto. */}
          <div
            inert={!disclaimerAccepted}
            className="flex min-h-screen flex-col bg-brand-bg font-sans text-brand-dark selection:bg-brand-red/20 selection:text-brand-red"
          >
            <Navbar />
            <main className="grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cardapio" element={<Cardapio />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedido/:id" element={<PedidoStatus />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="*" element={<NaoEncontrada />} />
              </Routes>
            </main>
            <Footer />
            <WhatsappFloat />
          </div>
        </BrowserRouter>
      </OrdersProvider>
    </CartProvider>
  );
}
