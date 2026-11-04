import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/ui/EmptyState';

export default function NaoEncontrada() {
  return (
    <EmptyState
      Icon={Compass}
      eyebrow="Erro 404"
      title="Página não encontrada"
      description="O endereço acessado não existe ou foi alterado. Que tal voltar para o cardápio?"
    >
      <Link to="/cardapio" className="bg-brand-red px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-white shadow-brand-sm transition-colors hover:bg-brand-dark">
        Ver Cardápio
      </Link>
      <Link to="/" className="bg-brand-dark px-6 py-3 text-center text-xs font-black uppercase tracking-wider text-white shadow-brand-sm transition-colors hover:bg-brand-red">
        Página Inicial
      </Link>
    </EmptyState>
  );
}
