
import React, { useState, useRef, useEffect } from 'react';
import styles from './generator.module.css';

function ShadowGenerator() {
    const [boxShadow, setBorderShadow] = useState({
        horizontal: 0,
        vertical: 0,
        blur: 0,
        spread: 0,
        color: 'rgba(0, 0, 0, 0.5)',
        inset: false
    });
    const [boxResult, setBorderResult] = useState('');

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
        setBorderResult(`
            box-shadow: ${boxShadow.horizontal}px ${boxShadow.vertical}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color} ${boxShadow.inset ? 'inset' : ''};`);
    }, [boxShadow]);

    return (
        <div className={styles.container}>
            <div className={styles.square} ref={squareRef}></div>
    
                <div className={styles.shadow}>
                    <div className={styles.shadowInputs}>
                        <label>Horizontal
                            <input type="range" min="-100" max="100" value={boxShadow.horizontal} onChange={(e) => setBorderShadow({ ...boxShadow, horizontal: parseInt(e.target.value) })} />
                        </label>
                        <label>Vertical
                            <input type="range" min="-100" max="100" value={boxShadow.vertical} onChange={(e) => setBorderShadow({ ...boxShadow, vertical: parseInt(e.target.value) })} />
                        </label>
                        <label>Blur
                            <input type="range" min="0" max="100" value={boxShadow.blur} onChange={(e) => setBorderShadow({ ...boxShadow, blur: parseInt(e.target.value) })} />
                        </label>
                        <label>Spread
                            <input type="range" min="0" max="100" value={boxShadow.spread} onChange={(e) => setBorderShadow({ ...boxShadow, spread: parseInt(e.target.value) })} />
                        </label>
                        <label>Color
                            <input type="color" value={boxShadow.color} onChange={(e) => setBorderShadow({ ...boxShadow, color: e.target.value })} />
                        </label>
                        <label> Inset
                            <input type="checkbox" checked={boxShadow.inset} onChange={() => setBorderShadow({ ...boxShadow, inset: !boxShadow.inset })} />
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
