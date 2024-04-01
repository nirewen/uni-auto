import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function Footer() {
  return (
    <div className="mb-2 flex flex-col justify-between gap-1 rounded-3xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm md:flex-row">
      <div className="flex items-center gap-2">
        <span>
          <b className="font-bold">uni-auto</b> é uma criação de
        </span>
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2 rounded-full bg-neutral-800 p-1 pr-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/nirewen.png" />
              </Avatar>
              <span>nirewen</span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  className="object-cover"
                  src={'https://github.com/nirewen.png'}
                />
              </Avatar>
              <div className="flex flex-col gap-1">
                <h4 className="flex items-center gap-1 text-sm font-semibold">
                  Nirewen
                </h4>
                <p className="text-sm">
                  Aluno de graduação em
                  <br />
                  <a href="https://ufsm.br/csi" target="_blank">
                    Sistemas para Internet
                  </a>
                </p>
                <a
                  className="text-sm"
                  href="https://nirewen.dev"
                  target="_blank"
                >
                  https://nirewen.dev
                </a>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-2">
        <span>o código fonte está disponível no</span>
        <a
          className="flex items-center gap-2 rounded-full bg-neutral-800 p-1 pr-2"
          href="https://github.com/nirewen/uni-auto"
          target="_blank"
        >
          <Avatar className="h-6 w-6 bg-white">
            <AvatarImage src="https://github.com/favicon.ico" />
          </Avatar>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  )
}
