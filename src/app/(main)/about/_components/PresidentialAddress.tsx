import Image from "next/image";

export default function PresidentialAddress() {
	return (
		<section id="presidential-address" className="bg-base-100 py-16 md:py-20 lg:py-24">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-7xl">
					<div className="mb-12 text-center md:mb-14">
						<p className="text-sm font-bold uppercase tracking-[0.22em] text-primary md:text-xl">
							A Message from the President
						</p>
					</div>

					<div className="grid gap-12 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-16 xl:gap-20">
						<div className="space-y-5">
							<div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-base-200">
								<Image
									src="/assets/Executives/President.jpg"
									alt="Sanni Nurudeen Akorede"
									fill
									sizes="(min-width: 1024px) 38vw, 100vw"
									className="object-cover"
									priority
								/>
							</div>

							<div className="space-y-1.5 px-1 text-center lg:px-0 lg:text-left">
								<h3 className="text-2xl font-bold leading-tight text-base-content md:text-3xl">
									Sanni Nurudeen Akorede
								</h3>
								<p className="text-sm font-medium uppercase tracking-[0.2em] text-base-content/60 md:text-base">
									17th CISSA President
								</p>
								<p className="text-sm uppercase tracking-[0.18em] text-base-content/55 md:text-base">
									2025/2026 Academic Session
								</p>
							</div>
						</div>

						<div className="space-y-6 text-base leading-8 text-base-content/80 md:text-lg md:leading-9 lg:pt-2">
							<p>
								Dear esteemed colleagues, members, and visitors.
							</p>

							<p>
								It is my great pleasure to welcome you to the official website of
								the Faculty Student Association! As the President, I am honored to
								lead this vibrant community of scholars and leaders. Our faculty is
								a hub of academic excellence, innovation, and personal growth. We
								strive to create an inclusive environment where students can thrive,
								explore their passions, and develop the skills needed to succeed in
								their chosen paths.
							</p>

							<p>
								Through this website, we aim to keep you informed about upcoming
								events, achievements, and opportunities that matter most to our
								faculty. You&apos;ll find updates on academic support, student life,
								and extracurricular activities designed to enrich your university
								experience.
							</p>

							<p>
								As students, you are the heart of our faculty. Your voices, ideas,
								and contributions are vital to our growth and success. I encourage
								you to engage with us, share your thoughts, and be part of shaping
								our faculty&apos;s future. And with this I&apos;d like to appreciate the
								software team for their efforts in bringing this goal to life.
							</p>

							<p className="text-lg font-semibold leading-8 text-base-content md:text-xl md:leading-9">
								Together, let&apos;s make our mark!
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}