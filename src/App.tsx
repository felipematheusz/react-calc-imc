import { useState } from 'react';
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png'

import { levels, calculateImc, level } from './helpers/imc'

const App = () => {

  const [heightField, setheightField] = useState<number>(0);
  const [weightField, setweightField] = useState<number>(0);
  const [toShow, setToShow] = useState<level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert('Digite todos os campos');
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setheightField(0);
    setweightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.Container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal da pessoa.</p>
          <input
            type="number"
            placeholder='Digite a sua altura. Ex: 1.5 (em Métros)'
            value={heightField > 0 ? heightField : ''}
            onChange={(e) => { setheightField(parseFloat(e.target.value)) }}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder='Digite a seu peso. Ex: 75.3 (em KG)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setweightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <button disabled={toShow ? true : false} onClick={handleCalculateButton}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, index) => (
                <GridItem key={index} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div onClick={handleBackButton} className={styles.rightArrow}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;



