import { Headphones, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeaderActions() {
  return (
    <div className="absolute top-8 right-8 z-20 flex items-center gap-3 bg-[#050a14] rounded-3xl p-4 pb-6 rounded-br-none rounded-tl-none pt">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full px-4 h-10 gap-2 bg-[#111827] hover:bg-[#111827] cursor-pointer hover:text-gray-300 border border-gray-800/50 text-gray-300"
      >
        <Headphones className="h-4 w-4" />
        Ajuda
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="rounded-full px-4 h-10 gap-2 bg-[#111827] hover:bg-[#111827] cursor-pointer hover:text-gray-300 border border-gray-800/50 text-gray-300"
      >
        <span className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-green-600">
          <span className="h-full w-full bg-green-600 flex items-center justify-center">
            <span className="h-2 w-2 rotate-45 bg-yellow-400 flex items-center justify-center">
              <span className="h-1 w-1 rounded-full bg-blue-700"></span>
            </span>
          </span>
        </span>
        PT-br
        <ChevronDown className="h-3 w-3 opacity-50" />
      </Button>
    </div>
  )
}
