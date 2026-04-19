export default function WhoWeAre() {
	return (
		<section className="bg-base-100 py-16 md:py-20 lg:py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-6xl">
					<div className="mb-12 text-center md:mb-14">
						<p className="text-lg font-bold uppercase tracking-[0.22em] text-primary md:text-2xl">
							Who We Are
						</p>
					</div>

					<p className="mx-auto mb-12 max-w-4xl text-center text-base font-normal leading-8 text-base-content/80 md:mb-14 md:text-xl md:leading-9">
						CISSA is the official student body for all students in the Faculty
						of Communication and Information Sciences at the University of
						Ilorin. It serves as a link between students and the faculty
						administration while organizing programs that support academic
						growth, welfare, and career development.
					</p>

					<div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
						<div className="space-y-4">
							<p className="text-sm font-bold uppercase tracking-[0.24em] text-base-content/60 text-center md:text-base md:text-left">
								Our Story
							</p>
							<p className="max-w-prose text-base text-center md:text-left font-normal leading-8 text-base-content/80 md:text-lg md:leading-9">
								The Communication and Information Sciences Students&apos;
								Association (CISSA) of the University of Ilorin was
								established in June 2008 to unify students across all
								departments within the Faculty of Communication and
								Information Sciences. It was created to provide structured
								representation, promote academic collaboration, and
								coordinate student-focused programs within the faculty.
							</p>
						</div>

						<div className="space-y-10 lg:space-y-12">
							<div className="space-y-4">
								<p className="text-sm font-bold uppercase tracking-[0.24em] text-base-content/60 text-center md:text-base md:text-left">
									Mission
								</p>
								<p className="max-w-prose text-base text-center md:text-left font-normal leading-8 text-base-content/80 md:text-lg md:leading-9">
									To represent, support, and empower students of Communication
									and Information Sciences through academic, professional, and
									social initiatives.
								</p>
							</div>

							<div className="space-y-4">
								<p className="text-sm font-bold uppercase tracking-[0.24em] text-base-content/60 text-center md:text-base md:text-left">
									Vision
								</p>
								<p className="max-w-prose text-base text-center md:text-left font-normal leading-8 text-base-content/80 md:text-lg md:leading-9">
									To build a dynamic student community that produces globally
									competitive graduates in communication and information
									sciences.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}