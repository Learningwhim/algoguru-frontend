export default function Footer() {
  return (
    <footer className="w-full px-8 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
      <span className="text-white/30 text-xs">
        © {new Date().getFullYear()} algoguru — learn by building.
      </span>

      <div className="flex items-center gap-5 text-white/30 text-xs">
        <a href="/about" className="hover:text-white/60 transition-colors">
          About
        </a>
        <a href="/contact" className="hover:text-white/60 transition-colors">
          Contact
        </a>
        <a href="/privacy" className="hover:text-white/60 transition-colors">
          Privacy
        </a>
      </div>
    </footer>
  );
}