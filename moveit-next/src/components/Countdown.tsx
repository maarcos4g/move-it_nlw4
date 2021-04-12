import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);

    //criação da contagem de tempo
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);


    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startcountdown() {
        setisActive(true);
    }

    function resetcountodw() {
        setisActive(false);
        clearTimeout(countdownTimeout);
        setTime(0.1 * 60);
    }


    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time])
    //fim da contagem

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div >

            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}>
                    Ciclo Encerrado!
                </button>
            ) : (
                <>
                    { isActive ? (

                        <button
                            type="button"
                            className={styles.countdownButtonActive}
                            onClick={resetcountodw}
                        >
                            Abandonar Ciclo
                        </button>
                    ) : (

                        <button
                            type="button"
                            className={styles.countdownButton}
                            onClick={startcountdown}
                        >
                            Iniciar um ciclo
                        </button>
                    )}
                </>

            )}
        </div>
    );
}