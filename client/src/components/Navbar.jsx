import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="flex flex-row items-center p-4 justify-between border-b border-[#c0caf8] font-lilex">
            <div className="flex">
                <h1 className="text-3xl font-extrabold text-[#123ABF]">metro-efrei-dodo</h1>
            </div>
            <div className="flex gap-5">
                <Link to="/" className="flex justify-center border border-[#c0caf8] hover:border-[#c0caf8] focus:border-[#123ABF] bg-white hover:bg-[#c0caf8]/20  focus:bg-[#123ABF] text-[#123ABF] focus:text-white rounded-[10px] p-[0.25rem] w-[7rem]">carte</Link>
                <Link to="/a-propos" className="flex justify-center border border-[#c0caf8] hover:border-[#c0caf8] focus:border-[#123ABF] bg-white hover:bg-[#c0caf8]/20  focus:bg-[#123ABF] text-[#123ABF] focus:text-white rounded-[10px] p-[0.25rem] w-[7rem]">à propos</Link>
                <a href="https://github.com/Gilgamesh-lab/MED_UE_Pro" target="_blank">
                    <button className="border border-[#c0caf8] hover:border-[#c0caf8] focus:border-[#123ABF] bg-white hover:bg-[#c0caf8]/20  focus:bg-[#123ABF] text-[#123ABF] focus:text-white rounded-[10px] p-[0.25rem] w-[7rem]">github</button>
                </a>
            </div>
        </div>
    )
}

export default Navbar;