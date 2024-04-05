export default function FormularioLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>

        <nav></nav>
   
        {children}
      </section>
    )
  }