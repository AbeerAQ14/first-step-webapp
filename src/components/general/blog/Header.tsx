const Header = () => {
  return (
    <section className="2xl:container mx-auto p-0 bg-[#81CAA9]">
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578349035260-9f3d4042f1f7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="h-[30rem] px-4 flex items-center justify-center bg-white/20">
          <h1 className="text-white/88 text-center">
            كل منا لديه تجربة يشاركها
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Header;
