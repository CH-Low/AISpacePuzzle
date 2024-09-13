import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import Board from './Board';
import ButtonContainer from './ButtonContainer';

const data = {
  empty: require('./assets/combinations/empty.png'),

  circle: require('./assets/combinations/circle.png'),
  hexagon: require('./assets/combinations/hexagon.png'),
  square: require('./assets/combinations/square.png'),
  triangle: require('./assets/combinations/triangle.png'),

  dice_value_1: require('./assets/combinations/1.png'),
  dice_value_2: require('./assets/combinations/2.png'),
  dice_value_3: require('./assets/combinations/3.png'),
  dice_value_4: require('./assets/combinations/4.png'),
  dice_value_5: require('./assets/combinations/5.png'),
  dice_value_6: require('./assets/combinations/6.png'),

  x: require('./assets/combinations/X.png')
}

export default function App() {
  const emptyCombinations = Array(16).fill('empty');
  const emptyDiceValues = Array(4).fill('empty');
  const [finalCombinations, setFinalCombinations] = useState([...emptyCombinations]);
  const [diceValues, setDiceValues] = useState([...emptyDiceValues]);

  useEffect(() => {
    randomizeHandler()
  }, [])

  function generatingPosition(numberOfTimes, orderArray, defaultPositionArray) {
    const newPositionArray = [...defaultPositionArray];
    for (let i = 0; i < numberOfTimes; i++) {
      for (let index = 0; index < orderArray.length; index++) {
        const value = defaultPositionArray[orderArray[index]];
        newPositionArray[index] = value;
      }
    }
    return newPositionArray
  }

  function generatePosition() {
    const defaultCombinations = [
      [3, 4, 6, 10, 12], [3, 5, 11, 12, 14], [1, 7, 9, 10, 11], [5, 6, 9, 10, 14],
      [1, 2, 6, 8, 14], [5, 6, 9, 10, 12], [0, 7, 12, 14, 15], [5, 9, 11, 12, 15],
      [0, 6, 8, 13, 15], [3, 4, 7, 10, 12], [1, 4, 7, 13, 14], [2, 3, 7, 8, 14],
      [2, 5, 6, 9, 15], [1, 3, 5, 9, 11], [0, 1, 11, 13, 14], [0, 6, 8, 9, 10],
      [1, 5, 8, 11, 13], [2, 7, 8, 9, 14], [0, 6, 8, 10, 14], [2, 5, 8, 10, 11]
    ];
    const horizontalFlipped = [3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8, 15, 14, 13, 12];
    const vertialFlipped = [12, 13, 14, 15, 8, 9, 10, 11, 4, 5, 6, 7, 0, 1, 2, 3];
    let defaultPositionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const flipHorizontal = Math.floor(Math.random() * 2);
    const flipVertical = Math.floor(Math.random() * 2);
    defaultPositionArray = generatingPosition(flipHorizontal, horizontalFlipped, [...defaultPositionArray]);
    defaultPositionArray = generatingPosition(flipVertical, vertialFlipped, [...defaultPositionArray]);

    // const combinationNumber = Math.floor(Math.random() * 20);
    const combinationNumber = 0;
    const chosenCombination = defaultCombinations[combinationNumber];
    const newCombination = Array(5).fill(0);
    for (let i = 0; i < 5; i++) {
      const position = chosenCombination[i];
      newCombination[i] = defaultPositionArray[position];
    }
    return newCombination;
  }

  function radomGenerate(values) {
    const index = Math.floor(Math.random() * values.length);
    const value = values[index];
    if (index != (values.length - 1)) {
      values[index] = values[values.length - 1];
    }
    values.pop();
    return [value, values]
  }

  function randomizeHandler() {
    let newCombinationArray = [...emptyCombinations];
    let newDiceValueArray = [...emptyDiceValues];
    const combination = generatePosition();
    let defaultColorArray = ['black', 'blue', 'green', 'red', 'white', 'yellow'];
    let defaultShapeArray = ['circle', 'hexagon', 'square', 'triangle'];
    let defaultDiceValueArray = ['1', '2', '3', '4', '5', '6'];

    let newColor = 'black', newShape = 'circle', newDiceValue = '1';
    for (let i = 0; i < 4; i++) {
      [newColor, defaultColorArray] = radomGenerate(defaultColorArray);
      [newShape, defaultShapeArray] = radomGenerate(defaultShapeArray);
      [newDiceValue, defaultDiceValueArray] = radomGenerate(defaultDiceValueArray);

      newCombinationArray[combination[i]] = `${newColor}_${newShape}`;
      newDiceValueArray[i] = `dice_value_${newDiceValue}`;
    }
    newCombinationArray[combination[4]] = `x`;
    setFinalCombinations(newCombinationArray);
    setDiceValues(newDiceValueArray);
  }

  function rotateLeft() {
    const leftRotation = [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12];
    const defaultPositionArray = generatingPosition(1, leftRotation, [...finalCombinations]);
    setFinalCombinations(defaultPositionArray);

  }

  function rotateRight() {
    const rightRotation = [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3];
    const defaultPositionArray = generatingPosition(1, rightRotation, [...finalCombinations]);
    setFinalCombinations(defaultPositionArray);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.text}>Final Combination Cards</Text>
      <Board data={data} finalCombinations={finalCombinations} diceValues={diceValues} />
      <ButtonContainer rotateLeft={rotateLeft} randomizeHandler={randomizeHandler} rotateRight={rotateRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111A2D',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
    marginTop: 100,
  },
  image: {
    height: 350,
    width: 450,
    borderRadius: 20,
  },
});
