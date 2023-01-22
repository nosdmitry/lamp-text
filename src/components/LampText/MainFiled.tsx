import { OrbitControls, } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { ILetter, IDictionary, IActivePosition, ELetterType } from "../MainField/types";
import Light from "./BaseLight";
import MainLamp from "./MainLamp";
import lettersDictionary from '../../dictionary/letters.json';
import MainCamera from "./MainCamera";
import Background from "./Background";

const MainField = () => {

  const importedDictionary = lettersDictionary as IDictionary;
  const LAMP_AMOUNT_X = 5;
  const LAMP_AMOUNT_Y = 5
  const SPACE_SIZE = 2;

  const [activeLetters, setActiveLetters] = useState<ILetter[]>([]);
  const [dictionary ] = useState<IDictionary>(importedDictionary);
  const [activeLamps, setActiveLamps] = useState<IActivePosition[]>([]);

  useEffect(() => {
  }, [])

  useEffect(() => {
    const handleVisibleLetters = () => {
      if (!activeLetters.length) {
        return;
      }
      const createActiveCoordinatesArray = (lettersArray: ILetter[]): IActivePosition[] => {
        let currentPosition = 0;
        const result = lettersArray.map((letter, index) => {
          if (currentPosition) {
            const result = incrementHorizontalPosition(letter, currentPosition);
            currentPosition = currentPosition = incrementCurrentPosition(currentPosition, letter.type)
            return result;
          }
          currentPosition = incrementCurrentPosition(currentPosition, letter.type)
          return letter.position;
        })
        return result.flat(1);
      }
      const activeCoordinates = createActiveCoordinatesArray(activeLetters);
      setActiveLamps(activeCoordinates);
    }

    handleVisibleLetters();
  }, [activeLetters]);


  function incrementHorizontalPosition(letter: ILetter, currentPosition: number): IActivePosition[] {
    const movedLetter = letter.position.map(pos => {
      return { ...pos, x: pos.x + currentPosition }
    })
    return movedLetter;
  }

  function incrementCurrentPosition(currentPosition: number, type: ELetterType) {
    if (type === ELetterType.WIDE) {
      return currentPosition + 5 + SPACE_SIZE;
    }

    if (type === ELetterType.REGULAR) {
      return currentPosition + 4 + SPACE_SIZE;
    }

    if (type === ELetterType.SHORT) {
      return currentPosition + 3 + SPACE_SIZE;
    }

    
    return type === ELetterType.WIDE ? currentPosition + 5 + SPACE_SIZE : currentPosition + 3 + SPACE_SIZE;
  }

  function turnOffAll() {
    setActiveLamps([])
    setActiveLetters([])
  }

  function addNewLetter(letter: string) {
    setActiveLetters((activeLetters) => {
      if (dictionary[letter]) {
        return [...activeLetters, dictionary[letter]]
      }
      return [...activeLetters]
    });
  }

  function ckeckIfActive(x: number, y: number): boolean {
    if (!activeLamps.length) {
      return false;
    }
    return !!activeLamps.find(lamp => lamp.x === x && lamp.y === y);
  }

  function handleInput(event: React.BaseSyntheticEvent<Event>) {
    const lettersArray: Array<string> = event.target.value.split('');
    turnOffAll();
    lettersArray.forEach(letter => {
      addNewLetter(letter)
    });
  }
  
  // function handleOneLamp(x: number, y: number, isActive: boolean) {

  //   if (isActive) {
  //     setActiveLamps((activeLamps) => {
  //       const filteredMaps = activeLamps.filter(lamp => {
  //         console.log('lamp.x !== x && lamp.y !== y', lamp.x, lamp.y)
  //         return lamp.x !== x && lamp.y !== y
  //       });
  //       return filteredMaps;
  //     })
  //     return;
  //   }

  //   setActiveLamps((activeLamps) => [...activeLamps, {x, y}])

  // }

  // function addLetter(): void {
  //   setActiveLetters((activeLetters) => [...activeLetters, importedDictionary.a, ])
  // }

  return (
    <>
      <button onClick={turnOffAll}>destroy all</button>
      <input onChange={handleInput} />
      <Canvas>
        <MainCamera />
        <OrbitControls />
        <Light />
        <Background />
        { 
          [...Array(LAMP_AMOUNT_Y)].map((item, y) => {
            return [...Array(LAMP_AMOUNT_X)].map((element, x) => {
              return (
                <MainLamp
                  key={`${x}${y}`}
                  postition={{x: x * 1.1, y: y * -1.1}}
                  isActive={ckeckIfActive(x, y)} 
                />
              )
            })
          })
        }
      </Canvas>
    </>
  );
};

export default MainField;
