import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ModuleSection } from '../connections/components/[id]/module-section'

export function Annotation() {
  return (
    <ModuleSection.Root>
      <ModuleSection.Header>
        <ModuleSection.Icon>
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/nirewen.png" />
          </Avatar>
        </ModuleSection.Icon>
        <ModuleSection.Title>
          Palavrinha do desenvolvedor...
        </ModuleSection.Title>
      </ModuleSection.Header>
      <ModuleSection.Body className="text-sm">
        <p>
          Sou aluno da <b className="font-bold">UFSM</b> e estou no último ano
          do meu curso.
        </p>
        <p>
          Esse site surgiu de uma ideia que eu tive e quis montar uma prova de
          conceito.
        </p>
        <p>
          Não sei por quanto tempo vou poder manter, tanto pelo tempo que
          estarei vinculado, quanto pelo fato de se essa plataforma ficar muito
          grande, posso enfrentar problemas (não sei kk)
        </p>
        <p>
          Então esse site precisa de um mantenedor, mas vou tentar manter o
          quanto puder. Se você quiser contribuir, pode acessar o repositório no
          rodapé.
        </p>
        <p>Novas universidades e novos módulos são bem vindos!</p>
      </ModuleSection.Body>
    </ModuleSection.Root>
  )
}
