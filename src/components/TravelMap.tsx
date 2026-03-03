import { lazy, Suspense } from "react";

export type MarkerData = {
	label: string;
	longitude: number;
	latitude: number;
};

interface Props {
	longitude: number;
	latitude: number;
	zoom?: number;
	markers?: MarkerData[];
	height?: string;
}

const Map = lazy(() => import("@/components/TravelMapInner"));

export default function TravelMap(props: Props) {
	return (
		<Suspense
			fallback={
				<div
					style={{ height: props.height ?? "400px" }}
					className="w-full rounded-lg bg-muted animate-pulse"
				/>
			}
		>
			<Map {...props} />
		</Suspense>
	);
}
