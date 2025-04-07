'use client';
import './mainPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import speakerIMG from '@/images/468736129_4036389116596333_8844728601513177571_n (1).jpg';
import LoadingForSendBTN from '@/icon/loadingForSendBTN';
import { typeUser, typeConversation } from './types';

export default function Home() {

  const [userMSG, setUserMSG] = useState<string>('');
  const [gemininswer, setGeminiAnswer] = useState<string>('');
  const [textDirection, setTextDirection] = useState<'rtl' | 'ltr'>('ltr');
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState<boolean>(false);
  const [user, setUser] = useState< typeUser | null>(null);

  useEffect(() => {
      const userData = localStorage.getItem('userData');
      console.log(userData);
      
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
  }, [])

  const inputMessageRef = useRef<HTMLInputElement>(null);
  const [isThereAnswer, setIsTherAnswer] = useState<boolean>(false);


  const handleBtnCliked = async () => {
    if (inputMessageRef.current) {
      setIsWaitingForAnswer(true);
      setUserMSG(inputMessageRef.current.value);
      try {
        const response = await axios.post('http://localhost:3002/api/getAiAnswer', {
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
        const separatorIndex = answer.indexOf('[SEPARATION]');
        const messageForUser = answer.slice(0, separatorIndex).trim();

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

        console.log(answer);
        
      } catch (err) {
        throw err;
      }

    }
  }

  const styleImage: CSSProperties = {
    // right: textDirection == 'rtl' ? '0px' : '',
    // left: textDirection == 'ltr' ? '0px' : '',
    direction: textDirection
  }
  const styleagentText: CSSProperties = {
    textAlign: textDirection == 'rtl' ? 'right' : 'left'
  }

  return (
    <div className="page">

      {isThereAnswer ? 
        <div id='answer-sec'>
          <div id='speaker' style={styleImage}>
            <img src={speakerIMG.src} />
            <h5>fares ai</h5>
          </div>
          <p id='answer' style={styleagentText}>{gemininswer}</p>
        </div>
      : null
      }

      <div id={isThereAnswer ? 'chat-div-in-bottom' : 'chat-div'} >

        <div id='options'>
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
    </div>
  );
}


















// await fetch('http://localhost:3000/send', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     userMSG
//   })
// })
// .then(async data => console.log(await data.json()))
// .catch(err => console.log(err))