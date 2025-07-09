import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'
import './MobileOptimizations.css'

// Importando as imagens
import missionarioImg from './assets/missionario.png'
import canibalImg from './assets/canibal.png'
import canoaImg from './assets/canoa.png'
import rioImg from './assets/rio_background.png'

function App() {
  // Estado inicial do jogo
  const [gameState, setGameState] = useState({
    leftSide: {
      missionaries: 3,
      cannibals: 3
    },
    rightSide: {
      missionaries: 0,
      cannibals: 0
    },
    boatSide: 'left', // 'left' ou 'right'
    boatPassengers: [], // array com os passageiros na canoa
    moves: 0,
    gameWon: false,
    gameOver: false,
    message: 'Mova os missionários e canibais para o outro lado do rio!'
  })

  // Função para verificar se um estado é válido
  const isValidState = (leftMiss, leftCann, rightMiss, rightCann) => {
    // Se há missionários em um lado, eles não podem ser superados pelos canibais
    if (leftMiss > 0 && leftCann > leftMiss) return false
    if (rightMiss > 0 && rightCann > rightMiss) return false
    return true
  }

  // Função para adicionar pessoa à canoa
  const addToBoat = (type) => {
    if (gameState.boatPassengers.length >= 2) return
    
    const side = gameState.boatSide === 'left' ? 'leftSide' : 'rightSide'
    const currentSide = gameState[side]
    
    if (type === 'missionary' && currentSide.missionaries > 0) {
      setGameState(prev => ({
        ...prev,
        [side]: {
          ...prev[side],
          missionaries: prev[side].missionaries - 1
        },
        boatPassengers: [...prev.boatPassengers, 'missionary']
      }))
    } else if (type === 'cannibal' && currentSide.cannibals > 0) {
      setGameState(prev => ({
        ...prev,
        [side]: {
          ...prev[side],
          cannibals: prev[side].cannibals - 1
        },
        boatPassengers: [...prev.boatPassengers, 'cannibal']
      }))
    }
  }

  // Função para remover pessoa da canoa
  const removeFromBoat = (index) => {
    const passenger = gameState.boatPassengers[index]
    const side = gameState.boatSide === 'left' ? 'leftSide' : 'rightSide'
    
    setGameState(prev => ({
      ...prev,
      [side]: {
        ...prev[side],
        missionaries: passenger === 'missionary' ? prev[side].missionaries + 1 : prev[side].missionaries,
        cannibals: passenger === 'cannibal' ? prev[side].cannibals + 1 : prev[side].cannibals
      },
      boatPassengers: prev.boatPassengers.filter((_, i) => i !== index)
    }))
  }

  // Função para mover a canoa
  const moveBoat = () => {
    if (gameState.boatPassengers.length === 0) {
      setGameState(prev => ({ ...prev, message: 'A canoa precisa ter pelo menos uma pessoa!' }))
      return
    }

    const newBoatSide = gameState.boatSide === 'left' ? 'right' : 'left'
    const destinationSide = newBoatSide === 'left' ? 'leftSide' : 'rightSide'
    
    // Calcular novo estado após mover passageiros
    const newState = { ...gameState }
    gameState.boatPassengers.forEach(passenger => {
      if (passenger === 'missionary') {
        newState[destinationSide].missionaries += 1
      } else {
        newState[destinationSide].cannibals += 1
      }
    })

    // Verificar se o estado é válido
    if (!isValidState(
      newState.leftSide.missionaries,
      newState.leftSide.cannibals,
      newState.rightSide.missionaries,
      newState.rightSide.cannibals
    )) {
      setGameState(prev => ({ 
        ...prev, 
        message: 'Movimento inválido! Os canibais não podem superar os missionários!' 
      }))
      return
    }

    // Verificar vitória
    const gameWon = newState.rightSide.missionaries === 3 && newState.rightSide.cannibals === 3

    setGameState({
      ...newState,
      boatSide: newBoatSide,
      boatPassengers: [],
      moves: gameState.moves + 1,
      gameWon,
      message: gameWon ? 'Parabéns! Você venceu!' : 'Continue jogando!'
    })
  }

  // Função para reiniciar o jogo
  const resetGame = () => {
    setGameState({
      leftSide: { missionaries: 3, cannibals: 3 },
      rightSide: { missionaries: 0, cannibals: 0 },
      boatSide: 'left',
      boatPassengers: [],
      moves: 0,
      gameWon: false,
      gameOver: false,
      message: 'Mova os missionários e canibais para o outro lado do rio!'
    })
  }

  // Função para renderizar personagens
  const renderCharacters = (side, type, count) => {
    const characters = []
    for (let i = 0; i < count; i++) {
      characters.push(
        <img
          key={`${side}-${type}-${i}`}
          src={type === 'missionary' ? missionarioImg : canibalImg}
          alt={type}
          className="character-img w-10 md:w-12 h-10 md:h-12 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => addToBoat(type)}
        />
      )
    }
    return characters
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Título */}
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Missionários, Canibais e a Canoa
        </h1>
        
        {/* Informações do jogo */}
        <div className="bg-white rounded-lg p-4 mb-4 text-center">
          <p className="text-lg font-semibold mb-2">{gameState.message}</p>
          <p className="text-sm text-gray-600">Movimentos: {gameState.moves}</p>
        </div>

        {/* Área do jogo */}
        <div 
          className="relative bg-cover bg-center rounded-lg p-8 min-h-96"
          style={{ backgroundImage: `url(${rioImg})` }}
        >
          {/* Lado esquerdo */}
          <div className="absolute left-4 top-4 bg-white bg-opacity-80 rounded-lg p-4">
            <h3 className="font-bold mb-2">Lado Inicial</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {renderCharacters('left', 'missionary', gameState.leftSide.missionaries)}
            </div>
            <div className="flex flex-wrap gap-2">
              {renderCharacters('left', 'cannibal', gameState.leftSide.cannibals)}
            </div>
          </div>

          {/* Lado direito */}
          <div className="absolute right-4 top-4 bg-white bg-opacity-80 rounded-lg p-4">
            <h3 className="font-bold mb-2">Lado Final</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {renderCharacters('right', 'missionary', gameState.rightSide.missionaries)}
            </div>
            <div className="flex flex-wrap gap-2">
              {renderCharacters('right', 'cannibal', gameState.rightSide.cannibals)}
            </div>
          </div>

          {/* Canoa */}
          <div className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ${
            gameState.boatSide === 'left' ? 'left-1/4' : 'right-1/4'
          }`}>
            <div className="bg-white bg-opacity-90 rounded-lg p-4 text-center">
              <img src={canoaImg} alt="Canoa" className="w-20 h-12 mx-auto mb-2" />
              <div className="flex gap-2 justify-center mb-2">
                {gameState.boatPassengers.map((passenger, index) => (
                  <img
                    key={index}
                    src={passenger === 'missionary' ? missionarioImg : canibalImg}
                    alt={passenger}
                    className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => removeFromBoat(index)}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600">
                {gameState.boatPassengers.length}/2 passageiros
              </p>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="flex gap-4 justify-center mt-4">
          <Button 
            onClick={moveBoat}
            disabled={gameState.gameWon || gameState.boatPassengers.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            Atravessar Rio
          </Button>
          <Button 
            onClick={resetGame}
            variant="outline"
          >
            Reiniciar Jogo
          </Button>
        </div>

        {/* Instruções */}
        <div className="bg-white rounded-lg p-4 mt-4">
          <h3 className="font-bold mb-2">Como Jogar:</h3>
          <ul className="text-sm space-y-1">
            <li>• Clique nos personagens para colocá-los na canoa</li>
            <li>• A canoa pode levar no máximo 2 pessoas</li>
            <li>• Clique em "Atravessar Rio" para mover a canoa</li>
            <li>• Os canibais nunca podem superar os missionários em qualquer lado</li>
            <li>• Objetivo: levar todos para o outro lado do rio</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App

