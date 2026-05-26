import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";

function MetroMap() {
    const canvasRef = useRef(null);
    const [stations, setStations] = useState([]);
    const [edges, setEdges] = useState([]);
    const [route, setRoute] = useState([]);
    const [sommets, setSommets] = useState([]);

    useEffect(() => {
        // récupération stations
        fetch("/points")
            .then(res => res.text())
            .then(csv => {
                const parsed = Papa.parse(csv, { header: true, delimiter: ";", transformHeader: header => header.trim() });
                setStations(parsed.data);
            });

        // récupération aretes
        fetch("/aretes")
            .then(res => res.text())
            .then(csv => {
                const parsed = Papa.parse(csv, { header: true, delimiter: ";", transformHeader: header => header.trim() });
                // console.log(parsed.data);
                setEdges(parsed.data);
            });

        // récupération aretes
        fetch("/sommets")
            .then(res => res.text())
            .then(csv => {
                const parsed = Papa.parse(csv, {
                    header: true,
                    delimiter: ";",
                    transformHeader: header => header.trim()
                });
                setSommets(parsed.data.filter(s => s.num_sommet && s.nom_sommet));
            });
    }, []);

    useEffect(() => {
        // n'affiche rien s'il n'y a pas de stations, d'arêtes ou de sommets récupérés
        if (stations.length === 0 || edges.length === 0 || sommets.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // recharge le canvas
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // récupère les coordonnées de chaque station
        const coordMap = {};
        stations.forEach(s => {
            coordMap[s.nom.trim()] = { x: parseFloat(s.x), y: parseFloat(s.y) };
        });

        // associe à chaque coordonnée un nom de station
        const stationMap = {};
        sommets.forEach(s => {
            const coords = coordMap[s.nom_sommet.trim()];
            if (coords) stationMap[s.num_sommet.trim()] = coords;
        });

        // ajuste les coordonées à la taille du canvas
        const xs = stations.map(s => parseFloat(s.x));
        const ys = stations.map(s => parseFloat(s.y));
        const minX = Math.min(...xs), maxX = Math.max(...xs);
        const minY = Math.min(...ys), maxY = Math.max(...ys);

        const padding = 40;
        const scaleX = x => ((x - minX) / (maxX - minX)) * (canvas.width - padding * 2) + padding;
        const scaleY = y => ((y - minY) / (maxY - minY)) * (canvas.height - padding * 2) + padding;

        // dessine les arêtes
        edges.forEach(edge => {
            const from = stationMap[edge.num_sommet1.trim()];
            const to = stationMap[edge.num_sommet2.trim()];
            if (!from || !to) return;

            // verifie si l'arete fait partie du chemin
            const isHighlighted =
                route.includes(edge.num_sommet1) && route.includes(edge.num_sommet2);

            ctx.beginPath();
            ctx.moveTo(scaleX(from.x), scaleY(from.y));
            ctx.lineTo(scaleX(to.x), scaleY(to.y));
            ctx.strokeStyle = isHighlighted ? "#123ABF" : (edge.color || "#c0caf8");
            ctx.lineWidth = isHighlighted ? 3 : 2;
            ctx.stroke();
        });

        // dessine les stations
        stations.forEach(s => {
            ctx.beginPath();
            ctx.arc(scaleX(parseFloat(s.x)), scaleY(parseFloat(s.y)), 4, 0, Math.PI * 2);
            ctx.fillStyle = "#c0caf8";
            ctx.fill();
        });

    }, [stations, edges, route, sommets]);

    const handleSearch = async (departure, arrival) => {
        const res = await fetch(
            `/chemin?from=${departure}&to=${arrival}`
        );
        const text = await res.text();
        const stationList = text.split(" -> ").map(s => s.trim());
        setRoute(stationList);
    };

    return (
        <div className="flex justify-center items-center h-full">
            <canvas
                ref={canvasRef}
                width={800}
                height={700}
                className="bg-white"
            />
            <button onClick={handleSearch} className="absolute"></button>
        </div>
    )
}

export default MetroMap;