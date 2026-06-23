import Link from "next/link";

const getCardVisual = (course) => {
  const isNeet = course.exam_type === "NEET";
  const isChapterwise = course.course_type === "Chapter-wise";

  if (isNeet && isChapterwise) {
    return "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170";
  }

  if (isNeet) {
    return "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1070";
  }

  if (isChapterwise) {
    return "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1170";
  }

  return "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1125";
};

const ProductCard = ({ course }) => {
  const visual = getCardVisual(course);
  const discount =
    course.price > 0
      ? Math.round(((course.price - course.current_price) / course.price) * 100)
      : 0;

  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-slate-200 bg-white transition duration-300 hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(15,23,42,.06)]">
        <div className="aspect-[1/1] max-h-60 overflow-hidden bg-slate-100">
          <img
            src={visual}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
              {course.exam_type}
            </span>
            <span className="rounded-full bg-[#f4efe7] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
              {course.course_type}
            </span>
            {discount > 0 ? (
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                {discount}% off
              </span>
            ) : null}
          </div>

          <h3 className="mt-2.5 line-clamp-2 min-h-[3rem] text-base font-semibold tracking-[-0.03em] text-slate-950">
            {course.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 min-h-10 text-[13px] leading-5 text-slate-600">
            {course.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500">
            <span>{course.watch_hours} hrs</span>
            <span>&middot;</span>
            <span>{course.chapters} chapters</span>
            <span>&middot;</span>
            <span>{course.tests} tests</span>
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <div className="min-w-0">
              <p className="text-xl font-semibold tracking-tight text-slate-950">
                Rs.{course.current_price}
              </p>
              <p className="text-xs text-slate-400 line-through">
                Rs.{course.price}
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
              View
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
