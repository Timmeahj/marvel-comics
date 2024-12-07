import React from 'react';
import '../../styles/organisms/main.scss';
import iro from '@jaames/iro';
import { useRef, useEffect, useState } from 'react';
import Comics from './Comics';
import Cta from '../atoms/Cta';

const Main: React.FC = () => {
  const [hOffset, setHOffset] = useState(0); 
  const [vOffset, setVOffset] = useState(0);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(0);

  const [to, setTo] = useState('Jan');
  const [from, setFrom] = useState("Tim");
  const [amount, setAmount] = useState("20");
  const [message, setMessage] = useState("Here ya go buddy!");

  const [selectedComic, setSelectedComic] = useState("https://www.comicbookherald.com/wp-content/uploads/2019/03/deepdish-marvel-1024x780.jpg");

  const changeComic = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log(event)
    setSelectedComic(event.target.src);
  }

  const changeTo = (event: React.ChangeEvent<HTMLInputElement>) => setTo(event.target.value);
  const changeFrom = (event: React.ChangeEvent<HTMLInputElement>) => setFrom(event.target.value);
  const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value);
  const changeMessage = (event: React.ChangeEvent<HTMLInputElement>) => setMessage(event.target.value);

  const incrementHOffset = () => setHOffset(hOffset + 1);
  const decrementHOffset = () => setHOffset(hOffset - 1);

  const incrementVOffset = () => setVOffset(vOffset + 1);
  const decrementVOffset = () => setVOffset(vOffset - 1);

  const incrementBlur = () => setBlur(blur + 1);
  const decrementBlur = () => setBlur(blur - 1);

  const incrementSpread = () => setSpread(spread + 1);
  const decrementSpread = () => setSpread(spread - 1);

  // Step 1: Create a ref for the target div (where the color picker will be attached)
  const bgColorPickerRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState("#333");
  const shadowColorPickerRef = useRef<HTMLDivElement>(null);
  const [shadowColor, setShadowColor] = useState("#808080");
  const textColorPickerRef = useRef<HTMLDivElement>(null);
  const [textColor, setTextColor] = useState("#fff");

  // Save the current states to localStorage
  const saveToLocalStorage = () => {
    const voucherState = {
      hOffset,
      vOffset,
      blur,
      spread,
      to,
      from,
      amount,
      message,
      selectedComic,
      bgColor,
      shadowColor,
      textColor,
    };
    localStorage.setItem('voucherState', JSON.stringify(voucherState));
  };

  // Load the saved states from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('voucherState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setHOffset(parsedState.hOffset);
      setVOffset(parsedState.vOffset);
      setBlur(parsedState.blur);
      setSpread(parsedState.spread);
      setTo(parsedState.to);
      setFrom(parsedState.from);
      setAmount(parsedState.amount);
      setMessage(parsedState.message);
      setSelectedComic(parsedState.selectedComic);
      setBgColor(parsedState.bgColor);
      setShadowColor(parsedState.shadowColor);
      setTextColor(parsedState.textColor);
    }
  }, []);

  // Step 2: Initialize the color picker inside `useEffect` when the component mounts
  useEffect(() => {
    // Step 3: Make sure the target div is available
    if (bgColorPickerRef.current) {
      const bgColorPickerDiv = bgColorPickerRef.current;

      // Initialize the iro.js ColorPicker and attach it to the target div
      const bgColorPicker = new iro.ColorPicker(bgColorPickerDiv, {width: 100,color: "#333",});

      bgColorPicker.on('color:change', function(color: iro.Color) {
        setBgColor(color.hexString);
      });
    }
    if (shadowColorPickerRef.current) {
        const shadowColorPickerDiv = shadowColorPickerRef.current;
  
        // Initialize the iro.js ColorPicker and attach it to the target div
        const shadowColorPicker = new iro.ColorPicker(shadowColorPickerDiv, {width: 100,color: "#808080",});

        shadowColorPicker.on('color:change', function(color: iro.Color) {
            setShadowColor(color.hexString);
        });
    }
    if (textColorPickerRef.current) {
        const textColorPickerDiv = textColorPickerRef.current;
  
        // Initialize the iro.js ColorPicker and attach it to the target div
        const textColorPicker = new iro.ColorPicker(textColorPickerDiv, {width: 100,color: "#fff",});

        textColorPicker.on('color:change', function(color: iro.Color) {
            setTextColor(color.hexString);
        });
    }
  }, []); // Empty dependency array to run the effect only once (on mount)

  return (
    <div className='container'>
        <div className="main row">
            <div className="main__editor col-md-12 row" id='editor'>
                <div className="col-md-6">
                    <h2>Voucher editor:</h2>
                </div>
                <div className="col-md-6">
                    <Cta
                        href="#editor"
                        text="Save Voucher"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            saveToLocalStorage(); // Trigger the save functionality
                        }}
                    />
                </div>
                <div className='main__comic col-md-6'>
                    <h5>Preview:</h5>
                    <div className="main__comic__preview row" style={{backgroundColor: bgColor ,color: textColor , boxShadow: `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}`}}>
                        <div className="col-md-6">
                            <div className="title">Gift voucher</div>
                            <div className="to fillable" style={{borderColor: textColor}}>To: <span>{to}</span></div>
                            <div className="from fillable" style={{borderColor: textColor}}>From: <span>{from}</span></div>
                            <div className="amount fillable" style={{borderColor: textColor}}>Amount: <span>${amount}</span></div>
                        </div>
                        <div className="col-md-6 image">
                            <div className="text" style={{color: "white"}}>{message}</div>
                            <img src={selectedComic} alt="Comic preview"/>
                        </div>    
                    </div>
                </div>
                <div className="col-md-6 texts">
                    <h5>Edit voucher texts:</h5>
                    <div className="to fillable"><div className='label'>To: </div><input type="text" value={to} onChange={changeTo} /></div>
                    <div className="from fillable"><div className='label'>From: </div><input type="text" value={from} onChange={changeFrom}/></div>
                    <div className="amount fillable"><div className='label'>Amount: </div><input type="text" value={amount} onChange={changeAmount}/></div>
                    <div className="text fillable"><div className='label'>Message: </div><input type="text" value={message} onChange={changeMessage}/></div>
                </div>
                <div className="col-md-6 shadows">
                    <h5>Edit drop shadow:</h5>
                    <div className="hOffset shadowConfig">
                        <div className='label'>Shadow h-offset: </div>
                        <div className="shadowConfigContainer">
                            <button onClick={decrementHOffset}>-</button>
                            <div>{hOffset}px</div>
                            <button onClick={incrementHOffset}>+</button>
                        </div>
                    </div>

                    <div className="vOffset shadowConfig">
                        <div className='label'>Shadow v-offset: </div>
                        <div className="shadowConfigContainer">
                            <button onClick={decrementVOffset}>-</button>
                            <div>{vOffset}px</div>
                            <button onClick={incrementVOffset}>+</button>
                        </div>
                    </div>

                    <div className="blur shadowConfig">
                        <div className='label'>Shadow blur: </div>
                        <div className="shadowConfigContainer">
                            <button onClick={decrementBlur}>-</button>
                            <div>{blur}px</div>
                            <button onClick={incrementBlur}>+</button>
                        </div>
                    </div>

                    <div className="spread shadowConfig">
                        <div className='label'>Shadow spread: </div>
                        <div className="shadowConfigContainer">
                            <button onClick={decrementSpread}>-</button>
                            <div>{spread}px</div>
                            <button onClick={incrementSpread}>+</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 colors row">
                    <h5>Edit voucher colors:</h5>
                    <div className="col-sm-4">
                        <div className="bgText colorText">Background color:</div>
                        <div className="bgColorPicker colorPicker" ref={bgColorPickerRef}></div>
                    </div>
                    <div className="col-sm-4">
                        <div className="shadowText colorText">Shadow color:</div>
                        <div className="shadowColorPicker colorPicker" ref={shadowColorPickerRef}></div>
                    </div>
                    <div className="col-sm-4">
                        <div className="textText colorText">Text color:</div>
                        <div className="textColorPicker colorPicker" ref={textColorPickerRef}></div>
                    </div>
                </div>
            </div>
            <div className='main__selectedComic col-md-6'>
                <h5>Selected Comic:</h5>
                <img src={selectedComic} alt="your selected comic" />
            </div>
            <div className='main__searchbar col-md-6'>
                <Comics comicHandler={changeComic}></Comics>
            </div>
        </div>
    </div>
  );
};

export default Main;