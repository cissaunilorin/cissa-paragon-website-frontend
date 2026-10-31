import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Materials",
	description:
		"Lecture notes, past questions and textbooks for students of the Communication and Information Sciences Students Association, University of Ilorin.",
};

export default function MaterialsLayout({ children }: { children: ReactNode }) {
	return children;
}
