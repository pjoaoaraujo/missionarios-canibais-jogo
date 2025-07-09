# Jogo: Missionários, Canibais e a Canoa

## Descrição
Este é um quebra-cabeça de lógica clássico onde você deve ajudar 3 missionários e 3 canibais a atravessarem um rio usando uma canoa que comporta no máximo 2 pessoas. O desafio é que em nenhum dos lados do rio o número de canibais pode ser maior do que o de missionários (senão eles comem os missionários!).

## Características
- ✅ Interface responsiva para desktop, tablet e mobile
- ✅ Controles otimizados para touch (Android/iPhone)
- ✅ Lógica completa do quebra-cabeça
- ✅ Validação automática de movimentos
- ✅ Sistema de vitória
- ✅ Animações suaves
- ✅ Design colorido e amigável

## Como Jogar
1. Clique nos personagens (missionários ou canibais) para colocá-los na canoa
2. A canoa pode levar no máximo 2 pessoas por vez
3. Clique em "Atravessar Rio" para mover a canoa para o outro lado
4. Os canibais nunca podem superar os missionários em qualquer lado do rio
5. Objetivo: levar todos os personagens para o outro lado do rio

## Como Executar

### Opção 1: Executar Localmente (Recomendado)
1. Certifique-se de ter o Node.js instalado (versão 18 ou superior)
2. Extraia o arquivo ZIP
3. Abra o terminal na pasta do projeto
4. Execute os comandos:
   ```bash
   npm install
   npm run dev
   ```
5. Abra o navegador em `http://localhost:5173`

### Opção 2: Usar Versão Compilada
1. Extraia o arquivo ZIP
2. Navegue até a pasta `dist/`
3. Abra o arquivo `index.html` em qualquer navegador moderno
4. **Nota**: Alguns navegadores podem bloquear recursos locais. Se isso acontecer, use a Opção 1.

## Estrutura do Projeto
```
missionarios-canibais-jogo/
├── src/                    # Código fonte
│   ├── assets/            # Imagens do jogo
│   ├── components/        # Componentes React
│   ├── App.jsx           # Componente principal
│   └── MobileOptimizations.css  # Estilos mobile
├── dist/                  # Versão compilada
├── package.json          # Dependências
└── README.md            # Este arquivo
```

## Tecnologias Utilizadas
- React 18
- Vite (bundler)
- Tailwind CSS
- shadcn/ui components

## Compatibilidade
- ✅ Chrome, Firefox, Safari, Edge (versões recentes)
- ✅ Android (Chrome, Samsung Internet)
- ✅ iPhone/iPad (Safari, Chrome)
- ✅ Desktop e Mobile

## Solução do Quebra-Cabeça
Se você ficar preso, aqui está uma das soluções possíveis:
1. 2 canibais atravessam
2. 1 canibal volta
3. 2 canibais atravessam
4. 1 canibal volta
5. 2 missionários atravessam
6. 1 missionário e 1 canibal voltam
7. 2 missionários atravessam
8. 1 canibal volta
9. 2 canibais atravessam
10. 1 canibal volta
11. 2 canibais atravessam

Divirta-se jogando! 🎮

