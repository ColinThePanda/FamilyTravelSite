import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import type { MarkerData } from "./TravelMap";

interface Props {
	longitude: number;
	latitude: number;
	zoom?: number;
	markers?: MarkerData[];
	height?: string;
}

export default function TravelMapInner({
	longitude,
	latitude,
	zoom = 12,
	markers = [],
	height = "400px",
}: Props) {
	return (
		<div
			className="w-full rounded-lg overflow-hidden border border-border"
			style={{ height }}
		>
			<MapContainer
				center={[latitude, longitude]}
				zoom={zoom}
				style={{ width: "100%", height: "100%" }}
				zoomControl={false}
				attributionControl={false}
			>
				<TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
				<ZoomControl position="topright" />
				{markers.map((m, i) => (
					<Marker key={i} position={[m.latitude, m.longitude]}>
						<Popup>{m.label}</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}
