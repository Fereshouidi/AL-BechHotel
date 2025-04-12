import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import speakerIMG from '@/images/468736129_4036389116596333_8844728601513177571_n (1).jpg';
import './answerSec.css';


const AnswerSec = ({geminiAnswer, textDirection}: {geminiAnswer: string, textDirection: 'rtl' | 'ltr'}) => {

    const dragRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setPosition({ x: centerX, y: centerY });
    }, []);

    const handleMouseDown = (e: MouseEvent | React.MouseEvent) => {
      const startX = e.clientX - position.x;
      const startY = e.clientY - position.y;
  
      const handleMouseMove = (e: MouseEvent) => {
        setPosition({
          x: e.clientX - startX,
          y: e.clientY - startY,
        });
      };
  
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
    

    const styleImage: CSSProperties = {
        direction: textDirection
    }
    const styleagentText: CSSProperties = {
        textAlign: textDirection == 'rtl' ? 'right' : 'left'
    }
    const style: CSSProperties = {
        left: `${ position.x }px`, 
        top: `${ position.y }px`,
        transform: 'translate(-50%, -50%)'
    }
      

  return (

    <div id='answer-sec'
        ref={dragRef}
        style={style}
    >
        <div className='header draged-header' onMouseDown={handleMouseDown}>
            <div id='speaker' style={styleImage}>
                <img src={speakerIMG.src} />
                <h5>fares ai</h5>
            </div>
        </div>

        <div id='answer' style={styleagentText} dangerouslySetInnerHTML={{__html: geminiAnswer}}>
          
        </div>
    </div>
  );
};

export default AnswerSec;
