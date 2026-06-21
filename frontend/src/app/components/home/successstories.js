"use client";

const stories = [
{
quote:
"Shiv Sir’s guidance transformed how I approached Physics. Complex ideas became simple, and my problem-solving confidence improved with every class.",
name: "Ojas",
designation: "IIT Bombay · Electrical Engineering",
image: "/testimony/ojas.png",
result: "IIT Bombay",
},
{
quote:
"The patient guidance and clear explanations made even the toughest topics manageable. That consistency played a huge role in my result.",
name: "Rahul Chauhan",
designation: "NIT Calicut · Computer Science",
image: "/testimony/rahul.png",
result: "NIT Calicut",
},
{
quote:
"The teaching gave me more than knowledge—it gave me the confidence to keep going. I always knew what to improve next.",
name: "Sejal",
designation: "IIT Delhi",
image: "/testimony/sejal.png",
result: "IIT Delhi",
},
];

export default function SuccessStories() {
  return (
    <section className="overflow-hidden bg-white pt-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20 px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600">
            Student Success Stories
          </p>

          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl md:text-6xl">
            Don't take our word for it.
            <br />
            Hear it from <span className="text-emerald-600">our students.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Real stories from students who achieved their goals through
            disciplined preparation, mentorship, and focused learning.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stories.map((story, idx) => {
              const subDesignation = story.designation
                .replace(story.result, "")
                .replace("·", "")
                .trim();

              return (
                <article
                  key={idx}
                  className="flex w-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10"
                >
                  <div>
                    {/* Big Green Quote Icon */}
                    <svg
                      className="mb-6 h-4 w-6 text-emerald-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>

                    <p className="text-[15px] font-medium leading-[1.6] text-slate-700">
                      {story.quote}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-4 ">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h4 className="text-[12px] font-bold text-slate-900">
                        {story.name}
                      </h4>
                      <p className="text-[12px] font-medium text-emerald-700 mt-0.5">
                        {story.result}
                      </p>
                      {subDesignation && (
                        <p className="text-[12px] text-slate-500 mt-0.5">
                          {subDesignation}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
