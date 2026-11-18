export default function HoverLinks({ text, className = '' }) {
  return (
    <span className={`hover-link ${className}`}>
      <span className="hover-in">
        <span>{text}</span>
        <span className="hover-in-clone" aria-hidden="true">
          {text}
        </span>
      </span>
    </span>
  )
}
