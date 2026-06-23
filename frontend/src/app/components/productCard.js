import Link from "next/link";

const getThumbnail = (course) => {
  if (course.img) {
    return course.img;
  }

  if (course.exam_type === "NEET") {
    return "/reading.png";
  }

  return "/icons/hero.png";
};

const ProductCard = ({ course }) => {
  const discount =
    course.price > 0
      ? Math.round(((course.price - course.current_price) / course.price) * 100)
      : 0;

  const thumbnail = getThumbnail(course);

  return (
    <Link href={`/courses/${course.id}`} key={course.id} className="block h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_10px_28px_rgba(15,23,42,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,.1)]">
        <div className="relative aspect-[1/1] overflow-hidden bg-gradient-to-br from-slate-100 via-white to-emerald-50">
          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            src={thumbnail}
            alt={course.title}
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700 backdrop-blur">
              {course.exam_type || "Program"}
            </span>
            {discount > 0 ? (
              <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[10px] font-semibold text-white">
                {discount}% OFF
              </span>
            ) : null}
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-3">
            <p className="inline-flex rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-700">
              {course.course_type}
            </p>
            <h3 className="mt-2 line-clamp-2 text-xl font-semibold tracking-[-0.04em] text-white">
              {course.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">
            {course.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {course.watch_hours} hrs
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {course.chapters} chapters
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {course.tests} tests
            </span>
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
                Price
              </p>
              <p className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                Rs.{course.current_price}
              </p>
              <p className="text-xs text-slate-400 line-through">Rs.{course.price}</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-950 px-3.5 py-2 text-sm font-semibold text-white transition group-hover:bg-emerald-600">
              Explore
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
