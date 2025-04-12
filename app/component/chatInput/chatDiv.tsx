'use client';

import { typeUser } from "@/app/types";
import LoadingForSendBTN from "@/icon/loadingForSendBTN";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { CSSProperties, useEffect, useRef, useState } from "react";
import './chatDiv.css';

type params = {
    isThereAnswer: boolean
    setIsTherAnswer: (value: boolean) => void
    setTextDirection: (value: 'rtl' | 'ltr') => void
    isWaitingForAnswer: boolean
    setIsWaitingForAnswer: (value: boolean) => void
    setGeminiAnswer: (value: string) => void
    user:  typeUser | null
    setUser: (value: typeUser) => void
    isReservationSecVisible: boolean
    setIsReservationSecVisible: (value: boolean) => void
}
const ChatDiv = ({isThereAnswer, setIsTherAnswer, setTextDirection, isWaitingForAnswer, setIsWaitingForAnswer, setGeminiAnswer, user, setUser, setIsReservationSecVisible}: params) => {

    const inputMessageRef = useRef<HTMLInputElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight/ 1.4 ;
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
    
    const style: CSSProperties = {
        left: isThereAnswer ? `${ position.x }px` : '50%', 
        top: isThereAnswer ? `${ position.y }px` : '50%',
        transform: isThereAnswer ? 'translateX(-50%)' : 'translate(-50%, -50%)'
    }
    
    const handleBtnCliked = async () => {
        if (inputMessageRef.current) {
        setIsWaitingForAnswer(true);
        const url = "https://al-bech-hotel-back-end.vercel.app/api";
        const localUrl = "http://localhost:3002/api"
        try {
            const response = await axios.post( url + '/getAiAnswer', {
            userId: user?._id,
            message: inputMessageRef.current.value, 
            conversationId : user?.conversation?._id
        });
            const answer = response.data.answer;
            const updatedUser = response.data.updatedUser;
            const updatedConversation = response.data.updatedConversation;

            console.log({
            answer, updatedUser, updatedConversation
            });
            

            setIsTherAnswer(true);
            setTextDirection(answer.includes('rlrl') ? 'rtl' : 'ltr');

            const start = answer.indexOf('<mfc>') + '<mfc>'.length;
            const end = answer.indexOf('</mfc>');
            const messageForUser = answer.slice(start, end);

            setUser({
            ...updatedUser,
            conversation: updatedConversation
            });

            localStorage.setItem('userData', JSON.stringify({
            ...updatedUser,
            conversation: updatedConversation
            }));

            setGeminiAnswer(messageForUser);
            setIsWaitingForAnswer(false)

            setIsReservationSecVisible(answer.includes('<vrds/>')? true : false);

            console.log(answer);
            
        } catch (err) {
            throw err;
        }

        }
    }

    return (
        <div id={isThereAnswer ? 'chat-div-in-bottom' : 'chat-div'} 
            style={style} onMouseDown={handleMouseDown} 
            className='draged-header'
        >

        <div id='options' >
          <h5 className='option'>ask for example 1</h5>
          <h5 className='option'>ask for example 2</h5>
          <h5 className='option'>ask for example 3</h5>
        </div>

        <div id="input-div">
          <input type="text" placeholder="ask for anything ..." ref={inputMessageRef}/>
          <div className='button' onClick={handleBtnCliked}>
            {
              isWaitingForAnswer ? 
                <LoadingForSendBTN/> :
                <FontAwesomeIcon icon={faPaperPlane} className='icon'/>
            }
            
          </div> 
        </div>       

      </div>
    )
}
export default ChatDiv;