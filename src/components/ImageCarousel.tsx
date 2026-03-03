import { useState, useCallback } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import LightboxImage from "@/components/LightboxImage";
import type { CarouselApi } from "@/components/ui/carousel";

interface Props {
	images: string[];
	variant?: "default" | "peek" | "tall";
	lightbox?: boolean;
}

function useCarouselEdges(images: string[]) {
	const [current, setCurrent] = useState(0);
	const onApiChange = useCallback((api: CarouselApi) => {
		if (!api) return;
		setCurrent(api.selectedScrollSnap());
		api.on("select", () => setCurrent(api.selectedScrollSnap()));
	}, []);
	return {
		onApiChange,
		atStart: current === 0,
		atEnd: current === images.length - 1,
	};
}

export default function ImageCarousel({
	images,
	variant = "default",
	lightbox = false,
}: Props) {
	const { onApiChange, atStart, atEnd } = useCarouselEdges(images);

	const aspectClass =
		variant === "tall"
			? "aspect-[9/16]"
			: variant === "peek"
				? "aspect-square"
				: "aspect-video";
	const itemClass =
		variant === "peek"
			? "pl-2 basis-3/4"
			: variant === "tall"
				? "pl-2 basis-4/5"
				: "";
	const contentClass = variant === "peek" || variant === "tall" ? "-ml-2" : "";
	const align = variant === "peek" || variant === "tall" ? "center" : "start";
	const maxWidth = variant === "tall" ? "max-w-sm" : "max-w-xl";

	return (
		<Carousel
			className={`w-full ${maxWidth} mx-auto`}
			opts={{ align, loop: false }}
			setApi={onApiChange}
		>
			<CarouselContent className={contentClass}>
				{images.map((src, i) => (
					<CarouselItem key={i} className={itemClass}>
						{lightbox ? (
							<LightboxImage
								src={src}
								className={`w-full rounded-lg object-cover ${aspectClass}`}
							/>
						) : (
							<img
								src={src}
								className={`w-full rounded-lg object-cover ${aspectClass}`}
							/>
						)}
					</CarouselItem>
				))}
			</CarouselContent>
			{!atStart && <CarouselPrevious />}
			{!atEnd && <CarouselNext />}
		</Carousel>
	);
}
