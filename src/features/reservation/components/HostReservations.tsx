import { useEffect, useState } from "react"
import styles from '../styles/reservation.module.scss'
import { ToastContainer } from "react-toastify";
import { Button, Menu, MenuProps } from "antd";
import ReservationDto from "../types/ReservationDto"
import { useSelector } from "react-redux";
import { selectUser } from "@/common/store/slices/authSlice";
import { acceptReservation, getByAccommodation, getByHost } from "../services/reservation.service";
const HostReservations = () =>{
    const[accommodations, setAccommodations] = useState<any[]>([]);
    const[reservations, setReservations] = useState<ReservationDto[]>([]);
    const user = useSelector(selectUser);
    useEffect(()=>{
        //add a function call that gets all accommodations  by host
        getByHost(user.email).then((reservations) => {
            setReservations(reservations)
        })
        
    });
  const setReservationsByAccommodation: MenuProps['onClick'] = (e) => {
    getByAccommodation(e.key).then((reservations)=> {
        setReservations(reservations);
    });};

    const accept = (reservation : ReservationDto) =>{
        acceptReservation(reservation);
    }
    
    
  
    return (
        <section className={styles.pageWrapper}>
          <ToastContainer />
          <div className={styles.wrapper}>
              <h1 className={styles.title}>Reservation Requests</h1>
              <Menu >
                {accommodations.map(accommodation=>
                        <Menu.Item key = {accommodation.id} onClick={setReservationsByAccommodation} >accommodation.name</Menu.Item>
                    )}
              </Menu>
            <div className={styles.reservationCard}>
                {reservations.map(reservation=>
                    <div className={styles.reservationCardContent}>
                        <b>reservation.begining_date</b>
                        <b>reservation.ending_date</b>
                        <b>reservation.total_price</b>
                        <Button type="primary" onClick={() => {accept(reservation)}} style={{ width: '100%' }} >Accept Reservation</Button>
                    </div>
                    )}

            </div>    
          </div>
          
        </section>
      );
}; 
export default HostReservations;