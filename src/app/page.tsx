import About from "./About"
import DataItems from "./DataItems"

export default function Home() {
  const currentYear = new Date().getFullYear()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <header className="bg-[#1B3252] w-full h-[60px] text-white p-3 px-5 text-2xl font-semibold">Wellness Retreats</header>

      <section className="w-full">
        <About />

        <DataItems />
      </section>

      <footer className="sticky bottom-0 mt-5 border-t sm:relative sm:border-t-2 border-transparent w-full text-center p-3 bg-white text-sm">
        &copy; {currentYear} Wellness Retreats. All rights reserved.
      </footer>
    </main>
  )
}
