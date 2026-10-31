import Image from "next/image";
import { Quote } from "lucide-react";

export default function PresidentialAddress() {
	return (
		<section id="presidential-address" className="bg-base-200/50 py-16 sm:py-20 lg:py-28 relative">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-6xl">
					{/* Section Header */}
					<div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
							<Quote className="h-3.5 w-3.5 fill-current" />
							Executive Address
						</div>
						<h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content leading-tight">
							A Message from the President
						</h2>
						<p className="text-sm sm:text-base text-base-content/70 leading-relaxed">
							Words of welcome and strategic vision from the 18th President of CISSA.
						</p>
					</div>

					{/* Editorial Card Layout */}
					<div className="rounded-3xl sm:rounded-4xl border border-base-300/80 bg-base-100 p-6 sm:p-10 lg:p-14 shadow-sm">
						<div className="grid gap-10 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-14 items-start">
							{/* President Profile Column */}
							<div className="space-y-4 max-w-xs mx-auto lg:max-w-none w-full">
								<div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-base-300 ring-2 ring-primary/20 shadow-md">
									<Image
										src="/assets/Executives/President.jpg"
										alt="Kuforiji Ayobami Waris - 18th CISSA President"
										fill
										sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 85vw"
										className="object-cover"
										priority
									/>
								</div>

								<div className="space-y-1 text-center lg:text-left pt-1">
									<h3 className="text-xl sm:text-2xl font-bold text-base-content">
										Kuforiji Ayobami Waris
									</h3>
									<p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary">
										18th CISSA President
									</p>
									<p className="text-xs text-base-content/60 uppercase tracking-widest">
										2026/2027 Horizon Administration
									</p>
								</div>
							</div>

							{/* Message Body */}
							<div className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed text-base-content/80">
								<p className="text-lg sm:text-xl font-medium text-base-content">
									Dear CISSAites and Esteemed Visitors,
								</p>

								<p>
									It is with great pleasure and a deep sense of responsibility that I welcome you to the official website of the Communication and Information Sciences Students’ Association (CISSA), University of Ilorin. Whether you are a fresh intake, a returning scholar, an alumnus, a partner, or a curious guest, you have a home with us.
								</p>

								<p>
									CISSA is more than an association—it is a thriving ecosystem brought together across diverse disciplines: Computer Science, Information & Communication Science, Library & Information Science, Mass Communication, Telecommunication Science, and Cybersecurity. In that intellectual diversity lies our formidable strength. We are creators, problem-solvers, storytellers, system architects, and future-makers.
								</p>

								<p>
									As the Horizon Administration, our mission is to ensure that student life transcends lectures and examinations. It should be a transformative incubator for discovering untapped potential, mastering cutting-edge competencies, expanding professional networks, and preparing with confidence for the global marketplace.
								</p>

								<p>
									Ultimately, CISSA is defined by you—its members. I invite every CISSAite to participate vigorously, ask challenging questions, pioneer solutions, and actively shape our collective destiny. The horizon is ours to claim.
								</p>

								<div className="pt-4 border-t border-base-200">
									<p className="text-base sm:text-lg font-bold text-base-content">
										Warm regards,
									</p>
									<p className="text-sm font-medium text-primary">
										Kuforiji Ayobami Waris
									</p>
									<p className="text-xs text-base-content/60">
										President, CISSA Unilorin
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
