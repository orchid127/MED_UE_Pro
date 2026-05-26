import MetroMap from '../components/MetroMap'
import Sidebar from '../components/Sidebar'

function Home() {
    return (
        <div className="flex flex-1 flex-row overflow-hidden divide-x divide-[#c0caf8] font-lilex">
            <div className='w-[30%] overflow-y-auto shrink-0 custom-scroll'>
                <Sidebar />
            </div>
            <div className="flex-1">
                <MetroMap />
            </div>
        </div>
    )
}

export default Home;












