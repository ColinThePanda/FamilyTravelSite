import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
	src: string;
	className?: string;
}

export default function LightboxImage({ src, className }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<img
				src={src}
				className={`cursor-zoom-in ${className ?? ""}`}
				onClick={() => setOpen(true)}
			/>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent
					showCloseButton={false}
					className="flex items-center justify-center bg-transparent border-none shadow-none p-0 gap-0"
					style={{ maxWidth: "80vw", width: "auto" }}
				>
					<img
						src={src}
						style={{ maxWidth: "80vw", maxHeight: "80vh" }}
						className="object-contain rounded-lg"
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
