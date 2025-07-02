interface SectionData {
  title: string;
  image: string;
  text: string;
}

interface PhilosophyCardsProps {
  sections: SectionData[];
}

const PhilosophyCards = ({ sections }: PhilosophyCardsProps) => (
  <div className="mt-12 flex justify-center">
    <div className="flex flex-col md:flex-row justify-center gap-8 text-center bg-white rounded-lg shadow-md p-8 w-full max-w-6xl">
      {sections.map((section, idx) => (
        <div key={idx} className="flex-1 flex flex-col items-center px-4">
          <img
            src={section.image}
            alt={section.title}
            className="mx-auto mb-4 w-28 h-28 object-contain"
          />
          <h3 className="text-2xl font-bold text-[#B12F53] mb-2">
            {section.title}
          </h3>
          <p className="text-gray-700 text-base">{section.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default PhilosophyCards;

// Example data for use elsewhere
export const philosophySections = [
  {
    title: "منهجيتنا",
    image: "https://picsum.photos/200/200?random=1",
    text: "هذا نص توضيحي تجريبي لمنهجيتنا.",
  },
  {
    title: "فلسفتنا",
    image: "https://picsum.photos/200/200?random=2",
    text: "هذا نص توضيحي تجريبي لفلسفتنا.",
  },
  {
    title: "هدفنا",
    image: "https://picsum.photos/200/200?random=3",
    text: "هذا نص توضيحي تجريبي لهدفنا.",
  },
];
