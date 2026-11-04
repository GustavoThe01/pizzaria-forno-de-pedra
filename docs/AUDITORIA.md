# Relatório de Auditoria Técnica

**Projeto:** Pizzaria Forno de Pedra (vitrine comercial)
**Site:** <https://pizzaria-forno-de-pedra.web.app/>
**Data:** 04/11/2026

## Resumo

O projeto nasceu de um gerador de aplicações (Google AI Studio) e chegou com visual bem resolvido, mas com pedidos sem persistência real, código duplicado, restos do gerador e erros de regra de negócio. A auditoria corrigiu o código, reorganizou a estrutura e removeu dependências sem uso.

| Indicador                       | Antes              | Depois                 |
| ------------------------------- | ------------------ | ---------------------- |
| JavaScript da aplicação         | 916 KB             | 338 KB (103 KB gzip)   |
| Foto da página Sobre            | 8,7 MB (PNG)       | 140 KB (WebP)          |
| Dependências diretas            | 20                 | 12                     |
| TypeScript em modo estrito      | Não                | Sim, sem erros         |
| Maior arquivo de página         | 25,5 KB            | 14 KB                  |

## Achados críticos

### 1. Pedidos nunca eram gravados na nuvem

A API do Cloud Firestore retorna `403 SERVICE_DISABLED` neste projeto. O código tentava salvar e ler pedidos nela, e o histórico local só era gravado quando essa leitura respondia. Pela leitura do código, a consequência é que o pedido se perde ao recarregar a página e o link enviado pelo WhatsApp não funciona.

**Correção:** os pedidos passaram a ser salvos no `localStorage`, com o aviso claro de que só existem naquele navegador. O SDK do Firebase foi removido, o que explica a maior parte da redução do bundle. O Firebase Hosting continua em uso.

### 2. Modelo inseguro caso o Firestore fosse ativado

Bastaria ativar a API para que os problemas abaixo aparecessem:

- Os ids eram previsíveis (`PED-AAAAMMDD-0001`), o que permitiria enumerar pedidos com nome, telefone e endereço.
- A sequência era contada em cada navegador, então dois clientes no mesmo dia gerariam o mesmo id e um sobrescreveria o outro.
- Qualquer visitante poderia alterar ou apagar pedidos, inclusive por `?status=` na URL.
- O repositório não tinha regras do Firestore versionadas.

**Correção:** o caminho foi removido do código, os ids agora têm sufixo aleatório e o parâmetro `?status=` foi eliminado. Nenhum dado pessoal sai mais do navegador pelo site.

### 3. Pedido mínimo podia ser burlado

Escolhendo retirada no carrinho e trocando para delivery no checkout, era possível enviar um pedido abaixo de R$ 25,00.

**Correção:** o mínimo agora também é validado no checkout.

## Erros de lógica corrigidos

| Problema                                                                        | Correção                                                  |
| ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `addToCart` alterava o estado diretamente, podendo somar a quantidade em dobro  | Atualização imutável                                      |
| `JSON.parse` sem proteção: `localStorage` corrompido derrubava o site           | Leitura e escrita seguras, com validação                  |
| Risco de corrida no envio: carrinho vazio redirecionava para o cardápio         | Redirecionamento controlado após o envio                  |
| Retirada gravava o bairro "Centro" e "O entregador está a caminho"              | Etapas e textos próprios para retirada                    |
| Conclusão citava sempre o bairro Cidade 2000                                    | Usa o bairro do pedido                                    |
| Bebidas usavam o preço `media` como gambiarra                                   | Preço `unidade`, previsto no próprio tipo                 |
| "Borda: Borda Recheada" repetido; numeração "3." em bebidas sem etapas 1 e 2    | Nomes e numeração corrigidos                              |
| Borda de chocolate em pizza salgada e de cheddar em pizza doce                  | Bordas filtradas pelo tipo de pizza                       |
| Telefone aceitava letras e bastavam 8 caracteres                                | Máscara e validação de 10 ou 11 dígitos                   |
| Troco falhava com vírgula ("50,50") e aceitava valor igual ao total             | Aceita vírgula e exige valor maior que o total            |
| Preços como "R$ 28.00"                                                          | Formato brasileiro em todo o site: "R$ 28,00"             |
| Contagem do carrinho divergia do ícone (linhas contra unidades)                 | Mesma contagem nos dois                                   |
| "Forno a lenha aceso!" fixo, mesmo fora do horário                              | Status calculado pelo fuso de Fortaleza                   |
| Busca não encontrava "camarao" sem acento                                       | Busca ignora acentos e caixa                              |
| Rota inexistente mostrava a página inicial                                      | Página 404 própria                                        |
| Botões "Pedir" da página inicial levavam ao cardápio genérico                   | Abrem o item escolhido                                    |
| Bloqueador de pop-up impedia o envio sem alternativa                            | Link para reenviar pelo WhatsApp                          |
| Botão do WhatsApp não reagia à troca de página                                  | `IntersectionObserver` observa o rodapé                   |
| Classes inexistentes (`bg-stone-150`, `bg-stone-850`)                           | Linha de progresso agora aparece; classes corrigidas      |

## Caminhos e conteúdo

- Imagem com espaços no nome renomeada para `pizzaiolo-gustavion-preparando-fermento.webp`.
- "Abrir Google Maps" levava à página inicial do Maps; agora busca o endereço.
- A página de contato citava outro endereço ("Avenida Principal das Oliveiras").
- Link do WhatsApp na página de contato estava sem codificação de URL.
- "Tradição secular" contradizia a fundação em 2021.
- Depoimentos citavam sabores fora do cardápio e bairro fora da área de entrega.
- "Molho 100% italiano" contradizia "tomates moídos no mesmo dia".

## Avisos comerciais

O aviso de demonstração foi **mantido com o texto original** e os botões "Sim" e "Não, sair". Ele passou a ser um componente React, que bloqueia foco e clique no site enquanto está aberto.

Foram adicionados avisos porque o aceite inicial só aparece uma vez:

- Rodapé: pizzaria, pedidos e depoimentos são fictícios.
- Checkout: nenhuma pizza será produzida e não se deve informar dados reais.
- Depoimentos: "Depoimentos reais" passou a "Depoimentos ilustrativos", pois apresentar texto fictício como real em uma vitrine comercial pode ser enganoso.

## Responsividade

Testado em 320, 375, 768, 1024 e 1366 px nas oito rotas, sem rolagem horizontal.

- Cabeçalho mobile mais compacto e menu sanduíche até 1024 px, faixa em que os links antes não cabiam bem.
- Campos com 16 px no celular, evitando o zoom automático do iOS.
- Botões de toque com pelo menos 40 px e textos de 9 px elevados.
- Foco automático no primeiro campo inválido, já que o botão de envio fica longe do formulário no celular.
- Linha de progresso do pedido alinhada ao centro das etapas.
- Modal com `<dialog>` nativo: tecla Esc, foco e bloqueio do fundo.

## Estrutura

Remoções: `@google/genai`, `express`, `dotenv`, `motion`, `firebase`, `autoprefixer`, `esbuild` e `tsx`, além de Font Awesome, CSS de Bootstrap sem efeito, `metadata.json`, configurações do AI Studio, a pasta `y/` e um `.zip` de 9 MB na raiz.

Os arquivos originais foram guardados em `.arquivo-auditoria/`, fora do Git. Depois de conferir o resultado, a pasta pode ser apagada.

## Pendências que dependem de decisão

1. **Fotos do cardápio (risco legal):** 15 imagens vêm de sites de terceiros, incluindo miniaturas do Google, Pinterest e fotos de produtos de marcas. Além de poderem sair do ar, podem ter direitos autorais, o que é sensível em uma vitrine comercial. Recomendo substituir por fotos próprias ou licenciadas. Três pizzas também usam a mesma foto.
2. **Número do WhatsApp:** `5585999999999` é um número fictício, mas pode pertencer a alguém. Quem testar o site enviará o pedido a esse número. Recomendo usar um número seu.
3. **Foto da página Sobre:** confirme que a pessoa retratada autorizou o uso comercial da imagem.
4. **Licença:** o código trazia cabeçalhos Apache-2.0 herdados do gerador, e eles foram removidos. Sem arquivo `LICENSE`, ninguém recebe permissão de reuso. Se quiser permitir, escolha uma licença.
5. **Projeto Firebase:** a chave web antiga segue no histórico dos deploys anteriores. Chaves web do Firebase não são segredo, e a API do Firestore está desativada, mas vale revisar as restrições no Google Cloud.

## Próximos passos recomendados

1. Testes automatizados de `src/lib` e do fluxo de compra (Vitest e Playwright).
2. CI no GitHub Actions com verificação de tipos e build.
3. ESLint e Prettier.
4. Para um cliente real: backend com autenticação, painel da pizzaria, política de privacidade (LGPD) e horário de funcionamento aplicado aos pedidos.

## Nota de segurança sobre dependências

Durante a auditoria, o antivírus do Windows bloqueou o binário de `@rollup/rollup-win32-x64-msvc@4.67.5`, publicado no mesmo dia. Não foi possível determinar se é falso positivo. O projeto foi mantido na versão `4.62.2`, a mesma do lockfile original, que funcionou sem bloqueio. **Revise essa versão antes de atualizar o `rollup` ou o `vite`, e use `npm ci` para respeitar o lockfile.**
