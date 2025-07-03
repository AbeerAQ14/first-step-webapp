interface Program {
  title: string;
  image: string;
  price: string;
  features: string[];
  buttonText: string;
}

interface ProgramsProps {
  programs: Program[];
}

const Programs = ({ programs }: ProgramsProps) => (
  <section className="mt-16">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-[#22336C] mb-10">
      برامجنا
    </h2>
    <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
      {programs.map((program, idx) => (
        <div
          key={idx}
          className="flex-1 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center min-w-[220px] max-w-xs mx-auto"
        >
          <img
            src={program.image}
            alt={program.title}
            className="mb-4 w-20 h-20 object-contain"
          />
          <h3 className="text-xl font-bold text-[#22336C] mb-2">
            {program.title}
          </h3>
          <div className="text-3xl font-bold text-[#22336C] mb-2">
            {program.price}
          </div>
          <ul className="text-[#22336C] text-right mb-4 space-y-1">
            {program.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          <button className="mt-auto bg-gradient-to-r from-[#6A8DFF] to-[#3B5BDB] text-white rounded-lg px-6 py-2 font-bold transition hover:opacity-90">
            {program.buttonText}
          </button>
        </div>
      ))}
    </div>
  </section>
);

export default Programs;
