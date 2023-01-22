import { OrbitControls, } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { ILetter, IDictionary, IActivePosition, ELetterType } from "../MainField/types";
import Light from "./BaseLight";
import MainLamp from "./MainLamp";
import lettersDictionary from '../../dictionary/letters.json';
import MainCamera from "./MainCamera";
import Background from "./Background";
import './MainFiled.scss';

const LAMP_AMOUNT_X = 12;
const LAMP_AMOUNT_Y = 5
const SPACE_SIZE = 2;

const MainField = () => {

  const importedDictionary = lettersDictionary as IDictionary;

  const [activeLetters, setActiveLetters] = useState<ILetter[]>([]);
  const [dictionary ] = useState<IDictionary>(importedDictionary);
  const [activeLamps, setActiveLamps] = useState<IActivePosition[]>([]);
  const [lampXAmount] = useState<number>(LAMP_AMOUNT_X);
  const [lampYAmount] = useState<number>(LAMP_AMOUNT_Y);

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

  function getLampPosition(x: number, y: number): { x: number, y: number} {
    return {
      x: x * 1.1  - ((lampXAmount / 2) * 1.1 - 0.5), 
      y: y * -1.1 + (lampYAmount / 2) * 1.1 - 0.5
    }
  }

  return (
    <>
      <div className="controls">
        <button onClick={turnOffAll}>destroy all</button>
        <input placeholder="type somethig" onChange={handleInput} />
      </div>

      <Canvas>
        <MainCamera
          cameraX={ -7 }
          cameraZ={ 13 }
        />
        <OrbitControls />
        <Light />
        <Background
          width={ lampXAmount * 1.1 + 1}
          height={ lampYAmount * 1.1 + 1 }
          positionX={ 0 }
          positionY={ 0 }
        />
        { 
          [...Array(lampYAmount)].map((_, y) => {
            return [...Array(lampXAmount)].map((_, x) => {
              return (
                <MainLamp
                  key={`${x}${y}`}
                  postition={getLampPosition(x, y)}
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
