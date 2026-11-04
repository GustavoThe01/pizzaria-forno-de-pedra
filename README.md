# Pizzaria Forno de Pedra

Modelo comercial de site para pizzarias e delivery: cardápio digital, carrinho, frete por bairro, pedido estruturado via WhatsApp e acompanhamento simulado.

**Demonstração:** <https://pizzaria-forno-de-pedra.web.app/>

> **Website demonstrativo.** A pizzaria, os pedidos, o telefone e os depoimentos são fictícios. O projeto faz parte do portfólio de [Gustavo Osterno Thé](https://site-gustavothe-dev.web.app/), desenvolvedor Web Full Stack, e serve para apresentar um modelo personalizável.

## Funcionalidades

- Cardápio com busca (ignora acentos) e filtro por categoria
- Personalização de tamanho, borda e quantidade
- Carrinho persistente com frete por bairro e pedido mínimo para delivery
- Checkout com validação, máscara de telefone e cálculo de troco
- Envio do pedido formatado para o WhatsApp
- Acompanhamento com simulador de etapas, adaptado a delivery ou retirada
- Layout responsivo, do celular ao desktop
- Aviso de demonstração na primeira visita, no rodapé e no checkout

## Tecnologias

React 19, TypeScript (modo estrito), Vite 6, Tailwind CSS 4, React Router 7 e Firebase Hosting.

## Como executar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

O site abre em <http://localhost:3000>.

| Comando             | O que faz                                   |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                 |
| `npm run typecheck` | Verificação de tipos                        |
| `npm run build`     | Verifica os tipos e gera a versão em `dist` |
| `npm run preview`   | Serve localmente a versão gerada            |
| `npm run deploy`    | Gera a versão e publica no Firebase Hosting |

## Estrutura

```text
public/               Arquivos estáticos (favicon e imagens locais)
src/
  components/
    layout/           Cabeçalho, rodapé, aviso de portfólio, botão do WhatsApp
    menu/             Cartão do item e modal de personalização
    order/            Lista de itens, totais, progresso e alerta de mínimo
    ui/               Componentes genéricos (imagem, botões, títulos)
  context/            Estado do carrinho e dos pedidos
  data/               Conteúdo editável: cardápio, frete e dados do negócio
  lib/                Regras puras: formatação, pedido, WhatsApp, armazenamento
  pages/              Uma página por rota
  styles/             Tema e classes compartilhadas do Tailwind
  types/              Tipos do domínio
docs/AUDITORIA.md     Relatório técnico da auditoria
```

## Como adaptar para um cliente

1. **Dados do negócio:** edite `src/data/pizzaria.ts` (nome, WhatsApp, endereço e horários).
2. **Cardápio:** edite `src/data/menu.ts` e use fotos próprias ou licenciadas.
3. **Frete:** edite `src/data/delivery.ts` (bairros, taxas e pedido mínimo).
4. **Identidade visual:** altere as cores e fontes em `src/styles/index.css`.
5. **Conteúdo fictício:** troque os depoimentos em `src/pages/Home.tsx` e o texto de `src/pages/Sobre.tsx`.

## Limitações conhecidas

Por ser uma vitrine, o projeto não tem backend. Os pedidos ficam no `localStorage` do navegador do visitante, então o link de acompanhamento só funciona nesse mesmo navegador. Para uso real, é preciso substituir `src/context/OrdersContext.tsx` por uma API ou banco de dados com autenticação e regras de acesso.

As fotos do cardápio são links externos usados apenas para demonstração. Veja `docs/AUDITORIA.md` antes de usar este modelo comercialmente.

## Licença

Nenhuma licença de uso foi concedida. Todos os direitos reservados ao autor.
