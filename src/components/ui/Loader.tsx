// components/ui/Loader.tsx
export function Loader() {
  return (
    <svg
      className="q-loader"
      width="56"
      height="12"
      viewBox="0 0 56 12"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label="Loading"
    >
      <style>
        {`
          .q-loader .q-sq {
            fill: #4D8DFF;
            transform-box: fill-box;
            transform-origin: center;
            animation: q-charge 1.2s steps(1) infinite;
          }
          .q-loader .q-sq:nth-child(1) { animation-delay: 0s; }
          .q-loader .q-sq:nth-child(2) { animation-delay: .4s; }
          .q-loader .q-sq:nth-child(3) { animation-delay: .8s; }

          @keyframes q-charge {
            0%   { opacity: 1;   transform: scale(1); }
            34%  { opacity: .15; transform: scale(.7); }
            100% { opacity: .15; transform: scale(.7); }
          }

          @media (prefers-reduced-motion: reduce) {
            .q-loader .q-sq { animation: none; opacity: 1; }
          }
        `}
      </style>
      <rect className="q-sq" x="0"  y="0" width="12" height="12" />
      <rect className="q-sq" x="22" y="0" width="12" height="12" />
      <rect className="q-sq" x="44" y="0" width="12" height="12" />
    </svg>
  )
}