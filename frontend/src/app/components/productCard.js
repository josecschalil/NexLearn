import Link from "next/link";

const ProductCard = ({ course }) => {
  return (
    <Link href={`/courses/${course.id}`} key={course.id}>
      <div className="   mb-3  transition-transform transform hover:scale-[1.03] font-jakarta">
   
        <div className="relative">
          <img
            className=" w-full rounded-2xl aspect-video   object-cover "
            src={course.img}
            alt={course.title}
          />
          {course.discount && (
            <div className="absolute top-2 right-2 bg-teal-500 text-white text-[10px] px-2 py-[2px] rounded-sm">
              {course.discount}% OFF
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="py-3">
          {/* Type */}
          <p className="text-teal-600 text-xs  font-medium tracking-widest mb-2">
            {course.course_type}
          </p>

          {/* Title */}
          <h3 className="text-lg  font-bold text-gray-800 mb-1 truncate">
            {course.title}
          </h3>

          <h3 className="text-sm text-justify text-gray-800 mb-1  line-clamp-3">
            {course.description}
          </h3>


          {/* Price Section */}
          <div className="flex justify-between gap-4">
          <div className="mt-1 flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-800">
              Rs.{course.current_price}
              <span className="text-sm line-through text-gray-400 ml-2">
                {course.price}
              </span>
            </p>
          </div>

        
          </div>
        
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
