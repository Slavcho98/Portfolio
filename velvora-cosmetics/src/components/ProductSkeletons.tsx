export default function ProductSkeletons({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div className="grid__item" key={i} aria-hidden="true">
          <div className="card card--skeleton">
            <div className="skeleton skeleton--img" />
            <div className="card__body">
              <div className="skeleton skeleton--line skeleton--w60" />
              <div className="skeleton skeleton--line" />
              <div className="skeleton skeleton--line skeleton--w40" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
