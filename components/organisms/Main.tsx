import React from 'react';
import '../../styles/organisms/main.scss';
import iro from '@jaames/iro';
import { useRef, useEffect, useState } from 'react';

const Main: React.FC = () => {
  // Step 1: Create a ref for the target div (where the color picker will be attached)
  const bgColorPickerRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState("black");
  const shadowColorPickerRef = useRef<HTMLDivElement>(null);
  const [shadowColor, setShadowColor] = useState("gray");
  const [hOffset, setHOffset] = useState(5); // Start with numeric values (px will be added later)
  const [vOffset, setVOffset] = useState(8);
  const [blur, setBlur] = useState(12);
  const [spread, setSpread] = useState(1);

  const incrementHOffset = () => setHOffset(hOffset + 1);
  const decrementHOffset = () => setHOffset(hOffset - 1);

  const incrementVOffset = () => setVOffset(vOffset + 1);
  const decrementVOffset = () => setVOffset(vOffset - 1);

  const incrementBlur = () => setBlur(blur + 1);
  const decrementBlur = () => setBlur(blur - 1);

  const incrementSpread = () => setSpread(spread + 1);
  const decrementSpread = () => setSpread(spread - 1);

  // Step 2: Initialize the color picker inside `useEffect` when the component mounts
  useEffect(() => {
    // Step 3: Make sure the target div is available
    if (bgColorPickerRef.current) {
      const bgColorPickerDiv = bgColorPickerRef.current;

      // Initialize the iro.js ColorPicker and attach it to the target div
      const bgColorPicker = new iro.ColorPicker(bgColorPickerDiv, {width: 320,color: "#f00",});

      bgColorPicker.on('color:change', function(color: iro.Color) {
        setBgColor(color.hexString);
      });
    }
    if (shadowColorPickerRef.current) {
        const shadowColorPickerDiv = shadowColorPickerRef.current;
  
        // Initialize the iro.js ColorPicker and attach it to the target div
        const shadowColorPicker = new iro.ColorPicker(shadowColorPickerDiv, {width: 320,color: "#f00",});

        shadowColorPicker.on('color:change', function(color: iro.Color) {
            setShadowColor(color.hexString);
        });
    }
  }, []); // Empty dependency array to run the effect only once (on mount)

  return (
    <div className='container'>
        <div className="main row">
            <div className='main__comic col-md-12'>
                <h2>Preview of your current comic voucher:</h2>
                <div className="main__comic__preview row" style={{backgroundColor: bgColor, boxShadow: `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}`}}>
                    <div className="col-md-6">
                        <div className="title">Gift voucher</div>
                        <div className="to fillable">To: <span>Jan</span></div>
                        <div className="from fillable">From: <span>Tim</span></div>
                        <div className="amount fillable">Amount: <span>$20</span></div>
                    </div>
                    <div className="col-md-6 image">
                        <div className="text">Here ya go buddy!</div>
                        <img src="https://www.comicbookherald.com/wp-content/uploads/2019/03/deepdish-marvel-1024x780.jpg" alt="Comic preview"/>
                    </div>    
                </div>
            </div>
            <div className="main__editor col-md-12">
                <h2>Voucher editor:</h2>
                <div className="to fillable">To: <input type="text" value={"Jan"} /></div>
                <div className="from fillable">From: <input type="text" value={"Tim"} /></div>
                <div className="amount fillable">Amount: <input type="text" value={"20"} /></div>
                <div className="text fillable">Message: <input type="text" value={"Here ya go buddy!"} /></div>
                <div className="textColor">Toggle text color: <input type="checkbox" /></div>
                <div className="bgText">Background color:</div>
                <div className="bgColorPicker" ref={bgColorPickerRef}></div>
                <div className="shadowText">Shadow color:</div>
                <div className="shadowColorPicker" ref={shadowColorPickerRef}></div>
                <div className="hOffset">
                    <span>Shadow h-offset: </span>
                    <button onClick={decrementHOffset}>-</button>
                    <span>{hOffset}px</span>
                    <button onClick={incrementHOffset}>+</button>
                </div>

                <div className="vOffset">
                    <span>Shadow v-offset: </span>
                    <button onClick={decrementVOffset}>-</button>
                    <span>{vOffset}px</span>
                    <button onClick={incrementVOffset}>+</button>
                </div>

                <div className="blur">
                    <span>Shadow blur: </span>
                    <button onClick={decrementBlur}>-</button>
                    <span>{blur}px</span>
                    <button onClick={incrementBlur}>+</button>
                </div>

                <div className="spread">
                    <span>Shadow spread: </span>
                    <button onClick={decrementSpread}>-</button>
                    <span>{spread}px</span>
                    <button onClick={incrementSpread}>+</button>
                </div>
            </div>
            <div className='main__searchbar'>
                <label htmlFor="filter">Find and select your desired comic</label>
                <input type="text" id='filter' />
            </div>
            <div className='main__results'>
                <div className="card"><img src="https://www.comicbookherald.com/wp-content/uploads/2019/03/deepdish-marvel-1024x780.jpg" alt="Comic preview" /></div>
                <div className="card"><img src="https://www.comicbookherald.com/wp-content/uploads/2019/03/deepdish-marvel-1024x780.jpg" alt="Comic preview" /></div>
                <div className="card"><img src="https://www.comicbookherald.com/wp-content/uploads/2019/03/deepdish-marvel-1024x780.jpg" alt="Comic preview" /></div>
                <div className="card"><img src="https://www.comicbookherald.com/wp-content/uploads/2019/03/deepdish-marvel-1024x780.jpg" alt="Comic preview" /></div>
                <div className="card"><img src="https://www.comicbookherald.com/wp-content/uploads/2019/03/deepdish-marvel-1024x780.jpg" alt="Comic preview" /></div>
            </div>
        </div>
    </div>
  );
};

export default Main;