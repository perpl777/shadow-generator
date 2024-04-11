import React, { useState, useRef, useEffect } from 'react';
import styles from './generator.module.css';

function ShadowGenerator() {
    const [boxShadow, setBoxShadow] = useState({
        horizontal: 0,
        vertical: 0,
        blur: 0,
        spread: 0,
        color: 'black',
        inset: false
    });

    const [boxResult, setBoxResult] = useState('');

    const squareRef = useRef(null);

    const generateBorder = () => {
        squareRef.current.style.boxShadow = `
            ${boxShadow.horizontal}px 
            ${boxShadow.vertical}px 
            ${boxShadow.blur}px 
            ${boxShadow.spread}px 
            ${boxShadow.color} 
            ${boxShadow.inset ? 'inset' : ''}`;
    }

    useEffect(() => {
        generateBorder();
        setBoxResult(`
            box-shadow: ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color} ${boxShadow.inset ? 'inset' : ''};`);
    }, [boxShadow]);

    const handleHorizontalChange = (e) => {
        setBoxShadow({ ...boxShadow, horizontal: parseInt(e.target.value) });
    }

    const handleVerticalChange = (e) => {
        setBoxShadow({ ...boxShadow, vertical: parseInt(e.target.value) });
    }

    const handleBlurChange = (e) => {
        setBoxShadow({ ...boxShadow, blur: parseInt(e.target.value) });
    }

    const handleSpreadChange = (e) => {
        setBoxShadow({ ...boxShadow, spread: parseInt(e.target.value) });
    }

    const handleColorChange = (e) => {
        setBoxShadow({ ...boxShadow, color: e.target.value });
    }

    const handleInsetChange = (e) => {
        setBoxShadow({ ...boxShadow, inset: e.target.checked });
    }

    return (
        <div className={styles.container}>
            <div className={styles.square} ref={squareRef}></div>

            <div className={styles.shadow}>
                <div className={styles.shadowInputs}>
                    <label>Horizontal
                        <input type="range" min="-100" max="100" value={boxShadow.horizontal} onChange={handleHorizontalChange} />
                    </label>
                    <label>Vertical
                        <input type="range" min="-100" max="100" value={boxShadow.vertical} onChange={handleVerticalChange} />
                    </label>
                    <label>Blur
                        <input type="range" min="0" max="100" value={boxShadow.blur} onChange={handleBlurChange} />
                    </label>
                    <label>Spread
                        <input type="range" min="0" max="100" value={boxShadow.spread} onChange={handleSpreadChange} />
                    </label>
                    <label>Color
                        <input type="color" value={boxShadow.color} onChange={handleColorChange} />
                    </label>
                    <label> Inset
                        <input type="checkbox" checked={boxShadow.inset} onChange={handleInsetChange} />
                    </label>
                </div>
            </div>

            <div className={styles.result}>
                <textarea className={styles.textarea} value={boxResult}></textarea>
                <button className={styles.copyBtn} onClick={() => navigator.clipboard.writeText(boxResult)}>Copy</button>
            </div>
        </div>
    );
}

export default ShadowGenerator;