// 'use client';

// import { CSSProperties, useState } from "react";
// import speakerIMG from '@/images/468736129_4036389116596333_8844728601513177571_n (1).jpg';
// import { useDraggable } from "./hook";

// interface AnswerSecProps {
//   textDirection: 'rtl' | 'ltr';
//   geminiAnswer: string;
//   onClose?: () => void;
//   onMinimize?: () => void;
//   initialPosition?: { x: number; y: number };
// }

// const AnswerSec = ({
//   textDirection, 
//   geminiAnswer,
//   onClose,
//   onMinimize,
//   initialPosition = { x: 0, y: 0 }
// }: AnswerSecProps) => {
//   const { ref, style, onMouseDown, bringToFront } = useDraggable(initialPosition);

//   const styleImage: CSSProperties = {
//     direction: textDirection
//   };

//   const styleagentText: CSSProperties = {
//     textAlign: textDirection == 'rtl' ? 'right' : 'left'
//   };

//   const windowStyle: CSSProperties = {
//     ...style,
//     width: '400px',
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//     overflow: 'hidden'
//   };

//   return (
//     <div 
//       ref={ref}
//       style={windowStyle}
//       className="draggable-window"
//       onClick={bringToFront}
//     >
//       <div 
//         className="window-header"
//         onMouseDown={onMouseDown}
//         style={{
//           padding: '8px 12px',
//           backgroundColor: '#f0f0f0',
//           borderBottom: '1px solid #ddd',
//           cursor: 'move',
//           userSelect: 'none',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}
//       >
//         <span style={{ fontWeight: 'bold' }}>Fares AI</span>
//         <div style={{ display: 'flex', gap: '8px' }}>
//           <button 
//             onClick={(e) => {
//               e.stopPropagation();
//               onMinimize?.();
//             }}
//             style={{
//               border: 'none',
//               background: 'transparent',
//               cursor: 'pointer',
//               padding: '0 4px'
//             }}
//           >
//             _
//           </button>
//           <button 
//             onClick={(e) => {
//               e.stopPropagation();
//               onClose?.();
//             }}
//             style={{
//               border: 'none',
//               background: 'transparent',
//               cursor: 'pointer',
//               padding: '0 4px',
//               color: '#d11'
//             }}
//           >
//             ×
//           </button>
//         </div>
//       </div>
//       <div id='answer-sec'>
//           <div id='speaker' style={styleImage}>
//             <img src={speakerIMG.src} />
//             <h5>fares ai</h5>
//           </div>
//           <p id='answer' style={styleagentText}>{geminiAnswer}</p>
//         </div>
//     </div>
//   );
// };

// export default AnswerSec;





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
