import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const faqData = [
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt odit reprehenderit illo ut rem corporis mollitia accusantium est quaerat minus",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt odit reprehenderit illo ut rem corporis mollitia accusantium est quaerat minus",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt odit reprehenderit illo ut rem corporis mollitia accusantium est quaerat minus",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">الأسئلة الشائعة</h2>

      <Accordion type="multiple" className="w-full">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQs;
