import { LoginForm } from "../components/login-form"
import { HeaderActions } from "../components/header-actions"
import Image from "next/image"

export function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-[#050a14] flex relative overflow-hidden">
      {/* Header Actions (Floating) */}
      <HeaderActions />

      {/* Left Side - Form */}
      <div className="w-full lg:w-[45%] flex flex-col p-8 lg:p-16 xl:p-24 justify-center relative z-10">
        <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
          <span className="text-3xl font-bold bg-linear-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
            Nortus
          </span>
        </div>

        <div className="mt-12">
          <LoginForm />
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-[55%] p-8 relative">
        <div className="w-full h-full rounded-4xl overflow-hidden relative bg-linear-to-br from-[#0d2847] via-[#0a1929] to-[#050a14] border border-blue-900/30 shadow-2xl">
          {/* Illustration Image */}
          <div className=" inset-0">
            <Image
              src="/image-login.png"
              alt="Nortus - Plataforma de Gestão Inteligente"
              fill
              className="opacity-90 transition-transform duration-700"
            />
          </div>

          {/* Subtle overlay for depth */}
          <div className=" inset-0 bg-linear-to-t from-[#050a14]/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
