import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontPixel, pixelSizeVertical, widthPixel } from "../global/responsive"
const Board = ({ board, onPress }) => {
  return (
    <View style={styles.board}>
      {
        board.map((row, rowIndex) => {
          return (
            <View key={rowIndex} style={styles.row}>
              {
                row.map((cell, cellIndex) => {
                  return (
                    <TouchableOpacity key={cellIndex} style={styles.cell} onPress={() => onPress(rowIndex, cellIndex)}>
                      <Text style={[styles.cellText, cell === 'S' ? { color: 'green', fontSize:40,fontWeight:"bold" } : { color: 'red', fontSize:40,fontWeight:"bold" }]}>
                        {cell}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          );
        })
      }
    </View>
  )
}

export default Board

const styles = StyleSheet.create({
  board: {
    marginTop: pixelSizeVertical(20),
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: widthPixel(100),
    height: widthPixel(100),
    borderWidth: 2,
    borderColor:'white',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius:50,
    backgroundColor:"#C2A633",
  },
  cellText: {
    fontSize: fontPixel(36)
  }
})