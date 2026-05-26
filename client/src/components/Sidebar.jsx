import { useState } from "react";

function Sidebar() {
    const [departure, setDeparture] = useState("")
    const [arrival, setArrival] = useState("")
    const [route, setRoute] = useState("")
    const [relatedGraphText, setRelatedGraphText] = useState("")

    const handleSearch = async () => {
        const response = await fetch(`/chemin?departure=${departure}&arrival=${arrival}`);
        const routeText = await response.text();
        const stationList = routeText.split(" -> ").map(s => s.trim());
        setRoute(stationList);
    }

    const handleCheckRelatedGraph = async () => {
        const response = await fetch(`/connexite`);
        const text = await response.text();
        console.log("test ", text)

        if (text === "true") {
            setRelatedGraphText("le graphe est connexe :D")
        } else {
            setRelatedGraphText("le graphe n'est pas connexe :(")
        }
    }

    return (
        <div className="flex flex-col m-5">
            <div className="mb-4">
                <h1 className="text-2xl text-[#123ABF] font-extrabold">graphe</h1>
            </div>

            <div className="mb- flex flex-col gap-2">
                <button onClick={handleCheckRelatedGraph} className="border border-[#c0caf8] hover:border-[#c0caf8] focus:border-[#123ABF] bg-white hover:bg-[#c0caf8]/20 focus:bg-[#123ABF] text-lg text-[#123ABF] focus:text-white rounded-[10px] p-[0.25rem]">vérifier connexité</button>
                <button className="border border-[#c0caf8] hover:border-[#c0caf8] focus:border-[#123ABF] bg-white hover:bg-[#c0caf8]/20 focus:bg-[#123ABF] text-lg text-[#123ABF] focus:text-white rounded-[10px] p-[0.25rem]">afficher ACPM</button>
            </div>

            <div className="mb-10">
                <p className="text-lg text-[#123ABF]">{relatedGraphText}</p>
            </div>

            <div className="mb-4">
                <h1 className="text-2xl text-[#123ABF] font-extrabold">itinéraire</h1>
            </div>

            <div className="flex flex-col w-full mb-4">
                <p className="text-lg text-[#123ABF] mb-2">départ</p>
                <input type="text" value={departure} onChange={(e) => setDeparture(e.target.value)} placeholder="ex: Maison Blanche" className="border border-[#c0caf8] h-10 w-full p-2 mb-3 rounded-[10px] text-lg text-[#123ABF] focus:outline-0" />

                <p className="text-lg text-[#123ABF] mb-2">arrivée</p>
                <input type="text" value={arrival} onChange={(e) => setArrival(e.target.value)} placeholder="ex: Villejuif Louis Aragon" className="border border-[#c0caf8] h-10 w-full p-2 mb-3 rounded-[10px] text-lg text-[#123ABF] focus:outline-0" />

                <button onClick={handleSearch} className="border border-[#c0caf8] hover:border-[#c0caf8] focus:border-[#123ABF] bg-white hover:bg-[#c0caf8]/20 focus:bg-[#123ABF] text-lg text-[#123ABF] focus:text-white rounded-[10px] p-[0.25rem]">rechercher</button>
            </div>

            <div>
                {route.length > 0 && (
                    <div className="flex flex-col items-start mt-4">
                        {route.map((station, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <div className="flex flex-col items-center">
                                    <div className={`w-7 h-7 rounded-full border-2 border-white flex-shrink-0
                ${index === 0 || index === route.length - 1
                                            ? "bg-[#123ABF]" : "bg-[#c0caf8]"}`}
                                    />
                                    {index < route.length - 1 && (
                                        <div className="w-0.5 h-10 bg-[#c0caf8]" />
                                    )}
                                </div>
                                <span className={`text-base text-[#123ABF] mt-1
            ${index === 0 || index === route.length - 1
                                        ? "font-extrabold" : "font-normal"}`}>
                                    {station}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar;