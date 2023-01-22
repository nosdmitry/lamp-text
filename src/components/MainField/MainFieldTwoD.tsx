import './MainField.scss';
import BaseLamp from './BaseLamp';
import { useEffect, useState } from 'react';
import { ILetter, ELetterType, IActivePosition, IDictionary } from './types';
import lettersDictionary from '../../dictionary/letters.json';

function MainFieldTwoD () {

  const CELL_AMOUNT_HORIZONTAL = 60;
  const CELL_AMOUNT_VERTICAL = 5;
  const SPACE_SIZE = 1;
  const importedDictionary = lettersDictionary as IDictionary;

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

  function handleOneLamp(x: number, y: number, isActive: boolean) {

    if (isActive) {
      setActiveLamps((activeLamps) => {
        const filteredMaps = activeLamps.filter(lamp => {
          console.log('lamp.x !== x && lamp.y !== y', lamp.x, lamp.y)
          return lamp.x !== x && lamp.y !== y
        });
        return filteredMaps;
      })
      return;
    }

    setActiveLamps((activeLamps) => [...activeLamps, {x, y}])
  }


  return (
    <>
    <div className='two-d-controls'>
      <h1 className='test'>Type some text</h1>
      <button onClick={turnOffAll}>destroy all</button>
      <input onChange={handleInput} />
      <a className='two-d-controls__link' href='/3d'>go to 3d</a>
    </div>
    

    <ul className='main-field' style={{gridTemplateColumns: `repeat(${CELL_AMOUNT_HORIZONTAL}, 1fr)`}} >
      {
        [...Array(CELL_AMOUNT_VERTICAL)].map((item, y) => {
          return [...Array(CELL_AMOUNT_HORIZONTAL)].map((element, x) => {
            return (
              <li className='main-field__cell' key={`${x}${y}` }>
                <BaseLamp 
                  x={x} 
                  y={y} 
                  isActive={ckeckIfActive(x, y)}
                  handleActive={handleOneLamp}   />
              </li>
            )
          })
        }) 
      }
    </ul>
    </>
  )
}

export default MainFieldTwoD;
