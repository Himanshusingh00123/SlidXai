import { Link } from "react-router-dom";

const NotFound = ({
  code = "404",
  title = "This destination isn’t accessible.",
  description = "The resource you attempted to open may have been moved, archived, or temporarily disconnected from the network.",
  buttonLabel = "Return to Home",
}) => {
  return (
    <div className="h-full w-full p-4">
      <div className="relative mx-auto w-full overflow-hidden rounded-[2rem] bg-muted px-4 py-10 sm:px-8 lg:px-14">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit] mask-[radial-gradient(circle_at_center,black,transparent_75%)]">
          <div className="grid h-full w-full grid-cols-12 grid-rows-6">
            {Array.from({ length: 72 }).map((_, index) => (
              <div
                key={index}
                className="border border-border/50 transition-colors duration-300 hover:bg-primary/20"
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 grid min-h-105 grid-cols-1 gap-10 sm:grid-cols-2 sm:items-center">
          {/* Text Content */}
          <div className="order-2 flex max-w-md flex-col items-center justify-center gap-5 text-center sm:order-1 sm:items-start sm:text-left">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
                {title}
              </h1>

              <p className="max-w-sm text-sm leading-normal text-muted-foreground sm:text-base">
                {description}
              </p>
            </div>

            {/* Button */}
            <Link
              to="/"
              type="button"
              className="group inline-flex h-11 items-center gap-3 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.5)]"
            >
              <span>{buttonLabel}</span>

              <span className="text-base transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Error Code */}
          <div className="order-1 flex items-center justify-center sm:order-2">
            <span className="translate-y-4 select-none text-[7rem] font-light leading-none tracking-tight text-foreground/70 sm:translate-y-0 sm:text-[9rem] md:text-[11rem] lg:text-[13rem]">
              {code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
