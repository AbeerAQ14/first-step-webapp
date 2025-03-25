import Image from "next/image";

const Values = () => {
  const values = [
    {
      iconSrc: "/mother.svg",
      alt: "",
      bg: "#B12F53",
      color: "#fff",
      title: "الابتكار المستمر",
      description:
        "ننظر إلى المستقبل بعيون متجددة، فلا نكتفي بما هو متاح، بل نبحث دائمًا عن حلول إبداعية ترتقي برعاية الأطفال إلى مستوى جديد. نواكب أحدث الأساليب التربوية والتقنيات الحديثة، لنقدم بيئة تعليمية وترفيهية متطورة تلبي احتياجات الأجيال القادمة.",
    },
    {
      iconSrc: "/mother.svg",
      alt: "",
      bg: "#2B3990",
      color: "#fff",
      title: "التواصل الإنساني",
      description:
        "نستمع، نفهم، ونتواصل بقلوب مفتوحة، لأننا نؤمن بأن رعاية الأطفال تبدأ ببناء علاقات قوية ومستدامة مع العائلات والمراكز؛ لذلك نسعى إلى بناء جسور من الثقة والتفاهم، لنكون دائمًا الشريك الداعم والموثوق الذي يمكن الاعتماد عليه في كل خطوة.",
    },
    {
      iconSrc: "/mother-nurse.svg",
      alt: "",
      bg: "#D9534F",
      color: "#fff",
      title: "الأثر الإيجابي",
      description:
        "نحن لا نقدم مجرد حلول، بل نساهم في بناء مستقبل أكثر إشراقًا للأطفال وعائلاتهم. نسعى أن يكون لكل خطوة نخطوها تأثير إيجابي ينعكس على حياة الأطفال اليوم، ويستمر معهم إلى الغد، لنُمهد لهم طريقًا مليئًا بالفرص والنمو المستدام.",
    },
    {
      iconSrc: "/mother-nurse.svg",
      alt: "",
      bg: "#73B094",
      color: "#fff",
      title: "الشفافية",
      description:
        "نؤمن بأن الثقة تُبنى على الوضوح، لذلك نحرص على الشفافية في كل خطوة، ليشعر كل ولي أمر وكل مركز بالراحة والثقة بتعاملهم معنا. نقدم معلومات دقيقة وواضحة حول خدماتنا، لضمان اتخاذ قرارات مبنية على المعرفة والاطمئنان.",
    },
  ];

  return (
    <section dir="rtl" className="container mx-auto px-4 text-center space-y-9">
      <h2 className="text-primary space-y-9">
        <span>قيم</span>
        <span className="block">First Step</span>
      </h2>

      <div className="grid gap-y-2 sm:gap-y-0 sm:grid-cols-2 sm:w-fit sm:mx-auto">
        {values.map((item, index) => (
          <div
            key={item.title}
            className={`w-full sm:max-w-[400px] gap-y-6 py-6 px-8 md:px-14 flex flex-col items-center ${
              index === 0 ? "rounded-tl-5xl rounded-br-5xl" : ""
            }
            ${index === 1 || index === 2 ? "rounded-tr-5xl rounded-bl-5xl" : ""}
            ${index === 3 ? "rounded-tl-5xl rounded-br-5xl" : ""}`}
            style={{ background: item.bg, color: item.color }}
          >
            <Image src={item.iconSrc} width={120} height={120} alt={item.alt} />
            <p className="font-bold">{item.title}</p>
            <p className="sm:max-w-72">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;
