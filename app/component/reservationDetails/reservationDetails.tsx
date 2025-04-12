'use client';
import { CSSProperties, useEffect, useState } from 'react';
import './reservationDetails.css';

const ReservationDetails = () => {

        const [position, setPosition] = useState({ x: 0, y: 0 });
        //const [displayWindth, setDisplayWidth] = useState<number>(0);
      
        useEffect(() => {
            const centerX = window.innerWidth > 800 ? window.innerWidth / 4 : window.innerWidth /2;
            const centerY = window.innerWidth > 800 ? window.innerHeight / 3 : window.innerHeight /2;
            setPosition({ x: centerX, y: centerY });
            //setDisplayWidth(window.innerWidth);
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
            left: `${ position.x }px`, 
            top: `${ position.y }px`,
            transform: 'translate(-50%, -50%)'
        }

        useEffect(() => {

        }, [])
    return (
        <div className="reservation-details-sec sec" style={style}>

            <div className="header draged-header" onMouseDown={handleMouseDown}>
                <h4>booking details :</h4>
            </div>

            <div className='content'>
                <div className='item'>
                    <h5>Guest Details</h5>
                    <ul>
                        <li>name: bech</li>
                        <li>email: hmhm</li>
                        <li>phone: 123</li>
                    </ul>
                </div>
                <div className='item'>
                    <h5>Room Details</h5>
                    <ul>
                        <li>number: 123</li>
                        <li>type: single</li>
                    </ul>
                </div>
                <div className='item'>
                    <h5>Booking Details</h5>
                    <ul>
                        <li>CheckIn Date: 12/12/2025</li>
                        <li>CheckOut Date: 18/12/2025</li>
                        <li>Duration: 7 day</li>
                        <li>Status: confirmed</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
export default ReservationDetails;