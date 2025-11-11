import { useSelector } from 'react-redux';
import DeliveryBoy from '../components/DeliveryBoy';
import UserDashboard from '../components/UserDashboard';
import OwnerDashboard from '../components/OwnerDashboard';
import Navbar from '../components/Navbar';


function Home() {

    //get user data from redux store
    const { userData } = useSelector( state => state.user)

  return (
    <div className='w-screen min-h-screen pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
        <Navbar />
        {userData?.role == "user" && <UserDashboard/>}
        {userData?.role == "owner" && <OwnerDashboard/>}
        {userData?.role == "deliveryBoy" && <DeliveryBoy/>}
    </div>
  )
}

export default Home