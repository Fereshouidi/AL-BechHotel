'use client';
import './mainPage.css';
import { useEffect, useState } from 'react';
import { typeUser } from './types';
import ReservationDetails from './component/reservationDetails/reservationDetails';
import AnswerSec from './component/answerSec/answerSec';
import ChatDiv from './component/chatInput/chatDiv';

export default function Home() {

  const [textDirection, setTextDirection] = useState<'rtl' | 'ltr'>('ltr');
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState<boolean>(false);
  const [user, setUser] = useState< typeUser | null>(null);
  const [geminiAnswer, setGeminiAnswer] = useState<string>('');
  const [isReservationSecVisible, setIsReservationSecVisible] = useState<boolean>(false);

  useEffect(() => {
      const userData = localStorage.getItem('userData');
      console.log(userData);
      
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
  }, [])

  const [isThereAnswer, setIsTherAnswer] = useState<boolean>(false);

  return (
    <div className="page">

      {isThereAnswer &&<AnswerSec textDirection={textDirection} geminiAnswer={geminiAnswer} />}

      <ChatDiv 
        isThereAnswer={isThereAnswer}
        setIsTherAnswer={setIsTherAnswer}
        setTextDirection={setTextDirection}
        isWaitingForAnswer={isWaitingForAnswer}
        setIsWaitingForAnswer={setIsWaitingForAnswer}
        setGeminiAnswer={setGeminiAnswer}
        user={user}
        setUser={setUser}
        isReservationSecVisible={isReservationSecVisible}
        setIsReservationSecVisible={setIsReservationSecVisible}
 />
      
      {isReservationSecVisible && <ReservationDetails/>}


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