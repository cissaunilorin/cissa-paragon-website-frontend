import Image from "next/image";

export default function PresidentialWelcome() {
  return (
    <div className="py-16 bg-gradient-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
            A Message from the <span className="text-primary">President</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="card lg:card-side shadow-2xl bg-base-100 overflow-hidden border border-base-300 max-w-6xl mx-auto">
          <figure className="lg:w-2/5 relative h-96 lg:h-auto">
            <Image
              src="/assets/Executives/President.jpg"
              alt="Sanni Nurudeen Akorede - CISSA President"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 lg:hidden">
              <h3 className="text-xl font-bold text-white">
                SANNI, Nurudeen Akorede
              </h3>
              <p className="text-white/90">17th CISSA President</p>
              <p className="text-white/80 text-sm">
                2025/2026 Academic Session
              </p>
            </div>
          </figure>

          <div className="card-body lg:w-3/5 p-8 lg:p-12">
            <div className="space-y-5 text-base-content/90 leading-relaxed">
              <p className="text-lg">
                Dear esteemed colleagues, members, and visitors.
              </p>

              <p>
                It is my great pleasure to welcome you to the official website
                of the Faculty Student Association! As the President, I am
                honored to lead this vibrant community of scholars and leaders.
                Our faculty is a hub of academic excellence, innovation, and
                personal growth. We strive to create an inclusive environment
                where students can thrive, explore their passions, and develop
                the skills needed to succeed in their chosen paths.
              </p>

              <p>
                Through this website, we aim to keep you informed about upcoming
                events, achievements, and opportunities that matter most to our
                faculty. You&apos;ll find updates on academic support, student
                life, and extracurricular activities designed to enrich your
                university experience.
              </p>

              <p>
                As students, you are the heart of our faculty. Your voices,
                ideas, and contributions are vital to our growth and success. I
                encourage you to engage with us, share your thoughts, and be
                part of shaping our faculty&apos;s future. And with this
                I&apos;d like to appreciate the software team for their efforts
                in bringing this goal to life.
              </p>

              <p className="font-semibold text-base-content">
                Together, let&apos;s make our mark!
              </p>

              <div className="pt-4 border-t border-base-300 mt-6">
                <p className="font-semibold text-base-content">Warm regards,</p>
                <div className="mt-3 hidden lg:block">
                  <p className="font-bold text-lg text-primary">
                    SANNI, Nurudeen Akorede
                  </p>
                  <p className="text-base-content/80 font-medium">
                    17th CISSA President
                  </p>
                  <p className="text-base-content/70">
                    2025/2026 Academic Session
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
