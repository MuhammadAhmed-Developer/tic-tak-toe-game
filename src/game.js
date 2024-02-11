import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pixelSizeVertical, fontPixel, widthPixel, heightPixel } from "../global/responsive"
import Board from './board'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
const Game = () => {

  const initialBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]

  const [board, setBoard] = useState(initialBoard)
  const [player, setPlayer] = useState("")
  const [winner, setWinner] = useState("")
  const [category, setCategory] = useState("")
  const [letter, setLetter] = useState("")
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [playerSWins, setPlayerSWins] = useState(0);
  const [playerOWins, setPlayerOWins] = useState(0);

  useEffect(() => {
    CheckWinner()
  }, [board])

  const playSound = async () => {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync(require('../assets/sounds/coin.wav'));
      await soundObject.playAsync();
    } catch (error) {
      console.error('Failed to load sound', error);
    }
  }

  useEffect(() => {
    if (winner) {
      // Increment the win count for the winning player
      if (winner === "S") {
        playSound();
        setPlayerSWins(prev => prev + 1);
      } else if (winner === "O") {
        playSound();
        setPlayerOWins(prev => prev + 1);
      }
      Alert.alert(`Congratulations Player ${winner} Won!! 🎊🎉`, '', [{ text: "OK", onPress: resetGame }])
    }
  }, [winner])

  const getLocalValues = async () => {
    try {
      const category = await AsyncStorage.getItem("category")
      const letter = await AsyncStorage.getItem("Letter")
      setCategory(category)
      setLetter(letter)
      setPlayer(letter === "S" || letter === "O" ? letter : getRandomPlayer());
      if (category === "computer") {
        setIsComputerTurn(letter === "S"); // If the category is computer and the user is S, it's the computer's turn
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getLocalValues()
  }, [])

  const handlePress = (rowIndex, cellIndex) => {
    if (board[rowIndex][cellIndex] === "" && !winner && (category !== "computer" || !isComputerTurn)) {
      const newBoard = [...board];
      newBoard[rowIndex][cellIndex] = player;
      setBoard(newBoard);

      // Switch players for the next turn if the category is "friend"
      if (category === "friend") {
        setPlayer(player === "S" ? "O" : "S");
      }

      // Check for winner or tie
      CheckWinner();

      // If there's no winner and the board is full, it's a tie
      if (!winner && isBoardFull(newBoard)) {
        Alert.alert("It's a tie 🤦‍♂️!", '', [{ text: "OK", onPress: resetGame }]);
      }

      // If the category is computer, after the player's move, it's the computer's turn
      if (category === "computer") {
        // Set a timeout to ensure that the computer's move is triggered after a slight delay
        setTimeout(() => {
          setIsComputerTurn(true);
        }, 100); // You can adjust the delay if needed
      }
    }
  };



  const isBoardFull = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          return false; // If there's an empty cell, board is not full
        }
      }
    }
    return true; // If no empty cells found, board is full
  };



  const CheckWinner = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== "" && board[i][0] === board[i][1] && board[i][0] === board[i][2]
      ) {
        setWinner(board[i][0]);
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== "" && board[0][i] === board[1][i] && board[0][i] === board[2][i]
      ) {
        setWinner(board[0][i]);
        return;
      }
    }

    // Check diagonals
    if (
      board[0][0] !== "" && board[0][0] === board[1][1] && board[0][0] === board[2][2]
    ) {
      setWinner(board[0][0]);
      return;
    } else if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setWinner(board[0][2]);
      return;
    }
  }

  function getRandomPlayer() {
    return Math.random() < 0.5 ? "O" : "S";
  }

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner("");
    setIsComputerTurn(false);
    // Reset any other game-related states here
  };

  useEffect(() => {
    if (winner) {
      Alert.alert(`Congratulations Player ${winner} Won!! 🎊🎉`, '', [{ text: "OK", onPress: resetGame }])
    }
  }, [winner])


  useEffect(() => {
    if (!winner && isComputerTurn && category === "computer") {
      makeComputerMove();
    }
  }, [isComputerTurn]); // removed player as a dependency

  const makeComputerMove = () => {
    // Find all empty cells
    const emptyCells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          emptyCells.push({ rowIndex: i, cellIndex: j });
        }
      }
    }

    if (emptyCells.length === 0) {
      // No empty cells left, board is full
      return;
    }

    // Choose a random empty cell
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { rowIndex, cellIndex } = emptyCells[randomIndex];

    // Update the board with the computer's move
    const newBoard = [...board];
    newBoard[rowIndex][cellIndex] = player === "S" ? "O" : "S"; // Assuming player 'S' is the user
    setBoard(newBoard);

    // Check for winner after the computer's move
    CheckWinner();
    setIsComputerTurn(false); // Set flag to indicate user's turn after the computer's move
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}><Text style={{ color: "yellow" }}>Tic</Text> <Text style={{ color: "pink" }}>Tak </Text>Toe</Text>
      <View style={{ marginBottom: 60, display: "flex", flexDirection: "row", gap: 30 }}>
        <View style={styles.playerO}>
          <Text style={styles.Otext}> <Text style={{ fontSize: 30, fontWeight: "bold", color: "red", }}>O</Text> : {playerOWins} <Image source={require("../assets/coin.png")} style={styles.coin} /></Text>
        </View>
        <View style={styles.playerO}>
          <Text style={styles.Otext}><Text style={{ fontSize: 30, fontWeight: "bold", color: "green", }}>S</Text> : {playerSWins} <Image source={require("../assets/coin.png")} style={styles.coin} /></Text>
        </View>
      </View>
      <Text style={styles.turnText}>{winner ? `Player ${winner} Won!!` : `Now Player "${player}" Turn`}</Text>
      <Board board={board} onPress={handlePress} />
      <TouchableOpacity style={styles.resetBtn} onPress={resetGame}>
        <Text style={styles.resettext}>Reset</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#450920"
  },
  title: {
    fontSize: fontPixel(36),
    fontWeight: "bold",
    color: "red",
    marginBottom: pixelSizeVertical(30)

  },
  resetBtn: {
    backgroundColor: "white",
    paddingHorizontal: pixelSizeVertical(20),
    paddingVertical: pixelSizeVertical(6),
    borderRadius: 5,
    marginTop: pixelSizeVertical(50),
  },
  resettext: {
    color: "black",
  },
  turnText: {
    fontSize: fontPixel(14),
    fontWeight: "bold",
    color: "white"
  },
  playerO: {
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: pixelSizeVertical(3)
  },
  Otext: {
    color: "white",
    fontSize: fontPixel(25)
  },
  coin: {
    width: widthPixel(20),
    height: heightPixel(20)
  }
})
