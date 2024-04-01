import { Annotation } from '@/features/home/annotation'
import { Features } from '@/features/home/features'
import { Footer } from '@/features/home/footer'
import { MainHero } from '@/features/home/main-hero'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="flex flex-col gap-2">
      <MainHero />
      <Features />
      <Annotation />
      <Footer />
    </main>
  )
}
