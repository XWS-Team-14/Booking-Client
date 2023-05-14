import { useEffect, useState } from "react"
import styles from '../styles/reservation.module.scss'
import { ToastContainer } from "react-toastify";
import { Button, Menu, MenuProps, Modal } from "antd";
import ReservationDto from "../types/ReservationDto"
import { useSelector } from "react-redux";
import { selectUser } from "@/common/store/slices/authSlice";
import { GetUserById, acceptReservation, cancelReservation, getActiveByGuest, getByAccommodation, getByHost } from "../services/reservation.service";
import { useRouter } from "next/router";

const GuestReservations = () =>{
    const[reservations, setReservations] = useState<ReservationDto[]>([]);
    const user = useSelector(selectUser);
    const { confirm } = Modal;
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    let hosts : any[]
    useEffect(()=>{
        if (user.email === null || user.role != 'guest') {
          router.push('/');
        } else {
          setLoading(false);
          getActiveByGuest().then((reservations) => {
            setReservations(reservations)
        }).then(()=>{
            for (let index in reservations){
                hosts.push(GetUserById(reservations[index].host_id))
            }
        })}
        
      }, [user]);
        //add a function call that gets all accommodations  by host
       
      
    const showConfirm = (id: string) => {
        confirm({
        content: <p>Are you sure you want to cancel this reservation?</p>,
        onOk() {
        cancelReservation(id)
        }
        })
        }
      
    return (
        <section className={styles.pageWrapper}>
          <ToastContainer />
          <div className={styles.wrapper}>
              <h1 className={styles.title}>Reservation Requests</h1>
              
            <div className={styles.reservationCard}>
                {reservations.map((reservation, index)=>
                    <div className={styles.reservationCardContent}>
                        <b>{hosts[index].name} {hosts[index].lastname}</b>
                        <b>{reservation.beginning_date.toString()}</b>
                        <b>{reservation.ending_date.toString()}</b>
                        <b>{reservation.number_of_guests}</b>
                        <b>{reservation.total_price}</b>
                        <Button type="primary" onClick={() => {showConfirm(reservation.id)}} style={{ width: '100%' }} >Cancel Reservation</Button>
                    </div>
                    )}

            </div>    
          </div>
          
        </section>
      );
}; 
export default GuestReservations;