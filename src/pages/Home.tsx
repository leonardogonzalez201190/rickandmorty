import { List, Filters, Pagination, Header } from "../components";


export default function Home() {
  return (
    <section className="container">
      <header>
        {/* Header */}
        <Header />

        {/* Filters */}
        <nav className="filters">
          <Filters />
          <Pagination />
        </nav>
      </header>

      {/* Main content */}
      <main className="main-content">
        <List />
      </main>
    </section>
  );
}
