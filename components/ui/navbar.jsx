"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const BlogHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const navLinks = []

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [isMenuOpen])

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-[#0CAFF0]/20 shadow-[0_0_20px_rgba(12,175,240,0.1)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* LOGO */}
            <div className="shrink-0">
              <a href="#" className="flex items-center space-x-2">
                {logoError ? (
                  <div className="w-8 h-8 bg-[#0CF09B] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">C</span>
                  </div>
                ) : (
                  <Image
                    src="/1.png"
                    alt="Logo CRS"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover border border-[#0CAFF0]/40"
                    onError={() => setLogoError(true)}
                  />
                )}
                <span className="font-bold text-xl text-white">
                  Tarefas<span className="text-[#0CF09B]">.Crs</span>
                </span>
              </a>
            </div>
            

            {/* NAV DESKTOP */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="text-sm font-medium text-[#52F2ED] hover:text-[#0CF09B] transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium bg-[#0CAFF0] text-black rounded-lg hover:bg-[#0CF09B] transition shadow-[0_0_10px_rgba(12,175,240,0.5)]"
              >
                Login
              </a>
            </div>

            {/* MOBILE BUTTON */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[#52F2ED] hover:bg-[#0CAFF0]/20 rounded-md relative"
              >
                <Menu
                  className={`h-6 w-6 transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 scale-0" : "scale-100"
                  }`}
                />
                <X
                  className={`h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isMenuOpen ? "scale-100" : "scale-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm z-50 bg-[#020617] border-r border-[#0CAFF0]/20 shadow-xl transform transition ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">

          {/* HEADER MOBILE */}
          <div className="flex items-center justify-between p-4 border-b border-[#0CAFF0]/20">
            <a href="#" className="flex items-center space-x-2">
              {logoError ? (
                <div className="w-8 h-8 bg-[#0CF09B] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">C</span>
                </div>
              ) : (
                <Image
                  src="/362240373_744967560763985_8936317494821023027_n.jpg"
                  alt="Logo CRS"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover border border-[#0CAFF0]/40"
                  onError={() => setLogoError(true)}
                />
              )}
              <span className="font-bold text-lg text-white">
                Tarefas<span className="text-[#0CF09B]">.Crs</span>
              </span>
            </a>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-[#52F2ED] hover:bg-[#0CAFF0]/20 rounded-md"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* LINKS */}
          <nav className="grow p-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className="px-3 py-2 text-base text-[#52F2ED] rounded-md hover:bg-[#0CAFF0]/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </nav>

          {/* FOOTER */}
          <div className="p-4 border-t border-[#0CAFF0]/20">
            <a
              href="#"
              className="w-full block text-center px-4 py-3 text-sm font-medium bg-[#0CAFF0] text-black rounded-lg hover:bg-[#0CF09B] transition shadow-[0_0_10px_rgba(12,175,240,0.5)]"
            >
              Entrar
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogHeader